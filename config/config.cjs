const dotenv = require('dotenv');

dotenv.config();

const {
  DB_HOST,
  DB_PORT,
  DB_USERNAME,
  DB_PASSWORD,
  DB_NAME
} = process.env;

const dbCredentials = {
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  host: DB_HOST,
  port: DB_PORT,
};

const dialectConfig = {
  dialect: 'postgres',
  dialectOptions: {
    ssl: true
  }
};

module.exports = {
  development: {
    ...dbCredentials,
    ...dialectConfig,
  },
  test: {
    ...dbCredentials,
    ...dialectConfig,
  },
  production: {
    ...dbCredentials,
    ...dialectConfig,
  }
};
