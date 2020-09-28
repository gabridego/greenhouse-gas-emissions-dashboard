/**
* Module permettant de générer une carte choroplèthe
* des émissions de gaz à effet de serre en fonction des
* pays considérés.
*
* 2020 - Notre super équipe :-)
*/

const zoom = d3.zoom()
.scaleExtent([1, 8])
.on("zoom", zoomed);

const width = 975;
const height = 610;
const legendCellSize = 20;
const colors = ['#d4eac7', '#c6e3b5', '#b7dda2', '#a9d68f', '#9bcf7d', '#8cc86a', '#7ec157', '#77be4e', '#70ba45', '#65a83e', '#599537', '#4e8230', '#437029', '#385d22', '#2d4a1c', '#223815']

// bounds of the map (for clipping)
const boundsMap = [70, 60]

// Last country clicked (= selected) on the map
var lastCountryClicked = undefined;

// Map projection parameters
const projection = d3.geoNaturalEarth1()
.scale(180)
.translate([(width - boundsMap[0]) / 2 + boundsMap[0], (height - boundsMap[1]) / 2 + boundsMap[1]])

const path = d3.geoPath()
.pointRadius(2)
.projection(projection);

/**
* Init tooltip to show pop-up for each country's own data.
* @param {*} location
*/
function init_tooltip(location) {

    var tooltip = location.append("g") // Group for the whole tooltip
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
    .attr("id", "text_emission")
    .attr("text-anchor", "middle")
    .style("fill", "929292")
    .text("CO₂ : ");

    text.append("tspan") // CO2 emission udpated by its id
    .attr("id", "tooltip-gas-emission")
    .style("fill","#c1d3b8")
    .style("font-weight", "bold");

    // TODO Create init graph on the tooltip

    return tooltip;
}

/**
* Resize the tooltip to container's transformations.
* @param {*} resize_factor
* @param {*} tooltip
*/

function resize_tooltip(resize_factor, tooltip){


    tooltip.select("polyline")
    .attr("points","0,0 "+210/resize_factor+",0 "+210/resize_factor+","+60/resize_factor+" 0,"+60/resize_factor+" 0,0")
    .style("stroke-width",1/resize_factor);

    tooltip.select("line")
    .attr("x1", 40/resize_factor)
    .attr("y1", 25/resize_factor)
    .attr("x2", 160/resize_factor)
    .attr("y2", 25/resize_factor)
    .attr("transform", "translate(0, "+5/resize_factor+")")
    .style("stroke-width",0.5/resize_factor);

    tooltip.select("text") // Text that will contain all tspan (used for multilines)
    .style("font-size", 13/resize_factor+"px")
    .attr("transform", "translate(0, "+20/resize_factor+")");

    d3.select("#tooltip-country") // Country name udpated by its id
    .attr("x", 105/resize_factor) // ie, tooltip width / 2
    .attr("y", 0)
    .style("font-size", 16/resize_factor+"px");

    d3.select("#text_emission") // Fixed text
    .attr("x", 105/resize_factor) // ie, tooltip width / 2
    .attr("y", 30/resize_factor);
    Object.keys(full_data).forEach(countryCode => {

        var countryPath = d3.select("#code"+countryCode);
        countryPath.on("mousemove", function() {
            var mouse = d3.pointer(event);
            tooltip.attr("transform", "translate(" + mouse[0] + "," + (mouse[1] - 75/resize_factor) + ")");
        });
    })


}

