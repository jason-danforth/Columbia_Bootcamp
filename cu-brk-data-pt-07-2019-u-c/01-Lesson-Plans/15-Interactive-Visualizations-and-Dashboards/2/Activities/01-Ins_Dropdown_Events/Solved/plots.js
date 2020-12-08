function asdf() {
  data = [{
    x: [1, 2, 3, 4, 5],
    y: [0, 0, 0, 0, 0] }];
  //var LINE = document.getElementById("plot");
  //Plotly.plot(LINE, data);
  Plotly.plot("plot", data);
}

function updatePlotly(newx, newy) {
  //var LINE = document.getElementById("plot");

  // Note the extra brackets around 'newx' and 'newy'
  //Plotly.restyle(LINE, "x", [newx]);
  //Plotly.restyle(LINE, "y", [newy]);
  Plotly.restyle("plot", "x", [newx]);
  Plotly.restyle("plot", "y", [newy]); //.restyle is required or you'll get new traces every time you change the dropdown
}

function getData(dataset) {

  // Initialize empty arrays to contain our axes
  var x = [];
  var y = [];

  // Fill the x and y arrays as a function of the selected dataset
  switch (dataset) {
  case "dataset1":
    x = [1, 2, 3, 4, 5];
    y = [0.1, 0.2, 0.3, 0.4, 0.5];
    break;
  case "dataset2":
    x = [10, 20, 30, 40, 50];
    y = [1, 10, 100, 1000, 10000];
    break;
  case "dataset3":
    x = [100, 200, 300, 400, 500];
    y = [10, 100, 50, 10, 0];
    break;
  default: // Note that this is the same as above, but is necessary to catch edge cases (it's like an else statement)
    x = [1, 2, 3, 4, 5];
    y = [0, 0, 0, 0, 0];
    break;
  }

  updatePlotly(x, y);
}

asdf();