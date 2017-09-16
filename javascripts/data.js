"use strict";
 
let foodObject = {};  // object to hold all food items

const errorFunction = () => {
	console.log("You broke it.  Thanks.");
};

const whenFoodItemsLoad = function() {
	foodObject = JSON.parse(this.responseText);
};

const getFoodItem = (foodItemsObject, foodCategory, whichFoodItem) => {
	if (Object.keys(foodItemsObject.foodCategory).includes(whichFoodItem)) {
			return foodItemsObject.foodCategory.whichFoodItem;  // returns price of whichFoodItem
		} else {
			return foodItemsObject.foodCategory;  // returns food category object
		}
};

const addFoodItem = (foodItemsObject, foodCategory, newFoodItem, newFoodItemCost) => {
	foodItemsObject[foodCategory].newFoodItem = newFoodItemCost;
};

module.exports = {whenFoodItemsLoad, errorFunction, getFoodItem, addFoodItem};