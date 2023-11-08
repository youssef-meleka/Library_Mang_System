const Sequelize = require('sequelize');

const sequelize = new Sequelize('library', 'postgres', 'password', {
  host: 'localhost',
  dialect: 'mysql',
});

// Sync the models with the database
sequelize.sync();

module.exports = sequelize;
