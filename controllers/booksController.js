const express = require('express');
const Book = require('../models/Book');

const router = express.Router();

router.get('/', async (req, res) => {
  const books = await Book.find();
  res.send(books);
});

router.post('/', async (req, res) => {
  const book = new Book(req.body);
  await book.save();
  res.send(book);
});

router.put('/:id', async (req, res) => {
  const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.send(book);
});

router.delete('/:id', async (req, res) => {
  await Book.findByIdAndDelete(req.params.id);
  res.send({ message: 'Book deleted successfully' });
});

module.exports = router;
