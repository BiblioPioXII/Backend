const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/pdf/:publicId', async (req, res) => {
  const { publicId } = req.params;

  try {
    const cloudinaryUrl = `https://res.cloudinary.com/${process.env.CLOUDINARY_CLOUD_NAME}/raw/upload/${publicId}`;

    const response = await axios.get(cloudinaryUrl, {
      responseType: 'stream',
    });

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline'); // O 'attachment' para descargar

    response.data.pipe(res);
  } catch (error) {
    console.error('❌ Error en el proxy de PDF:', error.message);
    res.status(500).json({ message: 'Error al obtener el PDF desde Cloudinary' });
  }
});

module.exports = router;
