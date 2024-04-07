const { Sequelize } = require('sequelize');
const pg = require('pg');
const config = require('../config/config');

const { Logger } = require('./logger');
const moment = require('moment');

const database = new Sequelize(
  config.dbName,
  config.dbUserName,
  config.dbPassword,
  {
    dialect: 'postgres',
    host: config.dbHost,
    logging: false,
    dialectModule: pg,
  }
);

const connectDb = async () => {
  try {
    await database.sync();
    const serverStartTime = moment().format();
    Logger.log('info', {
      message: `Database successfully conected on ${serverStartTime}`,
    });
  } catch (error) {
    Logger.log('error', {
      errorCode: 'POSTGRESERROR',
      message: 'Error while connecting to Postgres server',
      source: 'postgres',
      reason: 'connection_failure',
      stack: error.stack,
    });
  }
};

module.exports = { connectDb, database };
