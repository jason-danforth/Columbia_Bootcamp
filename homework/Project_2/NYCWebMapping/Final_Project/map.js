

//--------------------------Draw/Update Chart---------------------------------------------------------------------------------------------------------------------------------------


// Attribution: https://bl.ocks.org/tezzutezzu/c2653d42ffb4ecc01ffe2d6c97b2ee5e
// Description of transitions: https://jonsadka.com/blog/how-to-create-adaptive-pie-charts-with-transitions-in-d3

var myDuration = 1000;

var width = 425;
var height = 425;
var radius = Math.min(width, height) / 2;

var svg = d3.select(".chart").append("svg")
.attr("width", width)
.attr("height", height)
.append("g")
.attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

var outerRadius = 20


function change(response_obj) { 

    var pie = d3.pie()
        .value(function(d) { return d.count; })
        .sort(null);

    var arc = d3.arc()
        .innerRadius(radius - 100)
        .outerRadius(radius - outerRadius);

    var tool_tip = d3.tip()
        .attr("class", "d3-tip")
        .html(function(d) {`<h3>Hi there!</h3>`});
        //.html(function(d) {`<h3>${d.data.key}</h3>`});
        // svg.call(tool_tip);
    
    var path = svg.selectAll("path");
    var data0 = path.data();

    data1 = pie(response_obj.values); // These are the values for the zipcode: each unique value and their count [{0: {count: 200, val (i.e. landuse or year built): "6"}, 1: {count: 555, , val: "1"}, 2: {count: 200, , val: "11"}}]

    path = path.data(data1, key);   

    path.transition()
        .duration(myDuration)
        .attrTween("d", arcTween)

    path.enter()
        .append("path")
        .each(function(d, i) {
        var narc = findNeighborArc(i, data0, data1, key) ;
        if(narc) {          
            this._current = narc;
            this._previous = narc;
        } 
        else {          
            this._current = d;
        }}) 
        .attr("fill", function(d,i) { 
        return d.data.color
        })
        .style("stroke", "white")
        .transition()
        .duration(myDuration)
        .attrTween("d", arcTween)
        //.on('mouseover', tool_tip.show)
        //.on('mouseout', tool_tip.hide)
        //.on("mouseover", function(d) {return "hi!"})
        //(function(d) {`<h3>${d.data.key}</h3>`}) // ?????????????????
    
    path.exit()
        .transition()
        .duration(myDuration)
        .attrTween("d", function(d, index) {
            //var currentIndex = this._previous.data.val;
            var i = d3.interpolateObject(d,this._previous);
            return function(t) {
                return arc(i(t))
            }
        })
        .remove()

    firstTime = false;




    function key(d) {
        return d.data.val;
    }   
    
    function type(d) {
        d.count = +d.count;
        return d;
    }
    
    function findNeighborArc(i, data0, data1, key) {
        var d;
        if(d = findPreceding(i, data0, data1, key)) {
            var obj = cloneObj(d);
            obj.startAngle = d.endAngle;
            return obj;
        } 
        else if(d = findFollowing(i, data0, data1, key)) {
            var obj = cloneObj(d);
            obj.endAngle = d.startAngle;
            return obj;
        }
        return null
    }
    
    // Find the element in data0 that joins the highest preceding element in data1.
    function findPreceding(i, data0, data1, key) {
        var m = data0.length;
        while (--i >= 0) {
            var k = key(data1[i]);
            for (var j = 0; j < m; ++j) {
                if (key(data0[j]) === k) return data0[j];
            }
        }
    }
    
    // Find the element in data0 that joins the lowest following element in data1.
    function findFollowing(i, data0, data1, key) {
        var n = data1.length, m = data0.length;
        while (++i < n) {
        var k = key(data1[i]);
        for (var j = 0; j < m; ++j) {
            if (key(data0[j]) === k) return data0[j];
            }
        }      
    }
    
    function arcTween(d) {
        var i = d3.interpolate(this._current, d);
        this._current = i(0);
        return function(t) {
            return arc(i(t))
        }
    }
    
    function cloneObj(obj) {
        var o = {};
        for(var i in obj) {
            o[i] = obj[i];
        }
        return o;
    }
}
















//-------------------------Create Legend------------------------------------------------------------------------------------------------------------------------------------------------
// https://www.d3-graph-gallery.com/graph/custom_legend.html

