// from data.js
var tableData = data;


// Append table row for each object in data
var newTable = d3.select("tbody");

tableData.forEach((sighting) => {
    var row = newTable.append("tr");
    Object.entries(sighting).forEach(([key, value]) => {
        var cell = row.append("td");
        cell.text(value);
    });
});


// filter data by date input
button = d3.select("#filter-btn");

button.on("click", function() {
    var dateInput = d3.select(".form-control").property("value");
    console.log(dateInput);

    // filter table date according to input date
    tableData = tableData.filter(sighting => sighting.datetime === dateInput);

    // clear previous table
    newTable.html("");

    tableData.forEach((sighting) => {
        var row = newTable.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    }); 

});