const express = require("express");
const { insertPhoto, deletePhoto, getAllPhotos, getUserPhotos, getPhotoById } = require("../controllers/PhotoController");
const router = express.Router();

const authGuard = require("../middlewares/authGuard");
const validate = require("../middlewares/handleValidation");
const { imageUpload } = require("../middlewares/imageUpload");
const { photoInsertValiadtion } = require("../middlewares/photoValidation");




router.post('/', authGuard, imageUpload.single("image"), photoInsertValiadtion(), validate, insertPhoto);
router.delete('/:id', authGuard, deletePhoto);
router.get('/', authGuard, getAllPhotos);
router.get('/users/:id', authGuard, getUserPhotos);
router.get('/:id', authGuard, getPhotoById);



module.exports = router;