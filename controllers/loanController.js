const LoanRequest = require('../models/LoanRequest');
const Loan = require('../models/Loan');
const Book = require('../models/Book');

// Enviar solicitud de préstamo
const createLoanRequest = async (req, res) => {
  try {
    const request = new LoanRequest(req.body);
    if (request.useAutoDate) {
      const end = new Date(request.startDate);
      end.setDate(end.getDate() + 15);
      request.endDate = end;
    }
    await request.save();
    res.status(201).json({ message: 'Solicitud enviada', request });
  } catch (error) {
    res.status(500).json({ error: 'Error al enviar solicitud' });
  }
};

// Obtener todas las solicitudes
const getAllRequests = async (req, res) => {
  try {
    const requests = await LoanRequest.find().sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener solicitudes' });
  }
};

// Aprobar solicitud y crear préstamo
const approveRequest = async (req, res) => {
  const { requestId, bookCode } = req.body;

  try {
    const request = await LoanRequest.findById(requestId);
    if (!request) return res.status(404).json({ error: 'Solicitud no encontrada' });

    const book = await Book.findOne({ code: bookCode });
    if (!book || book.status !== 'disponible') {
      return res.status(400).json({ error: 'Libro no disponible o no encontrado' });
    }

    const newLoan = new Loan({
      name: request.name,
      email: request.email,
      userType: request.userType,
      bookCode,
      bookTitle: request.bookTitle,
      startDate: request.startDate,
      endDate: request.endDate
    });

    await newLoan.save();
    await Book.updateOne({ code: bookCode }, { status: 'prestado' });
    await LoanRequest.findByIdAndUpdate(requestId, { status: 'aprobada' });

    res.json({ message: 'Préstamo aprobado', loan: newLoan });
  } catch (error) {
    res.status(500).json({ error: 'Error al aprobar solicitud' });
  }
};

// Obtener préstamos activos
const getActiveLoans = async (req, res) => {
  try {
    const loans = await Loan.find().sort({ endDate: 1 });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener préstamos' });
  }
};

// Obtener préstamos vencidos
const getExpiredLoans = async (req, res) => {
  try {
    const today = new Date();
    const loans = await Loan.find({ endDate: { $lt: today } });
    res.json(loans);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener vencidos' });
  }
};

// Renovar préstamo
const renewLoan = async (req, res) => {
  const { bookCode, newEndDate } = req.body;

  try {
    const loan = await Loan.findOne({ bookCode });
    if (!loan) return res.status(404).json({ error: 'Préstamo no encontrado' });

    loan.endDate = new Date(newEndDate);
    await loan.save();

    res.json({ message: 'Préstamo renovado', loan });
  } catch (error) {
    res.status(500).json({ error: 'Error al renovar préstamo' });
  }
};

module.exports = {
  createLoanRequest,
  getAllRequests,
  approveRequest,
  getActiveLoans,
  getExpiredLoans,
  renewLoan
};
