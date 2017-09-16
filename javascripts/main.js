"use strict";

const fxns 	= require('./fxns.js');
const data 	= require('./data.js');
const events = require('./event.js');

fxns.initializer();

fxns.printItemsToDom("bread", 	data.getFoodItem());
fxns.printItemsToDom("cheese",	data.getFoodItem());
fxns.printItemsToDom("meat",	data.getFoodItem());
fxns.printItemsToDom("veggie", 	data.getFoodItem());
fxns.printItemsToDom("condiment", data.getFoodItem());

events.addEventListeners();