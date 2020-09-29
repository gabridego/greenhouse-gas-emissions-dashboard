const margin = {top: 60, right: 20, bottom: 150, left: 50},
barChartWidth = 350 - margin.left - margin.right ,
barChartHeight = 350 - margin.top - margin.bottom;


const x = d3.scaleBand()
    .range([0, barChartWidth])
    .padding(0.1);

const y = d3.scaleLinear()
    .range([barChartHeight, 0]);
/*
Retrieve data.
*/
function getBarChartGHG(country_code, year) {
	var retrieved = full_data[country_code][year];
	var data = [
		{
			sector: "Agriculture",
			emissions: retrieved["Agriculture (GHG)"]
		},
		{
			//sector: "Manufacturing/Construction energy",
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
            sector: "other fuel combustions",
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



function drawBarChart(country_code, year) {
    var data = getBarChartNO2(country_code, year);



    const svgBarchart = d3.select("#barChart").append("svg")
        .attr("id", "svgBarchart")
        .attr("width", barChartWidth + margin.left + margin.right)
        .attr("height", barChartHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    // Mise en relation du scale avec les données de notre fichier
    // Pour l'axe X, c'est la liste des pays
    // Pour l'axe Y, c'est le max des emissionss
    x.domain(data.map(d => d.sector));
    y.domain([0, d3.max(data, d => parseFloat(d.emissions))]);

    // Ajout de l'axe X au SVG
    // Déplacement de l'axe horizontal et du futur texte (via la fonction translate) au bas du SVG
    // Selection des noeuds text, positionnement puis rotation
    svgBarchart.append("g")
		.attr("id", "xAxis")
        .attr("transform", "translate(0," + barChartHeight + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

    // Ajout de l'axe Y au SVG avec 6 éléments de légende en utilisant la fonction ticks (sinon D3JS en place autant qu'il peut).
    svgBarchart.append("g")
		.attr("id", "yAxis")
        .call(d3.axisLeft(y).ticks(6));

    // Ajout des bars en utilisant les données de notre fichier data.tsv
    // La largeur de la barre est déterminée par la fonction x
    // La hauteur par la fonction y en tenant compte de la emissions
    // La gestion des events de la souris pour le popup
		Object.keys(data).forEach(index =>{

			svgBarchart.append("rect")
				.attr("id", "bar"+ data[index].sector.slice(0,4))
				.attr("x", x(data[index].sector))
        .attr("width", x.bandwidth())
        .attr("y", y(data[index].emissions))
        .attr("height", barChartHeight - y(parseFloat(data[index].emissions)))
				.attr("class", "bar");

		})
	// svgBarchart.selectAll("bar")
  //       .data(data)
  //   		.enter().append("rect")
  //       .attr("class", "bar")
  //       .attr("x", d => x(d.sector))
  //       .attr("width", x.bandwidth())
  //       .attr("y", d => y(parseFloat(d.emissions)))
  //       .attr("height", d => height - y(parseFloat(d.emissions)));
        // .on("mouseover", function(d, e) {
        //     console.log(d, e);
        //     div.transition()
        //         .duration(200)
        //         .style("opacity", .9)
		// 		.style("left", d.pageX  + "px")
		// 		.style("top", d.pageY + "px");
        //     div.html("emissions : " + parseFloat(e.emissions))
        // })
        // .on("mouseout", function(d) {
        //     div.transition()
        //         .duration(500)
        //         .style("opacity", 0);
        // });
}

/**
* Updates barChart data according to the year and country.
* @param {*} year
* @param {*} country_code
*/

function update_bar_chart(year, country_code){

	var data = getBarChartNO2(country_code, year);
    console.log(data);



	const svgBarchart = d3.select("#barChart")

  const x = d3.scaleBand()
      .range([0, barChartWidth])
      .padding(0.1);

  const y = d3.scaleLinear()
      .range([barChartHeight, 0]);

	x.domain(data.map(d => d.sector));
  	y.domain([0, d3.max(data, d => parseFloat(d.emissions))]);


	svgBarchart.select("#xAxis")
        .attr("transform", "translate(0," + barChartHeight + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")
            .style("text-anchor", "end")
			.style("color", "white")
			.style("font-size", "1.1em")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65) translate(5)");

    // Ajout de l'axe Y au SVG avec 6 éléments de légende en utilisant la fonction ticks (sinon D3JS en place autant qu'il peut).
    svgBarchart.select("#yAxis")
        .call(d3.axisLeft(y).ticks(6));



	Object.keys(data).forEach(index =>{

		d3.select("#bar"+ data[index].sector.slice(0,4))
			.attr("x", x(data[index].sector))
			.attr("width", x.bandwidth())
			.attr("y", y(data[index].emissions))
			.attr("height", barChartHeight - y(parseFloat(data[index].emissions)))
			.attr("class", "bar");
	})

}

/**
* Zomming the barchart with the tooltip
* @param {*} resize_factor_k
*/
function resize_bar_chart(resize_factor_k) {

// TODO

}
