const { CompanyGallery } = require('../../db');

const updateImage = async(id, description) => {
    try {
          
    const imageFound = await CompanyGallery.findByPk(id);
   
    if (!imageFound) {

        throw new Error('La imagen no fue encontrada');
                }

                imageFound.description = description;
                await imageFound.save();
                return imageFound;

    } catch (error) {
        throw new Error('Failed to update image: ' + error.message);
    }
}
module.exports = updateImage;