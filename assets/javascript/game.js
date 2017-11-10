// Global Variables
var wordList = ["bar", "beat", "chord", "flat", "key", "sharp", "piano", "major"];
// var wordList = ["beatt"] // simple list for troubleshooting

// Randomly chooses a word from the wordList array. This is the current word in play.
// var word = wordList[Math.floor(Math.random() * wordList.length)];
// console.log(word);
var word;

// Splits the letters of the selected word into an array
// var arrayWord = word.split("");
var arrayWord;

// // Creates an array the same size as the arrayWord, populated by underscores
// var arrayOfUnderscores = arrayWord.map(a=>'_');
// var string = arrayOfUnderscores.toString();
// // remove commas from arrayOfUnderscores, and replace (globally) the commas with spaces
// var result = string.replace(/,/g, " ");
// // Displays the arrayOfUnderscores as a string within the #inPlay span
// document.getElementById("inPlay").textContent = result;
var arrayOfUnderscores;
var string;
var result;

// Declares the variable that contains the current guess
var guess;

//Declares variables to count wins and losses
var win = 0;
var lose = 0;

// //Declares variable to store chances to guess. Set to 150% of word length, rounded up
// var chances = Math.ceil(word.length * 1.5);
// document.getElementById("chances").textContent = chances;
// console.log(chances);
var chances;

// // Initializes the start point of the guess/word search
// var startIndex = 0;
var startIndex;

// //Declare array to store old guesses
// var oldGuess = [];
var oldGuess;

// //Decalre variable to index guesses, start at -1, so first counter will be zero
// var guessCount = -1;
var guessCount;

//Initialize array with guessable charcters. All other key presses will be ignored.
var alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "k", "j", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
// var letters = /^[A-Za-z]+$/;

// Objects

// Try to contain the entire game in an object?!
// var game = {
// 	wordList: ["bar", "beat", "chord", "flat", "key", "sharp", "piano", "major"],
// 	word: wordList[Math.floor(Math.random() * wordList.length)],
// 	underscores: word.split("").map(a=>'_')
// };



// Calls

function newGame(){
	// Randomly chooses a word from the wordList array. This is the current word in play.
	word = wordList[Math.floor(Math.random() * wordList.length)];
	console.log(word); //Word display here to explore without needing to guess
	// Splits the letters of the selected word into an array
	arrayWord = word.split("");
	// Creates an array the same size as the arrayWord, populated by underscores
	arrayOfUnderscores = arrayWord.map(a=>'_');
	string = arrayOfUnderscores.toString();
	// remove commas from arrayOfUnderscores, and replace (globally) the commas with spaces
	result = string.replace(/,/g, " ");
	// Displays the arrayOfUnderscores as a string within the #inPlay span
	document.getElementById("inPlay").textContent = result;
	//Declares variable to store chances to guess. Set to 150% of word length, rounded up
	chances = Math.ceil(word.length * 1.5);
	document.getElementById("chances").textContent = chances;
	// reset the start point of the guess/word search
	startIndex = 0;
	//empty array to store old guesses
	oldGuess = [];
    document.getElementById("oldGuess").textContent = oldGuess;
    //Reset current guess
    document.getElementById("currentGuess").textContent = "nothing, yet"
	//set variable to index guesses at -1, so first counter will be zero
	guessCount = -1;

}

newGame();

// When onkeyup event occurs, the button pressed is stored as text in the guess variable.
// The letter is displayed to the id #guess.
document.onkeyup = function(event) {
	document.getElementById("currentGuess").textContent = event.key;
	// Stores the input "guess" as a string in the variable guess.
	guess = event.key;
	//check if this character has been guessed before.
	if (oldGuess.indexOf(guess) !== -1){
		alert("You've already guessed that...")
		return //stop running onkeyup function if the character is found in oldGuess

	} else if (alphabet.indexOf(guess) === -1){ 
		//Check if guess is a guessable character
		alert("That's not a letter...");
		return //Stop running onkeyup function if guess is not found in alphabet
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
	  	
	  	// // remove commas from arrayOfUnderscores. replace (globally) the commas with spaces
	  	var str = arrayOfUnderscores.toString();
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
    //if the current guess was not correct, decrease chances by 1
    if (word.indexOf(guess) === -1){
		chances--;
		document.getElementById("chances").textContent = chances;
	}
    //Has the word been guessed?
	if (arrayOfUnderscores.indexOf("_") === -1){ //If there are no underscores in arrayOfUnderscores...
 		win++; //add one to win variable
		document.getElementById("win").textContent = win;
 		alert("You guessed it! The word is " + word + ".");
		newGame(); //Start again
	} else if (chances === 0){ //If there are no more chances left...
		lose++; //add one to lose variable
		alert("Sorry, you lost! The word is " + word + ".");
		document.getElementById("lose").textContent = lose;
		newGame(); //Start again
	}

	var startIndex = 0; // After searching word, set startIndex back to 0.
};

