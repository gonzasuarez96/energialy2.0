const { CompanyGallery } = require('../../db');

const getImageById = async(id) => {
    try {
        const images = await CompanyGallery.findOne({
           where: { id },
           attributes: { exclude: ['createdAt', 'updatedAt', 'CompanyId'] }
           });
       return images;
      } catch (error) {
        throw new Error('Error al obtener las imágenes de la compañía.: ' + error.message);
      }
}
module.exports = {getImageById};

