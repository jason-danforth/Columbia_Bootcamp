// Select the text of an HTML element
var text1 = d3.select(".text1").text(); //note the . for class="text1"
console.log("text1 says: ", text1);

var text2 = d3.select("#text2").text(); //note the # for id="text2"
console.log("text2 says: ", text2);

// Modify the text of an HTML element
d3.select(".text1").text("Hey, I changed this!");

// Capture the HTML of a selection
var myLink = d3.select(".my-link").html(); //captures everything in that div
console.log("my-link: ", myLink);




// Select an element's child element
// An object is returned (not super useful)
var myLinkAnchor = d3.select(".my-link>a");
console.log(myLinkAnchor);

// // Capture the child element's href attribute
// This is the actual link
var myLinkAnchorAttribute = myLinkAnchor.attr("href");
console.log("myLinkAnchorAttribute: " + myLinkAnchorAttribute);




// Change an element's attribute
// attributes are like href, class, etc.
myLinkAnchor.attr("href", "https://python.org");

// Use chaining to join methods
d3.select(".my-link>a").attr("href", "https://nytimes.org").text("Now this is a link to the NYT!!");




// Select all list items, then change their font color
d3.selectAll("li").style("color", "blue");

// Create a new element
var li1 = d3.select("ul").append("li");
li1.text("A new item has been added!");

// Use chaining to create a new element and set its text
var li2 = d3.select("ul").append("li").text("Another new item!");




// Updating a table based on a separate data.js file
// from 14_Intro_Javascript > class 3 > 03_Evr_D3_table
// Get a reference to the table body
var tbody = d3.select("tbody");
data.forEach((weatherReport) => {
    var row = tbody.append("tr");
    Object.entries(weatherReport).forEach(([key, value]) => {
      var cell = row.append("td");
      cell.text(value);
    });
  });




// Button click
// from 14_Intro_Javascript > class 3 > 04_Event_Listeners

//HTML
<button id="click-me">Click Me!</button> 
<input id="input-field" type="text"></input> 

//JS
var button = d3.select("#click-me");
var inputField = d3.select("#input-field");

button.on("click", function() {
    console.log("Hi, a button was clicked!");
    console.log(d3.event.target);
  });

inputField.on("change", function() {
    var newText = d3.event.target.value; //Note that this is how you get the value from the input field
    console.log(newText);
});  






// Note the . notation for the last word in the class title
<button type="button" class="btn btn-default btn-lg upvote"></button>
var upvote = d3.select(".upvote");




//THIS
d3.selectAll("button").on("click", function() {
  // What will be logged out? What is `this` in this case?
  console.log(this);
  // Answer: It will console log the `button` element.
});




