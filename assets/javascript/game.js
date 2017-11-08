// Global Variables
var wordList = ["bar", "beat", "chord", "flat", "key", "sharp", "piano", "major"];
// var wordList = ["beatt"] // simple list for troubleshooting

// Randomly chooses a word from the wordList array. This is the current word in play.
var word = wordList[Math.floor(Math.random() * wordList.length)];
console.log(word);

// Splits the letters of the selected word into an array
var arrayWord = word.split("");

// Creates an array the same size as the arrayWord, populated by underscores
var arrayOfUnderscores = arrayWord.map(a=>'_');
console.log(arrayOfUnderscores);
var string = arrayOfUnderscores.toString();
// remove commas from arrayOfUnderscores, and replace (globally) the commas with spaces
var result = string.replace(/,/g, " ");
// Displays the arrayOfUnderscores as a string within the #inPlay span
// document.getElementById("inPlay").textContent = arrayOfUnderscores.toString();
document.getElementById("inPlay").textContent = result;

// Declares the variable that contains the current guess
var guess;

// Declares/initializes the start point of the guess/word search
var startIndex = 0;

//Declare array to store old guesses
var oldGuess = [];

//Decalre variable to index guesses, start at -1, so first counter will be zero
var guessCount = -1;

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
	//check if this character has been guessed before.
	if (oldGuess.indexOf(guess) !== -1){
		alert("You've already guessed that...")
		return //stop running onkeyup function is the character is found in oldGuess
	}
	//index this guess
	guessCount++;

	// console.log("The guess is " + guess);
	// console.log("The word is " + word);
	// console.log("The search will begin at " + startIndex);

	

	while (word.indexOf(guess, startIndex) !== -1) { //While guess is found in word after startIndex
	  	// console.log("The word searched was " + word);
	  	// replace letter
	  	// console.log("The letter was found at " + word.indexOf(guess,startIndex)); //Where the letter is found
	  	// console.log(arrayOfUnderscores); //What is in the arrayOfUnderscores before
	  	arrayOfUnderscores[word.indexOf(guess,startIndex)] = guess;
	  	// console.log(arrayOfUnderscores); //What is in the arrayOfUnderscores after letter is replaced
	  	
	  	// // remove commas from arrayOfUnderscores.
	  	var str = arrayOfUnderscores.toString();
	  	// // replace (globally) the commas with spaces
	  	var res = str.replace(/,/g, " ");
		document.getElementById("inPlay").textContent = res;
		// move search start to location of letter found
	  	startIndex = word.indexOf(guess, startIndex) + 1; 
	}
	
	//create text node for old guesses
	var currentGuess = document.createTextNode(guess);
	//update the text content with current guess and a comma with a space
    currentGuess.textContent = guess + ", " ;
    //append the text node to the span oldGuess
    document.getElementById("oldGuess").appendChild(currentGuess);
    //Store current guess in array with past guesses.
    oldGuess[guessCount] = guess;
    console.log(oldGuess);

	var startIndex = 0; // After searching word, set startIndex back to 0.
};

