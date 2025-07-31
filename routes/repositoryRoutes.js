const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });

const { uploadPDF, getAllPDFs } = require('../controllers/repositoryController');

router.post('/', upload.single('pdf'), uploadPDF);
router.get('/', getAllPDFs);

module.exports = router;
