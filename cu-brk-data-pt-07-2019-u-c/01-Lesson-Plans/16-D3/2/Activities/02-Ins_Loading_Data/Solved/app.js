// In order to load local files:
// open CMD from directory holding files
// run: python -m http.server
// navigate browser to http://127.0.0.1:8000/ (note that you can't copy and paste this out of the CMD b/c it's different...)
// PRESTO! it's that easy

//Actually, it's not that easy...
//http.server has caching, need to hit cntrl+f5 to refresh with cleared cache

// Load data from hours-of-tv-watched.csv
d3.csv("./hours-of-tv-watched.csv", function(error, tvData) {
  if (error) return console.warn(error);

  console.log("tvData: ", tvData);

  // log a list of names
  var names = tvData.map(data => data.name);
  console.log("names: ", names);

  // Cast each hours value in tvData as a number using the unary + operator
  tvData.forEach(function(data) {
    data.hours = +data.hours; // Ensures that hours are read as numbers (shorthand for ParseInt)
    console.log("Name:", data.name);
    console.log("Hours:", data.hours);
  });
});
