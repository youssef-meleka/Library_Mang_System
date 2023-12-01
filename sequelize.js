const Sequelize = require('sequelize');

const sequelize = new Sequelize('library-sys', 'postgres', 'root', {
  host: 'localhost',
  dialect: 'postgres',
});

module.exports = sequelize;
