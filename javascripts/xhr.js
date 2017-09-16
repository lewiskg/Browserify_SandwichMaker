"use strict";

const loadFoodItems = (onFoodItemsLoad, onFoodItemsError) => { // pass fxns for load and error
	const foodItems = new XMLHttpRequest();
	foodItems.addEventListener('error',onFoodItemsError);
	foodItems.addEventListener('load',onFoodItemsLoad);
	foodItems.open('GET', '../data/foodStuff.json');
	foodItems.send();
	console.log(foodItems);
};


module.exports = loadFoodItems;