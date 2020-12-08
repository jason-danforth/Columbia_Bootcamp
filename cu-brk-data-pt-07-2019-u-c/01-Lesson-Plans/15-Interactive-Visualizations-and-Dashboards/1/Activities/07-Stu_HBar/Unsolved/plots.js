// @TODO: Complete the following sections

console.log(data);
// Sort the data array using the greekSearchResults value
data.sort(function(a, b) {
    return b.greekName - a.greekName; 
});

var names = data.map(data => data.greekName);
var results = data.map(data => data.greekSearchResults);

// Slice the first 10 objects for plotting
topNames = names.slice(0, 10);
topResults = names.slice(0, 10);

// Trace1 for the Greek Data
trace = {
    x: topNames,
    y: topResults,
    type: "bar",
    orientation: "h"
};

// set up the data variable

// set up the layout variable
layout = {
    title: "TITLE",
    xaxis: {title: "xaxis"},
    yaxis: {title: "yaxis"}
};

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot",[trace], layout);