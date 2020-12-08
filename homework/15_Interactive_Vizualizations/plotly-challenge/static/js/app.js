function buildMetadata(sample) {

  // @TODO: Complete the following function that builds the metadata panel

  // Use `d3.json` to fetch the metadata for a sample
  metaUrl = "/metadata/" + sample;

  panel = d3.select(".panel-body");
  panel.html("");

  d3.json(metaUrl).then(function(data) {
    Object.entries(data).forEach(([key, value]) => {
      console.log(`${key}: ${value}`);
      var cell = panel.append("p");
      cell.text(`${key}: ${value}`);
  
  

    // Use d3 to select the panel with id of `#sample-metadata`

    // Use `.html("") to clear any existing metadata

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.

    // BONUS: Build the Gauge Chart
    // buildGauge(data.WFREQ);
  
    var gauge = {
        domain: { x: [0, 1], y: [0, 1] },
        value: data.WFREQ,
        title: { 
          text: "Washing Frequency / Week", 
          font: { size: 24 } },
        type: "indicator",
        mode: "gauge+number",
        gauge: { 
          bar: { color: "darkblue" },
          axis: { range: [null, 9] },
          steps: [
            { range: [0, 1], color: 'rgb(0, 145, 194)' },
            { range: [1, 2], color: 'rgb(25, 165, 212)' },
            { range: [2, 3], color: 'rgb(48, 182, 227)' },
            { range: [3, 4], color: 'rgb(76, 197, 237)' },
            { range: [4, 5], color: 'rgb(108, 211, 245)' },
            { range: [5, 6], color: 'rgb(137, 218, 245)' },
            { range: [6, 7], color: 'rgb(168, 228, 247)' },
            { range: [7, 8], color: 'rgb(205, 237, 247)' },
            { range: [8, 9], color: 'rgb(235, 246, 250)' }
          ] 
        }
      };
    
    var layout = { 
      autosize: true
    };

    Plotly.newPlot("gauge", [gauge], layout);

  })
});
}



function buildCharts(sample) {
  url = "/samples/" + sample;
  
  // @TODO: Use `d3.json` to fetch the sample data for the plots
  
  // @TODO: Build a Bubble Chart using the sample data
  d3.json(url).then(function(data) {
    var bubble_totals = data.sample_values;
    var bubble_ids = data.otu_ids;
    var bubble_info = data.otu_labels;

    var bubble_trace = {
      x: bubble_ids,
      y: bubble_totals,
      mode: 'markers',
      text: bubble_info,
      marker: {
        size: bubble_totals,
        opacity: [0.8],
        color: bubble_ids,
        colorscale: [
          ['0.0', 'rgb(215, 48, 39'],
          ['1.0', 'rgb(69, 117, 180']
        ]
      }
    };

    var layout = {
      xaxis: {
        title: 'otu ids'
      },
      yaxis: {
        title: 'sample values'
      }
    };

    Plotly.newPlot("bubble", [bubble_trace], layout);

  });


  // @TODO: Build a Pie Chart
  // HINT: You will need to use slice() to grab the top 10 sample_values,
  // otu_ids, and labels (10 each).
  d3.json(url).then(function(data) {
    
    var pie_totals = data.sample_values.slice(0, 10);
    var pie_ids = data.otu_ids.slice(0, 10);
    var pie_info = data.otu_labels.slice(0, 10);

    var pie_trace = {
      labels: pie_ids,
      values: pie_totals,
      hole: .5,
      hovertemplate: pie_info,
      marker: {
        color: pie_totals,
        colorscale: [
          ['0.0', 'rgb(215, 48, 39'],
          ['1.0', 'rgb(69, 117, 180']
        ]
      },
      type: "pie"
    }; 

    var layout = {
      autosize: true,
      width: 500,
      height: 500,
      legend: {
        x: 1,
        y: 0.5
      },
      margin: {
        l: 10,
        r: 10,
        b: 0,
        t: 0,
        pad: 4
      }
    };

    Plotly.newPlot("pie", [pie_trace], layout);

  });
}

function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("/names").then((sampleNames) => {
    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    const firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildCharts(newSample);
  buildMetadata(newSample);
}

// Initialize the dashboard
init();
