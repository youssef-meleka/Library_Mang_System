const Sequelize = require('sequelize');

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

module.exports = Borrower;
