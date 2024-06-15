const { CompanyGallery } = require('../../db');

const getAllImage = async(companyId) => {
 
    try {
      const imagesAllCompany = await CompanyGallery.findAll({
         where: { companyId },
         attributes: { exclude: ['createdAt', 'updatedAt', 'CompanyId'] }
        });
      return (imagesAllCompany);
    } catch (error) {
      throw new Error('Error al obtener las imágenes de la compañía.: ' + error.message);
    }
}
module.exports = {getAllImage};
