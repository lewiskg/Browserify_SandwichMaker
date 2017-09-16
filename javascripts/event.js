"use strict";

const fxns = require('./fxns.js');

const addEventListeners = () => {
	let foodItemsArray = document.getElementsByClassName('food-input');
	for (let i = 0; i < foodItemsArray.length; i++) {
		foodItemsArray[i].addEventListener('change', function(e) {
			if (e.target.checked) {
				fxns.includeItem(e);
				fxns.calculatePrice();
			} else {
				fxns.removeItem(e);
				fxns.calculatePrice();
			}
		});
	}
};

module.exports = addEventListeners;