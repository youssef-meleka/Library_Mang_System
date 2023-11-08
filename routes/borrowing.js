const express = require('express');
const BorrowingController = require('../controllers/BorrowingController');

const router = express.Router();

router.post('/checkout/:bookId/:borrowerId', BorrowingController.checkoutBook);
router.post('/return/:bookId/:borrowerId', BorrowingController.returnBook);
router.get('/borrowedBooks/:borrowerId', BorrowingController.getBorrowedBooks);
router.get('/overdueBooks', BorrowingController.getOverdueBooks);

module.exports = router;
