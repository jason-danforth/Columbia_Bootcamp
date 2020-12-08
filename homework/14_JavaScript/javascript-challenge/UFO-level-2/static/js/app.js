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
    var dateInput = d3.select("#date").property("value").trim();
    var cityInput = d3.select("#city").property("value").trim();
    var shapeInput = d3.select("#shape").property("value").trim();
    console.log(dateInput)
    console.log(cityInput)
    console.log(shapeInput)
    console.log("_____________________")

 
    // filter table date according to input date
    function testDate(sighting) {
        if (sighting.datetime === dateInput || !dateInput) {
            return true
        }
        else {
            return false
        }
    };
    
    function testCity(sighting) {
        if (sighting.city === cityInput || !cityInput) {
            return true
        }
        else {
            return false
        }
    };

    function testShape(sighting) {
        if (sighting.shape === shapeInput || !shapeInput) {
            return true
        }
        else {
            return false
        }
    };

    newTableData = tableData.filter(sighting => 
        testDate(sighting) &&
        testCity(sighting) &&
        testShape(sighting)
        );
    
    console.log(`test function for dates: ${testDate(tableData[1])}`);
    console.log(`test function for cities: ${testCity(tableData[1])}`);
    console.log(`test function for shapes: ${testShape(tableData[1])}`);
    console.log(`test filter: ${testDate(tableData[0]) && testCity(tableData[0]) && testShape(tableData[0])}`);
    console.log(newTableData)

    // clear previous table
    newTable.html("");

    newTableData.forEach((sighting) => {
        var row = newTable.append("tr");
        Object.entries(sighting).forEach(([key, value]) => {
            var cell = row.append("td");
            cell.text(value);
        });
    }); 

});