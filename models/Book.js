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

module.exports = Book;
