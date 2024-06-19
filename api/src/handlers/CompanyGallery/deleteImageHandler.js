const deleteImage = require("../../controllers/GalleryController/deleteImage");

const deleteImageHandler = async ( req,res ) => {
    const { id } = req.params;
    try { 
        const result = await deleteImage(id);
     res.status(200).json({message: "Imagen eliminada"} );
    } catch (error) {
        res.status(400).json({ message: error.message});
    }
};

module.exports = deleteImageHandler;