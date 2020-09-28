const margin = {top: 60, right: 20, bottom: 150, left: 50},
barChartWidth = 350 - margin.left - margin.right ,
barChartHeight = 350 - margin.top - margin.bottom;

/*
Retrieve data.
*/
function getBarChartData(country_code, year) {
	var retrieved = full_data[country_code][year];
	var data = [
		{
			sector: "Agriculture",
			frequency: retrieved["Agriculture (GHG)"]
		},
		{
			//sector: "Manufacturing/Construction energy",
			sector: "Manufacturing/Construction",
			frequency: retrieved["Manufacturing/Construction energy (GHG)"]
		},
		{
			sector: "Buildings",
			frequency: retrieved["Buildings (GHG)"]
		},
		{
			sector: "Industry",
			frequency: retrieved["Industry (GHG)"]
		},
		{
			sector: "Elec & Heat",
			frequency: retrieved["Electricity & Heat (GHG)"]
		},
		{
		 	sector: "Transport",
		 	frequency: retrieved["Transport (GHG)"]
		},
		{
			//sector: "Fugitive from energy production",
			sector: "Fugitives",
			frequency: retrieved["Fugitive from energy production (GHG)"]
		}
	];

	data.forEach((item) => {
		if(item.frequency == "") {
			item.frequency = "0";
		}
	});


	data.sort((a, b) => (parseFloat(a.frequency) < parseFloat(b.frequency)) ? 1 : -1)
	return data;
}


//function getBarChartCH2()

function drawBarChart(country_code, year) {
    var data = getBarChartData(country_code, year);


	// var elem = document.getElementById("barChart");
	// console.log(elem)
	// if(elem) {
	//   var rect = elem.getBoundingClientRect();
	//   console.log("height: " + rect.height);
	// }




    const x = d3.scaleBand()
        .range([0, barChartWidth])
        .padding(0.1);

    const y = d3.scaleLinear()
        .range([barChartHeight, 0]);

    const svgBarchart = d3.select("#barChart").append("svg")
        .attr("id", "svgBarchart")
        .attr("width", barChartWidth + margin.left + margin.right)
        .attr("height", barChartHeight + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");



    // Mise en relation du scale avec les données de notre fichier
    // Pour l'axe X, c'est la liste des pays
    // Pour l'axe Y, c'est le max des frequencys
    x.domain(data.map(d => d.sector));
    y.domain([0, d3.max(data, d => parseFloat(d.frequency))]);

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
    // La hauteur par la fonction y en tenant compte de la frequency
    // La gestion des events de la souris pour le popup
		Object.keys(data).forEach(index =>{

			svgBarchart.append("rect")
				.attr("id", "bar"+ data[index].sector.slice(0,4))
				.attr("x", x(data[index].sector))
        .attr("width", x.bandwidth())
        .attr("y", y(data[index].frequency))
        .attr("height", barChartHeight - y(parseFloat(data[index].frequency)))
				.attr("class", "bar");

		})
	// svgBarchart.selectAll("bar")
  //       .data(data)
  //   		.enter().append("rect")
  //       .attr("class", "bar")
  //       .attr("x", d => x(d.sector))
  //       .attr("width", x.bandwidth())
  //       .attr("y", d => y(parseFloat(d.frequency)))
  //       .attr("height", d => height - y(parseFloat(d.frequency)));
        // .on("mouseover", function(d, e) {
        //     console.log(d, e);
        //     div.transition()
        //         .duration(200)
        //         .style("opacity", .9)
		// 		.style("left", d.pageX  + "px")
		// 		.style("top", d.pageY + "px");
        //     div.html("frequency : " + parseFloat(e.frequency))
        // })
        // .on("mouseout", function(d) {
        //     div.transition()
        //         .duration(500)
        //         .style("opacity", 0);
        // });


	// add bar value text
	// svg.selectAll("textvaleur")
	//    .data(data)
	//    .enter()
	//    .append("text")
	//    .text(function(d) {
	// 		return d.frequency;
	//    })
	//    .attr("text-anchor", "middle")
	//    .attr("x", function(d, i) {
	// 		return xScale(i) + x.rangeBand() / 2;
	//    })
	//    .attr("y", function(d) {
	// 		return height - 10;
	//    })
	//    .attr("font-family", "sans-serif")
	//    .attr("font-size", "11px")
	//    .attr("fill", "black");

}

/**
* Updates barChart data according to the year and country.
* @param {*} year
* @param {*} country_code
*/

function update_bar_chart(year, country_code){

	var data = getBarChartData(country_code, year);



	const svgBarchart = d3.select("#barChart")

  const x = d3.scaleBand()
      .range([0, barChartWidth])
      .padding(0.1);

  const y = d3.scaleLinear()
      .range([barChartHeight, 0]);

	x.domain(data.map(d => d.sector));
  	y.domain([0, d3.max(data, d => parseFloat(d.frequency))]);


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
			.attr("y", y(data[index].frequency))
			.attr("height", barChartHeight - y(parseFloat(data[index].frequency)))
			.attr("class", "bar");
	})


}
