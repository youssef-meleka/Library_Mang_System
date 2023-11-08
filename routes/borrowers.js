const express = require('express');
const BorrowersController = require('../controllers/BorrowersController');

const router = express.Router();

router.get('/', BorrowersController.getAllBorrowers);
router.post('/', BorrowersController.createBorrower);
router.put('/:id', BorrowersController.updateBorrower);
router.delete('/:id', BorrowersController.deleteBorrower);

module.exports = router;
