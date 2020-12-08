var apiKey = "5nHALTz37BNJas-imyxx";


//global Plotly
var url =
  `https://www.quandl.com/api/v3/datasets/WIKI/AMZN.json?start_date=2016-10-01&end_date=2017-10-01&api_key=${apiKey}`;


//Test the result format, just to see what you're working with
//The object is called "dataset", and the indices refer to columns under the "data" key, so accessing values for data is a little complicated
//Ex: dates = unpack(data.dataset.data, 0)
d3.json(url).then(function(data) {
  console.log(data);
});

/*
 * Helper function to select stock data
 * Returns an array of values
 * @param {array} data
 * @param {integer} index
 * index 0 - Date
 * index 1 - Open
 * index 2 - High
 * index 3 - Low
 * index 4 - Close
 * index 5 - Volume
 */

 function unpack(data, index) {
  return data.map(function(row) {
    return row[index];
  });
}

//Fetch data and build the timeseries plot
function buildPlot() {
  // @TODO: YOUR CODE HERE
  d3.json(url).then(function(data) { //I'll be honest, I don't really get what .then() is doing, but it's sure necessary...
    date = unpack(data.dataset.data, 0);
    high = unpack(data.dataset.data, 2);

    trace = {
      x: date,
      y: high,
      type: "line"
    };

    layout = {
      title: "Title",
      xaxis: {title: "X axis"},
      yaxis: {title: "Y axis"}
    };

    Plotly.newPlot("plot", [trace], layout);
  });
}

buildPlot();
