console.log('Homework')

var quote = "I yam what I yam and always will be what I yam";
console.log(quote);

// Create list of words
var wordList = quote.split(" ")
wordList.forEach(function(word) {
    console.log(word);
})


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
console.log(words)

console.log('____________________________')

// This won't return an array, so you can't use it to search to see if it contains a key
console.log(Object.keys(words))


/*
Goal object structure is the following:

words = {
    'I':7,
    'yam': 3,
    'etc.': 5,
};
*/