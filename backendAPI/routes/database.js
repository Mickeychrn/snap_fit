// Database object setup
const knex = require('knex')({
  client: 'mssql',
  connection: {
    server: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE,
    options: {
      port: 1433,
      database: process.env.DB_DATABASE,
      encrypt: true, // mandatory for microsoft azure sql server
    },
  },
});

module.exports = knex;
