const { CompanyGallery } = require('../../db');
const cloudinaryService = require('../../middlewares/cloudinaryService');

const deleteImage = async(id) => {
    try {
        const imageFound = await CompanyGallery.findByPk(id);
        if( !imageFound ) {
            throw new Error('Image not found');
        }
        const deletedImage = await CompanyGallery.destroy({
            where: {
                id
            },
            //force: true,
            
        });
        await cloudinaryService.deleteImageFromCloudinary(imageFound.publicId);

        return deletedImage;

    } catch (error) {
        throw new Error('Failed to delete image: ' + error.message);
    }
}
module.exports = deleteImage;