const Sequelize = require('sequelize');

const sequelize = new Sequelize('library-scheme', 'root', 'root', {
  host: 'localhost',
  dialect: 'mysql',
});

module.exports = sequelize;
