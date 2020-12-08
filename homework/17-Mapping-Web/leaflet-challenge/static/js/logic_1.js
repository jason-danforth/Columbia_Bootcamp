// Creating map object
var myMap = L.map("map", {
    center: [20, -0],
    zoom: 2
  });


// Add tile layer to the map
light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.light",
accessToken: API_KEY
}).addTo(myMap);
  

// Earthquake data
var URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"


// Query URL
d3.json(URL, function(response) {

    // reate array of all magnitudes to set scale
    var magnitudes = response.features.map(data => data.properties.mag);
    
    var colorRamp = d3.scaleLinear()
        .domain([d3.min(magnitudes), d3.max(magnitudes)])
        .range([d3.rgb("#0080FF"), d3.rgb('#FF0077')]);
        
    for (var i = 0; i < response.features.length; i++) {
        console.log(colorRamp(response.features[i].properties.mag));
        var location = [response.features[i].geometry.coordinates[1],
            response.features[i].geometry.coordinates[0]];

        L.circle(location, {
            fillOpacity: 0.75,
            weight: 1, 
            stroke: true,
            color: "white",
            fillColor: colorRamp(response.features[i].properties.mag),
            radius: response.features[i].properties.mag * 25000
        })
        .bindPopup("<h2>Magnitude: " + response.features[i].properties.mag + "</h2> <hr> <h3>Location: " + response.features[i].properties.place + "</h3>")
        .addTo(myMap);
    }

    console.log(magnitudes);

});





