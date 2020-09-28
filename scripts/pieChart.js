/**
* Module permettant de générer un graphique du type camembert multi level
* des percentages des émissions de gaz à effet de serre selon les
* 7 secteurs et les 5 continents.
*
* 2020 - Rebeca CARAMEZ
*/

//global variables
var total_agriculture = 0.0;
var total_energy = 0.0;
var total_industry = 0.0;
var total_transport = 0.0;
var total_heat = 0.0;
var total_construction = 0.0;
var total_buildings = 0.0;

// Draw the chart and set the chart values
function create_pie(year) {
    //console.log(total_agriculture);
    var data = get_data(year)

    var topProductsChart = new FusionCharts({
        type: 'multilevelpie',
        renderAt: 'piechart',
        id: "myChart",
        width: '100%',
        height: '100%',
        dataFormat: 'json',
        dataSource: data
    });
    topProductsChart.render();

    return topProductsChart;
}

function get_data(year) {
  set_totals(year);
    return {
    "chart": {
        "subcaption": "Year : "+ year.toString(),
        "showPlotBorder": "1",
        "piefillalpha": "60",
        "pieborderthickness": "2",
        "piebordercolor": "#FFFFFF",
        "hoverfillcolor": "#CCCCCC",
        "numberprefix": "$",
        "plottooltext": "$label, $$valueK, $percentValue",
        "showPercentInTooltip": "0",
        "theme": "fusion"
    },
      "category": [{
        "label": "Secteurs",
        "showLabel":"1",
        "color": "#ffffff",
        "value": "100",
        "category": [{
            "label": "Agriculture",
            "color": "#f8bd19",
            "value": total_agriculture,
            "tooltext": "$label, $percentValue",
            "category": [{
                "label": "EU",
                "color": "#f8bd19",
                "value": full_camembert[year]['GHG']["Agriculture"]["Europe"]
            }, {
                "label": "AF",
                "color": "#f8bd19",
                "value": full_camembert[year]['GHG']["Agriculture"]["Africa"]
            }, {
                "label": "AS",
                "color": "#f8bd19",
                "value": full_camembert[year]['GHG']["Agriculture"]["Asia"]
            }, {
                "label": "NA/SA",
                "color": "#f8bd19",
                "value": full_camembert[year]['GHG']["Agriculture"]["Americas"]
            }, {
                "label": "OC",
                "color": "#f8bd19",
                "value": full_camembert[year]['GHG']["Agriculture"]["Oceania"]
            }]
        }, {
            "label": "Énergie",
            "color": "#33ccff",
            "value": total_energy,
            "tooltext": "$label, $percentValue",
            "category": [{
                "label": "EU",
                "color": "#33ccff",
                "value": full_camembert[year]['GHG']["Energy"]["Europe"]
            }, {
                "label": "AF",
                "color": "#33ccff",
                "value": full_camembert[year]['GHG']["Energy"]["Africa"]
            }, {
                "label": "AS",
                "color": "#33ccff",
                "value": full_camembert[year]['GHG']["Energy"]["Asia"]
            }, {
                "label": "NA/SA",
                "color": "#33ccff",
                "value": full_camembert[year]['GHG']["Energy"]["Americas"]
            }, {
                "label": "OC",
                "color": "#33ccff",
                "value": full_camembert[year]['GHG']["Energy"]["Oceania"]
            }]
        }, {
            "label": "Industrie",
            "color": "#FF69B4",
            "value": total_industry,
            "tooltext": "$label, $percentValue",
            "category": [{
                "label": "EU",
                "color": "#FF69B4",
                "value": full_camembert[year]['GHG']["Industry"]["Europe"]
            }, {
                "label": "AF",
                "color": "#FF69B4",
                "value": full_camembert[year]['GHG']["Industry"]["Africa"]
            }, {
                "label": "AS",
                "color": "#FF69B4",
                "value": full_camembert[year]['GHG']["Industry"]["Asia"]
            }, {
                "label": "NA/SA",
                "color": "#FF69B4",
                "value": full_camembert[year]['GHG']["Industry"]["Americas"]
            }, {
                "label": "OC",
                "color": "#FF69B4",
                "value": full_camembert[year]['GHG']["Industry"]["Oceania"]
            }]
        }, {
            "label": "Chaleur & {br}Electricité",
            "color": "##696969",
            "value": total_heat,
            "tooltext": "$label, $percentValue",
            "category": [{
                "label": "EU",
                "color": "##696969",
                "value": full_camembert[year]['GHG']["Electricity & Heat"]["Europe"]
            }, {
                "label": "AF",
                "color": "##696969",
                "value": full_camembert[year]['GHG']["Electricity & Heat"]["Africa"]
            }, {
                "label": "AS",
                "color": "##696969",
                "value": full_camembert[year]['GHG']["Electricity & Heat"]["Asia"]
            }, {
                "label": "NA/SA",
                "color": "##696969",
                "value": full_camembert[year]['GHG']["Electricity & Heat"]["Americas"]
            }, {
                "label": "OC",
                "color": "##696969",
                "value": full_camembert[year]['GHG']["Electricity & Heat"]["Oceania"]
            }]
        }, {
            "label": "Énergie de {br}Construction",
            "color": "##FF0000",
            "value": total_construction,
            "tooltext": "$label, $percentValue",
            "category": [{
                "label": "EU",
                "color": "##FF0000",
                "value": full_camembert[year]['GHG']["Manufacturing/Construction energy"]["Europe"]
            }, {
                "label": "AF",
                "color": "##FF0000",
                "value": full_camembert[year]['GHG']["Manufacturing/Construction energy"]["Africa"]
            }, {
                "label": "AS",
                "color": "##FF0000",
                "value": full_camembert[year]['GHG']["Manufacturing/Construction energy"]["Asia"]
            }, {
                "label": "NA/SA",
                "color": "##FF0000",
                "value": full_camembert[year]['GHG']["Manufacturing/Construction energy"]["Americas"]
            }, {
                "label": "OC",
                "color": "##FF0000",
                "value": full_camembert[year]['GHG']["Manufacturing/Construction energy"]["Oceania"]
            }]
        }, {
            "label": "Transport",
            "color": "##800080",
            "value": total_transport,
            "tooltext": "$label, $percentValue",
            "category": [{
                "label": "EU",
                "color": "##800080",
                "value": full_camembert[year]['GHG']["Transport"]["Europe"]
            }, {
                "label": "AF",
                "color": "##800080",
                "value": full_camembert[year]['GHG']["Transport"]["Africa"]
            }, {
                "label": "AS",
                "color": "##800080",
                "value": full_camembert[year]['GHG']["Transport"]["Asia"]
            }, {
                "label": "NA/SA",
                "color": "##800080",
                "value": full_camembert[year]['GHG']["Transport"]["Americas"]
            }, {
                "label": "OC",
                "color": "##800080",
                "value": full_camembert[year]['GHG']["Transport"]["Oceania"]
            }]
        }, {
            "label": "Batiments",
            "color": "#006400",
            "value": total_buildings,
            "tooltext": "$label, $percentValue",
            "category": [{
                "label": "EU",
                "color": "#006400",
                "value": full_camembert[year]['GHG']["Buildings"]["Europe"]
            }, {
                "label": "AF",
                "color": "#006400",
                "value": full_camembert[year]['GHG']["Buildings"]["Africa"]
            }, {
                "label": "AS",
                "color": "#006400",
                "value": full_camembert[year]['GHG']["Buildings"]["Asia"]
            }, {
                "label": "NA/SA",
                "color": "#006400",
                "value": full_camembert[year]['GHG']["Buildings"]["Americas"]
            }, {
                "label": "OC",
                "color": "#006400",
                "value": full_camembert[year]['GHG']["Buildings"]["Oceania"]
            }]
        }]
    }]
  }
}


    // updates the data of the piechart
    function update_piechart(chart, year) {
        data = get_data(year)
        chart.setJSONData(data)
    }

    function set_totals(year) {
        data_year = full_camembert[year]['GHG'];

        for(let [key,value] of Object.entries(data_year.Agriculture))
        total_agriculture += value;
        for(let [key,value] of Object.entries(data_year.Energy))
        total_energy += value;
        for(let [key,value] of Object.entries(data_year.Industry))
        total_industry += value;
        for(let [key,value] of Object.entries(data_year.Transport))
        total_transport += value;
        for(let [key,value] of Object.entries(data_year["Electricity & Heat"]))
        total_heat += value;
        for(let [key,value] of Object.entries(data_year["Manufacturing/Construction energy"]))
        total_construction += value;
        for(let [key,value] of Object.entries(data_year.Buildings))
        total_buildings += value;
    }
