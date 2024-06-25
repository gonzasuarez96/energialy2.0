const { CompanyGallery } = require('../../db'); 

// Controlador para obtener el número de imágenes actuales de una compañía
const getImageCount = async (companyId) => {
  try {
console.log(companyId);
    const count = await CompanyGallery.count({ where: { companyId } });
   return count
  } catch (error) {
    throw new Error('Error al obtener el número de imágenes: ' + error.message);
  }
};

module.exports = { getImageCount };