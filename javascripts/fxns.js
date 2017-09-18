"use strict";

const xhr 	= require('./xhr.js');
const data 	= require('./data.js');

// set up 'initializer' - load food items
const initializer = () => {
	xhr.loadFoodItems(data.whenFoodItemsLoad, data.errorFunction);
};

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
	let price = data.getFoodItem(data.foodObject, foodGroup, food);
	return price;
};

function printItemsToDom(foodCatagory, foodTypeObject) {
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
}


module.export = {initializer, includeItem, removeItem, calculatePrice, getPrice, printItemsToDom};