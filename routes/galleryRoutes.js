const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const {
  createFolder,
  uploadImageToFolder,
  getAllFolders
} = require('../controllers/galleryController');

router.post('/carpeta', createFolder);
router.post('/imagen', upload.single('image'), uploadImageToFolder);
router.get('/', getAllFolders);

module.exports = router;