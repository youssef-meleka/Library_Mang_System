const express = require('express');
const sequelize = require('/sequelize');
const booksRouter = require('./routes/books');
const borrowersRouter = require('./routes/borrowers');
const borrowingRouter = require('./routes/borrowing');

const app = express();

// Connect to the database
sequelize.connect();

// Mount the routes
app.use('/api/books', booksRouter);
app.use('/api/borrowers', borrowersRouter);
app.use('/api/borrowing', borrowingRouter);

// Sync the models with the database
sequelize.sync()
.then(result =>{

  console.log(result);
  // Start the server
  app.listen(3000);

  }).catch (err => {
    console.log(err);

});

