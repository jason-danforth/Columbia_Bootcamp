// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 660;

// Define the chart's margins as an object
var chartMargin = {
  top: 30,
  right: 30,
  bottom: 30,
  left: 30
};

// Define dimensions of the chart area
var chartWidth = svgWidth - chartMargin.left - chartMargin.right;
var chartHeight = svgHeight - chartMargin.top - chartMargin.bottom;

// Select body, append SVG area to it, and set the dimensions
var svg = d3
  .select("body")
  .append("svg")
  .attr("height", svgHeight)
  .attr("width", svgWidth);

// Append a group to the SVG area and shift ('translate') it to the right and down to adhere
// to the margins set in the "chartMargin" object.
var chartGroup = svg.append("g")
  .attr("transform", `translate(${chartMargin.left}, ${chartMargin.top})`);

// Load data from hours-of-tv-watched.csv
d3.csv("./hours-of-tv-watched.csv", function(error, tvData) {

  // Log an error if one exists
  if (error) return console.warn(error);

  // Print the tvData
  console.log(tvData);

  // Cast the hours value to a number for each piece of tvData
  tvData.forEach(function(data) {
    data.hours = +data.hours;
  });

  var barSpacing = 10; // desired space between each bar
  var scaleY = 10; // 10x scale on rect height

 // Create a 'barWidth' variable so that the bar chart spans the entire chartWidth.
  var barWidth = (chartWidth - (barSpacing * (tvData.length - 1))) / tvData.length;

   // @TODO
  // Create code to build the bar chart using the tvData.
<<<<<<< HEAD
 
 chartGroup.selectAll(".bar")
  .data(tvData)
  .enter()
  .append("rect")
  .classed("bar", true)
  .attr("height", function(d) {
    return d.hours * scaleY;
  })
  .attr("width", barWidth)
  .attr("x", function(d, i) {
    return i * (barWidth + barSpacing);
  })
  .attr("y", function(d) {
    return chartHeight - (d.hours * scaleY);
  });

});
=======
// [1, 2, 4, 6, 7]

  chartGroup.selectAll(".bar").data(tvData)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d  => barWidth)
    .attr("height", d => d.hours )
});
>>>>>>> 205647e9382bf9b6379422e48f8a36e2ab9d15d6
