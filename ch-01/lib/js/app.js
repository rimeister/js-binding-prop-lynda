/**********************/
/****** App.js ********/
/**********************/

/* The purpose of this IIFE is to keep the variables contained within the scope of the function,
preventing them from having global scope
The Game function/object type is then attached to the window object, so it can be called from outside the function,
in index.html */

;(function(window){
// Note: video said to include the preceding semicolon, 
// in case IIFE accidently butts up against a statement that doesn't end with one (if minified, I suppose).

	/*Pseudocode*/
	
	// Game
	// 	Info section
	// 	Deck
	// 	Discard Pile
	// 	Rules

	// Game Object Constructor
	var Game = function(el, option) {
		this.el = document.getElementById(el);
		this.option = option;
		// Create div elements dynamtically for the info div and deck div
		this.info_div = document.createElement('div');
		// Give the dynmaically created div an ID
		this.info_div.id = "info_div";
		this.deck_div = document.createElement('div');
		this.deck_div.id = "deck_div";
		// Create new gameDeck
		this.gameDeck = new Deck(this.deck_div, option);
		this.gameDeck.buildDeck();

		this.el.appendChild(this.info_div);
		this.el.appendChild(this.deck_div);

	}

	// Deck constructor
	var Deck = function(deck_div, option) {

		// From the the 'option' object, passed in when a Game is instantiated in index.html, get the property 'data'
		// the 'data' property has the value of the var flashcard_QA, which is a JSON object containing all the game card values
		this.deckData = option.data;

		this.buildDeck = function(){
			// Document fragments allow us to build out divs off DOM, then append them to the body once they're collected
			var parentFrag = document.createDocumentFragment();
			// clear the deck_div if it contains any data
			deck_div.innerHTML = "";

			// Loop over each 'card' node in the JSON data and create a new card with it's values
			// Set i to the length of the data object, minus 1. Decrement each time, stop when it's equal to 0.
			// So var i in this loop starts at the biggest value, and decreases to 0, instead of starting at 0 and increasing to the max value
			// What is the benefit of doing it this way, instead of starting at 0 and incrementing to < this.deckData.length?
			// Seems like it might just put the newest card at the top, or something.
			// I might try switching it to a normal for loop later
			// Also, I might try putting my object methods on the prototype instead of in the constructor function
			// (which is what she did)
			for (var i = this.deckData.length - 1; i >= 0; i--) {
				var card = new Card();
				card.id = "card-" + i; // Give the card an ID
				card.data = this.deckData[i]; // Give this card its data from the deckData
				card.buildCard(parentFrag);	// Run buildCard method
			}

			deck_div.appendChild(parentFrag);

		}

	}

	// 	Cards
	// 	----
	// 	Shuffle
	// 	Stack

	// Card
	var Card = function() {

	}

	// 	val
	// 	suit
	// 	----
	// 	flip

	// Discard Pile
	var DiscardPile = function() {

	}

	// 	Holders
	// 	---
	// 	Accept or Reject

	

	window.Game = Game; // Attach Game to Window, so it's available outside of this IFFE

})(window); // Pass in window object


/*

// Muffin object constructor example I made

window.onload = function() {

	// MUFFIN OBJECT CONSTRUCTOR
	function Muffin(type,sugar,isWholeWheat,isGlutenFree) {
		this.type = type; // Name of muffin
		this.sugar = sugar; // Amount of sugar in grams
		this.isWholeWheat = isWholeWheat; // Boolean: Is it whole wheat?
		this.isGlutenFree = isGlutenFree; // Boolean: Is it gluten free?
	}
	
	Muffin.prototype = {
		constructor: Muffin,
		sayType: function() {
			alert(this.type);
		}
	}

	// CREATE A MUFFIN
	var muffin1 = new Muffin('Chocolate Chip',33,true,false);

	// When muffin button is clicked, say what type of muffin it is
	var btns = document.getElementsByClassName('btn');

	for (var i=0;i<btns.length;i++) {

		btns[i].addEventListener('click', function(event){

			event.preventDefault();
			muffin1.sayType();

		});

	}

}
*/