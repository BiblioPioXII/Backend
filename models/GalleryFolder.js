const mongoose = require('mongoose');

const imageSchema = new mongoose.Schema({
  url: String,
  public_id: String
});

const galleryFolderSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  images: [imageSchema]
});

module.exports = mongoose.model('GalleryFolder', galleryFolderSchema);
