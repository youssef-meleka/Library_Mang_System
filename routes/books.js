const express = require('express');
const BooksController = require('../controllers/BooksController');

const router = express.Router();

router.get('/', BooksController.getBooks);
router.post('/', BooksController.createBook);
router.put('/:id', BooksController.updateBook);
router.delete('/:id', BooksController.deleteBook);


module.exports = router;
