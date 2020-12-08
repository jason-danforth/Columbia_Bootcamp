/**
 * Generates an array of random numbers between 0 and 9
 * @param {integer} n: length of array to generate
 */
function randomNumbersBetween0and9(n) {
  var randomNumberArray = [];
  for (var i = 0; i < n; i++) {
    randomNumberArray.push(Math.floor(Math.random() * 10));
  }
  return randomNumberArray;
}

// Create our first trace
var trace1 = {
  x: [1, 2, 3, 4, 5],
  y: randomNumbersBetween0and9(5),
  mode: "markers", 
  //"lines+markers" is default and doesn's need to be included
  //"lines" alone will just create a line chart
  //"markers" alone will create an actual scatter plot 
  type: "scatter"
};

// Create our second trace
var trace2 = {
  x: [1, 2, 3, 4, 5],
  y: randomNumbersBetween0and9(5),
  type: "scatter"
};

// The data array consists of both traces
var data = [trace1, trace2];

// Note that we omitted the layout object this time
// This will use default parameters for the layout
Plotly.newPlot("plot", data);
