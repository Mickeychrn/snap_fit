// take a set of query data and remove all records with speed indices less than the required SI
module.exports.sortSIs = function(queryData, reqSI) {
	//let len = Object.keys(queryData.tyres).length;
	const speed_indices = [];
	// using the speed index as the key, add more keys as necessary with its equivalent speed rating
	speed_indices['G'] = 90;
	speed_indices['J'] = 100;
	speed_indices['K'] = 110;
	speed_indices['L'] = 120;
	speed_indices['M'] = 130;
	speed_indices['N'] = 140;
	speed_indices['P'] = 150;
	speed_indices['Q'] = 160;
	speed_indices['R'] = 170;
	speed_indices['S'] = 180;
	speed_indices['SXL'] = 180;
	speed_indices['T'] = 190;
	speed_indices['U'] = 200;
	speed_indices['H'] = 210;
	speed_indices['HV'] = 210;
	speed_indices['HX'] = 210;
	speed_indices['HXL'] = 210;
	speed_indices['V'] = 240;
	speed_indices['v'] = 240;
	speed_indices['VXL'] = 240;
	speed_indices['W'] = 270;
	speed_indices['WX'] = 270;
	speed_indices['WXL'] = 270;
	speed_indices['X'] = 270; 	// check this
	speed_indices['XL'] = 270; 	// check this
	speed_indices['Y'] = 300;
	speed_indices['ZR'] = 240;
	speed_indices['(Y)'] = 300;
	// THESE ARE COMMENTED OUT SO THEY ARENT AFFECTED BY SORTING AT ALL
	//speed_indices[0] = 0;		// speed indices of 0 must not be ignored, as the SI is stored in another field
	//speed_indices[NULL] = 0;	// the entries with NULL, None or Unknown also have the SI stored in another field
	//speed_indices['None'] = 0;
	//speed_indices['Unknown'] = 0;
	speed_indices[100] = 100;
	speed_indices[104] = 104;
	speed_indices[108] = 108;
	speed_indices[86] = 86;
	speed_indices[88] = 88;
	speed_indices[95] = 95;
	

	var val2 = speed_indices[reqSI];
	//console.log(queryData);
	//var QueryData = {};
	//Object.assign(QueryData, queryData); //JSON.parse(queryData);
	//console.log(QueryData);
	var QueryData = queryData;

	//console.log(QueryData.tyres[0]);
	var deletions = 0;
	// loop through and delete records/tyres with speed indexes less than 
	// what is required by the query
	for (var prop in QueryData) { // for every object in the object
		var val1 = speed_indices[QueryData[prop].speed_index];
		if (val1 < val2) {
			deletions+=1;
			delete QueryData[prop]; // remove invalid records
		}
	}

	// remove all the null elements from the delete phase
	var filtered = QueryData.filter(function (el) {
		return el != null;
	});

	//console.log(deletions);
	//var result = JSON.stringify(QueryData);
	return filtered;
}


// call this function after speed index sorting
// DO NOT NEED THIS ANYMORE
module.exports.findCheapest = function (queryData) {
	var QueryData = queryData;

	var smaller = QueryData[0];

	// find the cheapest tyre in the list
	for (var prop in QueryData) {
		var val1 = QueryData[prop].retailPrice;
		if (val1 < smaller.retailPrice) {
			smaller = QueryData[prop];
		}
	}

	 // find the second cheapest tyre in the list (if required)
	 /*
	var smaller2 = QueryData.tyres[0];
	for (var prop in QueryData) {
		var val1 = QueryData.tyres[prop].retailPrice;
		if (!Object.is(QueryData.tyres[prop], smaller)) {
			if (val1 < smaller2.retailPrice) {
				smaller2 = QueryData.tyres[prop];
			}
		}
		
	}*/
	

	var result = smaller;
	return result;
}

// take a set of query data and remove all records with invalid load indices
// - load indices for commercial tyres should be ignored 
// - load indices of 0 should not be ignored
// - if the value is not an INT it is invalid basically

// queryData tyrelist, reqLI required Load index, forCustomer bool (true from order page)
module.exports.sortLIs = function(queryData, reqLI, forCustomer) {

	// do two passes, remove all lower, then remove all commercial (if applicable)
	var QueryData = queryData;
	var deletions = 0;

	// find and remove all tyres with invalid load indexes
	for (var prop in QueryData) { // for every object in the object
		var val1 = QueryData[prop].load_index;

		// if the load index is not a number, it is either a commercial tyre (character string) or an invalid tyre
		if (isNaN(val1)) {
			if (forCustomer) {	// we only want to remove commercial tyres for the customer order queries, 
				delete QueryData[prop]; 	// 													not main dashboard
				deletions+=1;
			} else {	// compare the highest of the two numbers
				var loads = val1.split('/');
				//console.log(loads[0] + ' ' + loads[1] + ' >< ' + reqLI);
				// if both values in the commercial load rating are lower, remove the record
				if (Number(loads[0]) < reqLI && Number(loads[1]) < reqLI) {
					delete QueryData[prop];
					deletions+=1;
				}
			}
		} else { 		// if load index is a number
			val1 = Number(val1);
			if (val1 != 0) { 	// need to keep load indices of 0 in results
				//console.log(val1 + ' >< ' + reqLI);
				if (val1 < reqLI) { // finally if the given load index is higher, remove record
					//console.log(val1 + ' < ' + reqLI);
					delete QueryData[prop]; // remove invalid records
					deletions+=1;
				}
				//console.log(val1 + ' > ' + reqLI);
			}
		}
	}	

	// remove all the null elements from the delete phase
	var filtered = QueryData.filter(function (el) {
		return el != null;
	});

	//console.log(deletions);
	//var result = JSON.stringify(QueryData);
	return filtered;
}

/*  TABLE FOR REFERENCE
	speed_indices['G'] = 90;
	speed_indices['J'] = 100;
	speed_indices['K'] = 110;
	speed_indices['L'] = 120;
	speed_indices['M'] = 130;
	speed_indices['N'] = 140;
	speed_indices['P'] = 150;
	speed_indices['Q'] = 160;
	speed_indices['R'] = 170;
	speed_indices['S'] = 180;
	speed_indices['SXL'] = 180;
	speed_indices['T'] = 190;
	speed_indices['U'] = 200;
	speed_indices['H'] = 210;
	speed_indices['HV'] = 210;
	speed_indices['HX'] = 210;
	speed_indices['HXL'] = 210;
	speed_indices['V'] = 240;
	speed_indices['VXL'] = 240;
	speed_indices['W'] = 270;
	speed_indices['W'] = 270;
	speed_indices['W'] = 270;
	speed_indices['X'] = 270; 	// check this
	speed_indices['XL'] = 270; 	// check this
	speed_indices['Y'] = 300;
	speed_indices['ZR'] = 240;
	speed_indices['(Y)'] = 300;
	speed_indices[0] = 300;		// speed indices of 0 must not be ignored, as the SI is stored in another field
	//speed_indices[NULL] = 0;
	speed_indices['None'] = 0;
	speed_indices['Unknown'] = 0;
	speed_indices[100] = 100;
	speed_indices[104] = 104;
	speed_indices[108] = 108;
	speed_indices[86] = 86;
	speed_indices[88] = 88;
	speed_indices[95] = 95;
	];*/