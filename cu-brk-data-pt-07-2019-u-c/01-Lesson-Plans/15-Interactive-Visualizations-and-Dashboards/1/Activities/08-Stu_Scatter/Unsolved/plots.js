// YOUR CODE HERE
var long = data.long_jump;
var high = data.high_jump;
var discus = data.discus_throw;
var year = data.year;

trace1 = {
    x: year,
    y: long,
    type: "scatter",
    mode: "lines+markers"
};

trace2 = {
    x: year,
    y: high,
    type: "scatter",
    mode: "lines+markers"
};

trace3 = {
    x: year,
    y: discus,
    type: "scatter",
    mode: "lines+markers"
};

layout = {
    title: "Title",
    xaxis: {title: "X axis"},
    yaxis: {title: "Y axis"}
};

Plotly.newPlot("plot", [trace1, trace2, trace3], layout);
