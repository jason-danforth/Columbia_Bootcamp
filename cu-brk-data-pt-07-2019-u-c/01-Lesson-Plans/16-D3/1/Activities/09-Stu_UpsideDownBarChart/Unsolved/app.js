// Dataset we will be using to set the height of our rectangles
var booksReadThisYear = [17, 23, 20, 34];

// Append an SVG wrapper to the page and set a variable equal to a reference to it
// YOUR CODE HERE
var selection = d3.select("#svg-area")
    .append("svg")
    .attr("height", 500)
    .attr("width", 1000);

// Vertical Bar Chart
// YOUR CODE HERE
selection.selectAll("rect")
    .data(booksReadThisYear)
    .enter()     
    .append("rect")
    .classed("bar", true)
    .attr("width", 10)
    .attr("height", function(d) {
        return d*10;
    })
    .attr("x", function(d, i) {
        return i * 20;
    })
    .attr("y", 200);


// BONUS
// Horizontal Bar Chart
// YOUR CODE HERE

// BONUS 2
// Alter your Vertical bar chart code to go from bottom  up.
