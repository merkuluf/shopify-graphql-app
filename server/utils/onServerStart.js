const { client } = require('../api/graphqlClient')
const queries = require('../api/queries')

const prisma = require('../prisma/prismaClient')
const imageOperations = require('../prisma/utils/imageOperations')(prisma)
const productOperations = require('../prisma/utils/productOperations')(prisma)



const onServerStart = async () => {

    // fetch database
    const productsExist = await productOperations.findAllProducts();
    // if error occured in fetching database
    if (productsExist.error === true) {
        return console.log(productsExist)
    }


    // get actualized list of products from gql
    const gql_res = await client.request(queries.products)
    // format data
    const fetchedProducts = gql_res.products.edges.map(edge => {
        const { id, bodyHtml, images } = edge.node;

        return {
            id,
            bodyHtml,
            imageUrls: images.nodes.map(image => image.src)
        };
    });


    // update and/or add products to database
    for (const fetchedProduct of fetchedProducts) {

        // find each product by shopify_id
        const existingProduct = await productOperations.findProductByShopifyId(fetchedProduct.id)

        // in case of error it is possible to handle or set up logger here
        if (existingProduct.error === true) {
            console.log(existingProduct)
            return
        }

        // if product already exist
        if (existingProduct.data) {
            updateProduct(existingProduct.data.id, fetchedProduct)
        } else {
            addProduct(fetchedProduct)
        }

    }
}

const addProduct = async (fetchedProduct) => {

    console.log(`Adding ${fetchedProduct.id}`)

    // initialize product
    const newProduct = await productOperations.addProductToDb(fetchedProduct.id, fetchedProduct.bodyHtml)

    // in case of error it is possible to handle or set up logger here
    if (newProduct.error === true) {
        console.log(newProduct)
        return
    }

    // create images linked to this product
    for (const imageUrl of fetchedProduct.imageUrls) {

        const addedImage = await imageOperations.addImageToDb(imageUrl, newProduct.data.id)
        if (addedImage.error === true) {
            console.log(addedImage)
            return
        }
    }

}


const updateProduct = async (product_id, fetchedProduct) => {

    console.log(`Updating ${product_id}`)

    // for convenience
    const image_list = fetchedProduct.imageUrls
    const shopify_id = fetchedProduct.id
    const body_html = fetchedProduct.bodyHtml

    // update existing product
    const updatedProduct = await productOperations.updateExistingProduct(product_id, shopify_id, body_html)
    if (updatedProduct.error === true) {
        console.log(updatedProduct)
        return
    }

    // for each fetched image from graphql
    for (const fetchedImage in image_list) {

        const photoUrlExist = await imageOperations.findPhotoByUrl(fetchedImage.url)
        if (photoUrlExist.error === true) {
            console.log(photoUrlExist)
            return
        }

        if (!photoUrlExist.data) {
            const addedImage = await imageOperations.addImageToDb(fetchedImage.url, product_id)
            if (addedImage.error === true) {
                console.log(addedImage)
                return
            }
        }
    }

}

module.exports = onServerStart;