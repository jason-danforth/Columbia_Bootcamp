// Creating map object
var myMap = L.map("map", {
  center: [40.7, -73.95],
  zoom: 11
});

// Adding tile layer to the map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// TODO:

// Store API query variables
var baseURL = "https://data.cityofnewyork.us/resource/fhrw-4uyv.json?";
// Add the dates in the ISO formats
var date = "$where=created_date between '2019-11-06T01:58:01.000' and '2019-11-05T22:29:22.000'";
// Add the complaint type
var complaint = "&complaint_type=Rodent";
// Add a limit
var limit = "&$limit=1000";


// Assemble API query URL
//url = baseURL + date + complaint + limit
url = baseURL + complaint + limit

// Grab the data with d3
d3.json(url, function(response) {
  for (var i=0; i<response.length; i++) {
    var location = response[i].location;
    
    var complaint = response[i].complaint_type

    if (complaint === "Rodent") {
      if (location) {
        L.marker([location.coordinates[1], location.coordinates[0]]).addTo(myMap);
      }
    }
  }
});
  // Create a new marker cluster group

  // Loop through data

    // Set the data location property to a variable

    // Check for location property

      // Add a new marker to the cluster group and bind a pop-up

  // Add our marker cluster layer to the map
