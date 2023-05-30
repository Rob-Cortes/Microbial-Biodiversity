


// URL used as source of samples.json file  
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';

let samples = [];
let metadata = [];

d3.json(url).then(function(data) {
    data.samples.forEach(item => samples.push(item));
    data.metadata.forEach(item => metadata.push(item));
});

console.log(samples);



// // Fetch JSON data from URL
// d3.json(url).then(function(data) {
//     console.log(data.samples);

//     // Init function to display charts on browser open
//     function init() {

//         // Start with the first subject, and sort the dictionary using the sortSamples function defined below 
//         let firstSubject = sortSamples(data.samples[0]);
//         let plotData = getPlotData(firstSubject);

//         // Plot horizontal bar chart
//         Plotly.newPlot('bar', plotData);

//         // Populate the dropdown menu that selects different test subjects.
//         // The following two lines of code were adapted from a Stack Overflow thread: https://stackoverflow.com/questions/14473207/how-can-i-give-an-array-as-options-to-select-element 
//         let dropdown = document.getElementById('selDataset');
//         data.samples.forEach(item => dropdown.options.add(new Option (item.id)));

//     };

//     init();

//     // Define a function that updates the Plotly graph whenever a new test subject is selected (see optionChanged function below)
//     function updatePlotly(id) {
//         let subject = sortSamples(data.samples.filter(item => item.id == id));
//         plotData = getPlotData(subject);
//         Plotly.restyle('bar', 'x', [plotData.x]);
//         Plotly.restyle('bar', "y", [plotData.y]);
//     };
// });



// function getPlotData(dict) {
//     // Save the top-ten sample values and otu id's as variables
//     let topSampleValues = dict['sample_values'].slice(0, 10).reverse();
//     let topOTUs = dict['otu_ids'].slice(0, 10).reverse().map(item => `OTU ${item}`);

//     // Define plot information
//     return [{
//         x: topSampleValues,
//         y: topOTUs,
//         type: 'bar',
//         orientation: 'h'
//     }]
// };

// // If a different test subject is selected from the dropdown menu, update Plotly
// function optionChanged(id) {
//     updatePlotly(id);
// };

// // Define a function that we can call whenever we need to sort a dictionary of arrays 
// // The code in this function was adapted from a ChatGPT interaction. There is a screenshot of this interaction in the repo. 
// function sortSamples(dict) {
    
//   // Get the keys of the dictionary
//   let keys = Object.keys(dict);
  
//   // Sort the sample_values array
//   dict['sample_values'].sort((x, y) => y - x);
  
//   // Apply the same reordering to the other arrays.
//   for (let i = 1; i < keys.length; i++) {
//     let key = keys[i];
//     dict[key] = dict['sample_values'].map((_, index) => dict[key][index]);
//   }
  
//   return dict;

// };
  