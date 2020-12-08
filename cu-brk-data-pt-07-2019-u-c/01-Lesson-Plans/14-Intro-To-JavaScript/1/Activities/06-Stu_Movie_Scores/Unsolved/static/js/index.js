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

// for (var j = 0; j < movieScores.length; j++) {
//   console.log(`movieScore: ${movieScores[j]}`);
//   if (movieScores[j] > 7) {
//     goodMovieScores.push(movieScores[j]);
//   }
//   else if (movieScores[j] > 5) {
//     okMovieScores.push(movieScores[j]);
//   }
//   else {
//     badMovieScores.push(movieScores[j]);
//   }
// }

movieScores.forEach(function(score) {
  console.log(`movieScore: ${score}`);
    if (score > 7) {
      goodMovieScores.push(score);
    }
    else if (score > 5) {
      okMovieScores.push(score);
    }
    else {
      badMovieScores.push(score);
    }  
})

console.log(`There are ${goodMovieScores.length} Good movies`);
console.log(`There are ${okMovieScores.length} ok movies`);
console.log(`There are ${badMovieScores.length} bad movies`);

