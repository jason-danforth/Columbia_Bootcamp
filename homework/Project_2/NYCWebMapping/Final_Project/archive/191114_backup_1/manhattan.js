// MANHATTAN
// 3 if-else functions
// year built
// number of floors
// landuse code

// ceate map with starting coordinates
var map = L.map("map", {
    center: [40.7282, -74],
    zoom: 13,
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

// yearbuilt
function colorRamp(value_type, value) {

    if (value_type === "yearbuilt") {

        if (value >= 0 && value < 1600){
            return  "#FFFFFF";
        }
        else if (value >= 1600 && value < 1700){
            return "#ffecb3";
        }  
        else if (value >= 1700 && value < 1800){
            return "#ffd740";
        }
        else if (value >= 1800 && value < 1850){
            return "#ffab00";
        }
        else if (value >= 1850 && value < 1900){
            return "#ff6d00";
        }
        else if (value >= 1900 && value < 1925){
            return "#ff8a80";
        }
        else if (value >= 1925 && value < 1950){
            return "#d50000";
        }
        else if (value >= 1950 && value < 1975){
            return "#ff4081";
        }
        else if (value >= 1975 && value < 2000){
            return "#f50057";
        }
        else if (value >= 2000 && value < 2025){
            return "#ad1457";
        }
        else {
            return "#FFFFFF";
        }
    };

    // numfloors
    if (value_type === "numfloors") {
        
        if (value >= 0 && value < 5){
            return  "#64ffda";
        }
        else if (value >= 5 && value < 10){
            return "#00bfa5";
        }  
        else if (value >= 10 && value < 20){
            return "#00e5ff";
        }
        else if (value >= 20 && value < 30){
            return "#00b0ff";
        }
        else if (value >= 30 && value < 40){
            return "#304ffe";
        }
        else if (value >= 40 && value < 50){
            return "#6200ea";
        }
        else if (value >= 50 && value < 60){
            return "#aa00ff";
        }
        else if (value >= 60 && value < 300){
            return "#e404fb";
        }
        else {
            return "#FFFFFF";
        }
    };

     // landuse
    if (value_type === "landuse") {
        
        if (value == 1){ // one & two family buildings
            return  "#ffe57f";
        }
        else if (value == 2){ // multi-family walk-up buildings
            return "#ff9100";
        }  
        else if (value == 3){ // multi-family elevator buildings
            return "#bf360c";
        }
        else if (value == 4){ // mixed residential & commercial buildings
            return "#ff5252";
        }
        else if (value == 5){ // commercial & office buildings
            return "#c51162";
        }
        else if (value == 6){ // industrial & manufacturing
            return "#7b1fa2";
        }
        else if (value == 7){ // transportation & utility
            return "#ba68c8";
        }
        else if (value == 8){ // public facilities & instutions
            return "#0d47a1";
        }
        else if (value == 9){ // open space & outdoor recreation
            return "#00bfa5";
        }
        else if (value == 10){ // parking facilities
            return "#607d8b";
        }
        else if (value == 11){ // vacant land
            return "#263238";
        }
        else { //other
            return "#eceff1";
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
                weight: .15
                };
            }
            }).addTo(map);
        });

    })
}
chooseColor("yearbuilt");

/*
// click on zip code
// map zooms in
// popup appears

// link to geojson zip code data
var link2 = "zipcodes.geojson";

var zipLayer = L.geoJson(link2);

    onEachFeature: function(feature, zipLayer) {
        // Set mouse events to change map styling
        zipLayer.on({
          // event listener
          // user's mouse touches a map feature
          // the mouseover event calls this function
          // that feature's opacity changes to 90% so that it stands out
          mouseover: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 0.5
            });
          },

          // another function, mouse no longer over it
          // cursor no longer hovers over a map feature 
          mouseout: function(event) {
            layer = event.target;
            layer.setStyle({
              fillOpacity: 1
            });
          },
          // feature (neighborhood) is clicked, it is enlarged to fit the screen
          // use these two together to get map to focus on specific area
          click: function(event) {
            map.fitBounds(event.target.getBounds());
          }
        });
        // Giving each feature a pop-up with information pertinent to it
        layer.bindPopup("<h5>" + feature.properties.zipcode + "</h5>");
  
      }
    }).addTo(map);
  });
 */
  

  /*
onEachFeature: function (feature, layer) {
    var popupcontent = [];
    for (var prop in feature.properties) {
        popupcontent.push(prop + ": " + feature.properties[prop]);
    }
    layer.bindPopup(popupcontent.join("<br />"));
}
*/


/*
var categories = {},
    category;
function onEachFeature(feature, layer) {
    layer.bindPopup(L.Util.template(popTemplate, feature.properties));
    category = feature.properties.category;
    // Initialize the category array if not already set.
    if (typeof categories[category] === "undefined") {
        categories[category] = [];
    }
    categories[category].push(layer);
}
*/
