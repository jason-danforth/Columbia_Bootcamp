// Create a map object
var myMap = L.map("map", {
  center: [37.09, -95.71],
  zoom: 5
});

// Add a tile layer
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.streets",
  accessToken: API_KEY
}).addTo(myMap);

// City markers

// Add code to create a marker for each city below and add it to the map

// newyork;
var newyork = L.marker([40.73, -73.93], {
  draggable: true,
  title: "My First Marker"
}).addTo(myMap);
// Binding a pop-up to our marker
newyork.bindPopup("Hello New York!");

// chicago;
var chicago = L.marker([41.87, -87.63], {
  draggable: true,
  title: "My First Marker"
}).addTo(myMap);
// Binding a pop-up to our marker
chicago.bindPopup("Hello Chicago!");

// houston;
var houston = L.marker([29.76, -95.37], {
  draggable: true,
  title: "My First Marker"
}).addTo(myMap);
// Binding a pop-up to our marker
houston.bindPopup("Hello Houston!");

// la;
// omaha;