/**
 * Module permettant de générer une carte choroplèthe
 * des émissions de gaz à effet de serre en fonction des
 * pays considérés.
 *
 * 2020 - Michel LECORSIER
 */


 function addTooltip(emplacement) {
     var tooltip = emplacement.append("g") // Group for the whole tooltip
         .attr("id", "tooltip")
         .style("display", "none");

     tooltip.append("polyline") // The rectangle containing the text, it is 210px width and 60 height
         .attr("points","0,0 210,0 210,60 0,60 0,0")
         .style("fill", "#222b1d")
         .style("stroke","black")
         .style("opacity","0.9")
         .style("stroke-width","1")
         .style("padding", "1em");

     tooltip.append("line") // A line inserted between country name and score
         .attr("x1", 40)
         .attr("y1", 25)
         .attr("x2", 160)
         .attr("y2", 25)
         .style("stroke","#929292")
         .style("stroke-width","0.5")
         .attr("transform", "translate(0, 5)");

     var text = tooltip.append("text") // Text that will contain all tspan (used for multilines)
         .style("font-size", "13px")
         .style("fill", "#c1d3b8")
         .attr("transform", "translate(0, 20)");

     text.append("tspan") // Country name udpated by its id
         .attr("x", 105) // ie, tooltip width / 2
         .attr("y", 0)
         .attr("id", "tooltip-country")
         .attr("text-anchor", "middle")
         .style("font-weight", "600")
         .style("font-size", "16px");

     text.append("tspan") // Fixed text
         .attr("x", 105) // ie, tooltip width / 2
         .attr("y", 30)
         .attr("text-anchor", "middle")
         .style("fill", "929292")
         .text("Emission CO2 : ");

     text.append("tspan") // CO2 emission udpated by its id
         .attr("id", "tooltip-gas-emission")
         .style("fill","#c1d3b8")
         .style("font-weight", "bold");

     return tooltip;
 }


/*
Creates a map with the complete data in it.
*/
function create_map(id_container, id_map, url_geojson) {
    const width = document.getElementById(id_container).offsetWidth * 0.95,
    height = 676,
    legendCellSize = 20,
    colors = ['#d4eac7', '#c6e3b5', '#b7dda2', '#a9d68f', '#9bcf7d', '#8cc86a', '#7ec157', '#77be4e', '#70ba45', '#65a83e', '#599537', '#4e8230', '#437029', '#385d22', '#2d4a1c', '#223815'];

    const svg = d3.select("#" + id_map).append("svg")
        .attr("id", "svg")
        .attr("width", width)
        .attr("height", height)
        .attr("class", "svg");

    const projection = d3.geoNaturalEarth1()
        .scale(1)
        .translate([0, 0]);

    const path = d3.geoPath()
        .pointRadius(2)
        .projection(projection);

    const cGroup = svg.append("g");

    // Ajout du titre
    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 25)
        .attr("text-anchor", "middle")
        .style("fill", "#000000")
        .style("font-weight", "300")
        .style("font-size", "16px")
        .text("Émissions de gaz à effet de serre dans le monde.");

    svg.append("text")
        .attr("x", (width / 2))
        .attr("y", 50)
        .attr("text-anchor", "middle")
        .style("fill", "#000000")
        .style("font-weight", "200")
        .style("font-size", "12px")
        .text("(source : Hannah Ritchie & Max Roser 2017 - CO₂ and Greenhouse Gas Emissions)");

    // Dessin de la légende
    // TODO: Choisir coorrectement les couleurs de la légende
    // TODO: Change min/max
    var legend = svg.append('g')
        .attr('transform', 'translate(40, 50)');

    legend.selectAll()
        .data(d3.range(colors.length))
        .enter().append('svg:rect')
            .attr('height', legendCellSize + 'px')
            .attr('width', legendCellSize + 'px')
            .attr('x', 5)
            .attr('y', d => d * legendCellSize)
            .style("fill", d => colors[d]);
    let min = 0
    let max = 160
    let legendScale = d3.scaleLinear().domain([min, max])
        .range([0, colors.length * legendCellSize]);

    let legendAxis = legend.append("g")
        .attr("class", "axis")
        .call(d3.axisLeft(legendScale));

    legend.append('svg:rect')
        .attr('y', legendCellSize + colors.length * legendCellSize)
        .attr('height', legendCellSize + 'px')
        .attr('width', legendCellSize + 'px')
        .attr('x', 5)
        .style("fill", "#999");

    legend.append("text")
        .attr("x", 30)
        .attr("y", 35 + colors.length * legendCellSize)
        .style("font-size", "13px")
        .style("color", "#000000")
        .style("fill", "#000000")
        .text("données non connues");

    // Dessin de la carte
    var promises = [];
    promises.push(d3.json(url_geojson));
    promises.push(basic_data);

    Promise.all(promises).then(function(values) {
        const data_world = values[0]
        const data_gas_per_country = values[1]

        let b = path.bounds(data_world);
        let s = .80 / Math.max((b[1][0] - b[0][0]) / width, (b[1][1] - b[0][1]) / height);
        let t = [(width - s * (b[1][0] + b[0][0])) / 2, (height - s * (b[1][1] + b[0][1])) / 2];

        projection
            .scale(s)
            .translate(t);

        cGroup.selectAll("path")
            .data(data_world.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("id", d => "code" + d.id)
            .attr("class", "country");

      //  Code test pour integrer les données
      console.log(" testeur .....");

      var map_control = addTooltip(svg);

      for(const pays in data_gas_per_country){
        var objectData = data_gas_per_country[pays];

        if (objectData.iso_code) {

          console.log("#code" + data_gas_per_country[pays].iso_code.slice(0,2));
          var countryPath = d3.select("#code" + data_gas_per_country[pays].iso_code.slice(0,2));
          countryPath.style("fill", "blue")
                    .on("mousover", function(d){
                        countryPath.style("fill", "");

          })
      }
    }


    }, (error) => {
        console.log(error); // erreur
    });
}


function update_map(data_json) {
    // Le traitement des données d'émissions est réalisé ici
}
