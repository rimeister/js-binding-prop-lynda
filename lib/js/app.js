/**********************/
/****** App.js ********/
/**********************/

;(function(window){
/* The purpose of this IIFE is to keep the variables contained within the scope of the function,
preventing them from having global scope
The Game function/object type is then attached to the window object, so it can be called from outside the function,
in index.html */
// Note: video said to include the preceding semicolon, 
// in case IIFE accidently butts up against a statement that doesn't end with one (if minified, I suppose).


	/**********************************************/
	/************** Game Constructor **************/
	/**********************************************/
	var Game = function(el, option) {

		this.el = document.getElementById(el); // The el for this game is equal to the one that was passed in in the args for Game. In this case, the div in the HTML with the ID "game_div"
		this.option = option; // The option object for this game is equal to the one that was passed in in the args for Game
		this.info_div = document.createElement('div'); // Create div elements dynamtically for the info div and deck div
		this.info_div.id = "info_div"; // Give the dynmaically created div an ID
		this.deck_div = document.createElement('div');
		this.deck_div.id = "deck_div";
		this.gameDeck = new Deck(option); // Create new Deck for this game, assign it to property "gameDeck"
		this.gameDeck.buildDeck.call(this); // Run the buildDeck method on the "gameDeck" Deck just created 

		var shuffleBtn = document.createElement("button");
		shuffleBtn.innerHTML = "Shuffle";
		shuffleBtn.onclick = this.gameDeck.shuffle.bind(this);

		this.info_div.appendChild(shuffleBtn);

		// Rules
		/* Rules property is an object that contains 
		discardRow array and gameComplete() function */
		this.rules = {
			discardRow: [
				{
					name: "Got it!",
					droppable: true,
					maxCards: this.deck_div.children.length,
					piles: 1
				}
			],
			gameComplete: function(e){
				if(e.currentTarget.childNodes.length === this.discardRow[0].maxCards) {
					console.log("You win!");
				}
			}
		}

		// Discard Pile method
		/* buildDiscard is a method on the Game object. 
		The for loop iterates over each of the items in 
		this.rules.discardRow */ 
		this.buildDiscard = function(){

			for (var i = this.rules.discardRow.length - 1; i >= 0; i--) {

				var zone = document.createElement("div");
				// Add classes "zone" and "row" to the zone div
				zone.className = "zone row";

				/* 
					discardRule is the the current rule at this.rules.discardRow[i]
					In the case of the above example, it's an array [] with a single
					object in it. That one object has name, droppable, maxCards, and piles.
				*/
				var discardRule = this.rules.discardRow[i];
				console.log(discardRule);

				// iterator var, c used in while loop
				var c = 0;

				/* As long as c is less than the number of 
				piles specified in this.rules.discardRow[i].piles */
				while (c < discardRule.piles) {
					// Create new DiscardPile object
					var discardObj = new DiscardPile();

					// Give it a name
					discardObj.name = discardRule.name;

					// Tell it whether its droppable
					discardObj.droppable = discardRule.droppable;

					// Add a unique id to it
					discardObj.id = "pile-" + c;

					// Call the init() method from the DiscardPile object
					var buildObj = discardObj.init();

					// Append the discard object to the zone
					zone.appendChild(buildObj);

					c++;

				}

				// Append the zone to the main element
				this.el.appendChild(zone);

			}

		}

		this.el.appendChild(this.info_div); // Add the info_div that was just created (dynamically) inside the "game_div" element
		this.el.appendChild(this.deck_div); // Add the deck_div that was just created (dynamically) inside the "game_div" element
		
		// Build discard pile
		this.buildDiscard();

	}


	/**********************************************/
	/************** Deck Constructor **************/
	/**********************************************/

	var Deck = function(option) {

		// From the the 'option' object, passed in when a Game is instantiated in index.html, get the property 'data'
		// the 'data' property has the value of the var flashcard_QA, which is a JSON object containing all the game card values
		this.deckData = option.data;

		this.buildDeck = function(){
			
			// Document fragments allow us to build out divs off DOM, then append them to the body once they're collected
			var parentFrag = document.createDocumentFragment();
			// clear the deck_div if it contains any data
			this.deck_div.innerHTML = "";

			// Loop over each 'card' node in the JSON data and create a new card with it's values
			// Set i to the length of the data object, minus 1. Decrement each time, stop when it's equal to 0.
			// So var i in this loop starts at the biggest value, and decreases to 0, instead of starting at 0 and increasing to the max value
			// What is the benefit of doing it this way, instead of starting at 0 and incrementing to < this.deckData.length?
			// Seems like it might just put the newest card at the top, or something.
			// I might try switching it to a normal for loop later
			// Also, I might try putting my object methods on the prototype instead of in the constructor function
			// (which is what she did)
			for (var i = this.option.data.length - 1; i >= 0; i--) {
				var card = new Card();
				card.id = "card-" + i; // Give the card an ID
				card.data = this.option.data[i]; // Give this card its data from the deckData
				card.buildCard(parentFrag);	// Run buildCard method
			}

			this.deck_div.appendChild(parentFrag);

			this.gameDeck.stack.call(this);

		}

	}


	/**********************************************/
	/**** Attach methods to the Deck prototype ****/
	/**********************************************/

	// This function uses the Fisher-Yates Shuffle algorith to shuffle the cards
	// The end result is that the cards are in a new order
	Deck.prototype.shuffle = function (){
		var cardsToShuffle = this.gameDeck.deckData;
		var m = cardsToShuffle.length, t, i; // Ah, I see m is the first variable (set to the length of cards to shuffle), t is the next variable, i is the next variable
		
		// It's the same as:
		/*
			var m = cardsToShuffle.length;
			var t;
			var i; 
		*/

		// k, so now we have three variables: m, t, i.
		// They now get used in this while loop
		/*	The point of the while loop below is to swap the value of each item in the array with
			with another value from a random position. This effectively "shuffles" the items in the deck.
		*/
		while (m) {
			i = Math.floor(Math.random() * m--); // This line gets a random number that's between 0 and the max index of the cardsToShuffle object. 
			// She called this var (i) the iterator. 
			// m decrements every time this loop runs

			t = cardsToShuffle[m]; // Temporary variable. Holds the current value of cardsToShuffle[m]

			/* I think this line just places a random card 
			(from the cards that haven't yet been assigned) to the current position (m) that
			we're assigning to */
			cardsToShuffle[m] = cardsToShuffle[i];

			// make the value at i equal to what m's value was. 
			//  So, basically, this loop just swaps m for i
			cardsToShuffle[i] = t;
		}

		// Once cards are shuffled, assign the shuffled cards to the gameDeck's deckData
		this.gameDeck.deckData = cardsToShuffle;
		this.gameDeck.buildDeck.call(this)

	}

	Deck.prototype.stack = function() {
		 
		 var cards = this.deck_div.children;

		 // This stacks the cards, so they're all slightly offset
		 for (var i = cards.length - 1; i >= 0; i--) {
		 	cards[i].style.top = i + "px";
		 	cards[i].style.left = i + "px";	
		 	cards[i].classList.add("stacked_card"); 
		 	// A good time to use styles in JS is when you need to do iterative	manipulations
		 }

	}


	/**********************************************/
	/************** Card Constructor **************/
	/**********************************************/

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
			flipDiv.className = "flip";
			backValDiv.className = "back_val";
			catDiv.className = "cat_val";

			frontValDiv.innerHTML = this.data.q; /* From the JSON data, which has been set to "data"
			when the card is created, get the "q" value and put that value into the HTML element frontValDiv */
			backValDiv.innerHTML = this.data.a; // Same as above, but it puts the answer into backValDiv
			var learnMore = document.createElement("a");
			learnMore.addEventListener("click",function(e){
				e.stopPropagation();
			});
			learnMore.text = "Learn More";
			learnMore.href = this.data.link;
			learnMore.target = "_blank";

			var infoImage = document.createElement("img");
			infoImage.src = "lib/images/info.svg";
			learnMore.appendChild(infoImage);
			backValDiv.appendChild(learnMore);

			catDiv.innerHTML = this.data.category; // Puts the category into the category div

			this.cardFront.appendChild(frontValDiv); // Add the front val div to 
			this.cardFront.appendChild(catDiv);
			this.cardBack.appendChild(backValDiv);

			flipDiv.appendChild(this.cardFront);
			flipDiv.appendChild(this.cardBack);

			this.cardCont.id = this.id; // Just takes the ID from the card, puts it on the card container
			this.cardCont.appendChild(flipDiv); // Add the flipDiv to the card container div
			this.cardCont.onclick = cardClick;
			this.cardCont.draggable = true;
			this.cardCont.ondragstart = cardDrag;
			parentFrag.appendChild(this.cardCont); // Add the card container to the parent fragment

		}

	}

	var cardClick = (function(e){ // IIFE -- I believe this serves as a closure. Protects counter variable.
		var counter = 0; // Contains counter variable, only accessible inside IIFE
		return function(e) { // Returns function. Has access to counter var in parent because scope 
			e.currentTarget.classList.toggle("flip_card");
			e.currentTarget.classList.toggle("slide_over");
			e.currentTarget.style.zIndex = counter;
			counter++;
		}
	})();

	function cardDrag(e) {
		e.dataTransfer.setData("text/plain", e.currentTarget.id);
	}


	/**********************************************/
	/**** Attach methods to the Card prototype ****/
	/**********************************************/

	// Discard Pile
	var DiscardPile = function() {
		this.name = "";
		this.droppable;
		this.id = "";
		this.init = function(){

			// Create some div elements
			var holderContainer = document.createElement("div"),
				holderLabel = document.createElement("div"),
				holderTarget = document.createElement("div");

			holderTarget.className = "holder_target";
			holderTarget.ondragover = function(e){
				e.preventDefault();
			}

			// When you drop the holderTarget, call this.cardDrop method
			holderTarget.ondrop = this.cardDrop;

			holderLabel.className = "holder_label";
			holderLabel.innerText = this.name;

			holderContainer.className = "holder_container";
			holderContainer.appendChild(holderLabel);
			holderContainer.appendChild(holderTarget);

			return holderContainer;

		}
/*
		this.val = ; // value of card in the discard pile
		this.suit = ; // Suit of the card in the discard pile

		this.flip = function(this.card) {
			// Flip the card in the discard pile
		}
*/
	}

	// cardDrop method
	DiscardPile.prototype.cardDrop = function(e) {
		
		// Get the ID of the element being dragged
		var cardID = e.dataTransfer.getData("text/plain");

		// create var of element being dragged
		var cardDragging = document.getElementById(cardID);

		// Reset left and top position of element being dragged
		cardDragging.style.top = "0px";
		cardDragging.style.left = "0px";

		/* Current target (which this discard div, holder_target) 
		gets appended with the element you are dragging.
		Note, the dragged element is automatically removed from the
		element it was previously in.
		*/
		console.log(e.currentTarget);
		e.currentTarget.appendChild(cardDragging);

	}

	// 	Holders
	// 	---
	// 	Accept or Reject

	window.Game = Game; // Attach Game to Window, so it's available outside of this IFFE

})(window); // Pass in window object
