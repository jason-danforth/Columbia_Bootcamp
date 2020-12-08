var arr = [50, 55, 53];



d3.select("ul").selectAll("li").data(arr);
//if you don't need to loop through the list and just want the data


d3.select("ul").selectAll("li").each(function(d, i) {
    console.log("element", this);
    console.log("data", d);
    console.log("index", i);
});
//.each() is the same as forEach(), just in D3
//if you enter two values into function(d, i), the first will be the object and the second will be the index
//"this" will return the entire object


d3.select("ul").selectAll("li").data(arr).text(function(d) {
    return d+1000;
});

d3.select("ul").selectAll("li").data(arr).text(function(d) {
    return d;
});



var arr = [50, 55, 53, 56, 68];
d3.select("ul").selectAll("li").data(arr).enter().append("li").text(function(d) {return d;});
// Note that this will create new li, but will not edit existing li
