module.exports = (prisma) => {
    const findProductByShopifyId = async (_shopifyId) => {
        try {
            const productsById = await prisma.product.findFirst({
                where: { shopify_id: _shopifyId }
            });
            return { "error": false, "data": productsById }
        } catch (error) {
            return { "error": true, "data": error }
        }
    };

    const addProductToDb = async (_shopifyId, _bodyHtml) => {
        try {
            const newProduct = await prisma.product.create({
                data: {
                    shopify_id: _shopifyId,
                    bodyHtml: _bodyHtml,
                }
            })
            return { "error": false, "data": newProduct }
        } catch (error) {
            return { "error": true, "data": error }
        }
    };

    const findAllProducts = async () => {
        try {
            const productsExist = await prisma.product.findMany();
            return { "error": false, "data": productsExist }
        } catch (error) {
            return { "error": true, "data": error }
        }
    };

    const updateExistingProduct = async (_productId, _shopifyId, _bodyHtml) => {
        try {
            const updatedProduct = await prisma.product.update({
                where: { id: _productId },
                data: {
                    shopify_id: _shopifyId,
                    bodyHtml: _bodyHtml,
                }
            });
            return { "error": false, "data": updatedProduct }
        } catch (error) {
            return { "error": true, "data": error }
        }
    };

    return {
        findProductByShopifyId,
        addProductToDb,
        findAllProducts,
        updateExistingProduct
    };
};
