// Earthquake data
var URL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson"

// Query URL
d3.json(URL, function(response) {

    // reate array of all magnitudes to set scale
    var magnitudes = response.features.map(data => data.properties.mag);
    
    var colorRamp = d3.scaleLinear()
        .domain([d3.min(magnitudes), d3.max(magnitudes)])
        .range([d3.rgb("#0080FF"), d3.rgb('#FF0077')]);
    
    var earthQuakes = [];

    for (var i = 0; i < response.features.length; i++) {
        
        var location = [response.features[i].geometry.coordinates[1],
            response.features[i].geometry.coordinates[0]];

        earthQuakes.push(
            L.circle(location, {
                fillOpacity: 0.75,
                weight: 1, 
                stroke: true,
                color: "white",
                fillColor: colorRamp(response.features[i].properties.mag),
                radius: response.features[i].properties.mag * 25000
            }).bindPopup("<h2>Magnitude: " + response.features[i].properties.mag + "</h2> <hr> <h3>Location: " + response.features[i].properties.place + "</h3>")
        );
    }

    // Create empty geoJSON
    var plates = L.geoJSON();

    // Working with GeoJSON: https://leafletjs.com/examples/geojson/
    d3.json("/Static/GeoJson/PB2002_boundaries.json", function(response) {

        for (var i = 0; i < response.features.length; i++) {
            plates.addData(response.features[i]);
        }
    })

    // Add tile layer to the map
    var light = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "mapbox.light",
    accessToken: API_KEY
    });

    var streets = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
        attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
        maxZoom: 18,
        id: "mapbox.streets",
        accessToken: API_KEY
    });

    var baseMaps = {
        Light: light,
        Streets: streets
    };

    // Add the earthQuakes to a new layer group.
    var quakeLayer = L.layerGroup(earthQuakes);

    // Create overlay object to hold our overlay layer
    var overlayMaps = {
    Earthquakes: quakeLayer,
    Plates: plates
    };

    // Creating map object
    var myMap = L.map("map", {
        center: [20, -0],
        zoom: 2,
        layers: [light, quakeLayer]
    });

    // Create a layer control
    L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
    }).addTo(myMap);


});


