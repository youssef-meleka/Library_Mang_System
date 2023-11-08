const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

router.get('/', async (req, res) => {
  // Get all books from the database
  const books = await Book.findAll();
  res.send(books);
});

router.post('/', async (req, res) => {
  // Create a new book from the request body
  const book = await Book.create(req.body);
  res.send(book);
});

router.put('/:id', async (req, res) => {
  // Find the book to update
  const book = await Book.findByPk(req.params.id);

  // Update the book with the new data from the request body
  book.set(req.body);
  await book.save();

  res.send(book);
});

router.delete('/:id', async (req, res) => {
  // Find the book to delete
  const book = await Book.findByPk(req.params.id);

  // Delete the book from the database
  await book.destroy();

  res.send({ message: 'Book deleted successfully' });
});

module.exports = router;
