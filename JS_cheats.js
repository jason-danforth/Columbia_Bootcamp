// Basic Functions
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

  // Find the mean value of the moveScores
  function cumsum(value) {
    sum += value;
    return sum;
  }
  movieScores.forEach(cumsum);
  var mean = sum / movieScores.length;
  console.log(`The mean score is ${mean}`);
  //more sophisticated option: 
  //var mean = movieScores.reduce((a, b) => a + b, 0) / movieScores.length

  // Find the variance of the movieScores
  var distances = 0;
  function findDist(value, mean) {
    distances += Math.pow(Math.abs(value - mean), 2);
    return distances;
  }
  movieScores.forEach(findDist);
  var variance = distances / mean;
  console.log(`The variance is ${variance}`);





// Anonymous Functions
// Array of student names
var students = ["Johnny", "Tyler", "Bodhi", "Pappas"];
students.forEach(function(name) {
    console.log(name);
  });





// Objects  
var movie = {
    name: "Star Wars",
    year: 1977,
    profitable: true,
    sequels: [5, 6, 1, 2, 3, "The Last Jedi"]
  };
  
// JavaScript also allows value lookup via dot notation
console.log(movie.name);
console.log(movie.year);
console.log(movie.sequels[0]);
console.log(movie["name"]);
  
// Add a key-value pair to an existing object
movie.rating = 8.5;
  
// Delete a key-value pair
delete movie.sequels;
  
// Check whether a key exists in an object
  if ("rating" in movie) {
    console.log("This movie has a rating!");
  }

// The arrays returned by these functions are enumerated
// i.e. they aren't simple lists of values
console.log(Object.keys(movie));
console.log(Object.values(movie));
console.log(Object.entries(movie));
  




// Creating an obect with counts for values

// Create list of words
var quote = "I yam what I yam and always will be what I yam";
var wordList = quote.split(" ")
// Define empty object to hold word counts
var words = {}
function addWord(word) {
    if (word in words) {
        words[word] += 1;
    }
    else {
        words[word] = 1;
    };
}
wordList.forEach(addWord)




// Mapping returns values to create a new variable
// forEach does not return values (i.e. the return statement literally doesn't do anything (I think...))
var students = [
  { name: "Malcolm", score: 80 },
  { name: "Zoe", score: 85 },
  { name: "Kaylee", score: 99 },
  { name: "Simon", score: 99 },
  { name: "Wash", score: 79 }
];

var names = students.map(function(student) {
  return student.name;
});

var scores = students.map(function(student) {
  return student.score;
});



// Arrow Function
// Can drop the `return` keyword and {} 
// If only passing one argument you can also drop the () around the argument
var names = students.map(student => student.name);
var mapReturn2 = theStagesOfJS.map((item, index) => `Stage ${index}: ${item}`);

