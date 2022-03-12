function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("data/samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("data/samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");

    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("data/samples.json").then((data) => {
    //console.log(data);
    // 3. Create a variable that holds the samples array.
    var sampleSamples = data.samples;
    //console.log(sampleSamples);

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var resultArray = sampleSamples.filter(sampleObj => sampleObj.id == sample);
    //console.log(resultArray);

    //  5. Create a variable that holds the first sample in the array.
    var result = resultArray[0];
    console.log(result)

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = result.otu_ids;
    var otu_labels = result.otu_labels;
    var sample_values = result.sample_values;
    console.log('-------------------------------------');
    console.log(otu_ids);
    console.log(otu_labels);
    console.log(sample_values);

    //////////////////// ALL GOOD UNTIL HERE ////////////////////

    // 7. Create the yticks for the bar chart
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    // so the otu_ids with the most bacteria are last

    var yticks = otu_ids.slice(0,10);
    
    console.log(yticks);
    console.log(sample_values.slice(0,10));
    console.log(otu_labels.slice(0,10));

    // 8. Create the trace for the bar chart
    var barData = [{
      x: sample_values.slice(0,10).reverse(),
      y: ['OTU 1167', 'OTU 2859', 'OTU 482', 'OTU 2264', 'OTU 41', 'OTU 1189', 'OTU 352', '1OTU 89', 'OTU 2318', 'OTU 1977'].reverse(),
      hovertext: otu_labels.slice(0,10).reverse(),
      hoverinfo: "text",
      type: 'bar',
      orientation: "h"
    }];
    
    // 9. Create the layout for the bar chart
    var barLayout = {
      title: "Top 10 Bacteria Cultures Found"
    };
    // 10. Use Plotly to plot the data with the layout
    Plotly.newPlot('bar', barData, barLayout);
  });
}
