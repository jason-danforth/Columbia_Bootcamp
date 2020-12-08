
xCol = "poverty";
yCol = "income";

function makeResponsive() {

    // if the SVG area isn't empty when the browser loads,
    // remove it and replace it with a resized version of the chart
    var svgArea = d3.select("body").select("svg");

    if (!svgArea.empty()) {
        svgArea.remove();
    }
    
    // svg params
    var svgHeight = window.innerHeight * 0.7;
    var svgWidth = window.innerWidth * 0.9;
  
    // margins
    var margin = {
      top: 50,
      right: 50,
      bottom: 50,
      left: 100
    };
  
    // chart area minus margins
    var chartHeight = svgHeight - margin.top - margin.bottom;
    var chartWidth = svgWidth - margin.left - margin.right;
  
    // create svg container
    var svg = d3.select("#scatter").append("svg")
        .attr("height", svgHeight)
        .attr("width", svgWidth);   

    // shift everything over by the margins
    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);
        
    // Import data from CSV file
    d3.csv("./assets/data/data.csv").then(function(csvData) {
    //Why doesn't the below work?
    //d3.csv("./assets/data/data.csv", function(error, csvData) {
        //if (error) throw error;
        //if (error) return console.warn(error);

        csvData.forEach(function(data) {
            data.poverty = +data.poverty;
            data.povertyMOE = +data.povertyMOE;
            data.age = +data.age;
            data.ageMOE = +data.ageMOE;
            data.income = +data.income;
            data.incomeMOE = data.incomeMOE;
            data.healthcare = +data.healthcare;
            data.healthcareLow = +data.healthcareLow;
            data.healthcareHigh = +data.healthcareHigh;
            data.obesity = +data.obesity;
            data.obesityLow = +data.obesityLow;
            data.obesityHigh = +data.obesityHigh;
            data.smokes = +data.smokes;
            data.smokesLow = +data.smokesLow;
            data.smokesHigh = +data.smokesHigh;
        });
          
        var states = csvData.map(data => data.abbr);
        var xValues = csvData.map(data => data[xCol]);
        var yValues = csvData.map(data => data[yCol]);

        // scale y to chart height
        var yScale = d3.scaleLinear()
            .domain([0, d3.max(yValues)])
            .range([chartHeight, 0]);

        // scale x to chart width
        var xScale = d3.scaleLinear()
            .domain([0, d3.max(xValues)])
            .range([0, chartWidth]);

        // create axes
        var yAxis = d3.axisLeft(yScale);
        var xAxis = d3.axisBottom(xScale);

        // set x to the bottom of the chart
        chartGroup.append("g")
        .attr("transform", `translate(0, ${chartHeight})`)
        .call(xAxis);

        // set y to the y axis
        chartGroup.append("g")
        .call(yAxis);

        // text label for the x axis
        svg.append("text")             
        .attr("transform", `translate(${svgWidth/2}, ${svgHeight * 0.97})`)
        .style("text-anchor", "middle")
        .text(xCol);

        // text label for the y axis
        svg.append("text")
        .attr("transform", `translate(${margin.left * 0.5}, ${svgHeight/2})rotate(-90)`)
        .style("text-anchor", "middle")
        .text(yCol);  
        
        var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .offset([-8, 0])
        .html(function(d) { return "Radius: " + d; });
        svg.call(tool_tip);

        // plot
        var Circles = chartGroup.selectAll("circle")
            .data(csvData)
            .enter()
            .append("circle")
            .attr("cx", d => xScale(d[xCol]))
            .attr("cy", d => yScale(d[yCol]))
            .attr("r", "12")
            .attr("opacity", 0.5)
            .attr("fill", "steelblue")
            .on('mouseover', tool_tip.show)
            .on('mouseout', tool_tip.hide)
            .style("stroke", "white");

        // text
        chartGroup.append("g")
            .attr("class", "states");

        var stateLabels = chartGroup.selectAll("#states") // Note unique ID to ensure match between # of objects getting labeled and # of labels
            .data(csvData)
            .enter()
            .append("text")
            .attr("dx", d => xScale(d[xCol])-8)
            .attr("dy", d => yScale(d[yCol])+3)
            .attr("font-size", "10px")
            .attr("font-weight", "bold")
            .text(d => d.abbr);
        
        // transition
        // this works when added directly to chartGroup, but that supposedly kills the tooltips...
        // and it doesn't work here...
        // Circles.transition()
        //     .duration(1000);

        });
}


function getXData(dataset) {
    xCol = dataset;
    makeResponsive();
}

function getYData(dataset) {
    yCol = dataset;
    makeResponsive();
}

makeResponsive();

// Event listener for window resize.
// When the browser window is resized, makeResponsive() is called.
d3.select(window).on("resize", makeResponsive);


