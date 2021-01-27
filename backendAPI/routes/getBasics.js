/* eslint-disable no-console */

/* These basic routes allow the distinct rows of the given
columns to be exposed as an API call */

const express = require('express');

const router = express.Router();
const knex = require('./database');

var SIs = require('./speedIndex');
var sortLIs = SIs.sortLIs;

router.get('/getBrands', (req, res) => {
  knex('Tyre')
    .distinct('brand') // get the distinct values of the brand column
    .then((rows) => {
      const brands = [];
      rows.forEach((row) => {
        brands.push(row.brand); // push each distinct value to the array
      });
      res.status(200).json(brands); // return the array
    });
});

router.get('/getCategories', (req, res) => {
  knex('Tyre')
    .distinct('category')
    .then((rows) => {
      const categories = [];
      rows.forEach((row) => {
        categories.push(row.category);
      });
      res.status(200).json(categories);
    });
});

router.get('/getLoadIndexes', (req, res) => {
  knex('Tyre')
    .distinct('load_index')
    .then((rows) => {
      const loadIndexes = [];
      rows.forEach((row) => {
        loadIndexes.push(row.load_index);
      });
      res.status(200).json(loadIndexes);
    });
});

router.get('/getProfiles', (req, res) => {
  knex('Tyre')
    .distinct('profile')
    .then((rows) => {
      const profiles = [];
      rows.forEach((row) => {
        profiles.push(row.profile);
      });
      res.status(200).json(profiles);
    });
});

router.get('/getRims', (req, res) => {
  knex('Tyre')
    .distinct('rim')
    .then((rows) => {
      const rims = [];
      rows.forEach((row) => {
        rims.push(row.rim);
      });
      res.status(200).json(rims);
    });
});

router.get('/getSpeedIndexes', (req, res) => {
  knex('Tyre')
    .distinct('speed_index')
    .then((rows) => {
      const speedIndexes = [];
      rows.forEach((row) => {
        speedIndexes.push(row.speed_index);
      });
      res.status(200).json(speedIndexes);
    });
});

router.get('/getWidths', (req, res) => {
  knex('Tyre')
    .distinct('width')
    .then((rows) => {
      const widths = [];
      rows.forEach((row) => {
        widths.push(row.width);
      });
      res.status(200).json(widths);
    });
});

module.exports = router;
