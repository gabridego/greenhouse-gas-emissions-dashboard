/**
* Bar chart module.
*/


// global parmeters : chart dimensions
const margin = {top: 60, right: 20, bottom: 150, left: 50},
barChartWidth = 350 - margin.left - margin.right ,
barChartHeight = 350 - margin.top - margin.bottom;

const x = d3.scaleBand()
    .range([0, barChartWidth])
    .padding(0.1);

const y = d3.scaleLinear()
    .range([barChartHeight, 0]);



// Data used to initialise the bars and set their value to 0
const initData = [
    {
        sector: "Agriculture",
        emissions: "0"

    },
    {
        sector: "Fugitives",
        emissions: "0"
    },
    {
        sector: "Industry",
        emissions: "0"
    },
    {
        sector: "Waste",
        emissions: "0"
    },
    {
        sector: "Land-use and forestry",
        emissions: "0"
    },
    {
        sector: "Other fuel combustions",
        emissions: "0"
    },
    {
        sector: "Manufacturing/Construction",
        emissions: "0"
    },
    {
        sector: "Transport",
        emissions: "0"
    },
    {
        sector: "Elec & Heat",
        emissions: "0"
    },
    {
        sector: "Buildings",
        emissions: "0"
    },
    {
        sector : "Intll",
        emissions: "0"
    }
]


/**
* Returns list of ghg emissions per sector.
*/
function getBarChartGHG(country_code, year) {
	var retrieved = full_data[country_code][year];
	var data = [
		{
			sector: "Agriculture",
			emissions: retrieved["Agriculture (GHG)"]
		},
		{
			sector: "Manufacturing/Construction",
			emissions: retrieved["Manufacturing/Construction energy (GHG)"]
		},
		{
			sector: "Buildings",
			emissions: retrieved["Buildings (GHG)"]
		},
		{
			sector: "Industry",
			emissions: retrieved["Industry (GHG)"]
		},
		{
			sector: "Elec & Heat",
			emissions: retrieved["Electricity & Heat (GHG)"]
		},
		{
		 	sector: "Transport",
		 	emissions: retrieved["Transport (GHG)"]
		},
		{
			//sector: "Fugitive from energy production",
			sector: "Fugitives",
			emissions: retrieved["Fugitive from energy production (GHG)"]
		}
	];

	data.forEach((item) => {
		if(item.emissions == "") {
			item.emissions = "0";
		}
	});


	data.sort((a, b) => (parseFloat(a.emissions) < parseFloat(b.emissions)) ? 1 : -1)
	return data;
}


/**
* Returns list of CO2 emissions per sector.
*/
function getBarChartCO2(country_code, year) {
	var retrieved = full_data[country_code][year];
	var data = [
		{
			//sector: "Manufacturing/Construction energy",
			sector: "Manufacturing/Construction",
			emissions: retrieved["Manufacturing & Construction (CO2)"]
		},
		{
			sector: "Buildings",
			emissions: retrieved["Building (CO2)"]
		},
		{
			sector: "Industry",
			emissions: retrieved["Industry (CO2)"]
		},
		{
			sector: "Elec & Heat",
			emissions: retrieved["Electricity & Heat (CO2)"]
		},
		{
		 	sector: "Transport",
		 	emissions: retrieved["Transport (CO2)"]
		},
		{
			sector: "Fugitives",
			emissions: retrieved["Fugitive Emissions (CO2)"]
		},
        {
            sector : "Intl",
            emissions: retrieved["Intl aviation & shipping (CO2)"]
        },
        {
            sector : "Other Fuel Combution",
            emissions: retrieved["Other Fuel Combustion (CO2)"]
        }
	];

	data.forEach((item) => {
		if(item.emissions == "") {
			item.emissions = "0";
		}
	});


	data.sort((a, b) => (parseFloat(a.emissions) < parseFloat(b.emissions)) ? 1 : -1)
	return data;
}


/**
* Returns list of NO2 emissions per sector.
*/
function getBarChartNO2(country, year) {
    var retrieved = full_data[country][year];
    var data = [
        {
            sector: "Agriculture",
            emissions: retrieved["Agriculture (N2O)"]

        },
        {
            sector: "Fugitives",
            emissions: retrieved["Fugitive Emissions (N2O)"]
        },
        {
            sector: "Industry",
            emissions: retrieved["Industry (N2O)"]
        },
        {
            sector: "Waste",
            emissions: retrieved["Waste (N2O)"]
        },
        {
            sector: "Land-use and forestry",
            emissions: retrieved["Land-Use Change and Forestry (N2O)"]
        },
        {
            sector: "Other fuel combustions",
            emissions: retrieved["Other Fuel Combustion (N2O)"]
        }
    ]

    data.forEach((item) => {
		if(item.emissions == "") {
			item.emissions = "0";
		}
	});


	data.sort((a, b) => (parseFloat(a.emissions) < parseFloat(b.emissions)) ? 1 : -1)
	return data;

}


