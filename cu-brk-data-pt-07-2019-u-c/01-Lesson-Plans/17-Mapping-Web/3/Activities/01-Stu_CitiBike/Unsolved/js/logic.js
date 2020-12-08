//Need to run scripts from local server (python -m http.server)
//Can't just drop html into a browser


var newYorkCoords = [40.73, -74.0059];
var mapZoomLevel = 12;

// Create the createMap function
var map = L.map("map-id", {
  center: newYorkCoords,
  zoom: mapZoomLevel
});

  // Create the tile layer that will be the background of our map
  L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", 
  {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.streets",
    accessToken: API_KEY
  }).addTo(map);


  // Create a baseMaps object to hold the lightmap layer


  // Create an overlayMaps object to hold the bikeStations layer


  // Create the map object with options


  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map

// Create the createMarkers function
var newtry = "https://gbfs.citibikenyc.com/gbfs/en/station_information.json?$limit=1000";

// Pull the "stations" property off of response.data
d3.json(newtry, function(response) {

  console.log("Response:")
  console.log(response);
  console.log("______________________");

  // Initialize an array to hold bike markers
  // Loop through the stations array
    // For each station, create a marker and bind a popup with the station's name
    for (var i = 0; i < response.data.stations.length; i++) {
      var lat = response.data.stations[i].lat;
      var lon = response.data.stations[i].lon;
      
      if (lat) 
      {
        L.marker([lat, lon]).addTo(map);
      }

    }
    // Add the marker to the bikeMarkers array

  // Create a layer group made from the bike markers array, pass it into the createMap function


// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
  });