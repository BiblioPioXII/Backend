const mongoose = require('mongoose');

const repositorySchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  pdfUrl: { type: String, required: true },
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Repository', repositorySchema);
