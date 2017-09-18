"use strict";

const xhr 	= require('./xhr.js');

// set up 'initializer' - load food items
function initializer() {
	// xhr.loadFoodItems(data.whenFoodItemsLoad, data.errorFunction);
	xhr.loadFoodItems();
}

module.exports = {initializer};