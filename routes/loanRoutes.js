const express = require('express');
const router = express.Router();
const {
  createLoanRequest,
  getAllRequests,
  approveRequest,
  getActiveLoans,
  getExpiredLoans,
  renewLoan
} = require('../controllers/loanController');

// Usuarios
router.post('/solicitud', createLoanRequest);

// Admin
router.get('/solicitudes', getAllRequests);
router.post('/aprobar', approveRequest);
router.get('/activos', getActiveLoans);
router.get('/vencidos', getExpiredLoans);
router.put('/renovar', renewLoan);

module.exports = router;
