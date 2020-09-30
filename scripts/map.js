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

const width = 995;
const height = 610;
const legendCellSize = 20;

function coloriation(index) {

  return "rgb(144," +(238-7*index)+ ",144)";

}

// const colors = [coloriation(0), coloriation(1), coloriation(2),coloriation(3), coloriation(4), coloriation(5), coloriation(6), coloriation(7), coloriation(8), coloriation(9), coloriation(10), coloriation(11), coloriation(12), coloriation(13), coloriation(14), coloriation(15)]
const colors = [];
var colorlength = 25;
for (var i = 0; i < 25; i++) {
  colors[i] = coloriation(i);
}

const width_tooltip = 375;
const height_tooltip = 350;

const viewbox_width = 120;

// bounds of the map (for clipping)
// const boundsMap = [90, 60]

// Last country clicked (= selected) on the map
var lastCountryClicked = undefined;

// Map projection parameters
const projection = d3.geoNaturalEarth1()
.scale(180)
.translate([width / 2, height / 2])

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
    .style("display", "none")
    .style("pointer-events", "none");

    tooltip.append("polyline") // The rectangle containing the text, it is 210px width and 60 height
    .attr("points","0,0 " + width_tooltip + ",0 " + width_tooltip + "," + height_tooltip + " 0," + height_tooltip + " 0,0")
    .style("fill", "#222b1d")
    .style("stroke","black")
    .style("opacity","0.9")
    .style("stroke-width","1")
    .style("padding", "1em");

    tooltip.append("line") // A line inserted between country name and score
    .attr("x1", 25)
    .attr("y1", 30)
    .attr("x2", 350)
    .attr("y2", 30)
    .style("stroke","#929292")
    .style("stroke-width","0.5")
    .attr("transform", "translate(0, 5)");

    var text = tooltip.append("text") // Text that will contain all tspan (used for multilines)
    .style("font-size", "13px")
    .style("fill", "#c1d3b8")
    .attr("transform", "translate(0, 20)");

    text.append("tspan") // Country name udpated by its id
    .attr("x", 375/2) // ie, tooltip width / 2
    .attr("y", 0)
    .attr("id", "tooltip-country")
    .attr("text-anchor", "middle")
    .style("font-weight", "600")
    .style("font-size", "16px");

    text.append("tspan") // Fixed text
    .attr("x", 375/2) // ie, tooltip width / 2
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
    tooltip.append("g")
    .attr("id", "barChart");

    drawBarChart("FR", "2000", currentFilter);

    return tooltip;
}

/**
* Init the map container with a legend, titles and countries drawn.
* @param {*} id_container
* @param {*} id_map
* @param {*} url_geojson
*/
function init_map(currentFilter) {
    return new Promise((resolve) => {
        // Create root svg element
        const svg = d3.select("#map").append("svg")
        .attr("id", "svg_zone")
        .attr("viewBox", [0, 0, width, height])
        .attr("width", "100%")
        .attr("height", "100%")
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
            .attr("fill", "#ff0000");

            var tooltip = init_tooltip(g);

            g.on("mousemove", function() {
                var mouse = d3.pointer(event);
                if(mouse[0] + 75 > width-width_tooltip){
                  tooltip.attr("transform", "translate(" + (mouse[0] - width/2) + "," + Math.min(mouse[1] - 75, height-height_tooltip) + ")");
                } else if(mouse[1] - 75 > height-height_tooltip) {
                  tooltip.attr("transform", "translate(" + Math.min(width-width_tooltip, mouse[0] + 75) + "," + (mouse[1] - height/2)+ ")");
                } else {
                  tooltip.attr("transform", "translate(" + Math.min(width-width_tooltip, mouse[0] + 75) + "," + Math.min(mouse[1] - 75, height-height_tooltip) + ")");
                }
            })

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
                });
            })

            resolve("init completed");

        }, (error) => {
            console.error(error); // erreur
        });

        svg.call(zoom);

        init_legend(currentFilter);
    });
}


function reset() {
    const svg = d3.select("#svg_zone");

    if (lastCountryClicked !== undefined) {
        // remove the border of the previously selected country
        lastCountryClicked.transition().style("stroke", null);
    }
    svg.transition().duration(750).call(zoom.transform, d3.zoomIdentity, d3.zoomTransform(svg.node()).invert([width / 2, height / 2]));
}

function clicked(event, d) {
    const svg = d3.select("#svg_zone");
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

    var zoomParams = d3.zoomIdentity
    .translate(width / 2, height / 2)
    .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
    .translate(-(x0 + x1) / 2, -(y0 + y1) / 2);

    svg.transition().duration(750).call(zoom.transform, zoomParams, d3.pointer(event, svg.node()));
}


function zoomed(event) {
    const {transform} = event;
    const cGroup = d3.select("#cGroup");
    cGroup.attr("transform", transform);
    cGroup.attr("stroke-width", 1 / transform.k);
}

