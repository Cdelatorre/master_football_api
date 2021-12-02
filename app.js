require('dotenv').config()

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const mongoose = require('mongoose')

require('./config/db.config');
const cors = require('./config/cors.config')

const app = express();
app.use(cors)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

const router = require('./config/routes.js');
app.use('/', router);

app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (error, req, res, next) {
  console.error('-' * 1000)
  console.error(error);

  res.status(error.status || 500);

  const data = {}

  if (error instanceof mongoose.Error.ValidationError) {
    res.status(400);

    for (field of Object.keys(error.errors)) {
      error.errors[field] = error.errors[field].message
    }

    data.errors = error.errors
  } else if (error instanceof mongoose.Error.CastError) {
    error = createError(404, 'Resource not found')
  }

  data.message = error.message;
  res.json(data);
});

const port = normalizePort(process.env.PORT || '3000');
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


function normalizePort(val) {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }

  if (port >= 0) {
    return port;
  }

  return false;
}


module.exports = app