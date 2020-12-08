function buildPlot() {
    /* data route */
  var url = "/api/pals";
    // @TODO: Build your plot here
    d3.json(url).then(function(response) {
      type_arr = response.map(data => data.petType);
      types = [];
      counts = [];

      function counter(arr) {
        arr.sort();
        for (var i = 0; i < arr.length; i++) {
          if (arr[i] !== prev) {

          }
        }
      };

      Plotly.plot("plot", trace)
    });
}

buildPlot();


