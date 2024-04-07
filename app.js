const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connectDb } = require('./config/database');
const authRoutes = require('./routes/authRoute');
const { errorHandler } = require('./middlewares/error');
const ApiError = require('./util/ApiError');
const { NOT_FOUND } = require('./util/errorMessages');

const app = express();

connectDb();

app.use(cors());
app.use(helmet());
app.use(express.json());

app.use('/auth', authRoutes);

app.use('*', (req, res, next) => {
  const { code, message, name } = NOT_FOUND;
  next(new ApiError(code, message, name));
});

app.use(errorHandler);

module.exports = app;
