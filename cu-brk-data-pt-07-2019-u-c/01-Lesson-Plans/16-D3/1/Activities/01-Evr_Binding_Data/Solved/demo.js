// //FYI, this is all meant to be run one at a time in the console

// // 1-.each()
// d3.select("ul").selectAll("li"); //if you don't need to loop through the list and just want the data

// d3.select("ul").selectAll("li")
//     .each(function(d, i) {
//       console.log("element", this);
//       console.log("data", d);
//       console.log("index", i);
//     });
// //.each() is the same as forEach(), just in D3
// //if you enter two values into function(d, i), the first will be the object and the second will be the index. Nothing special about the letters "d" and "i"
// //"this" will return the entire object



// // 2-.data()
// // Access elements' data
// // returns an array of undefined items
// d3.select("ul").selectAll("li").data();

// // Assign data to elements in the selector object
// // not enough
// var arr = [50, 55];
// d3.select("ul").selectAll("li").data(arr);
// d3.select("ul").selectAll("li").data();

// // just right
// var arr = [50, 55, 53];
// d3.select("ul").selectAll("li").data(arr); // Binds the data
// d3.select("ul").selectAll("li").data();

// // too many
// var arr = [50, 55, 53, 56, 68];
// d3.select("ul").selectAll("li").data(arr);
// d3.select("ul").selectAll("li").data();

// // trying to reassign with not enough
// var arr = [1, 2];
// d3.select("ul").selectAll("li").data(arr);
// d3.select("ul").selectAll("li").data();


// // 3-Multiple Methods
// var arr = [50, 55, 53];

// d3.select("ul").selectAll("li")
//     .data(arr)
//     .text(function(d) {
//       return d;
//     });

// // Modify the returned data
// d3.select("ul").selectAll("li")
//     .data(arr)
//     .text(function(d) {
//       return d + 1000;
//     });


// // 4-.enter()
// // New data points are ignored here
// var arr = [50, 55, 53, 56, 68];

// d3.select("ul").selectAll("li")
//     .data(arr)
//     .text(function(d) {
//       return d;
//     });

// // append affects existing elements = FAIL!
// var arr = [50, 55, 53, 56, 68];
// d3.select("ul").selectAll("li")
//     .data(arr)
//     .append("li")
//     .text(function(d) {
//       return d;
//     });

// // Use `enter` to create new elements
// var arr = [50, 55, 53, 56, 68];
// // First, update existing elements
// d3.select("ul")
//     .selectAll("li")
//     .data(arr)
//     .text(function(d) {
//       return d;
//     });

// // Second, create new elements for extra data points
// var arr = [50, 55, 53, 56, 68];
// d3.select("ul")
//     .selectAll("li")
//     .data(arr)
//     .enter()
//     .append("li")
//     .text(function(d) {
//       return d;
//     });


// // 5-.exit()
// // Finally, what if we remove an item?
// var arr = [50, 55];
// d3.select("ul")
//     .selectAll("li")
//     .data(arr)
//     .exit()
//     .remove();






console.log("Hello?")


// Note to Trilogy education services: 
// This is the code to produce the expected behavior    
var arr = [50, 55, 53, 56, 68];
selection = d3.select("ul").selectAll("li").data(arr);

selection.enter()
  .append("li")
  .merge(selection)
  .text(function(d) {
    return d;
    });





