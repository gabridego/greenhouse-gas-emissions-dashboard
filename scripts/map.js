/**
 * Module permettant de générer une carte choroplèthe
 * des émissions de gaz à effet de serre en fonction des
 * pays considérés.
 * 
 * 2020 - Michel LECORSIER
 */

function create_map(id_container, id_map, url_geojson) {
    const width = document.getElementById(id_container).offsetWidth * 0.95,
    height = 500,
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
    promises.push(d3.json(url_geojson))
    
    Promise.all(promises).then(function(values) {
        data_world = values[0]
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
    }, (error) => {
        console.log(error); // erreur
    });
}

function update_map(data_json) {
    // Le traitement des données d'émissions est réalisé ici
}