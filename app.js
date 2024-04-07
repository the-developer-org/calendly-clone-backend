// Importing express
const express = require('express');

// Importing middlewares
const cors = require('cors');
const helmet = require('helmet');

// importing database
const { connectDb } = require('./config/database');

// Imnporting routes
const authRoutes = require('./routes/authRoute');

// importing error handelers
const { errorHandler } = require('./middlewares/error');
const ApiError = require('./util/ApiError');
const { NOT_FOUND } = require('./util/errorMessages');

const app = express();

connectDb();

// Applying middlewares
app.use(cors());
app.use(helmet());
app.use(express.json());

// applying routes
app.use('/auth', authRoutes);

app.use('*', (req, res, next) => {
  const { code, message, name } = NOT_FOUND;
  next(new ApiError(code, message, name));
});

app.use(errorHandler);

module.exports = app;
