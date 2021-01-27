/* eslint-disable no-console */
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

router.get('/getTyreSizes', (req, res) => { // ???
  try { // To upload image and data
    const dataQuery = {};

    // Upload form data (text) to the database
    if (req.body.width) { // If width is present, add to the data object
      dataQuery.width = req.body.width;
    }
    if (req.body.profile) { // If profile is present, add to the data object
      dataQuery.profile = req.body.profile;
    }
    if (req.body.rim) { // If rim is present, add to the data object
      dataQuery.rim = req.body.rim;
    }
    if (req.body.speedInd) { // If speed index is present, add to the data object
      dataQuery.speedInd = req.body.speedInd;
    }
    if (req.body.loadInd) { // If load index is present, add to the data object
      dataQuery.loadInd = req.body.loadInd;
    }

    if (req.body.reqStock) {
      dataQuery.stock = req.body.reqStock; // For when stock is added to search
    }

    if (req.body.category) {
      dataQuery.category = req.body.category; // search for premium, budget or value brand tyres
    }

    // As we cannot sort by speed index with knex/using a query, must sort the result, and because
    // of the way brand categories are defined, probably best to split the result using 3 queries
    // for each brand category
    switch (req.body.category) {
      case 1: // get premium tyres
        console.log('case 1');
        knex
          .select('Tyre.*', 'Stock.quantity', 'Brand.brand')
          .from('Tyre')
          .innerJoin('Tyre', 'Tyre.brand', '=', 'Brand.brand') // filter specific brands
          .innerJoin('Tyre', 'Tyre.tyre_id', '=', 'Stock.tyre_id') // match tyre_ids for stock levels
          .where('Brand.category_id', 1) // select only premium tyres
          .andWhere('Stock.quantity', '>=', dataQuery.stock) // must have enough tyres in stock
          .andWhere('Tyre.width', dataQuery.width)
          .andWhere('Tyre.profile', dataQuery.profile)
          .andWhere('Tyre.rim', dataQuery.rim)
          .andWhere('Tyre.load_index', '>', dataQuery.loadInd) // need to sort tyres based on speed index as well
          .orderBy('Tyre.retailPrice') // order by cheapest price
          .then((collection) => {
            console.log(collection);
            res.json({
              error: false,
              data: collection,
            });
          });

        break;

      case 2: // get value tyres
        console.log('case 2');
        knex
          .select('Tyre.*', 'Stock.quantity', 'Brand.brand')
          .from('Tyre')
          .innerJoin('Tyre', 'Tyre.brand', '=', 'Brand.brand') // filter specific brands
          .innerJoin('Tyre', 'Tyre.tyre_id', '=', 'Stock.tyre_id') // match tyre_ids for stock levels
          .where('Brand.category_id', 2) // select only premium tyres
          .andWhere('Stock.quantity', '>=', dataQuery.stock) // must have enough tyres in stock
          .andWhere('Tyre.width', dataQuery.width)
          .andWhere('Tyre.profile', dataQuery.profile)
          .andWhere('Tyre.rim', dataQuery.rim)
          .andWhere('Tyre.load_index', '>', dataQuery.loadInd) // need to sort tyres based on speed index as well
          .orderBy('Tyre.retailPrice') // order by cheapest price
          .then((collection) => {
            console.log(collection);
            res.json({
              error: false,
              data: collection,
            });
          });

        break;

      case 3: // get budget tyres
        console.log('case 3');
        knex
          .select('Tyre.*', 'Stock.quantity')
          .from('Tyre')
          .innerJoin('Tyre', 'Tyre.tyre_id', '=', 'Stock.tyre_id') // match tyre_ids for stock levels
          .whereNotIn('Tyre.brand', knex.select('*').from('Brand')) // budget tyres brands are not in the brand table
          .andWhere('Stock.quantity', '>=', dataQuery.stock) // must have enough tyres in stock
          .andWhere('Tyre.width', dataQuery.width)
          .andWhere('Tyre.profile', dataQuery.profile)
          .andWhere('Tyre.rim', dataQuery.rim)
          .andWhere('Tyre.load_index', '>', dataQuery.loadInd) // need to sort tyres based on speed index as well
          .orderBy('Tyre.retailPrice') // get cheapest price
          // .limit(2) if cant sort by speed index in query cant limit record count
          .then((collection) => {
            console.log(collection);
            res.json({
              error: false,
              data: collection,
            });
          });

        break;

      default: // no value specified/this should not happen
        console.log('case default');
        knex
          .select('Tyre.*', 'Stock.quantity', 'Brand.brand')
          .from('Tyre')
          .innerJoin('Tyre', 'Tyre.brand', '=', 'Brand.brand') // filter specific brands
          .innerJoin('Tyre', 'Tyre.tyre_id', '=', 'Stock.tyre_id') // match tyre_ids for stock levels
          .where('Brand.category_id', 1) // select only premium/budget tyres
          // .whereNotIn('Tyre.brand', knex.select('*').from('Brand')) // for value/budget
          .andWhere('Stock.quantity', '>=', dataQuery.stock) // must have enough tyres in stock
          .andWhere('Tyre.width', dataQuery.width)
          .andWhere('Tyre.profile', dataQuery.profile)
          .andWhere('Tyre.rim', dataQuery.rim)
          .andWhere('Tyre.load_index', '>', dataQuery.loadInd) // need to sort tyres based on speed index as well
          .orderBy('Tyre.retailPrice') // get cheapest price
          // .limit(2) if cant sort by speed index in query cant limit record count
          .then((collection) => {
            console.log(collection);
            res.json({
              error: false,
              data: collection,
            });
          });
    }
  } catch (err) { // Catch error for the try block
    res.status(500).json({
      error: 'There seems to have been a problem.',
    });
  }
});

module.exports = router;
