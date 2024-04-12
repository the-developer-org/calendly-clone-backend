const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const { connectDb } = require('./config/database');
const { errorHandler } = require('./middlewares/error');
const ApiError = require('./util/ApiError');
const { NOT_FOUND } = require('./util/errorMessages');
const relations = require('./relations/relations');

const authRoutes = require('./routes/authRoute');
const eventRoutes = require('./routes/eventRoutes');
const slotRoutes = require('./routes/slotRoutes');
const app = express();

relations();
connectDb();
app.use(
  cors({
    origin:['https://calendly-clone-backend-vvat.vercel.app','https://661942e114a1d127408c42b6--sharpener-eventify.netlify.app/']
  })
);
app.use(helmet());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/event', eventRoutes);
app.use('/slot', slotRoutes);
app.use('*', (req, res, next) => {
  const { code, message, name } = NOT_FOUND;
  next(new ApiError(code, message, name));
});

app.use(errorHandler);

module.exports = app;
