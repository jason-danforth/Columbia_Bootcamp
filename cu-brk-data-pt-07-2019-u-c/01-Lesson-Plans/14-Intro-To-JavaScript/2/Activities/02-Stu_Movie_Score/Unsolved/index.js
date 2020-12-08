// Array of movie ratings
var movieScores = [
  4.4,
  3.3,
  5.9,
  8.8,
  1.2,
  5.2,
  7.4,
  7.5,
  7.2,
  9.7,
  4.2,
  6.9
];

// Starting a rating count
var sum = 0;

// Arrays to hold movie scores
var goodMovieScores = [];
var okMovieScores = [];
var badMovieScores = [];

var sum = 0

// Refactoring with foreach //
function scoreSummary(score) {
  sum += score

  if (score > 7) {
    goodMovieScores.push(score)
  }
  else if (score > 5) {
    okMovieScores.push(score)
  }
  else {
    badMovieScores.push(score);
  }
}

movieScores.forEach(scoreSummary)


// Find the average score
var avg = sum / movieScores.length;

// Store the length of movie ratings
var numGoodMovies = goodMovieScores.length;
var numOkMovies = okMovieScores.length;
var numBadMovies = badMovieScores.length;

// Print results
console.log("---------");
console.log(`There are ${numGoodMovies} good movies.`);
console.log(`There are ${numOkMovies} ok movies.`);
console.log(`There are ${numBadMovies} bad movies.`);
console.log(`The average movie rating is ${avg}.`);
console.log("---------");
