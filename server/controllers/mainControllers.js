const prisma = require('../prisma/prismaClient')
const productOperations = require('../prisma/utils/productOperations')(prisma)

const ApiError = require('../utils/ApiError')

exports.fetchProducts = async (req, res) => {

    // fetch all products with images
    const products = await productOperations.findAllProductsWithImages();

    if (products.error === true) {
        throw new ApiError(500, products.data)
    }

    // delete database related info from images and leave only urls
    const productsWithImageUrls = products.data.map(product => {
        return {
            ...product,
            images: product.images.map(image => image.url)
        }
    })

    return res.json(productsWithImageUrls);

};
