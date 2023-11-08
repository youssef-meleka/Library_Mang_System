const Sequelize = require('sequelize');

const bookSchema = {
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  isbn: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  availableQuantity: {
    type: Sequelize.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  shelfLocation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

const Book = sequelize.define('Book', bookSchema);

//One-to-one relationship between Book and BorrowingHistory
Book.hasOne(BorrowingHistory);

//Many-to-many relationship between Book and Borrower
Book.belongsToMany(Borrower, {
  through: 'BorrowingHistory',
});

module.exports = Book;
