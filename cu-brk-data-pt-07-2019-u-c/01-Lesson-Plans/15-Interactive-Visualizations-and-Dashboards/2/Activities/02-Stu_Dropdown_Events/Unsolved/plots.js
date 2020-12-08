function init() {
  var data = [{
    values: [19, 26, 55, 88],
    labels: ["Spotify", "Soundcloud", "Pandora", "Itunes"],
    type: "pie"
  }];

  var layout = {
    height: 600,
    width: 800
  };

  Plotly.plot("pie", data, layout);
}

function updatePlotly(labels, values) {
  // YOUR CODE HERE
  // Use `Plotly.restyle` to update the pie chart with the newdata array
  Plotly.restyle("pie", "labels", [labels]);
  Plotly.restyle("pie", "values", [values]);
}

  // YOUR CODE HERE
  // create a select statement to select different data arrays (YOUR CHOICE)
  // whenever the dataset parameter changes. This function will get called
  // from the dropdown event handler.

function getData(dataset) {
  var labels = [];
  var values = [];

  switch(dataset) {
  case "values1":
    labels = ["tom", "jerry", "tweety"];
    values = [20, 30, 50];
    break;
  case "values2":
    labels = ["abc", "def", "ghi", "jkl"];
    values = [10, 20, 30, 40];
    break;
  case "values3":
    labels = ["111", "222", "333", "444"];
    values = [25, 25, 25, 25];
    break;
  default:
    labels = ["Spotify", "Soundcloud", "Pandora", "Itunes"];
    values = [19, 26, 55, 88];
    break;
  }

  updatePlotly(labels, values);
}


init();