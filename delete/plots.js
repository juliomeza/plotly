// Enter the following line in the terminal to activate the server
// python -m http.server

function init() {
    // Select the dropdown menu with id 'selDataset'
    var selector = d3.select("#selDataset");
    // Read data from samples.json and store it into argument 'data'
    d3.json("samples.json").then((data) => {
      // console.log(data);
      // Assing names from the data.names
      var sampleNames = data.names;
      // For each element, a dropdown menu 'option' is appended
      // The text and value is the id (sample)
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  })}

init();

function optionChanged(newSample) {
    buildMetadata(newSample);
    //buildCharts(newSample);
  }

function buildMetadata(sample) {
    d3.json("samples.json").then((data) => {
      var metadata = data.metadata;
      var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
      var result = resultArray[0];
      var PANEL = d3.select("#sample-metadata");
  
      PANEL.html("");
      PANEL.append("h6").text('ID: ' + result.id);
      PANEL.append("h6").text('ETHNICITY: ' + result.ethnicity);
      PANEL.append("h6").text('GENDER: ' + result.gender);
      PANEL.append("h6").text('AGE: ' + result.age);
      PANEL.append("h6").text('LOCATION: ' + result.location);
      PANEL.append("h6").text('BBTYPE: ' + result.bbtype);
      PANEL.append("h6").text('WFREQ: ' + result.wfreq);
    });
  }


