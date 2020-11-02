// set the dimensions and margins of the graph
      const width = 1000
      const height = 300
      const margin = { top: 180, bottom: 50, left: 50, right: 50}

// append the svg object to the body of the page
var svg = d3.select("#my_dataviz")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform",
          "translate(" + margin.left + "," + margin.top + ")");

//Read the data
d3.csv("https://raw.githubusercontent.com/mazm0002/FIT3179/main/data/US%20GDP.csv",

  // When reading the csv, I must format variables:
  function(d){
    return { Year : d3.timeParse("%d-%m-%Y")(d.Year), gdp : d.gdp }
  },

  // Now I can use this dataset:
  function(data) {

    // Add X axis --> it is a date format
    var x = d3.scaleTime()
      .domain(d3.extent(data, function(d) { return d.Year; }))
      .range([ 0, width ]);
    svg.append("g")
      .attr("transform", "translate(0," + height + ")")
      .call(d3.axisBottom(x));

    // Add Y axis
    var y = d3.scaleLinear()
      .domain([d3.min(data, function(d) { return +d.gdp; })-1, d3.max(data, function(d) { return +d.gdp; })+1])
      .range([ height, 0 ]);
    svg.append("g")
      .call(d3.axisLeft(y));

    // Add the line
    svg.append("path")
      .datum(data)
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", d3.line()
        .x(function(d) { return x(d.Year) })
        .y(function(d) { return y(d.gdp) })
        )
      
      svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width)
    .attr("y", height - 6)
    .text("Year");
      
     svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 6)
    .attr("x",-2)
    .attr("dy", ".75em")
    .attr("transform", "rotate(-90)")
    .text("Percentage change in GDP");
      
  const type = d3.annotationCustomType(
            d3.annotationXYThreshold, 
            {"note":{
                "lineType":"none",
                "orientation": "top",
                "align":"middle"}
            }
          )

var annotations = [ 
  {
            note: { label: "The Great Depression brought on by the bursting of the United States housing bubble.",
                   title:"2007"
                  },
            subject: {
              y1: margin.top,
              y2: height - margin.bottom+100
            },
            y: margin.top,
            data: { x: "01-01-2010"} //position the x based on an x scale
},
    {
            note: { label: "Recession due to the  disruption to global oil supply caused by Iranian Revolution",
                   title:"Early 1980s"
                  },
            subject: {
              y1: margin.top,
              y2: height - margin.bottom+160
            },
            y: margin.top,
            data: { x: "01-01-1985"} //position the x based on an x scale
},
  
          {
            note: { label: "Long expansionary period where incomes and employment rose, while poverty fell sharply.", 
              title:"1960s",
              lineType:"none", 
              // orientation: "leftRight", 
              "align": "middle" },
            className: "anomaly",
            type: d3.annotationCalloutCircle,
            subject: { radius: 50 },
            data: { x: "01/01/1968", y: -2},
            dx: 40,
            dy:-150
          }     
          
  
 
]
const makeAnnotations=d3.annotation().type(type)
            //Gives you access to any data objects in the annotations array
            .accessors({ 
              x: function(d){ return x(new Date(d.x))},
              y: function(d){ return y(d.y) }
            })
            .annotations(annotations)
            .textWrap(200)

d3.select("svg")
    .append("g")
    .attr("class", "annotation-group")
    .call(makeAnnotations)

})



