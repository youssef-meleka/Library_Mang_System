const express = require('express');
const Borrower = require('../models/Borrower');

const router = express.Router();

router.get('/', async (req, res) => {
  // Get all borrowers from the database
  const borrowers = await Borrower.findAll();
  res.send(borrowers);
});

router.post('/', async (req, res) => {
  // Create a new borrower from the request body
  const borrower = await Borrower.create(req.body);
  res.send(borrower);
});

router.put('/:id', async (req, res) => {
  // Find the borrower to update
  const borrower = await Borrower.findByPk(req.params.id);

  // Update the borrower with the new data from the request body
  borrower.set(req.body);
  await borrower.save();

  res.send(borrower);
});

router.delete('/:id', async (req, res) => {
  // Find the borrower to delete
  const borrower = await Borrower.findByPk(req.params.id);

  // Delete the borrower from the database
  await borrower.destroy();

  res.send({ message: 'Borrower deleted successfully' });
});

module.exports = router;