/**
* Init the map container with a legend, titles and countries drawn.
* @param {*} id_container
* @param {*} id_map
* @param {*} url_geojson
*/
function init_map() {

    return new Promise((resolve) => {

        // Create root svg element
        const svg = d3.select("#map").append("svg")
        .attr("id", "svg_zone")
        .attr("viewBox", [0, 0, width, height])
        .classed("svg-content", true)
        .on("click", reset);


        var g = svg.append("g")
        .attr("id", "g");

        // cGroup = countries group
        var cGroup = g.append("g")
        .attr("id", "cGroup");

        // Drawing the map

        // load geojson data
        var promises = [];
        promises.push(d3.json("https://gist.githubusercontent.com/djdmsr/c8ed350bc46ae193767c4591bc133e0b/raw/4e94db2536d4008c72fb24fa3b244d77a5f1f17b/world-countries-no-antartica.json"));

        Promise.all(promises).then(function(values) {
            // console.log(values);
            world = values[0];

            // Draw countries
            cGroup.append("g")
            .attr("cursor", "pointer")
            .selectAll("path")
            .data(world.features)
            .join("path")
            .on("click", clicked)
            .attr("d", path)
            .attr("id", d => "code" + d.id)
            .attr("fill", "gray");

            var tooltip = init_tooltip(g);

            Object.keys(full_data).forEach(countryCode => {
                // console.log(countryCode);

                var countryPath = d3.select("#code"+countryCode);
                countryPath.on("mouseover", function() {

                    tooltip.style("display", null);
                    tooltip.select("#tooltip-country")
                    .text(short_name_country(full_data[countryCode].country));

                })
                .on("mouseout", function() {
                    tooltip.style("display", "none");
                })
                .on("mousemove", function() {
                    var mouse = d3.pointer(event);

                    tooltip.attr("transform", "translate(" + mouse[0] + "," + (mouse[1] - 75) + ")");
                });
            })

            resolve("init completed");

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
        .attr('height', 10 + legendCellSize)
        .attr('width',  (width + 10) + 'px')
        .attr('x', 0)
        .attr('y', height - (5 + legendCellSize))
        .style("fill", "#FFFFFF");

        svg.call(zoom);

        init_legend();


    });

}


function reset() {
    const svg = d3.select("#svg_zone");
    const cGroup = d3.select("#cGroup");

    if (lastCountryClicked !== undefined) {
        // remove the border of the previously selected country
        lastCountryClicked.transition().style("stroke", null);
    }
    svg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
        );
    }

    function clicked(event, d) {
        const svg = d3.select("#svg_zone");
        const cGroup = d3.select("#cGroup");
        const [[x0, y0], [x1, y1]] = path.bounds(d);

        event.stopPropagation();

        if (lastCountryClicked !== undefined) {
            // remove the border of the previously selected country
            lastCountryClicked.transition().style("stroke", null);
        }

        // lastCountryClicked becomes the current clicked country
        lastCountryClicked = d3.select(this)
        // we set a red border to the current selected country
        lastCountryClicked.transition().style("stroke", "red");
        svg.transition().duration(750).call(
            zoom.transform,
            d3.zoomIdentity
            .translate(width / 2, height / 2)
            .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
            .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
            d3.pointer(event, svg.node())
            );
        }


        function zoomed(event) {
            const {transform} = event;
            const g = d3.select("#g");
            g.attr("transform", transform);

            g.attr("stroke-width", 1 / transform.k);
            // zooming the tooltip
            console.log("k "+transform.k);
            const tooltip_zoomed = d3.select("#tooltip");

            resize_tooltip(transform.k, tooltip_zoomed);

        }

        /**
        * Init legend
        */
        function init_legend() {
            const svg = d3.select("#svg_zone");

            // translation to set the legend on the outside
            // of the drawn map
            var legend = svg.append('g')
            .attr('transform', 'translate(40, 250)')
            .attr("id", "legend");

            legend.append("g")
            .attr("id", "legendAxis")

            // draw legend
            legend.selectAll()
            .data(d3.range(colors.length))
            .enter().append('svg:rect')
            .attr('height', legendCellSize + 'px')
            .attr('width', legendCellSize + 'px')
            .attr('x', 5)
            .attr('y', d => d * legendCellSize)
            .style("fill", d => colors[d]);

            // add "données non connues" legend
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
        }
        /**
        * Updates map data according to the year.
        * @param {*} year
        */

        // Fixed Tooltip for map interactions
        function update_map(year, currentFilter) {
            // TODO change countries colors according to gas emission.


            var tooltip = d3.select("#tooltip");

            Object.keys(full_data).forEach(c_code => {

                let idCode = "#code" + c_code;
                //console.log(d3.select(idCode));
                var color = "#999";
                if (full_data[c_code] && full_data[c_code][year] && full_data[c_code][year].total_ghg)
                {
                    color = colors[Math.floor(colors.length * (full_data[c_code][year][currentFilter] - full_data["global"][currentFilter+"_min"])/(full_data["global"][currentFilter+"_max"] - full_data["global"][currentFilter+"_min"]))];
                }
                d3.select(idCode)
                .attr("fill", color);
                var country_path = d3.select(idCode)
                country_path.attr("fill", color)
                .on("mouseover",function() {
                    tooltip.style("display", null);
                    tooltip.select("#tooltip-country")
                    .text(short_name_country(full_data[c_code].country));
                    tooltip.select("#tooltip-gas-emission")
                    .text(Math.round(full_data[c_code][year].co2*100)/100);
                    //Event listener
                    var toolgazemi = tooltip.select("#tooltip-gas-emission");
                    toolgazemi.on('dataUpdateEvent', function(e){
                        document.getElementById("tooltip-gas-emission").innerHTML = Math.round(full_data[c_code][e.detail].co2*100)/100;

                    });

                });
            })

        }

        function short_name_country(name) {
            return name.replace("Democratic", "Dem.").replace("Republic", "Rep.");
        }

        /**
        * Update legend (compute min/max by year and adapt the legend)
        * @param {*} year
        */
        function update_legend(year) {
            // Compute min/max values for the legend scale
            var min, max;
            var first = 0;


            // TODO
            Object.keys(full_data).forEach(function(key, index) {
                if (first == 0) {
                    if (full_data[key][year] && full_data[key][year].total_ghg) {
                        min = max = full_data[key][year].total_ghg;
                        first++;
                    }
                } else {
                    if (full_data[key][year] && full_data[key][year].total_ghg) {
                        if (full_data[key][year].total_ghg < min) {
                            min = full_data[key][year].total_ghg;
                        }

                        if (full_data[key][year].total_ghg > max) {
                            max = full_data[key][year].total_ghg;
                        }
                    }
                }

            });


            // Draw legend
            // TODO: Choisir coorrectement les couleurs de la légende

            const legendAxis = d3.select("#legendAxis");
            legendAxis.empty();


            let legendScale = d3.scaleLinear().domain([min, max])
            .range([0, colors.length * legendCellSize]);

            legendAxis.attr("class", "axis")
            .call(d3.axisLeft(legendScale));
        }

        function setcolorcountry(year, id) {

        }
