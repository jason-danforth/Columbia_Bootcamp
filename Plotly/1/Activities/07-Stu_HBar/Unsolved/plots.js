// @TODO: Complete the following sections

console.log(data);
// Sort the data array using the greekSearchResults value
data.sort((a, b) => a.greekSearchResults - b.greekSearchResults);

// Slice the first 10 objects for plotting
data = data.slice(0,11);

// Trace1 for the Greek Data
var trace1 = {
    x: data.map(row => row.greekSearchResults),
    y: data.map(row => row.greekName),
    type: "bar",
    orientation: "h",
    barmode: "group"
};

// set up the data variable
var data1 = [trace1];

// set up the layout variable
var layout = {
    title: "Some more plotly stuff",
    barmode: "group"
}

// Render the plot to the div tag with id "plot"
Plotly.newPlot("plot", data1, layout)