/**********************/
/****** App.js ********/
/**********************/

;(function(window){

	/*

		*Pseudocode*
		
		Game
			Info section
			Deck
			Discard Pile
			Rules

		Deck
			Cards
			----
			Shuffle
			Stack

		Cards

			val
			suit
			----
			flip

		Discard Pile
			Holders
			---
			Accept or Reject

	*/

	// GAME OBJECT CONSTRUCTOR
	var Game = function(el, option){
		this.el = document.getElementById(el);
		this.option = option;
	}

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