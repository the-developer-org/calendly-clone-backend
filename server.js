// Importing express
const express = require('express');
require('dotenv').config();

// Imnporting routes
const authRoutes = require('./routes/authRoute');

// Importing middlewares
const cors = require('cors');
const bodyParser = require('body-parser');

// importing db
const database = require('./database/database');

const app = express();

// Applying middlewares
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// applying routes
app.use('/auth', authRoutes);

// when a random route is inputed
app.use('*', (req, res) => {
  res.status(500).send({ message: 'Route is not present' });
});

// associtaions

// sync database and listen
database
  .sync
  // { force: true }
  ()
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('App Started ..');
    });
  })
  .catch((err) => console.log(err));
