const Sequelize = require('sequelize');
const sequelize = require('./sequelize');

const borrowerSchema = {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  registeredDate: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.fn('NOW'),
  },
};

const Borrower = sequelize.define('Borrower', borrowerSchema);

//Many-to-one relationship between Borrower and BorrowingHistory
Borrower.hasMany(BorrowingHistory);

//Many-to-many relationship between Book and Borrower
Borrower.belongsToMany(Book, {
  through: 'BorrowingHistory',
});

module.exports = Borrower;
