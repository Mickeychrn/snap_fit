/* eslint-disable no-console */
const express = require('express');

const router = express.Router();

const knex = require('./database');
var SIs = require('./speedIndex');
var sortSIs = SIs.sortSIs;
var findCheapest = SIs.findCheapest;
var sortLIs = SIs.sortLIs;

// get a list of brands for the NOT IN statement for budget brands
// must be called up here it will be empty for the querybuilder
var brandList = [];
  knex.select('brand').from('Brand')
  .then((rows) => { 
    rows.forEach((row) => {
      brandList.push(row.brand);
    })
    //console.log(brandList);
  });

// This route will allow users to filter results from the database
// conditionally
router.get('/getTyres', (req, res) => {
  // Start with empty arrays for each possible filter
  let brandArray = [];
  let categoryArray = []; 
  let loadIndexArray = [];
  let profileArray = [];
  let rimArray = [];
  let speedIndexArray = [];
  let sortBySI = false;
  let widthArray = [];
  let quantityArray = [];
  let onlyCheapest = false;
  let brandCategoryArray = []; // 1 for Premium, 2 for Value, 3 for Budget
  let forCustomer = false;
  let sortByLI = false;
  

  // If the filter exists in the query
  // Separate out the list for each filter and add them to the given array
  // (Knex query builder accepts an array for .whereIn(...) )
  if (req.query.brand) {
    brandArray = req.query.brand.split(',');
  }
  if (req.query.category) {
    categoryArray = req.query.category.split(',');
  }
  if (req.query.loadIndex) {
    loadIndexArray = req.query.loadIndex.split(',');
    sortByLI = true;

    // if the query is for the customer order, also ignore commercial tyres
    if (req.query.fromCustomer) {
      forCustomer = req.query.fromCustomer;
    }
  }
  if (req.query.profile) {
    profileArray = req.query.profile.split(',');
  }
  if (req.query.rim) {
    rimArray = req.query.rim.split(',');
  }
  if (req.query.speedIndex) {
    speedIndexArray = req.query.speedIndex.split(',');
    sortBySI = true;
  }
  if (req.query.width) {
    widthArray = req.query.width.split(',');
  }
  if (req.query.quantity) {
    //console.log(req.query.quantity);
    onlyCheapest = true;
    quantityArray = req.query.quantity.split(',');
  }
  if (req.query.brandCategory) {
    brandCategoryArray = req.query.brandCategory.split(',');
  }
  

  // Query the database
  knex('Tyre')
    .join('Stock', 'Tyre.tyre_id', '=', 'Stock.tyre_id') // joining stock and tyre
    .modify((queryBuilder) => { // see http://knexjs.org/#Builder-modify
      if (brandCategoryArray.length > 0) { // If the array is not empty
        //console.log(brandCategoryArray[0]);
        if (brandCategoryArray[0] == 3) { // Budget brands are not in the table
          //console.log('budget tyres');
          queryBuilder.whereNotIn('Tyre.brand', brandList);
          // Value brands can only not be in brands table
        } else {
          //console.log('prem/val: ' + brandCategoryArray[0]);
          queryBuilder.join('Brand', 'Tyre.brand', '=', 'Brand.brand') // join brand and tyre
          queryBuilder.andWhere('Brand.category_id', '=', brandCategoryArray[0]); 
          // Prem/Val brands will be in categoryArray
        }
      }
    })
    .modify((queryBuilder) => { // see http://knexjs.org/#Builder-modify
      if (brandArray.length > 0) { // If the array is not empty
        queryBuilder.whereIn('brand', brandArray); // Conditionally add a whereIn
        // for each item in the array
      }
    })
    // THE FOLLOWING .MODIFY THENABLES ARE THE SAME AS ABOVE
    .modify((queryBuilder) => {
      if (categoryArray.length > 0) {
        queryBuilder.whereIn('category', categoryArray);
      }
    })
    // cannot be done here without ignoring values of 0
    /*.modify((queryBuilder) => {
      if (loadIndexArray.length > 0) {
        console.log(loadIndexArray[0]);
        queryBuilder.andWhere('load_index', '>=', loadIndexArray[0]);
      }
    })*/
    .modify((queryBuilder) => {
      if (profileArray.length > 0) {
        queryBuilder.whereIn('profile', profileArray);
      }
    })
    .modify((queryBuilder) => {
      if (rimArray.length > 0) {
        queryBuilder.whereIn('rim', rimArray);
      }
    })
    .modify((queryBuilder) => {
      if (forCustomer) {
        queryBuilder.andWhere('Tyre.retailPrice', '>', 0);
        // prices of 0 can be shown on the database tab, but not for customer queries
      }
    })
    /*.modify((queryBuilder) => { // Speed index sorted afterwards
      if (speedIndexArray.length > 0) {
        queryBuilder.whereIn('speed_index', speedIndexArray);
      }
    })*/
    .modify((queryBuilder) => {
      if (widthArray.length > 0) {
        queryBuilder.whereIn('width', widthArray);
      }
    })
    .modify((queryBuilder) => {
      if (quantityArray.length > 0) {
        queryBuilder.andWhere('Stock.quantity', '>=', quantityArray);
      }
    })
    .then((tyres) => { // Finally send the result back
      //console.log(tyres);
      if (sortBySI) {
        // sort by speed index
        tyres = sortSIs(tyres, speedIndexArray[0]);
      }
      /* sort by price, unnecessary now
      if (onlyCheapest) {
        tyres = findCheapest(tyres);
      }*/
      // sort by LI if given
      if (sortByLI) {
      	if (forCustomer) { // remove commercial tyres if for customer order
      		tyres = sortLIs(tyres, loadIndexArray[0], true);
      	} else { // otherwise sort the commercial tyres by highest rating
      		tyres = sortLIs(tyres, loadIndexArray[0], false);
      	}
      }
      res.status(200).send(
        tyres,
      );
    });
});

module.exports = router;
