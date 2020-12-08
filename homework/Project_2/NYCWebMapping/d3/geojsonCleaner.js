var link = "zip2.geojson";

d3.json(link2, function(data) {

    data.features.forEach(function(object) {
        console.log(object.properties.borough);
    })
})