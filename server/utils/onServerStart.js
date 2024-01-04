const { client } = require('../api/graphqlClient')
const queries = require('../api/queries')
const regexp = require('./regexp')
const prisma = require('../prisma/prismaClient')

const getProducts = async () => {
    try {
        const productsExist = await prisma.product.findMany();
        return { "error": false, "data": productsExist }
    } catch (error) {
        return { "error": true, "data": error }
    }
}

const onServerStart = async () => {

    const productsExist = await getProducts();

    // if error occured
    if (productsExist.error === true) {
        return console.log(productsExist)
    }

    // if there are no products in database
    if (productsExist.data.length === 0) {

        // fetch products
        const gqlres = await client.request(queries.products)

        // format data
        const products = gqlres.products.edges.map(edge => {
            const { id, bodyHtml, images } = edge.node;

            // clean up urls from bodyHtml 
            const _bodyHtml = regexp.removeImageUrls(bodyHtml)

            return {
                id,
                _bodyHtml,
                imageUrls: images.nodes.map(image => image.src)
            };
        });


        const addedProducts = []

        // add data to database
        for (const product of products) {
            try {

                // initialize product
                const newProduct = await prisma.product.create({
                    data: {
                        shopify_id: product.id,
                        bodyHtml: product._bodyHtml,
                    }
                })

                // create images linked to this product
                for (const imageUrl of product.imageUrls) {
                    await prisma.image.create({
                        data: {
                            url: imageUrl,
                            productId: newProduct.id
                        }
                    });
                }

                addedProducts.push({ product_id: newProduct.id })
            } catch (error) {
                console.log(error)
            }
        }

        return console.log('Products added', addedProducts)
    }

    return console.log('Database already have products')
}

module.exports = onServerStart;