const Repository = require('../models/Repository');
const cloudinary = require('../config/cloudinary');
const fs = require('fs');

const uploadPDF = async (req, res) => {
  try {
    const { title, author } = req.body;
    const file = req.file;

    if (!file) {
      return res.status(400).json({ error: 'No se envió ningún archivo' });
    }

    // Limpieza del nombre del archivo
    const cleanName = file.originalname
      .replace(/\s+/g, '_')                     // Reemplaza espacios por "_"
      .replace(/[^a-zA-Z0-9_.-]/g, '');          // Elimina caracteres no válidos

    const publicId = `${Date.now()}_${cleanName}`; // Nombre único + extensión .pdf incluida

    // Subida a Cloudinary como archivo RAW
    const result = await cloudinary.uploader.upload(file.path, {
      resource_type: 'raw',
      folder: 'repositorio_pdfs',
      public_id: publicId
    });

    // Crear y guardar documento en MongoDB
    const newPDF = new Repository({
      title,
      author,
      pdfUrl: result.secure_url
    });

    await newPDF.save();

    // Eliminar archivo temporal
    fs.unlinkSync(file.path);

    res.status(201).json({ message: 'PDF subido correctamente', file: newPDF });
  } catch (error) {
    console.error('❌ Error al subir PDF:', error);
    res.status(500).json({ error: 'Error al subir el PDF' });
  }
};

const getAllPDFs = async (req, res) => {
  try {
    const files = await Repository.find().sort({ uploadedAt: -1 });
    res.json(files);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los archivos' });
  }
};

module.exports = { uploadPDF, getAllPDFs };
