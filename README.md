# belly-button-challenge
This exercise is an interactive dashboard that explores the Belly Button Biodiversity dataset (http://robdunnlab.com/projects/belly-button-biodiversity/), which catalogs microbes according to operational taxonomic units, or OTUs.

The dashboard is designed to display the count of microbes observed in specific test subjects. We display the information in the form of a bar chart and a bubble chart.

# HTML
The index.html file contains the architecture of the page. Among the HTML elements are:

- A select element, used as a dropdown menu to see results for different test subjects. This element includes an event listener that allows us to update the charts when a new test subject is selected. 
- A class='panel' div, used to display metadata about the selected test subject.
- A class='bar' div where we display the Plotly bar chart.
- A class='bubble' div where we display the Plotly bubble chart. 

# Accessing JSON data
Using the D3 library's d3.json(url) function, we read in samples.json from the URL https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json.

Samples.json is structured as dictionary of three arrays, two of which we will use: 'samples' and 'metadata'. Each item in the 'samples' array is a dictionary with the findings of a specific test (i.e., test subject id, id's and labels for otu's observed, and the prevlanece of each otu observed). Therefore, the following code would log the findings for the first test:

const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';
d3.json(url).then(function(data) {console.log(data.samples[0])};

The output of the code above is: 
 {id: '940', otu_ids: Array(80), sample_values: Array(80), otu_labels: Array(80)}

If we replace data.samples[0] with data.metadata[0] we get the following output:
  {id: 940, ethnicity: 'Caucasian', gender: 'F', age: 24, location: 'Beaufort/NC', …}

The metadata for each test subject is displayed in the class='panel-body' div.

# Plotly Charts

We define functions that process the information for a given test subject (e.g., sorting and slicing), in preparation for plotting. These functions return dictionary structures that can be passed directly to Plotly.newPlot() or Plotly.react(). For example, the function getBarData() could be used as follows. 

// Fetch JSON data from URL and log the first object in the samples array
d3.json(url).then(function(data) {
    
    // Pass the information from the first test subject to getBarData(), which sort the microbes from most prevalent to least prevalent and show only the the top 10. The dictionary returned by this function also includes some formatting instructions for Plotly.  
    let barData = getBarData(data.samples[0]);
    
    // Plot the findings from the first test subject
    Plotly.newPlot('bar', barData);
};

We display the information by calling Plotly.newPlot() or Plotly.react(), while pointing to either the 'bar' or 'bubble' div in the html, as needed. 

![image](https://github.com/Rob-Cortes/belly-button-challenge/assets/124944383/c8eac572-5df9-4f1a-be30-cc63efe74ba2)
  
![image](https://github.com/Rob-Cortes/belly-button-challenge/assets/124944383/2eba486e-c94e-41ca-b9af-bf034e8b2688)