function makeLegend(zipcode_dict) {

    // Clean previous legend
    var node = document.getElementsByClassName("legend")[0];
    node.innerHTML = "";

    // select the svg area
    var svgLegend = d3.select(".legend");
    
    // create a list of keys
    var legendKeys = zipcode_dict.values.map(data => data.val);
    var legendColors = zipcode_dict.values.map(data => data.color);

    // Add one dot in the legend for each name.
    var size = 15;
    var spacing = 1;
    var boxes = svgLegend.selectAll("mydots").data(legendKeys);
    
    boxes.enter()
        .append("rect")
        .merge(boxes)
        .attr("x", 100)
        .attr("y", function(d,i){ return i*(size + spacing)}) // 100 is where the first dot appears. 25 is the distance between dots
        .attr("width", size)
        .attr("height", size)
        .style("fill", function(d,i){ return legendColors[i]});

    
    // Add one dot in the legend for each name.
    svgLegend.selectAll("mylabels")
        .data(legendKeys)
        .enter()
        .append("text")
            .attr("x", 100 + size*1.2)
            .attr("y", function(d,i){ return i*(size + spacing) + (size/2)}) // 100 is where the first dot appears. 25 is the distance between dots
            .style("fill", function(d,i){ return legendColors[i]})
            .text(function(d){ return d})
            .attr("text-anchor", "left")
            .style("alignment-baseline", "middle");

    // Resize SVG to account for legend
    var svgHeight = legendKeys.length * (size + spacing);
    document.getElementsByClassName("legend")[0].setAttribute("height", `${svgHeight}px`);

}














//-----------------------------Aggregate Data------------------------------------------------------------------------------------------------------------------------------------------



// Take array of values for a given zipcode and return an object ("the aggregate")
// Object Keys are the unique values in the array, object Values are the counts for each key
function aggregator(arr) {
    var values = [], counts = [], colors=[], prev;

    // Populate arrays for "values" and "counts"
    arr.sort(function(a, b){return a-b});
    

    for (var i = 0; i < arr.length; i++) {
        if ( convertKeys(arr[i]) !== convertKeys(prev) ) {
            values.push(convertKeys(arr[i]));
            counts.push(1);
            colors.push(convertColors(valueType, arr[i]));
        } else {
            counts[counts.length-1]++;
        }
        prev = arr[i];
    }

    // Zip keys and values together
    var aggregate = {"key": zipCode, values:[]};
    
    for (var i = 0; i < values.length; i++) {
        aggregate.values[i] = {
            "count": counts[i],
            "val": values[i],
            "color": colors[i]
        };
    }
    
    return aggregate;
} 


function doTheThing() {
    console.log(zipCode);

    d3.csv("data.csv", function(error, data) {
        if (error) throw error;

        // "results" will be an array of all the landuse values for a given zipcode
        var results = [];
        data.forEach(function(row) {
            row.zipcode = +row.zipcode;
            row.yearbuilt = +row.yearbuilt;
            row.numfloors = +row.numfloors;
            row.landuse = +row.landuse;

            if (row.zipcode === zipCode) {
                results.push(row[valueType]);
            }
        });

        //---------------Aggregate the data---------------------------
        var zipcode_dict = aggregator(results);
        console.log(zipcode_dict);
        
        //---------------Update the legend----------------------------
        makeLegend(zipcode_dict);

        //---------------Plot chart based on zipcode_dict-------------
        change(zipcode_dict);
    })
}

















//--------------------------Manage Colors---------------------------------------------------------------------------------------------------------------------------------------

