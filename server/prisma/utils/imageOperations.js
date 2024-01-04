module.exports = (prisma) => {
    const addImageToDb = async (_imageUrl, _productId) => {
        try {
            const addedImage = await prisma.image.create({
                data: {
                    url: _imageUrl,
                    productId: _productId
                }
            });
            return { "error": false, "data": addedImage }
        } catch (error) {
            return { "error": true, "data": error }
        }
    };

    const findPhotoByUrl = async (_imageUrl) => {
        try {
            const photoUrlExist = await prisma.image.findFirst({ where: { url: _imageUrl } })
            return { "error": false, "data": photoUrlExist }
        } catch (error) {
            return { "error": true, "data": error }
        }
    };

    return {
        addImageToDb,
        findPhotoByUrl
    };
};
