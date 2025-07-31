const mongoose = require('mongoose');

const loanRequestSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  userType: { type: String, enum: ['Docente', 'Estudiante'], required: true },
  bookTitle: { type: String, required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date }, // puede ser null si se activa fecha automática
  useAutoDate: { type: Boolean, default: true },
  status: {
    type: String,
    enum: ['pendiente', 'rechazada', 'aprobada'],
    default: 'pendiente'
  }
});

module.exports = mongoose.model('LoanRequest', loanRequestSchema);