function convertColors(valueType, value) {

    // use valueType to select color range (different for land use vs. year built etc.)
    // convert value to specific color
    if (valueType === "yearbuilt") {
        if (value >= 0 && value < 1600) {
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
    if (valueType === "numfloors") {
        
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
    // Landuse
    if (valueType === "landuse") {
        
        if (value == 1){ // one & two family buildings
            return  "#FFDD80";
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














//--------------------------Manage Keys---------------------------------------------------------------------------------------------------------------------------------------

function convertKeys(value) {

    // use valueType to select color range (different for land use vs. year built etc.)
    // convert value to specific color
    if (valueType === "yearbuilt") {
        if (value >= 0 && value < 1600) {
            return  "< 1600";
        }
        else if (value >= 1600 && value < 1700){
            return "1600-1700";
        }  
        else if (value >= 1700 && value < 1800){
            return "1700-1800";
        }
        else if (value >= 1800 && value < 1850){
            return "1800-1850";
        }
        else if (value >= 1850 && value < 1900){
            return "1850-1900";
        }
        else if (value >= 1900 && value < 1925){
            return "1900-1925";
        }
        else if (value >= 1925 && value < 1950){
            return "1925-1950";
        }
        else if (value >= 1950 && value < 1975){
            return "1950-1975";
        }
        else if (value >= 1975 && value < 2000){
            return "1975-2000";
        }
        else if (value >= 2000 && value < 2025){
            return "> 2000";
        }
        else {
            return "Other";
        }
    };
    // numfloors
    if (valueType === "numfloors") {
        
        if (value >= 0 && value < 5){
            return  "< 5 floors";
        }
        else if (value >= 5 && value < 10){
            return "5-10 floors";
        }  
        else if (value >= 10 && value < 20){
            return "10-20 floors";
        }
        else if (value >= 20 && value < 30){
            return "20-30 floors";
        }
        else if (value >= 30 && value < 40){
            return "30-40 floors";
        }
        else if (value >= 40 && value < 50){
            return "40-50 floors";
        }
        else if (value >= 50 && value < 60){
            return "50-60 floors";
        }
        else if (value >= 60 && value < 300){
            return "> 60 floors";
        }
        else {
            return "Other";
        }
    };
    // landuse
    if (valueType === "landuse") {
        
        if (value == 1){ // one & two family buildings
            return  "1 & 2 Family Residential";
        }
        else if (value == 2){ // multi-family walk-up buildings
            return "Multi-Family Walk-up";
        }  
        else if (value == 3){ // multi-family elevator buildings
            return "Multi-Family Elevator";
        }
        else if (value == 4){ // mixed residential & commercial buildings
            return "Mixed Residential & Commercial";
        }
        else if (value == 5){ // commercial & office buildings
            return "Commercial & Office";
        }
        else if (value == 6){ // industrial & manufacturing
            return "Industrial & Manufacturing";
        }
        else if (value == 7){ // transportation & utility
            return "Transportation & Utility";
        }
        else if (value == 8){ // public facilities & instutions
            return "Public Facilities & Institutions";
        }
        else if (value == 9){ // open space & outdoor recreation
            return "Open Space & Outdoor Recreation";
        }
        else if (value == 10){ // parking facilities
            return "Parking";
        }
        else if (value == 11){ // vacant land
            return "Vacant Land";
        }
        else { //other
            return "Other";
        }
    };
}
















//------------------------Create Map-------------------------------------------------------------------------------------------------------------------------------------------

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
                    zipCode = +feature.properties.postalCode;
                    doTheThing();
                }
            });
            layer.bindPopup("<h3>" + feature.properties.postalCode + "</h3> <hr> <h5>" + feature.properties.borough + "</h5>");
        }
    }).addTo(map);
});















//------------------------add PLUTO geojson-------------------------------------------------------------------------------------------------------------------------------------------


// link GeoJSON data
var link = "man-limit-pluto.geojson"

function chooseColor(inputValue) {

    valueType = inputValue;

    d3.json(link, function(data) {
        // Vector Grid slicing: http://leaflet.github.io/Leaflet.VectorGrid/vectorgrid-api-docs.html
        // Options copied from: https://github.com/mapbox/geojson-vt#options
        // Updating based on function from: https://github.com/Leaflet/Leaflet.VectorGrid/issues/153 (see comment from JamesLMilner)

        var vectorTiles = L.vectorGrid.slicer(data, {
            maxZoom: 16,  // max zoom to preserve detail on; can't be higher than 24
            tolerance: 5, // simplification tolerance (higher means simpler)
            extent: 4096, // tile extent (both width and height)
            buffer: 0, //64  // tile buffer on each side
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
                        fillColor: convertColors(valueType, properties[valueType]),
                        stroke: true,
                        fillOpacity: 1
                        }
                    }
                  
                }
        })

        vectorTiles.addTo(map);
    })

    doTheThing();
}

















//-----------------------------Update and Run------------------------------------------------------------------------------------------------------------------------------------------------

// Read in value from HTML drop-down and recompute 
function handleZipChange(inputValue) {
    zipCode = +inputValue;
    doTheThing();
}

// Define value type (land use, year built, etc.) so that colors can be assigned
function defineValueType(inputValue) {
    valueType = inputValue;
    doTheThing();
}



var zipCode = 10001; //11697
var valueType = "landuse";

// Draw the map for the first time
chooseColor(valueType);

// Compute chart for the first time
doTheThing();
