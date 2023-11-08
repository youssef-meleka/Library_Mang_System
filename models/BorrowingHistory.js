const Sequelize = require('sequelize');

const borrowingHistorySchema = {
  bookId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  borrowerId: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  checkoutDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  },
  dueDate: {
    type: Sequelize.DATE,
    allowNull: false,
  },
  returnDate: {
    type: Sequelize.DATE,
    allowNull: true,
  },
};

const BorrowingHistory = sequelize.define('BorrowingHistory', borrowingHistorySchema);

//One-to-one relationship between Book and BorrowingHistory
BorrowingHistory.belongsTo(Book);

//Many-to-one relationship between Borrower and BorrowingHistory
BorrowingHistory.belongsTo(Borrower);


module.exports = BorrowingHistory;
