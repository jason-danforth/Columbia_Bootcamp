// Define SVG area dimensions
var svgWidth = 960;
var svgHeight = 500;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.right - margin.left;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("body")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.right})`);

// Configure a parseTime function which will return a new Date object from a string
var parseTime = d3.timeParse("%B");

// Load data from miles-walked-this-month.csv
d3.csv("miles-walked-this-month.csv", function(error, milesData) {

  // Throw an error if one occurs
  if (error) throw error;

  // Print the milesData
  console.log(milesData);

  // Format the date and cast the miles value to a number
  milesData.forEach(function(data) {
    data.date = parseTime(data.date);
    data.miles = +data.miles;
  });

  // Configure a time scale with a range between 0 and the chartWidth and the domain as the extent of the dates
  var xScale = d3.scaleTime()
    .domain(d3.extent(milesData, data => data.date))
    .range([0, chartWidth]);

  // Configure a linear scale with a range between the chartHeight and 0 and the domain between 0 and the max of the miles walked
  var yScale = d3.scaleLinear()
    .domain([0, d3.max(milesData, data => data.miles)])
    .range([chartHeight, 0]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var xAxis = d3.axisBottom(xScale);
  var yAxis = d3.axisLeft(yScale);

  // Configure a line function which will plot the x and y coordinates using our scales
  var drawLine = d3.line()
    .x(data => xScale(data.date))
    .y(data => yScale(data.miles));

  // Append an SVG path and plot its points using the line function, give the path a class of line
  chartGroup.append("path")
    .attr("d", drawLine(milesData))
    .classed("line", true);

  // Append an SVG group element to the SVG area, create the left axis inside of it, and give it a class of "axis"
  chartGroup.append("g")
    .classed("axis", true)
    .call(yAxis);

  // Append an SVG group element to the SVG area, create the bottom axis inside of it
  // Translate the bottom axis to the bottom of the page
  // Give it a class of "axis"
  chartGroup.append("g")
    .classed("axis", true)
    .attr("transform", `translate(0, ${chartHeight})`)
    .call(xAxis);
});
