

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
function aggregator(value_type, zipcode, arr) {
    var values = [], counts = [], colors=[], prev;

    // Populate arrays for "values" and "counts"
    for(var i=0; i<arr.length; i++) arr[i] = +arr[i];
    
    arr.sort(function(a, b){return a-b});

    for (var i = 0; i < arr.length; i++) {
        if ( convertKeys(value_type, arr[i]) !== convertKeys(value_type, prev) ) {
            values.push(convertKeys(value_type, arr[i]));
            counts.push(1);
            colors.push(convertColors(value_type, arr[i]));
        } else {
            counts[counts.length-1]++;
        }
        prev = arr[i];
    }

    // Zip keys and values together
    var aggregate = {"key": zipcode, values:[]};
    
    for (var i = 0; i < values.length; i++) {
        aggregate.values[i] = {
            "count": counts[i],
            "val": values[i],
            "color": colors[i]
        };
    }
    
    return aggregate;
} 


function doTheThing(dictObj) {
    console.log("INSIDE THE JS");
    var zipcode = dictObj.zipcode;
    var value_type = dictObj.value_type;
    var values = dictObj.values.map(function(item) {
        return +item;
    });
    
    //---------------Aggregate the data---------------------------
    var zipcode_dict = aggregator(value_type, zipcode, values);
    console.log(zipcode_dict);
    
    //---------------Update the legend----------------------------
    makeLegend(zipcode_dict);

    //---------------Plot chart based on zipcode_dict-------------
    change(zipcode_dict);

}

















//--------------------------AJAX---------------------------------------------------------------------------------------------------------------------------------------

function updateZip(zipArg, dictObj) {

    var zipcode = zipArg;
    var valueType = dictObj["value_type"];

    console.log("_________________________________");
    console.log(zipcode);
    console.log(valueType);
    
    req = $.ajax({
        url: `/api/zipcode/${zipcode}`,
        type: "Post",
        data: {zipcode: zipcode, value_type: valueType} // Not sure the data is necessary (it's certainly not being used, since the necessary variable is in the route)
    });

    req.done(function(data) {
        doTheThing(data)
    });
}


function updateVal(zipArg, dictObj) {

    var zipcode = dictObj["zipcode"];
    var valueType = zipArg;

    console.log("_________________________________");
    console.log(zipcode);
    console.log(valueType);
    
    req = $.ajax({
        url: `/api/value_type/${valueType}`,
        type: "Post",
        data: {zipcode: zipcode, value_type: valueType}
    });

    req.done(function(data) {
        doTheThing(data);
        console.log(data);
    });
}













//--------------------------Manage Colors---------------------------------------------------------------------------------------------------------------------------------------

function convertColors(value_type, value) {

    // use valueType to select color range (different for land use vs. year built etc.)
    // convert value to specific color
    if (value_type === "yearbuilt") {
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
    // Landuse
    if (value_type === "landuse") {
        
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

function convertKeys(value_type, value) {

    // use valueType to select color range (different for land use vs. year built etc.)
    // convert value to specific color
    if (value_type === "yearbuilt") {
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
    if (value_type === "numfloors") {
        
        if (value >= 0.0 && value < 5.0){
            return  "0 < 5 floors";
        }
        else if (value >= 5.0 && value < 10.0){
            return "05-10 floors";
        }  
        else if (value >= 10.0 && value < 20.0){
            return "10-20 floors";
        }
        else if (value >= 20.0 && value < 30.0){
            return "20-30 floors";
        }
        else if (value >= 30.0 && value < 40.0){
            return "30-40 floors";
        }
        else if (value >= 40.0 && value < 50.0){
            return "40-50 floors";
        }
        else if (value >= 50.0 && value < 60.0){
            return "50-60 floors";
        }
        else if (value >= 60.0 && value < 300.0){
            return "61+ floors";
        }
        else {
            return "Other";
        }
    };
    // landuse
    if (value_type === "landuse") {
        
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














//-----------------------------Update and Run------------------------------------------------------------------------------------------------------------------------------------------------

// Read in value from HTML drop-down and recompute 
function handleZipChange(inputValue) {
    zipCode = +inputValue;
    doTheThing(data);
}

// Define value type (land use, year built, etc.) so that colors can be assigned
function defineValueType(inputValue) {
    valueType = inputValue;
    doTheThing(data);
}



//var zipCode = 10001; //11697
//var valueType = "landuse";


// Compute chart for the first time
//doTheThing(data);
