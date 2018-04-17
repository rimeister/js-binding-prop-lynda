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

		this.el.appendChild(this.info_div);
		this.el.appendChild(this.deck_div);

	}

	// Deck constructor
	var Deck = function(deck_div, option) {

		this.deckData = option.data;
		this.buildDeck = function(){
			// Document fragments allow us to build out divs off DOM, then append them to the body once they're collected
			var parentFrag = document.createDocumentFragment();
			// Left off here, 5:06 in video
			var card = new Card();			
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