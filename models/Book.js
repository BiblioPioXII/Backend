const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  author: { type: String },
  publisher: { type: String },
  genre: { type: String },
  status: {
    type: String,
    enum: ['disponible', 'prestado'],
    default: 'disponible'
  }
});

module.exports = mongoose.model('Book', bookSchema);
