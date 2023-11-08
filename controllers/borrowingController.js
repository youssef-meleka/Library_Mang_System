const express = require('express');
const BorrowingHistory = require('../models/BorrowingHistory');

const router = express.Router();

router.post('/checkout/:bookId/:borrowerId', async (req, res) => {
  // Check if the book is already checked out
  const existingBorrowingHistory = await BorrowingHistory.findOne({
    bookId: req.params.bookId,
    returnDate: null,
  });

  if (existingBorrowingHistory) {
    res.status(400).send({ message: 'Book is already checked out' });
    return;
  }

  // Create a new borrowing history record
  const newBorrowingHistory = await BorrowingHistory.create({
    bookId: req.params.bookId,
    borrowerId: req.params.borrowerId,
    checkoutDate: new Date(),
    // Calculate the due date based on the library's lending policy - found it online
    dueDate: addDays(new Date(), libraryConfig.lendingPeriod),
  });

  // Update the book's availability to 'checked out'
  await Book.findByIdAndUpdate(req.params.bookId, {
    isAvailable: false,
  });

  res.status(200).send({ message: 'Book checked out successfully' });
});

module.exports = router;
