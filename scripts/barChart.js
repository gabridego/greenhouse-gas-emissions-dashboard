/*
Retrieve data.
*/
function getBarChartData(sector, year) {
	var retrieved = gas_complete_data[sector][year];
	var data = [
		{
			sector: "Agriculture",
			frequency: retrieved["Agriculture (GHG)"]
		},
		{
			sector: "Manufacturing/Construction energy",
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
			sector: "Fugitive from energy production",
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

function drawBarChart(sectorCode, year) {
    var data = getBarChartData(sectorCode, year);


    const margin = {top: 20, right: 20, bottom: 90, left: 120},
        width = 800 - margin.left - margin.right,
        height = 400 - margin.top - margin.bottom;

    const x = d3.scaleBand()
        .range([0, width])
        .padding(0.1);

    const y = d3.scaleLinear()
        .range([height, 0]);

    const svg = d3.select("#chart").append("svg")
        .attr("id", "svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .append("g")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    const div = d3.select("body").append("div")
        .attr("class", "tooltip")
        .style("opacity", 0);



    // Mise en relation du scale avec les données de notre fichier
    // Pour l'axe X, c'est la liste des pays
    // Pour l'axe Y, c'est le max des frequencys
    x.domain(data.map(d => d.sector));
    y.domain([0, d3.max(data, d => parseFloat(d.frequency))]);

    // Ajout de l'axe X au SVG
    // Déplacement de l'axe horizontal et du futur texte (via la fonction translate) au bas du SVG
    // Selection des noeuds text, positionnement puis rotation
    svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x).tickSize(0))
        .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-65)");

    // Ajout de l'axe Y au SVG avec 6 éléments de légende en utilisant la fonction ticks (sinon D3JS en place autant qu'il peut).
    svg.append("g")
        .call(d3.axisLeft(y).ticks(6));

    // Ajout des bars en utilisant les données de notre fichier data.tsv
    // La largeur de la barre est déterminée par la fonction x
    // La hauteur par la fonction y en tenant compte de la frequency
    // La gestion des events de la souris pour le popup
    svg.selectAll("bar")
        .data(data)
    .enter().append("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.sector))
        .attr("width", x.bandwidth())
        .attr("y", d => y(parseFloat(d.frequency)))
        .attr("height", d => height - y(parseFloat(d.frequency)))
        .on("mouseover", function(d) {
            console.log(d);
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div.html("frequency : " + parseFloat(d.frequency))
                .style("left", (d3.event.pageX + 10) + "px")
                .style("top", (d3.event.pageY - 50) + "px");
        })
        .on("mouseout", function(d) {
            div.transition()
                .duration(500)
                .style("opacity", 0);
        });









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