/**
* Returns list of CH4 emissions per sector.
*/
function getBarChartCH4(country, year) {
    var retrieved = full_data[country][year];
    var data = [
        {
            sector: "Agriculture",
            emissions: retrieved["Agriculture (CH4)"]

        },
        {
            sector: "Fugitives",
            emissions: retrieved["Fugitive Emissions (CH4)"]
        },
        {
            sector: "Industry",
            emissions: retrieved["Industry (CH4)"]
        },
        {
            sector: "Waste",
            emissions: retrieved["Waste (CH4)"]
        },
        {
            sector: "Land-use and forestry",
            emissions: retrieved["Land-Use Change and Forestry (CH4)"]
        },
        {
            sector: "Other fuel combustions",
            emissions: retrieved["Other Fuel Combustion (CH4)"]
        }
    ]

    data.forEach((item) => {
		if(item.emissions == "") {
			item.emissions = "0";
		}
	});


	data.sort((a, b) => (parseFloat(a.emissions) < parseFloat(b.emissions)) ? 1 : -1)
	return data;
}


/**
* Create the bars classes and initialise their value to 0.
*/
function drawBarChart(country_code, year, filter) {



    const svgBarchart = d3.select("#barChart").append("svg")
        .attr("id", "svgBarchart")
        .attr("width", barChartWidth + margin.left + margin.right)
        .attr("height", barChartHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    // Scale to our data
    x.domain(initData.map(d => d.sector));
    y.domain([0, d3.max(initData, d => parseFloat(d.emissions))]);


    // Draw X axis
    svgBarchart.append("g")
		.attr("id", "xAxis")
        .attr("transform", "translate(0," + barChartHeight + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

    // Draw Y axis
    svgBarchart.append("g")
		.attr("id", "yAxis")
        .call(d3.axisLeft(y).ticks(6));

    // Create bar classes with id specefic to each sector
	Object.keys(initData).forEach(index =>{
		svgBarchart.append("rect")
			.attr("id", "bar"+ initData[index].sector.slice(0,4))
			.attr("x", x(initData[index].sector))
            .attr("width", x.bandwidth())
            .attr("y", y(initData[index].emissions))
            .attr("height", barChartHeight - y(parseFloat(initData[index].emissions)))
			.attr("class", "bar");

		})
}



// set bars to zero
function reset_bars() {
    Object.keys(initData).forEach(index =>{
        d3.select("#bar"+ initData[index].sector.slice(0,4))
            .attr("height", 0)
            .attr("class", "bar");
    })
}





/**
* Updates bar chart data according to the year and country and filter.
* @param {*} year
* @param {*} country_code
*/
function update_bar_chart(year, country_code, filter){

    // retireve data
    if (filter === "methane"){data = getBarChartCH4(country_code, year);}
    else if (filter === "total_ghg"){data = getBarChartGHG(country_code, year);}
    else if (filter === "nitrous_oxide"){data = getBarChartNO2(country_code, year);}
    else if (filter === "co2"){data = getBarChartCO2(country_code, year);}
    else {console.log("Wrong filter");}

	const svgBarchart = d3.select("#barChart")

    const x = d3.scaleBand()
      .range([0, barChartWidth])
      .padding(0.1);

    const y = d3.scaleLinear()
      .range([barChartHeight, 0]);

	x.domain(data.map(d => d.sector));
  	y.domain([0, d3.max(data, d => parseFloat(d.emissions))]);


    // Draw axis
	svgBarchart.select("#xAxis")
        .transition().duration(800)
        .attr("transform", "translate(0," + barChartHeight + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")
            .style("text-anchor", "end")
			.style("color", "white")
			.style("font-size", "1.1em")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65) translate(5)");


    svgBarchart.select("#yAxis")
        .call(d3.axisLeft(y).ticks(6));


    reset_bars();

    // fill bars with our data to update the chart
	Object.keys(data).forEach(index =>{

		d3.select("#bar"+ data[index].sector.slice(0,4))
			.attr("y", y(data[index].emissions))
			.attr("height", barChartHeight - y(parseFloat(data[index].emissions)))
            .attr("width", x.bandwidth());

    	d3.select("#bar"+ data[index].sector.slice(0,4))
            .transition().duration(800)
            .attr("x", x(data[index].sector));
	})

}
