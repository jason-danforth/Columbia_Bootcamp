zipCode = 10001;


// Take array of values for a given zipcode and return an object ("the aggregate")
// Object Keys are the unique values in the array, object Values are the counts for each key
function aggregator(arr) {
    var keys = [], values = [], prev;

    arr.sort();
    for (var i = 0; i < arr.length; i++) {
        if ( arr[i] !== prev ) {
            keys.push(arr[i]);
            values.push(1);
        } else {
            values[values.length-1]++;
        }
        prev = arr[i];
    }

    // Zip keys and values together
    var aggregate = {};
    for (var i = 0; i < keys.length; i++) {
        aggregate[keys[i]] = values[i];
    }
    
    return aggregate;
} 


function doTheThing() {
    console.log(zipCode);

    d3.csv("zipcodes_landuse.csv", function(error, data) {
        if (error) throw error;

        // "results" will be an array of all the landuse values for a given zipcode
        var results = [];
        data.forEach(function(row) {
            row.zipcode = +row.zipcode;
            if (row.zipcode === zipCode) {
                results.push(row.landuse);
            }
        });

        console.log("Results: ", results);
        // --------------This is the guy right here--------------------
        var zipcode_dict = aggregator(results);
        console.log(zipcode_dict);

    })
}

// Read in value from HTML drop-down and recompute 
function getLandUse(inputValue) {
    zipCode = +inputValue;
    console.log("Running getLandUse function");
    doTheThing();
}


// Compute for the first time
doTheThing();