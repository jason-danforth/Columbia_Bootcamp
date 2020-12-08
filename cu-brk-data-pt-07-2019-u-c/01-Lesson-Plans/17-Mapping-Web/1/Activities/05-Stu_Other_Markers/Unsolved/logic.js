// Create our initial map object
// Set the longitude, latitude, and the starting zoom level
var myMap = L.map("map").setView([39.8283, -98.5795], 5);

// Add a tile layer (the background map image) to our map
// Use the addTo method to add objects to our map
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: "pk.eyJ1IjoiamFzb24tZGFuZm9ydGgiLCJhIjoiY2syYjEwZzY1MXQ4dTNibzByeTVxdGdkNSJ9.77YDE0E7AwLjUoctWCDHeg"
}).addTo(myMap);

// Create a red circle over Dallas
L.circle([32.78, -96.79], {
  color: "red",
  fillColor: "red",
  fillOpacity: 0.15,
  radius: 100000,
  stroke: true,
  weight: 1
}).addTo(myMap);

// Connect a black line from NYC to Toronto
var line = [
  [40.71, -74.00],
  [43.65, -79.38]
];

L.polyline(line, {
  color: "black"
}).addTo(myMap);

// Create a purple polygon that covers the area in Atlanta, Savannah, Jacksonville and Montgomery
