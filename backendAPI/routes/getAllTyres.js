const express = require('express');

const router = express.Router();


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

router.get('/getAllTyres', (req, res) => {
  knex
    .select('*')
    .from('Tyre')
    .innerJoin('Stock', 'Tyre.tyre_id', '=', 'Stock.tyre_id')
    .orderBy('Tyre.retailPrice')
    .then((collection) => {
      res.status(200).json({
        error: false,
        data: collection,
      });
    });
});

module.exports = router;
