const config = {
  development: {
    port: process.env.DEV_PORT || 3000,
    dbName: process.env.DB_NAME_DEV,
    dbUserName: process.env.DB_USERNAME_DEV,
    dbPassword: process.env.DB_PASSWORD_DEV,
    dbHost: process.env.DB_HOST_DEV,
    jwt_secret: process.env.JWT_SECRET_DEV,
  },
  production: {
    port: process.env.PROD_PORT,
    dbName: process.env.DB_NAME_PROD,
    dbUserName: process.env.DB_USERNAME_PROD,
    dbPassword: process.env.DB_PASSWORD_PROD,
    dbHost: process.env.DB_HOST_PROD,
  },
};

module.exports =
  process.env.NODE_ENV === 'production'
    ? config.production
    : config.development;
