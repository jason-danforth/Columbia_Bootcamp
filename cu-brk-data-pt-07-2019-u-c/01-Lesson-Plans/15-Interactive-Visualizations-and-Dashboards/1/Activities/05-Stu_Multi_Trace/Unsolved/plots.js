console.log(data);
// YOUR CODE HERE
var pairs = data.map(data => data.pair);
var greek = data.map(data => data.greekSearchResults);
var roman = data.map(data => data.romanSearchResults);

console.log(pairs);
console.log(greek);
console.log(roman);

var trace1 = {
    x: pairs,
    y: greek,
    type: "bar"
};

var trace2 = {
    x: pairs,
    y: roman,
    type: "bar"
};

var layout = {
    title: "Something Title-ish",
    xaxis: {title: "x-axis"},
    yaxis: {title: "y-axis"}
};

Plotly.newPlot("plot", [trace1, trace2], layout);