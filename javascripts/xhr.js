"use strict";

const data = require('./data.js');

function loadFoodItems() { // pass fxns for load and error
	const foodItems = new XMLHttpRequest();
	foodItems.addEventListener('error',data.errorFunction);
	foodItems.addEventListener('load',data.whenFoodItemsLoad);
	foodItems.open('GET', '../data/foodStuff.json');
	foodItems.send();
}


module.exports = {loadFoodItems};