const url = "https://api.spacexdata.com/v2/launchpads";

// Both of these functions do the same thing
// You don't need both

// Fetch the JSON data and console log it
d3.json(url).then(function(data) {
  console.log(data);
});

// Promise Pending
// const dataPromise = d3.json(url);
// console.log("Data Promise: ", dataPromise);
