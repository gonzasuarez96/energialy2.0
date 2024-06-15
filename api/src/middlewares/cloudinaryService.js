 const cloudinary = require('cloudinary').v2;
const { CLOUD_NAME, CLOUD_API_KEY, CLOUD_API_SECRET } = process.env;

cloudinary.config({
  cloud_name: CLOUD_NAME,
  api_key: CLOUD_API_KEY,
  api_secret: CLOUD_API_SECRET,
});

const handleUpload = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'auto',
    });

    return result;
  } catch (error) {
    throw new Error('Error al cargar la imagen a Cloudinary' + error);
  }
};

const handleUploadFiles = async (files) => {
  try {
    const promises = files.map((file) =>
      cloudinary.uploader.upload(file.path, {
        resource_type: 'auto',
      })
    );

    const results = await Promise.all(promises);
    return results;
  } catch (error) {
    throw new Error('Error al cargar las imágenes a Cloudinary: ' + error);
  }
};

const updateUpload = async (file) => {
  await cloudinary.uploader.upload(file.path, {
    public_id: image.public_id,
    overwrite: true,
  });
};

const deleteImageFromCloudinary = async (id) => {
  try {
  
    const result = await cloudinary.uploader.destroy(id);

    if (result.result === 'ok') {
      
    } else {
     
    }
  } catch (error) {
    console.error('Error al eliminar la imagen de Cloudinary:', error.message);
  }
};

const getAllImagesFromCloudinary = async () => {
  try {
    const result = await cloudinary.search
      .expression('resource_type:image')
      .execute();

    const images = result.resources.map((image) => ({
      asset_id: image.asset_id,
      public_id: image.public_id,
      url: image.url,
      format: image.format,
      width: image.width,
      height: image.height,
      created_at: image.created_at,
    }));

    return images;
  } catch (error) {
    console.error(
      'Error al obtener las imágenes de Cloudinary:',
      error.message
    );
    return [];
  }
};

module.exports = {
  getAllImagesFromCloudinary,
  deleteImageFromCloudinary,
  handleUpload,
  handleUploadFiles,
  updateUpload,
};