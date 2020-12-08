// ZIP CODE OUTLINES
// THEN ZOOM IN TO DETAIL

//ceate map with starting coordinates
var map = L.map("map", {
    center: [40.7831, -73.9712],
    zoom: 14,
});

map.options.minZoom = 13;
map.options.maxZoom = 16;

// // create map with mapbox GL if trying to rotate map
// var map = new mapboxgl.Map({
//     container: 'map',
//     style: 'mapbox://styles/mapbox/streets-v11',
//     center: [40.7831, -73.9712],
//     pitch: 0, // pitch in degrees
//     bearing: -15, // bearing in degrees
//     zoom: 14
//     });

//     // disable map rotation using right click + drag
// map.dragRotate.disable();
 
// // disable map rotation using touch rotation gesture
// map.touchZoomRotate.disableRotation();






//------------------------add Zip Code geojson-------------------------------------------------------------------------------------------------------------------------------------------

// Specify the layer for the zipcodes so that they show up on top
map.createPane('zipLayer');
map.getPane('zipLayer').style.zIndex = 690;

// link to zipcode data
var link2 = "zipcodes.geojson";

// outline by zipcode
d3.json(link2, function (data) {

    // Filter non-Manhattan zipcodes
    function boroughFilter(feature) {
        if (feature.properties.borough === "Manhattan") return true
      }

    L.geoJson(data, {
        // Style each feature (in this case a neighborhood)
        filter: boroughFilter,
        pane: "zipLayer",
        style: function (feature) {
            return {
                color: "white",
                fillOpacity: 0,
                weight: 1
            };
        },
        // on each feature
        onEachFeature: function (feature, layer) {
            // set mouse events to change map styling
            layer.on({
                // event listener
                mouseover: function (event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0.5,
                        weight: 4
                    });
                },
                // another function, mouse no longer over it
                mouseout: function (event) {
                    layer = event.target;
                    layer.setStyle({
                        fillOpacity: 0,
                        weight: 1
                    });
                },
                // When a feature (neighborhood) is clicked, it is enlarged to fit the screen
                click: function (event) {
                    map.fitBounds(event.target.getBounds());
                }
            });
            layer.bindPopup("<h3>" + feature.properties.postalCode + "</h3> <hr> <h5>" + feature.properties.borough + "</h5>");
        }
    }).addTo(map);
});














//------------------------Manage parcel colors-------------------------------------------------------------------------------------------------------------------------------------------

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












//------------------------add PLUTO geojson-------------------------------------------------------------------------------------------------------------------------------------------


// link GeoJSON data
var link = "../../PLUTO/man-limit-pluto.geojson"

function chooseColor(value_type) {

    d3.json(link, function(data) {
        // Vector Grid slicing: http://leaflet.github.io/Leaflet.VectorGrid/vectorgrid-api-docs.html
        // Options copied from: https://github.com/mapbox/geojson-vt#options
        // Updating based on function from: https://github.com/Leaflet/Leaflet.VectorGrid/issues/153 (see comment from JamesLMilner)

        var vectorTiles = L.vectorGrid.slicer(data, {
            maxZoom: 16,  // max zoom to preserve detail on; can't be higher than 24
            tolerance: 5, // simplification tolerance (higher means simpler)
            extent: 4096, // tile extent (both width and height)
            buffer: 64,   // tile buffer on each side
            debug: 0,     // logging level (0 to disable, 1 or 2)
            lineMetrics: false, // whether to enable line metrics tracking for LineString/MultiLineString features
            promoteId: null,    // name of a feature property to promote to feature.id. Cannot be used with `generateId`
            generateId: false,  // whether to generate feature ids. Cannot be used with `promoteId`
            indexMaxZoom: 16,       // max zoom in the initial tile index
            indexMaxPoints: 0, // max number of points per tile in the index
            vectorTileLayerStyles: {
                sliced: function(properties) { // CRITICALLY important to call function(properties) for sliced and then return the style options
                    return {
                        weight: 1,
                        color: "white",
                        opacity: 0.2,
                        fill: true,
                        fillColor: colorRamp(value_type, properties[value_type]),
                        stroke: true,
                        fillOpacity: 1
                        }
                    }
                  
                }
        })

        vectorTiles.addTo(map);
    })


}


chooseColor("landuse");