/**
* Init legend
*/
function init_legend(currentFilter) {
    let svg = d3.select("#legend").append("svg")
        .attr("id", "svg_zone_legend")
        .attr("viewBox", [0, 0, viewbox_width, colorlength * legendCellSize + 20])
        .attr("width", "100%")
        .attr("height", "100%")
        .style("background-color", "white")
        .classed("svg-content", true);
    svg = d3.select("#svg_zone_legend");

    // translation to set the legend on the outside
    // of the drawn map
    var legend = svg.append('g')
    .attr("id", "legend");

    let legendScale = d3.scaleLinear().domain([full_data["global"][currentFilter + '_min'], full_data["global"][currentFilter + '_max']])
    .range([0, colors.length * legendCellSize]);

    legend.append("g")
    .attr("id", "legendAxis")
    .attr("class", "axis")
    .call(d3.axisLeft(legendScale));

    // draw legend
    legend.selectAll()
    .data(d3.range(colors.length))
    .enter().append('svg:rect')
    .attr('height', legendCellSize + 'px')
    .attr('width', legendCellSize + 'px')
    .attr('x', viewbox_width - legendCellSize)
    .attr('y', d => d * legendCellSize)
    .style("fill", d => colors[d]);

    legend.append("text")
    .attr('transform', "rotate(-90)")
    .append("tspan")
    .attr('x', -375)
    .attr('y', 25)
    .attr("id", "legend_mesure")
    .style("font-weight", "600")
    .style("font-size", "20px").text(" en millions de tonnes éq. CO₂ ");


    svg = d3.select("#legend_bottom").append("svg")
        .attr("id", "svg_zone_legend_bottom")
        .attr("viewBox", [0, 0, width, legendCellSize])
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("style", "background-color: white")
        .classed("svg-content", true);
    svg = d3.select("#svg_zone_legend_bottom");

    var legendbottom = svg.append('g')
    // .attr('transform', 'translate(10, 10)')
    .attr("id", "legend_bottom");

    // add "données non connues" legend
    legendbottom.append('svg:rect')
    .attr('y', 0)
    .attr('height', legendCellSize + 'px')
    .attr('width', legendCellSize + 'px')
    .attr('x', 0)
    .style("fill", "#FF0000");

    legendbottom.append("text")
    .attr("x", 30)
    .attr("y", 15)
    .style("font-size", "13px")
    .style("color", "#000000")
    .style("fill", "#000000")
    .text("données non connues");
}

function update_legend(currentFilter) {
    const legendAxis = d3.select("#legendAxis");
    legendAxis.empty();

    let legendScale = d3.scaleLinear().domain([full_data["global"][currentFilter + '_min'], full_data["global"][currentFilter + '_max']])
    .range([0, colors.length * legendCellSize]);

    legendAxis.attr("class", "axis")
    .attr("transform", "translate(" + (viewbox_width - legendCellSize - 5)  + ", 0)")
    .call(d3.axisLeft(legendScale));
}

/**
 * Returns the text with the qty of gas emissions for the
 * toolip.
 * @param {*} year current year
 * @param {*} filter filter (gas selected)
 * @param {*} c_code country code
 */
function get_string_emissions(year, filter, c_code) {
    // WARNING: some countries does not have full_data[c_code][year] defined!!
    if (full_data[c_code][year] !== undefined) {
        qte_emissions = Math.round(full_data[c_code][year][filter] * 100) / 100;
        return qte_emissions + " millions de tonnes éq. CO₂";
    } else {
        return "Données non fournies."
    }
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
        var color = "#FF0000";
        if (full_data[c_code] && full_data[c_code][year] && full_data[c_code][year][currentFilter]) {
            color = colors[Math.floor((colors.length - 1) * (full_data[c_code][year][currentFilter] - full_data["global"][currentFilter+"_min"])/(full_data["global"][currentFilter+"_max"] - full_data["global"][currentFilter+"_min"] ))];
        }
        d3.select(idCode)
        .attr("fill", color);
        var country_path = d3.select(idCode);

        country_path.on("mouseover", function() {
            tooltip.style("display", null);
            tooltip.select("#tooltip-country")
            .text(short_name_country(full_data[c_code].country));
            tooltip.select("#text_emission")
            .text(realname_gas(currentFilter, true) + " : ")
            tooltip.select("#tooltip-gas-emission")
            .text(get_string_emissions(year, currentFilter, c_code));
            if (get_string_emissions(year, currentFilter, c_code) !== "Données non fournies.") {
                update_bar_chart(year, c_code, currentFilter);
            } else {
                reset_bars();
                d3.select("#svgBarchart")
                .attr("fill", "black");
            }
            //Event listener
            var toolgazemi = tooltip.select("#tooltip-gas-emission");
            toolgazemi.on('dataUpdateEvent', function(e) {
                d3.select("#tooltip-gas-emission").text(get_string_emissions(e.detail, currentFilter, c_code));
                reset_bars();
                update_bar_chart(e.detail, c_code, currentFilter);
            });
        })

    })

    update_legend(currentFilter);
}

function short_name_country(name) {
    return name.replace("Democratic", "Dem.").replace("Republic", "Rep.");
}


//Disable scrolling page by mouse wheel
// IE9, Chrome, Safari, Opera
document.getElementById("map").addEventListener("mousewheel", mouseWheelHandler, false);
// Firefox
document.getElementById("map").addEventListener("DOMMouseScroll", mouseWheelHandler, false);

function mouseWheelHandler(e) {
    // cross-browser wheel delta
    var e = window.event || e; // old IE support
    var delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));

    // if mouse scrolls up or mouse scrolls down, we disable scrolling.
    if (delta == 1 || delta == -1) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    return false;
}
