const width = 975;
const height = 610;
legendCellSize = 20,
colors = ['#d4eac7', '#c6e3b5', '#b7dda2', '#a9d68f', '#9bcf7d', '#8cc86a', '#7ec157', '#77be4e', '#70ba45', '#65a83e', '#599537', '#4e8230', '#437029', '#385d22', '#2d4a1c', '#223815'];

const svg = d3.select("#map").append("svg")
    .attr("viewBox", [0, 0, width, height])
    .on("click", reset);

const g = svg.append("g");

const boundsMap = [70, 60]
const projection = d3.geoNaturalEarth1()
    .scale(180)
    .translate([(width - boundsMap[0]) / 2 + boundsMap[0], (height - boundsMap[1]) / 2 + boundsMap[1]])

const path = d3.geoPath()
    .pointRadius(2)
    .projection(projection);

// Dessin de la carte
var cGroup = g.append("g")
var promises = [];
promises.push(d3.json("https://gist.githubusercontent.com/djdmsr/c8ed350bc46ae193767c4591bc133e0b/raw/4e94db2536d4008c72fb24fa3b244d77a5f1f17b/world-countries-no-antartica.json"));

Promise.all(promises).then(function(values) {
    console.log(values);
    world = values[0];

        cGroup = g.attr("cursor", "pointer")
            // .attr('transform', 'translate(40, 50)')
            .selectAll("path")
            .data(world.features)
            .join("path")
            .on("click", clicked)
            .attr("d", path)
            .attr("id", d => "code" + d.id)
            .attr("fill", function(d) { 
                console.log(d);
                //if (d.id == countryCode) { 
                    return colors[Math.floor(Math.random() * Math.floor(colors.length))];
                //} 
            });

        cGroup.append("title")
            .text(d => d.properties.name);

        //maybe can we delete it?
        g.append("path")
            .attr("fill", "none")
            .attr("stroke", "white")
            .attr("stroke-linejoin", "round")
            .attr("d", path(topojson.mesh(world, world.features, (a, b) => a !== b)));

}, (error) => {
    console.log(error); // erreur
});

// Draw clip rectangles
const clipRectangles = svg.append("g");
clipRectangles.append('svg:rect')
    .attr('height', height + "px")
    .attr('width', boundsMap[0] + 'px')
    .attr('x', 0)
    .attr('y', 0)
    .style("fill", "#FFFFFF");

clipRectangles.append('svg:rect')
    .attr('height', boundsMap[1] + "px")
    .attr('width',  width + 'px')
    .attr('x', 0)
    .attr('y', 0)
    .style("fill", "#FFFFFF");

clipRectangles.append('svg:rect')
    .attr('height', 10 + legendCellSize)
    .attr('width',  width + 'px')
    .attr('x', 0)
    .attr('y', height - (5 + legendCellSize))
    .style("fill", "#FFFFFF");

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
    .attr('transform', 'translate(40, 250)');

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

function reset() {
    cGroup.transition().style("stroke", null);
    svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
    );
}

function clicked(event, d) {
    const [[x0, y0], [x1, y1]] = path.bounds(d);
    event.stopPropagation();
    cGroup.transition().style("stroke", null);
    d3.select(this).transition().style("stroke", "red");
    svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
        d3.pointer(event, svg.node())
    );
}

const zoom = d3.zoom()
    .scaleExtent([1, 8])
    .on("zoom", zoomed);

svg.call(zoom);

function zoomed(event) {
    const {transform} = event;
    g.attr("transform", transform);
    g.attr("stroke-width", 1 / transform.k);
}