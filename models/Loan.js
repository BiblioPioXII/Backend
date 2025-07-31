const mongoose = require('mongoose');

const loanSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userType: { type: String, enum: ['Docente', 'Estudiante'], required: true },
  bookCode: { type: String, required: true },
  bookTitle: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true }
});

module.exports = mongoose.model('Loan', loanSchema);
