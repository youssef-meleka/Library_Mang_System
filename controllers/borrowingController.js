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

router.post('/return/:bookId/:borrowerId', async (req, res) => {
  // Check if the book is currently checked out to the specified borrower
  const borrowingHistory = await BorrowingHistory.findOne({
    bookId: req.params.bookId,
    borrowerId: req.params.borrowerId,
    returnDate: null,
  });

  if (!borrowingHistory) {
    res.status(400).send({ message: 'Book is not checked out' });
    return;
  }

  // Update the borrowing history record with the return date
  borrowingHistory.returnDate = new Date();
  await borrowingHistory.save();

  res.send({ message: 'Book returned successfully' });
});

router.get('/borrowedBooks/:borrowerId', async (req, res) => {
  // Get all borrowing history records for the specified borrower where the return date is null
  const borrowingHistories = await BorrowingHistory.find({
    borrowerId: req.params.borrowerId,
    returnDate: null,
  });

  const borrowedBooks = borrowingHistories.map((borrowingHistory) => ({
    bookId: borrowingHistory.bookId,
    checkoutDate: borrowingHistory.checkoutDate,
    dueDate: borrowingHistory.dueDate,
  }));

  res.send(borrowedBooks);
});

router.get('/overdueBooks', async (req, res) => {
  // Get the current date
  const today = new Date();

  // Get all borrowing history records where the due date is less than or equal to the current date and the return date is null
  const overdueBorrowingHistories = await BorrowingHistory.find({
    dueDate: { $lte: today },
    returnDate: null,
  });

  const overdueBooks = overdueBorrowingHistories.map((borrowingHistory) => ({
    bookId: borrowingHistory.bookId,
    borrowerId: borrowingHistory.borrowerId,
    checkoutDate: borrowingHistory.checkoutDate,
    dueDate: borrowingHistory.dueDate,
  }));

  res.send(overdueBooks);
});


module.exports = router;
