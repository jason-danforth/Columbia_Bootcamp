// test on East Village map
// 3 if-else functions
// year built
// number of floors
// landuse code

// ceate map with starting coordinates
var map = L.map("map", {
    center: [40.727927, -73.986305],
    zoom: 16
  });

// TURN OFF MAP TILE LAYER HERE
// map tile layer
/*
L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
  maxZoom: 18,
  id: "mapbox.light",
  fiilOpacity: .5,
  accessToken: API_KEY
}).addTo(map);
*/


// link GeoJSON data
var link = "pluto.geojson";


function colorRamp(value_type, value) {

    if (value_type === "yearbuilt") {
        
        if (value >= 0 && value < 1850){
            return  "#d8d6c4";
        }
        else if (value >= 1850 && value < 1900){
            return "#c6cbc6";
        }  
        else if (value >= 1850 && value < 1900){
            return "#aca590";
        }
        else if (value >= 1900 && value < 1920){
            return "#c1b473";
        }
        else if (value >= 1900 && value < 1920){
            return "#80885c";
        }
        else if (value >= 1920 && value < 1940){
            return "#757669";
        }
        else if (value >= 1940 && value < 1960){
            return "#80885c";
        }
        else if (value >= 1960 && value < 1980){
            return "#757669";
        }
        else if (value >= 1980 && value < 1990){
            return "#445c64";
        }
        else if (value >= 1990 && value < 2000){
            return "#8094a2";
        }
        else if (value >= 2000 && value < 2010){
            return "#786b71";
        }
        else if (value >= 2010 && value < 2020){
            return "#69545c";
        }
        else {
            return "#FFFFFF";
        }
    };

    if (value_type === "numfloors") {
        
        if (value >= 0 && value < 4){
            return  "#b09ac6";
        }
        else if (value >= 4 && value < 10){
            return "#848ac1";
        }  
        else if (value >= 10 && value < 20){
            return "#666086";
        }
        else if (value >= 20 && value < 30){
            return "#a3bee4";
        }
        else if (value >= 30 && value < 40){
            return "#7a94c5";
        }
        else if (value >= 40 && value < 50){
            return "#1e5998";
        }
        else if (value >= 50 && value < 60){
            return "#c6e5fa";
        }
        else if (value >= 60 && value < 70){
            return "#92cae3";
        }
        else if (value >= 70 && value < 80){
            return "#0084a9";
        }
        else if (value >= 80 && value < 500){
            return "#2c6698";
        }
        else {
            return "#FFFFFF";
        }
    };

    if (value_type === "landuse") {
        
        if (value == 1){
            return  "#FFCDD2";
        }
        else if (value == 2){
            return "#E57373";
        }  
        else if (value == 3){
            return "#F44336";
        }
        else if (value == 4){
            return "#D32F2F";
        }
        else if (value == 5){
            return "#C62828";
        }
        else if (value == 6){
            return "#B71C1C";
        }
        else if (value == 7){
            return "#C2185B";
        }
        else if (value == 8){
            return "#880E4F";
        }
        else if (value == 9){
            return "#9C27B0";
        }
        else if (value == 10){
            return "#6A1B9A";
        }
        else if (value == 11){
            return "#311B92";
        }
        else {
            return "#FFFFFF";
        }
    };
}

function chooseColor(value_type) {
    // "value_type" is yearbuilt, landuse, numfloors, etc.

    // Define start and end colors for colorRamp
    if (value_type === "yearbuilt") {
        var startColor = "#d8d6c4";
        var endColor = "#69545c";
    }
    else if (value_type === "landuse") {
        var startColor = "#FFCDD2";
        var endColor = "006600";
    }
    else {
        var startColor = "9999FF";
        var endColor = "000066";
    }
    
    d3.json(link, function(response) {
        // Create array of all values in neighborhood corresponding to value_type
        // var magnitudes = response.features.map(data => data.properties[value_type]);

        // var colorRamp = d3.scaleLinear()
        // .domain([d3.min(magnitudes), d3.max(magnitudes)])
        // .range([startColor, endColor]);
        
        // console.log(`Min. value: ${d3.min(magnitudes)}`);
        // console.log(`Max. value: ${d3.max(magnitudes)}`);
        // console.log(`Values: ${magnitudes}`);

        // grab GeoJSON data
        d3.json(link, function(data) {
            // creating a GeoJSON layer with the retrieved data
            // value of style property needs to be an anonymous function
            L.geoJson(data, {
            style: function(feature) {
                return {
                color: "black",
                // find this in our JSON
                fillColor: colorRamp(value_type, feature.properties[value_type]),
                fillOpacity: 1,
                weight: .25
                };
            }
            }).addTo(map);
        });

    })
}

chooseColor("yearbuilt");


// var yearBuiltLayer = L.geoJSON().addTo(map);
// var floorLayer = L.geoJSON().addTo(map);
// var landUseLayer = L.geoJSON().addTo(map);
// // link GeoJSON data
// var link = "pluto.geojson";


// YEAR BUILT
// grab GeoJSON data
// d3.json(link, function(data) {
//   // creating a GeoJSON layer with the retrieved data
//   // value of style property needs to be an anonymous function
//   L.geoJson(data, {
//     style: function(feature) {
//       return {
//         color: "black",
//         // find this in our JSON
//         fillColor: colorRamp(feature.properties[value_type]),
//         fillOpacity: 1,
//         weight: .25
//       };
//     }
//   }).addTo(map);
// });



// // NUMBER OR FLOORS
// // grab GeoJSON data
// d3.json(link, function(data) {
//     // creating a GeoJSON layer with the retrieved data
//     // value of style property needs to be an anonymous function
//     L.geoJson(data, {
//       style: function(feature) {
//         return {
//           color: "black",
//           // find this in our JSON
//           fillColor: chooseColorFloor(feature.properties.numfloors),
//           fillOpacity: 1,
//           weight: .25
//         };
//       }
//     }).addTo(map);
//   });
 


// // LAND USE
// // grab GeoJSON data
// d3.json(link, function(data) {
//     // creating a GeoJSON layer with the retrieved data
//     // value of style property needs to be an anonymous function
//     L.geoJson(data, {
//       style: function(feature) {
//         return {
//           color: "black",
//           // find this in our JSON
//           fillColor: chooseColorLand(feature.properties.landuse),
//           fillOpacity: 1,
//           weight: .25
//         };
//       }
//     }).addTo(map);
//   });

