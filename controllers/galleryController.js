const GalleryFolder = require('../models/GalleryFolder');
const cloudinary = require('../config/cloudinary');

// Crear carpeta
const createFolder = async (req, res) => {
  try {
    const { name } = req.body;
    const folder = new GalleryFolder({ name, images: [] });
    await folder.save();
    res.status(201).json({ message: 'Carpeta creada', folder });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear carpeta' });
  }
};

// Subir imagen a carpeta
const uploadImageToFolder = async (req, res) => {
  try {
    const { folderName } = req.body;
    const file = req.file;

    const result = await cloudinary.uploader.upload(file.path, {
      folder: `aulas_ampliadas/${folderName}`
    });

    const folder = await GalleryFolder.findOne({ name: folderName });
    if (!folder) return res.status(404).json({ error: 'Carpeta no encontrada' });

    folder.images.push({ url: result.secure_url, public_id: result.public_id });
    await folder.save();

    res.status(200).json({ message: 'Imagen subida', image: result.secure_url });
  } catch (error) {
    res.status(500).json({ error: 'Error al subir imagen' });
  }
};

// Obtener todas las carpetas
const getAllFolders = async (req, res) => {
  try {
    const folders = await GalleryFolder.find();
    res.json(folders);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener carpetas' });
  }
};

module.exports = { createFolder, uploadImageToFolder, getAllFolders };
