// Importing express
const express = require('express');

// Imnporting routes
const authRoutes = require('./routes/authRoute');

// Importing middlewares
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const { errorHandler } = require('./middlewares/error');

// impporting error message
const { NOT_FOUND } = require('./util/errorMessages');

// importing api error function
const ApiError = require('./util/ApiError');

// importing db
const { connectDb } = require('./config/database');

const app = express();

connectDb();

// Applying middlewares
app.use(cors());
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// applying routes
app.use('/auth', authRoutes);

app.use((req, res, next) => {
  const { code, name, message } = NOT_FOUND;
  next(new ApiError(code, message, name));
});
app.use(errorHandler);

// exports
module.exports = app;
