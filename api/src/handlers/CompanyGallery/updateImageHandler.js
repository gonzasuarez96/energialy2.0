const updateImage = require('../../controllers/GalleryController/updateImage');

const updateImageHandler = async ( req, res ) => {
    try {
      const { id } = req.params;   
      const {description} = req.body;
        
      const resultUpdateProject = await updateImage(id, description);
      res.status(200).json(resultUpdateProject)
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

module.exports = updateImageHandler;