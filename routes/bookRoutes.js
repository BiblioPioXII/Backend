const express = require('express');
const router = express.Router();
const {
  createBook,
  getAllBooks,
  getBookByCode,
  getBooksByFilter,
  updateBookStatus,
  deleteBook
} = require('../controllers/bookController');

router.post('/', createBook);
router.get('/', getAllBooks);
router.get('/buscar', getBooksByFilter);
router.get('/:code', getBookByCode);
router.put('/:code', updateBookStatus);
router.delete('/:code', deleteBook);

module.exports = router;
