var eyeColor = ["Brown1", "Brown2", "Brown3", "Brown4", "Brown5",
  "Brown6", "Brown7", "Brown8", "Green1", "Green2",
  "Green3", "Green4", "Green5", "Blue1", "Blue2",
  "Blue3", "Blue4", "Blue5", "Blue6"];

var eyeFlicker = [26.8, 27.9, 23.7, 25, 26.3, 24.8,
  25.7, 24.5, 26.4, 24.2, 28, 26.9,
  29.1, 25.7, 27.2, 29.9, 28.5, 29.4, 28.3];

// @TODO: Complete the Following Steps

// Create the Trace
var trace = [{
  x: eyeColor,
  y: eyeFlicker,
  type: "bar"
}];

// Create the data array for our plot

// Define our plot layout
var layout = {
  title: "Eye Chart",
  xaxis: {title: "Eye Color"},
  yaxis: {title: "Eye Flicker"}
};

// Plot the chart to a div tag with id "bar-plot"

Plotly.newPlot("bar-plot", trace, layout);