// URL used as source of samples.json file  
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

// Assign variables for elements that will be edited 
let dropdown = document.getElementById('selDataset');
let panel = document.getElementById('sample-metadata');

// Set the layout for the charts
let barLayout = {
    height: 450,
    width: 800,
};


let bubbleLayout = {
    height: 600,
    width: 1500,
    xaxis: {
        title: 'OTU ID'
    }
};

// Fetch JSON data from URL
d3.json(url).then(function(data) {
 
    // Init function to display charts on browser open
    function init() {

        // Assign the sample data for the first subject to a variable 
        let firstSubject = data.samples[0];

        // Call getBarData and getBubble data to convert the first subject dictionary into Plotly-ready dictionaries 
        let barData = getBarData(firstSubject);
        let bubbleData = getBubbleData(firstSubject);

        // Plot horizontal bar chart and bubble chart
        Plotly.newPlot('bar', barData, barLayout);
        Plotly.newPlot('bubble', bubbleData, bubbleLayout);

        // Populate the dropdown menu that selects different test subjects.
        // The following code was adapted from a Stack Overflow thread: https://stackoverflow.com/questions/14473207/how-can-i-give-an-array-as-options-to-select-element 
        data.samples.forEach(item => dropdown.options.add(new Option (item.id)));
        
        // Add the metadata for the first subject to the panel element
        let firstSubjectAttr = data.metadata[0];
        Object.keys(firstSubjectAttr).forEach(function(key) {
            panel.innerHTML += `${key}: ${firstSubjectAttr[key]}<br>`;
        });

    };

    init();

});

// This function takes the dictionary structure for a single test subject and returns a dictionary that can be passed to Plotly to make a bar chart 
function getBarData(dict) {

    // Sort the samples from most prevalent to least prevalent
    let sorted = sortSamples(dict);

    // Assign variables for the top-ten sample values, along with their respective otu id's and otu labels
    let topSampleValues = sorted['sample_values'].slice(0, 10).reverse();
    let topOTUs = sorted['otu_ids'].slice(0, 10).reverse().map(item => `OTU ${item}`);
    let hoverText = sorted['otu_labels'].slice(0, 10).reverse();

    // Return the plot-ready dictionary
    return [{
        x: topSampleValues,
        y: topOTUs,
        text: hoverText,
        hovertemplate: '%{text}<extra></extra>',
        showlegend: false,
        type: 'bar',
        orientation: 'h'
    }]
};

// Define a function that we can call whenever we need to sort a dictionary of arrays 
function sortSamples(dict) {
    
    // Get the keys of the dictionary
    let keys = Object.keys(dict);
    
    // Sort the sample_values array
    dict['sample_values'].sort((x, y) => y - x);
    
    // Apply the same reordering to the other arrays.
    for (let i = 1; i < keys.length; i++) {
      let key = keys[i];
      dict[key] = dict['sample_values'].map((_, index) => dict[key][index]);
    }
    
    // Return the sorted dictionary
    return dict;
  
  };

// Similar to getBarData, this function takes the dictionary for a single test subject and returns a Plotly-ready dictionary
// This code was adapted from Plotly documentation: https://plotly.com/javascript/bubble-charts/
function getBubbleData(dict) {

    return [{
        x: dict.otu_ids,
        y: dict.sample_values,
        text: dict.otu_labels,
        hovertemplate: '%{text}<extra></extra>',
        showlegend: false,
        mode: 'markers',
        marker: {
            color: getBubbleColors(dict.otu_ids),
            size: dict.sample_values,
            sizeref: 1.25
        }
    }];

};

// This function assigns colors for the bubble chart, based on otu id's. 
function getBubbleColors(otu_ids) {
    let colorArray = [];
    otu_ids.forEach(function(item) {
        if (item < 1500) {
            colorArray.push('rgb(93, 164, 214)');
        } 
        else if (item < 2000) {
            colorArray.push('rgb(255, 144, 14)');
        } else if (item < 3000) {
            colorArray.push('rgb(44, 160, 101)');
        } 
        else {
            colorArray.push('rgb(255, 65, 54)');
        }
    });
    
    return colorArray;
};

// This function is triggered when the a selection is made from the test subject dropdown
function optionChanged(id) {

    // Reconnect to url and fetch json data
    d3.json(url).then(function(data) {

        // Filter json data where subject id is matching 
        let subject = data.samples.filter(item => item.id == id)[0];

        // Update Plotly charts
        updatePlotly(subject);

        // Update metadata displayed in the panel
        let subjectAttr = data.metadata.filter(item => item.id == id)[0];
        panel.innerHTML = '';
        Object.keys(subjectAttr).forEach(function(key) {
            panel.innerHTML += `${key}: ${subjectAttr[key]}<br>`;
        });

    });

};

// This function calls getBarData and getBubbleData to retrieve plot-ready information for a new test subject, then updates the charts 
function updatePlotly(dict) {
    barData = getBarData(dict);
    bubbleData = getBubbleData(dict);
    Plotly.react('bar', [barData[0]], barLayout);
    Plotly.react('bubble', [bubbleData[0]], bubbleLayout);
};



