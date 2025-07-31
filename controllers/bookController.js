const Book = require('../models/Book');

// Crear nuevo libro
const createBook = async (req, res) => {
  try {
    const newBook = new Book(req.body);
    await newBook.save();
    res.status(201).json({ message: 'Libro creado', book: newBook });
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el libro' });
  }
};

// Obtener todos los libros
const getAllBooks = async (req, res) => {
  try {
    const books = await Book.find().sort({ title: 1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los libros' });
  }
};

// Obtener libro por código
const getBookByCode = async (req, res) => {
  try {
    const book = await Book.findOne({ code: req.params.code });
    if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json(book);
  } catch (error) {
    res.status(500).json({ error: 'Error al buscar el libro' });
  }
};

// Filtrar por autor, género, título
const getBooksByFilter = async (req, res) => {
  try {
    const { author, genre, title } = req.query;
    const query = {};
    if (author) query.author = { $regex: author, $options: 'i' };
    if (genre) query.genre = { $regex: genre, $options: 'i' };
    if (title) query.title = { $regex: title, $options: 'i' };

    const books = await Book.find(query).sort({ title: 1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ error: 'Error al filtrar libros' });
  }
};

// Cambiar estado del libro (prestado/disponible)
const updateBookStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const book = await Book.findOneAndUpdate(
      { code: req.params.code },
      { status },
      { new: true }
    );
    if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json({ message: 'Estado actualizado', book });
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar estado' });
  }
};

// Eliminar libro
const deleteBook = async (req, res) => {
  try {
    const book = await Book.findOneAndDelete({ code: req.params.code });
    if (!book) return res.status(404).json({ error: 'Libro no encontrado' });
    res.json({ message: 'Libro eliminado' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el libro' });
  }
};

module.exports = {
  createBook,
  getAllBooks,
  getBookByCode,
  getBooksByFilter,
  updateBookStatus,
  deleteBook
};
