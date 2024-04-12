// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const input = require("readline-sync");

const oldPointStructure = {
   1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
   2: ['D', 'G'],
   3: ['B', 'C', 'M', 'P'],
   4: ['F', 'H', 'V', 'W', 'Y'],
   5: ['K'],
   8: ['J', 'X'],
   10: ['Q', 'Z']
};


function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
}

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   console.log("Let's play some scrabble! Enter a word:");
};

let simpleScorer = function simpleScorer(word){
   word = word.toUpperCase()
   let alphabets = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
   let letterPoints = 0
   for (let i = 0; i < word.length; i++) {
      if (alphabets.includes(word[i]))
         letterPoints ++;
   }
   return letterPoints;
};
let vowelBonusScorer = function vowelBonusScorer(word){
   word = word.toUpperCase()
   let vowel = ['A','E','I','O','U'];
   let consonant = ['B','C','D','F','G','H','J','K','L','M','N','P','Q','R','S','T','V','W','X','Y','Z'];
   let letterPoints = 0
   for (let i = 0; i < word.length; i++) {
      if (vowel.includes(word[i])) {
         letterPoints += 3
      } else if (consonant.includes(word[i])) {
         letterPoints += 1
      }
   }
   return letterPoints; 
}

let scrabbleScorer = function (word) {
   word = word.toLowerCase();
	let letterPoints = 0;
	for (let i = 0; i < word.length; i++) {
      letterPoints += newPointStructure[word[i]];
	}
	return letterPoints;
};


let scoringAlgorithms = [
   { "scorerFunction": simpleScorer },
   { "scorerFunction": vowelBonusScorer },
   { "scorerFunction": scrabbleScorer }
];

let scorerPrompt = function () {
   const word = input.question('Enter a word to score ');
   console.log('which scoring algorithm would you like to use? \n');
   console.log('0 - Simple: One point per character');
   console.log('1 - Vowel Bonus: Vowels are worth 3 points');
   console.log('2 - Scrabble: Uses scrabble point system');
   
   const option = input.question('Enter 0, 1, or 2: ');
   let result = 0;
   if (option >= 0 && option < 3) {
      result = scoringAlgorithms[option].scorerFunction(word);
   }
   console.log(`Score for '${word}': ${result}`)
};
      


let transform = function(oldPointStructure) {
   let transformedObj = {};

   for (const item in oldPointStructure) {
      for(let i =0 ; i < oldPointStructure[item].length; i++){
         transformedObj[oldPointStructure[item][i].toLowerCase()] = Number(item);
      }
   }
   return transformedObj;
}; 




let newPointStructure = transform(oldPointStructure);




function runProgram() {
   initialPrompt();
   scorerPrompt();

}

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
   runProgram: runProgram,
   scorerPrompt: scorerPrompt
};
