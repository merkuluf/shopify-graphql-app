const prisma = require('../prisma/prismaClient')

exports.fetchProducts = async (req, res) => {
    try {

        // fetch all products with images
        const products = await prisma.product.findMany({
            include: {
                images: true, 
            }
        });

        // delete database related info from images and leave only urls
        const productsWithImageUrls = products.map(product => {
            return {
                ...product,
                images: product.images.map(image => image.url)
            }
        })

        return res.json(productsWithImageUrls);
    } catch (error) {
        console.error("Error fetching products:", error);
        return res.status(500).send("Error fetching products");
    }
}
