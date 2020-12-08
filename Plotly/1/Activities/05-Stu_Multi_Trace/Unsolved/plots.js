//console.log(data);

// YOUR CODE HERE
var data1 = [{
    greekName: "Amphitrite",
    greekSearchResults: 387000,
    pair: "Amphitrite-Salacia",
    romanName: "Salacia",
    romanSearchResults: 47500
  }];

console.log(data1.map(function(val) {return val.pair;}));