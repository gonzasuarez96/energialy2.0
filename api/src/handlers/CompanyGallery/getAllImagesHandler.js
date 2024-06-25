const { getAllImage } = require('../../controllers/GalleryController/getAllImages');
const { getImageById } = require('../../controllers/GalleryController/getImageById');
const { CompanyGallery } = require('../../db');

const getImagesHandler = async (req, res) => {
    const { id } = req.params;

    try {
        if (await isCompanyId(id)) {
            const results = await getAllImage(id);
            res.status(200).json(results);
        } else {
            const imageById = await getImageById(id);
            res.status(200).json(imageById);
        }
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const isCompanyId = async (id) => {
    const companyExists = await CompanyGallery.findOne({
        where: { companyId: id },
    });
    return !!companyExists; // Devuelve true si existe una compañía con ese ID, false en caso contrario
};

module.exports = getImagesHandler;