// Input field
// from 14_Intro_Javascript > class 3 > 08_Ins-Forms
// HTML
<input class="form-control" id="example-form-input" name="example-form" type="text"></input>
//JS
button.on("click", function() {
  // Select the input element and get the raw HTML node
  var inputElement = d3.select("#example-form-input");
  // Get the value property of the input element
  var inputValue = inputElement.property("value"); //This is whatever user types into the input field




// from 16_D3 > class 1 > 01_EVR_Binding and 04_Enter_Exit
//Updates 3 existing to 5 new values
//HTML
<ul>
  <li class="original">Hi, I'm li1</li>
  <li class="original">Hi, I'm li2</li>
  <li class="original">Hi, I'm li3</li>
</ul>
//D3
var arr = [50, 55, 53, 56, 68];
selection = d3.select("ul").selectAll("li").data(arr); //Note that selectALl is IMPORTANT if you have multiple values 

selection.enter()
  .append("li")
  .merge(selection)
  .text(function(d) {
    return d;
    });

//Dynamically update for any amount of values    
//HTML
<div id="content">
  <div class="temps"></div>
  <div class="temps"></div>
  <div class="temps"></div>
</div>
//D3
function update(data) {

  var selection = d3.select("#content").selectAll(".temps")
        .data(data);

  selection.enter()
        .append("div")
        .classed("temps", true)
        .merge(selection)
        .style("height", function(d) {
          return d + "px";
        });

  selection.exit().remove();
}

/* Test 1 */
var austinTemps = [100, 103, 105, 110, 100, 98];
update(austinTemps);

/* Test 2 */
austinTemps = [80];
update(austinTemps);




//SVG (all directly in the HTML code)
<body>
    <svg width="1000" height="1000">
        <circle cx="50" cy="50" r="50" fill="gainsboro" />
        <circle cx="75" cy="75" r="10" fill="darkblue" />
        <circle cx="75" cy="75" r="3" fill="white" />
        <circle cx="130" cy="70" r="30" fill="gainsboro" />
        <circle cx="115" cy="80" r="10" fill="darkblue" />
        <circle cx="115" cy="80" r="3" fill="white" />
        
        <rect x="10" y="90" width="200" height="15" fill="brown" />
        <!--<line x1="5" y1="100" x2="40" y2="140" stroke="gray" stroke-width="5" />-->
    </svg>
</body>
//Note dynamic D3 SVG example in 16_D3 > class 1 > 07_EVR_D3_Bullseye




// from 16_D3 > class 1 > 02_Complex_Data
var complexData = [{
  title: "javascript",
  url: "https://media.giphy.com/media/10bdAP4IOmoN7G/giphy.gif"
},
{
  title: "python",
  url: "https://media.giphy.com/media/2yP1jNgjNAkvu/giphy.gif"
},
{
  title: "css",
  url: "https://media.giphy.com/media/TsxMkIKHpvFaU/giphy.gif"
}
];

d3.select(".img-gallery").selectAll("div")
  .data(complexData)
  .enter() // creates placeholder for new data
  .append("div") // appends a div to placeholder
  .classed("col-md-4 thumbnail", true) // sets the class of the new div
  .html(function(d) {
    return `<img src="${d.url}">`;
  }); // sets the html in the div to an image tag with the link





// from 16_D3 > class 1 > 03_Table
  var austinWeather = [{
    date: "2018-02-01",
    low: 51,
    high: 76
  };
  
  d3.select("tbody")
    .selectAll("tr")
    .data(austinWeather)
    .enter()
    .append("tr")
    .html(function(d) {
      return `<td>${d.date}</td><td>${d.low}</td><td>${d.high}</td>`;
      //Note the insertion of an entire row of tds
    });




// from 16_D3 > class 2 > 02_Loading_Data
// Load data from hours-of-tv-watched.csv
// Use: CMD > python -m http.server
d3.csv("./hours-of-tv-watched.csv", function(error, tvData) {
  if (error) return console.warn(error);

  console.log(tvData);

  // log a list of names
  var names = tvData.map(data => data.name);
  console.log("names", names);

  // Cast each hours value in tvData as a number using the unary + operator
  tvData.forEach(function(data) {
    data.hours = +data.hours; // Ensures that hours are read as numbers (shorthand for ParseInt)
    console.log("Name:", data.name);
    console.log("Hours:", data.hours);
  });
});





// from 16_D3 > class 2 > 03_Bar_CHart
// Note clean use of => functions
// for full bar chart w/ axes, see 16_D3 > class 2 > 06_Bar_CHart
chartGroup.selectAll(".bar")
    .data(tvData)
    .enter()
    .append("rect")
    .classed("bar", true)
    .attr("width", d => barWidth)
    .attr("height", d => d.hours * scaleY)
    .attr("x", (d, i) => i * (barWidth + barSpacing))
    .attr("y", d => chartHeight - d.hours * scaleY);





// from 16_D3 > class 2 > 04_Scaling
// Simple
var testScores = [50, 90, 95, 75, 85];
var yScale = d3.scaleLinear()
    .domain([0, 100])
    .range([0, 1000]);

console.log(`50 returns ${yScale(50)}`);
console.log(`75 returns ${yScale(75)}`);
console.log(`100 returns ${yScale(100)}`);

// Max and min
var svgHeight = 1000;
var yScale = d3.scaleLinear()
  .domain([0, d3.max(testScores)])
  .range([0, svgHeight]);

console.log(`50 returns ${yScale(50)}`);
console.log(`75 returns ${yScale(75)}`);
console.log(`95 returns ${yScale(95)}`);

// Extent
var yScale = d3.scaleLinear()
  .domain(d3.extent(testScores))
  .range([0, svgHeight]);

console.log(`50 returns ${yScale(50)}`);
console.log(`75 returns ${yScale(75)}`);
console.log(`95 returns ${yScale(95)}`);


// from 16_D3 > class 2 > 05_Axes
// ScaleBand
var dataCategories = ["one", "two", "three"];
var xScale = d3.scaleBand()
  .domain(dataCategories)
  .range([0, chartWidth])
  .padding(0.05);