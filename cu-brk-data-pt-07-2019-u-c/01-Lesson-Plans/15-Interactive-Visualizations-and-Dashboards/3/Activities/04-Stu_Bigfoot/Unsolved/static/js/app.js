// /* data route */
// var url = "/data";

// function buildPlot() {
//     // YOUR CODE HERE
//     // fetch the data from your api
//     // plot the results
//     d3.json(url).then(function(response) {
//         var trace = [{
//             x: response.map(data => data.year),
//             y: response.map(data => data.sightings),
//             type: "bar"
//         }];

//         var layout = {
//             title: "Bigfoot",
//             xaxis: {type: "date"},
//             yaxis: {autorance: true, type: "linear"}
//         };

//         Plotly.newplot("plot", trace, layout);
//     });
// }

// buildPlot();



/* data route */
var url = "/data";

function buildPlot() {
  d3.json(url).then(function(response) {

    console.log(response);
    var trace = {
      type: "scatter",
      mode: "lines",
      name: "Bigfoot Sightings",
      x: response.map(data => data.year),
      y: response.map(data => data.sightings),
      line: {
        color: "#17BECF"
      }
    };

    var data = [trace];

    var layout = {
      title: "Bigfoot Sightings Per Year",
      xaxis: {
        type: "date"
      },
      yaxis: {
        autorange: true,
        type: "linear"
      }
    };

    Plotly.newPlot("plot", data, layout);
  });
}

buildPlot();
