// Global Variables
// var wordList = ["bar", "beat", "chord", "flat", "key", "sharp", "piano", "major"];
var wordList = ["beatt"] // simple list for troubleshooting

// Randomly chooses a word from the wordList array. This is the current word in play.
var word = wordList[Math.floor(Math.random() * wordList.length)];
console.log(word);

// Splits the letters of the selected word into an array
var arrayWord = word.split("");

// Creates an array the same size as the arrayWord, populated by underscores
var arrayOfUnderscores = arrayWord.map(a=>'_');
console.log(arrayOfUnderscores);

// Displays the arrayOfUnderscores as a string within the #inPlay span
document.getElementById("inPlay").textContent = arrayOfUnderscores.toString();

// Declares the variable that contains the current guess
var guess;

// Declares/initializes the start point of the guess/word search
var startIndex = 0;

// Objects

// Try to contain the entire game in an object?!
// var game = {
// 	wordList: ["bar", "beat", "chord", "flat", "key", "sharp", "piano", "major"],
// 	word: wordList[Math.floor(Math.random() * wordList.length)],
// 	underscores: word.split("").map(a=>'_')
// };



// Calls

// When onkeyup event occurs, the button pressed is stored as text in the guess variable.
// The letter is displayed to the id #guess.
document.onkeyup = function(event) {
	document.getElementById("currentGuess").textContent = event.key;
	// Stores the input "guess" as a string in the variable guess.
	guess = event.key;
	console.log("The guess is " + guess);
	console.log("The word is " + word);
	console.log("The search will begin at " + startIndex);

	while (word.indexOf(guess, startIndex) !== -1) { //While guess is found in word after startIndex
	  	console.log("The word searched was " + word);
	  	// replace letter
	  	console.log("The letter was found at " + word.indexOf(guess,startIndex)); //Where the letter is found
	  	// console.log(arrayOfUnderscores); //What is in the arrayOfUnderscores before
	  	arrayOfUnderscores[word.indexOf(guess,startIndex)] = guess;
	  	// console.log(arrayOfUnderscores); //What is in the arrayOfUnderscores after letter is replaced
	  	
	  	// remove letter
	  	// fill blanks
		document.getElementById("inPlay").textContent = arrayOfUnderscores.toString();
		// move search start to location of letter found
	  	startIndex = word.indexOf(guess, startIndex) + 1; 
	}
	var startIndex = 0; // After searching word, set startIndex back to 0.
};

