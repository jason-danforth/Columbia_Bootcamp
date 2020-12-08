//Bar Chart (or line chart)
// From 15_Interactive_Viz > 1 > 2_Basic_Plots
//HTML
<body>
    <div id="plot"></div>
    <script src="plots.js"></script>
</body>
//JS
var trace1 = {
  x: ["beer", "wine", "martini", "margarita",
      "ice tea", "rum & coke", "mai tai", "gin & tonic"],
  y: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
  type: "bar" //Just replace type with "line" and presto
};

var layout = {
  title: "'Bar' Chart",
  xaxis: { title: "Drinks"},
  yaxis: { title: "% of Drinks Ordered"} //Note the values within {}
};

Plotly.newPlot("plot", [trace1], layout); //NOTE: Plotly is referencing "plot" b/c of <div id="plot">
//If you have multiple traces that share an X value, just do [trace1, trace2]


// Pie Chart
// From 15_Interactive_Viz > 1 > 2_Basic_Plots
// NOTE: "labels" and "values" instead of "x" and "y"
var trace1 = {
    labels: ["beer", "wine", "martini", "margarita",
        "ice tea", "rum & coke", "mai tai", "gin & tonic"],
    values: [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6],
    type: 'pie'
  };
  
  var data = [trace1];
  
  var layout = {
    title: "'Bar' Chart",
  }; //You don't HAVE to create a layout object, buy don't include below (obviously)
  
  Plotly.newPlot("plot", data, layout);


// Scatter Plot
// From 15_Interactive_Viz > 1 > 4_Multi_Trace
var trace1 = {
    x: [1, 2, 3, 4, 5],
    y: randomNumbersBetween0and9(5),
    mode: "markers", 
    //"lines+markers" is default and doesn's need to be included
    //"lines" alone will just create a line chart
    //"markers" alone will create an actual scatter plot 
    type: "scatter"
  };


// Slicing & Sorting
// From 15_Interactive_Viz > 1 > 6_Sort_Slice
// High to Low
[2, 10, -120].sort(function (a, b) {
    return b - a;
   });
// Low to High
[2, 10, -120].sort(function (a, b) {
    return a - b;
   });
// Slicing
var names = ["Jane", "John", "Jimbo", "Jedediah"];
var left = names.slice(0, 2);
console.log(left);



// Sorting
// From 15_Interactive_Viz > 1 > 7_Hbar
// "data" is a long array of objects
data.sort(function(a, b) {
    return b.keyToSort - a.keyToSort; //In this example we're sorting "greekSearchResults"
});

var names = data.map(data => data.greekName);
var results = data.map(data => data.greekSearchResults);



