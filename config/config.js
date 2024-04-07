const config = {
  development: {
    port: process.env.DEV_PORT || 3000,
    database: {
      name: process.env.DB_NAME_DEV,
      username: process.env.DB_USERNAME_DEV,
      password: process.env.DB_PASSWORD_DEV,
      host: process.env.DB_HOST_DEV,
    },
    jwt_secret: process.env.JWT_SECRET_DEV,
  },
  production: {
    port: process.env.PROD_PORT,
    database: {
      name: process.env.DB_NAME_PROD,
      username: process.env.DB_USERNAME_PROD,
      password: process.env.DB_PASSWORD_PROD,
      host: process.env.DB_HOST_PROD,
    },
    jwt_secret: process.env.JWT_SECRET_PROD,
  },
};

module.exports =
  process.env.NODE_ENV === 'production'
    ? config.production
    : config.development;
