// URL used as source of samples.json file  
const url = 'https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json';


d3.json(url).then(function(data) {
    console.log(data.samples);

    function init() {
        let firstSubject = data.samples[0];

        let plotData = [{
            x: firstSubject.sample_values.sort((x, y) => y - x).slice(0, 10),
            y: `OTU ${firstSubject.otu_ids.slice(0, 10)}`,
            type: 'bar',
            orientation: 'h'
        }]
        Plotly.newPlot('bar', plotData);

        // let indexOrder = {
        //     indexNumber: data.samples[0].sample_values.sort((x, y) => y - x).map((item, index) => index),
        //     sampleValue: data.samples[0].sample_values.sort((x, y) => y - x)
        // };

        // console.log(indexOrder);

    };

    init();
    

});