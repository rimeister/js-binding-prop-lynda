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

		this.el = document.getElementById(el); // The el for this game is equal to the one that was passed in in the args for Game. In this case, the div in the HTML with the ID "game_div"
		this.option = option; // The option object for this game is equal to the one that was passed in in the args for Game
		this.info_div = document.createElement('div'); // Create div elements dynamtically for the info div and deck div
		this.info_div.id = "info_div"; // Give the dynmaically created div an ID
		this.deck_div = document.createElement('div');
		this.deck_div.id = "deck_div";
		this.gameDeck = new Deck(this.deck_div, option); // Create new Deck for this game, assign it to property "gameDeck"
		this.gameDeck.buildDeck(); // Run the buildDeck method on the "gameDeck" Deck just created 

		this.el.appendChild(this.info_div); // Add the info_div that was just created (dynamically) inside the "game_div" element
		this.el.appendChild(this.deck_div); // Add the deck_div that was just created (dynamically) inside the "game_div" element

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

		this.id = ""; // Set to an empty string, gets overwritten when we build the card in the Deck constructor
		this.data = ""; // Set to an empty string, gets overwritten when we build the card in the Deck constructor
		this.cardCont = document.createElement("div"); // Create a card container div.
		this.cardCont.className = "card_container"; // Give the card container a classname of card_container
		this.cardFront = document.createElement("div"); // Create a div for card front.
		this.cardFront.className = "card_front"; // Assign a class name of card_front to the card front div
		this.cardBack = document.createElement("div"); // Create a div for card Back.
		this.cardBack.className = "card_back"; // Assign a class name of card_back to the card Back div
		
		this.buildCard = function(parentFrag) {

			var flipDiv = document.createElement("div"), // create div elements, put them in vars
				frontValDiv = document.createElement("div"),
				backValDiv = document.createElement("div"),
				catDiv = document.createElement("div")
			;

			frontValDiv.className = "front_val"; // Add class name to the 
			flipDiv.className = "flip_card";
			backValDiv.className = "back_val";
			catDiv.className = "cat_val";

			frontValDiv.innerHTML = this.data.q; /* From the JSON data, which has been set to "data"
			when the card is created, get the "q" value and put that value into the HTML element frontValDiv */
			backValDiv.innerHTML = this.data.a; // Same as above, but it puts the answer into backValDiv
			catDiv.innerHTML = this.data.category; // Puts the category into the category div

			this.cardFront.appendChild(frontValDiv); // Add the front val div to 
			this.cardFront.appendChild(catDiv);
			this.cardBack.appendChild(backValDiv);

			flipDiv.appendChild(this.cardFront);
			flipDiv.appendChild(this.cardBack);

			this.cardCont.id = this.id; // Just takes the ID from the card, puts it on the card container
			this.cardCont.appendChild(flipDiv); // Add the flipDiv to the card container div
			this.cardCont.onclick = function(e) {
				// console.log(e.target);
				e.currentTarget.classList.toggle("flip");
				e.currentTarget.classList.toggle("slide_over");
			}

			parentFrag.appendChild(this.cardCont); // Add the card container to the parent fragment

		}

		this.shuffle = function() {

		}

		this.stack = function() {

		}

	}

	// 	val
	// 	suit
	// 	----
	// 	flip

	// Discard Pile
	var DiscardPile = function() {
/*
		this.val = ; // value of card in the discard pile
		this.suit = ; // Suit of the card in the discard pile

		this.flip = function(this.card) {
			// Flip the card in the discard pile
		}
*/
	}

	// 	Holders
	// 	---
	// 	Accept or Reject

	window.Game = Game; // Attach Game to Window, so it's available outside of this IFFE

})(window); // Pass in window object
