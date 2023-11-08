const express = require('express');
const mongoose = require('./mongoose');
const routes = require('./routes');

const app = express();

mongoose.connect();

app.use('/api', routes);

app.listen(3000, () => {
  console.log('Server listening on port 3000');
});
