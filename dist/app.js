(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
 
const fxns = require('./fxns.js');


/////////////////////////
//// Data Type Fxns ////
////////////////////////

let foodObject = {};

const errorFunction = () => {
	console.log("You broke it.  Thanks.");
};

const whenFoodItemsLoad = function() {
	foodObject = JSON.parse(this.responseText);
	//console.log(foodObject);
	readyFoodItems(foodObject);
};

const readyFoodItems = (foodObject) => {
	printItemsToDom("breads", 	getFoodItem("breads",0));
	printItemsToDom("cheeses",	getFoodItem("cheeses", 0));
	printItemsToDom("meats",		getFoodItem("meats", 0));
	printItemsToDom("veggies", 	getFoodItem("veggies", 0));
	printItemsToDom("condiments", getFoodItem("condiments", 0));

	addEventListeners();
};

const printItemsToDom = (foodCatagory, foodTypeObject) => {
	const menuOnDom = document.getElementById("menu-items");
	const div_Node	= document.createElement('div');
	const ul_Node 	= document.createElement('ul');
	div_Node.setAttribute('class','food-group');

	for (let key in foodTypeObject) {
		let li_Node 	= document.createElement('li');
		let label_Node 	= document.createElement('label');
		let input_Node	= document.createElement('input');
		label_Node.innerHTML = `${key}`;
		input_Node.setAttribute('type', 'checkbox');
		input_Node.setAttribute('class','food-input');
		input_Node.setAttribute('value', foodCatagory);
		li_Node.setAttribute('class','food-item');
		li_Node.appendChild(input_Node);
		li_Node.appendChild(label_Node);
		ul_Node.appendChild(li_Node);
		div_Node.appendChild(ul_Node);
	}
	menuOnDom.appendChild(div_Node);
};


const getFoodItem = (foodCategory, whichFoodItem) => {
	// console.log("foodCategory", foodCategory);
	// console.log("whichFoodItem", whichFoodItem);
	// console.log("foodObject[foodCategory]", foodObject[`${foodCategory}`]);

	if(whichFoodItem === 0 ) {
		return foodObject[`${foodCategory}`];  // returns food category object
	}
	else if (Object.keys(foodObject[`${foodCategory}`]).includes(`${whichFoodItem}`)) {
		let temp = foodObject[`${foodCategory}`];
		return temp[`${whichFoodItem}`];  // returns price of whichFoodItem
	}
};

const addFoodItem = (foodItemsObject, foodCategory, newFoodItem, newFoodItemCost) => {
	foodItemsObject[foodCategory].newFoodItem = newFoodItemCost;
};


//////////////////////////////
//// More Event Type Fxns ////
//////////////////////////////

const includeItem = (e) => {
	const sandwichItem 	=  document.getElementById("sandwich-holder");
	let foodKind 		= e.target.value;
	let item 			= e.target.nextSibling.innerHTML;
	let itemPrice 		= getPrice(foodKind, item);
	let addSandwichItem = `<span id="sandwich-${item}" class="sandwich"><span class="sandwich-item-price">${itemPrice.toFixed(2)}</span><span class="sandwich-item-food">${item}</span></span>`;
	sandwichItem.innerHTML += addSandwichItem;
};

const removeItem = (e) => {
	const sandwichItem 	=  document.getElementById("sandwich-holder");
	let item 			= e.target.nextSibling.innerText;
	sandwichItem.removeChild(document.getElementById(`sandwich-${item}`));
	console.log("item removed", e.target.nextSibling.innerHTML);
};

const calculatePrice = () => {
	const sandwichItem =  document.getElementById("sandwich-holder");
	if (sandwichItem.firstChild) { 
		let itemPrices = document.getElementsByClassName("sandwich-item-price");
		let total = 0;
		for (let i =0; i < itemPrices.length; i++) {
			total += parseFloat(itemPrices[i].innerText);
		}
		document.getElementById("sandwich-price").innerHTML = `<p id="total-price">$${total.toFixed(2)}</p>`;
	} else if (!sandwichItem.firstChild) {
		document.getElementById("sandwich-price").removeChild(document.getElementById("total-price"));
	}
};

const getPrice = (foodGroup, food) => {
	let price = getFoodItem(foodGroup, food);
	return price;
};

const addEventListeners = () => {
	let foodItemsArray = document.getElementsByClassName('food-input');
	for (let i = 0; i < foodItemsArray.length; i++) {
		foodItemsArray[i].addEventListener('change', function(e) {
			if (e.target.checked) {
				includeItem(e);
				calculatePrice();
			} else {
				removeItem(e);
				calculatePrice();
			}
		});
	}
};


module.exports = {whenFoodItemsLoad, errorFunction, getFoodItem, addFoodItem};
},{"./fxns.js":2}],2:[function(require,module,exports){
"use strict";

const xhr 	= require('./xhr.js');

// set up 'initializer' - load food items
function initializer() {
	// xhr.loadFoodItems(data.whenFoodItemsLoad, data.errorFunction);
	xhr.loadFoodItems();
}

module.exports = {initializer};
},{"./xhr.js":4}],3:[function(require,module,exports){
"use strict";

const fxns 	= require('./fxns.js');

fxns.initializer();


},{"./fxns.js":2}],4:[function(require,module,exports){
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
},{"./data.js":1}]},{},[3]);
