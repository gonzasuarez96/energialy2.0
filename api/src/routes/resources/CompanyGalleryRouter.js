const { Router } = require('express');

const uploadGalleryHandler = require("../../handlers/CompanyGallery/uploadGalleryHandler");
const deleteImage = require("../../handlers/CompanyGallery/deleteImageHandler");
const updateImage = require("../../handlers/CompanyGallery/updateImageHandler");
const getAllImages = require("../../handlers/CompanyGallery/getAllImagesHandler");
const getImageCountHandler = require("../../handlers/CompanyGallery/getImageCountHandler");

const galleryRouter =Router();

galleryRouter.post('/files', uploadGalleryHandler);

galleryRouter.delete('/:id', deleteImage);

galleryRouter.put('/:id', updateImage);

galleryRouter.get('/:id', getAllImages);

galleryRouter.get('/count/:companyId', getImageCountHandler);


module.exports = galleryRouter;
