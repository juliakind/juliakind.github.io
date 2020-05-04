  // initialize data loading
  function init() {
    var menu = d3.select("#selDataset");
  
    // load data
    d3.json("samples.json").then((data)=> {
        console.log(data)
  
        // append ids
        data.names.forEach(function(name) {
          menu.append("option").text(name).property("value");
        });
  
        loadGraphs(data.names[0]);
        loadData(data.names[0]);
    });
  }

init();

function loadGraphs(id) {
    // load data 
    d3.json("samples.json").then((data)=> {
        console.log(data)
        var jsonData = data.metadata.filter(meta => meta.id.toString() === id)[0];
        var filteredData = data.samples.filter(s => s.id.toString() === id)[0];       
        //console.log(filteredData);
        var samplevalues = filteredData.sample_values.slice(0, 10).reverse();
        var OTU_top = (filteredData.otu_ids.slice(0, 10)).reverse();
        var otuIds = filteredData.otu_ids;
        var filteredValues = filteredData.sample_values;
        var OTU_id = OTU_top.map(d => "OTU " + d)
  
        // load 10 data points
        var labels = filteredData.otu_labels.slice(0, 10);
        //console.log(`OTU IDS: ${OTU_id}`)
  
        // barParams params
        var barParams = {
            x: samplevalues,
            y: OTU_id,
            text: labels,
            marker: {
            color: 'rgb(0, 0, 204)'},
            type:"bar",
            orientation: "h",
        };
  
        // create bar data variable
        var barData = [barParams];
  
        // bar params
        var barLayout = {
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 50,
                t: 100,
                b: 30
            }
        };
  
        // show bar plot
        Plotly.newPlot("bar", barData, barLayout);
        //console.log(otuIds)
      
        // bubble chart prarams
        var bubbleParams = {
            x: otuIds,
            y: filteredValues,
            mode: "markers",
            marker: {
                size: filteredValues,
                color: otuIds,
            },
            opacity: 0.5,
            text: filteredData.otu_labels
  
        };
  
        // set the layout for the bubble plot
        var bubbleLayout = {
            xaxis:{title: "OTU ID"},
            yaxis:{title: "Sample values"},
            height: 600,
            width: 1000
        };
  
        // creating data variable 
        var bubbleData = [bubbleParams];
  
        // show bubble plot
        Plotly.newPlot("bubble", bubbleData, bubbleLayout); 
  
      });
  }  
  // load data
  function loadData(id) {
    // read the samples.json
    d3.json("samples.json").then((data)=> {
        
        // get the metadata info for the demographic panel
        var metadata = data.metadata; 
        //console.log(metadata)

        var jsonData = metadata.filter(meta => meta.id.toString() === id)[0];
        //console.log(jsonData)

        var selectedData = d3.select("#sample-metadata");
        
        // clean demographic info module
        selectedData.html("");
  
        // grab the necessary demographic data data for the id and append the info to the panel
        Object.entries(jsonData).forEach((key) => {   
          selectedData.append("h5").text(key[0] + ": " + key[1] + "\n");    
        });
    });
  }
  
  // dropdown menu on change event
  function optionChanged(id) {
    loadGraphs(id);
    loadData(id);
  }