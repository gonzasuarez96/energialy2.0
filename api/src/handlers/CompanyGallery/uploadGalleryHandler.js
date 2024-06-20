
const multer = require('multer');
const uploadGallery = require('../../controllers/GalleryController/uploadGallery');
const fs = require('fs-extra');
// Configuración de multer para la carga de archivos
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const fileFilter = function (req, file, cb) {
  if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
    return cb(new Error('Solo se permiten archivos JPG, JPEG y PNG'));
  }
  cb(null, true);
};

const upload = multer({ storage: storage, fileFilter: fileFilter }).array('files');

const uploadGalleryHandler = async (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ error: err.message });
    }

    try {
      const files = req.files;
      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No files uploaded' });
      }

      const { description, companyId } = req.body;
      await uploadGallery(description, companyId, files);
     
       //Eliminar cada archivo después de procesarlo
    for (const file of files) {
      await fs.unlink(file.path);
    }
      res.status(200).json({ message: 'Gallery uploaded successfully' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
};

module.exports = uploadGalleryHandler;