/**
* Module permettant de générer un graphique du type camembert multi level
* des percentages des émissions de gaz à effet de serre selon les
* 7 secteurs et les 5 continents.
*
* 2020 - Rebeca CARAMEZ
*/

<<<<<<< HEAD
let totals, firstSum;
=======
//global variables
/*
var total_agriculture = 0.0;
var total_energy = 0.0;
var total_industry = 0.0;
var total_transport = 0.0;
var total_heat = 0.0;
var total_construction = 0.0;
var total_buildings = 0.0;
*/
let totals, firstSum = {}, labels = {};
let gases = ['GHG','CO2','CH4','N2O'];
>>>>>>> 09e7439e7f286ba8e1ba6e0451dc9c14270c80e5

function get_data(year, filter) {
    return {
        "chart": {
            "subcaption": "Year : "+ year.toString(),
            "showPlotBorder": "1",
            "piefillalpha": "60",
            "pieborderthickness": "2",
            "piebordercolor": "#FFFFFF",
            "hoverfillcolor": "#CCCCCC",
            "numberprefix": "$",
            "plottooltext": "$valueK, $percentValue",
            "theme": "fusion",
            "baseFontSize": "9"
        },
        "category": [{
            "label": "Secteurs",
            "color": "#ffffff",
            //"value": (total_agriculture + total_energy + total_industry + total_transport + total_heat + total_construction + total_buildings).toFixed(2),
            "value": firstSum[filter].toFixed(2),
            "category": [{
                "label": get_short_label(labels[filter][0]),
                "color": "#f8bd19",
                "value": totals[labels[filter][0]].toFixed(2),
                "tooltext": "$valueK, $percentValue",
                "category": [{
                    "label": "EEEEEU",
                    "showLabels":"0",
                    "color": "#f8bd19",
                    //TO DO :Replace AF for the European continent. "AF" is just to test !
<<<<<<< HEAD
                    "value": full_camembert[year][filter][Object.keys(totals)[0]]["Europe"].toFixed(2),
                    "plottooltext": "$label, $percentValue"
=======
                    "value": full_camembert[year][filter][labels[filter][0]]["Europe"].toFixed(2)
>>>>>>> 09e7439e7f286ba8e1ba6e0451dc9c14270c80e5
                }, {
                    "label": "AF",
                    "color": "#f8bd19",
                    //TO DO :Replace GW for the African continent. "GW" is just to test !
<<<<<<< HEAD
                    "value": full_camembert[year][filter][Object.keys(totals)[0]]["Africa"].toFixed(2),
                    "showLabels":"1",
                    "plottooltext": "$label, $percentValue"

=======
                    "value": full_camembert[year][filter][labels[filter][0]]["Africa"].toFixed(2)
>>>>>>> 09e7439e7f286ba8e1ba6e0451dc9c14270c80e5
                }, {
                    "label": "AS",
                    "color": "#f8bd19",
                    //TO DO :Replace GY for the Asian continent. "GY" is just to test !
<<<<<<< HEAD
                    "value": full_camembert[year][filter][Object.keys(totals)[0]]["Asia"].toFixed(2),
                    "showLabels":"1",
                    "plottooltext": "$label, $percentValue"
=======
                    "value": full_camembert[year][filter][labels[filter][0]]["Asia"].toFixed(2)
>>>>>>> 09e7439e7f286ba8e1ba6e0451dc9c14270c80e5
                }, {
                    "label": "NA/SA",
                    "color": "#f8bd19",
                    //TO DO :Replace HT for the American continent. "HT" is just to test !
<<<<<<< HEAD
                    "value": full_camembert[year][filter][Object.keys(totals)[0]]["Americas"].toFixed(2),
                    "showLabels":"1",
                    "plottooltext": "$label, $percentValue"
=======
                    "value": full_camembert[year][filter][labels[filter][0]]["Americas"].toFixed(2)
>>>>>>> 09e7439e7f286ba8e1ba6e0451dc9c14270c80e5
                }, {
                    "label": "OC",
                    "color": "#f8bd19",
                    //TO DO :Replace HN for the Oceania. "HN" is just to test !
<<<<<<< HEAD
                    "value": full_camembert[year][filter][Object.keys(totals)[0]]["Oceania"].toFixed(2),
                    "showLabels":"1",
                    "plottooltext": "$label, $percentValue"
=======
                    "value": full_camembert[year][filter][labels[filter][0]]["Oceania"].toFixed(2)
>>>>>>> 09e7439e7f286ba8e1ba6e0451dc9c14270c80e5
                }]
            }, {
                "label": get_short_label(labels[filter][1]),
                "color": "#33ccff",
                "value": totals[labels[filter][1]].toFixed(2),
                "tooltext": "$valueK, $percentValue",
                "category": [{
                    "label": "EU",
                    "color": "#33ccff",
                    //TO DO :Replace AF for the European continent. "AF" is just to test !
                    "value": full_camembert[year][filter][labels[filter][1]]["Europe"].toFixed(2)
                }, {
                    "label": "AF",
                    "color": "#33ccff",
                    //TO DO :Replace GW for the African continent. "GW" is just to test !
                    "value": full_camembert[year][filter][labels[filter][1]]["Africa"].toFixed(2)
                }, {
                    "label": "AS",
                    "color": "#33ccff",
                    //TO DO :Replace GY for the Asian continent. "GY" is just to test !
                    "value": full_camembert[year][filter][labels[filter][1]]["Asia"].toFixed(2)
                }, {
                    "label": "NA/SA",
                    "color": "#33ccff",
                    //TO DO :Replace HT for the American continent. "HT" is just to test !
                    "value": full_camembert[year][filter][labels[filter][1]]["Americas"].toFixed(2)
                }, {
                    "label": "OC",
                    "color": "#33ccff",
                    //TO DO :Replace HN for the Oceania. "HN" is just to test !
                    "value": full_camembert[year][filter][labels[filter][1]]["Oceania"].toFixed(2)
                }]
            }, {
                "label": get_short_label(labels[filter][2]),
                "color": "#FF69B4",
                "value": totals[labels[filter][2]].toFixed(2),
                "tooltext": "$valueK, $percentValue",
                "category": [{
                    "label": "EU",
                    "color": "#FF69B4",
                    //TO DO :Replace AF for the European continent. "AF" is just to test !
                    "value": full_camembert[year][filter][labels[filter][2]]["Europe"].toFixed(2)
                }, {
                    "label": "AF",
                    "color": "#FF69B4",
                    //TO DO :Replace GW for the African continent. "GW" is just to test !
                    "value": full_camembert[year][filter][labels[filter][2]]["Africa"].toFixed(2)
                }, {
                    "label": "AS",
                    "color": "#FF69B4",
                    //TO DO :Replace GY for the Asian continent. "GY" is just to test !
                    "value": full_camembert[year][filter][labels[filter][2]]["Asia"].toFixed(2)
                }, {
                    "label": "NA/SA",
                    "color": "#FF69B4",
                    //TO DO :Replace HT for the American continent. "HT" is just to test !
                    "value": full_camembert[year][filter][labels[filter][2]]["Americas"].toFixed(2)
                }, {
                    "label": "OC",
                    "color": "#FF69B4",
                    //TO DO :Replace HN for the Oceania. "HN" is just to test !
                    "value": full_camembert[year][filter][labels[filter][2]]["Oceania"].toFixed(2)
                }]
            }, {
                "label": get_short_label(labels[filter][3]),
                "color": "##696969",
                "value": totals[labels[filter][3]].toFixed(2),
                "tooltext": "$valueK, $percentValue",
                "category": [{
                    "label": "EU",
                    "color": "##696969",
                    //TO DO :Replace AF for the European continent. "AF" is just to test !
                    "value": full_camembert[year][filter][labels[filter][3]]["Europe"].toFixed(2)
                }, {
                    "label": "AF",
                    "color": "##696969",
                    //TO DO :Replace GW for the African continent. "GW" is just to test !
                    "value": full_camembert[year][filter][labels[filter][3]]["Africa"].toFixed(2)
                }, {
                    "label": "AS",
                    "color": "##696969",
                    //TO DO :Replace GY for the Asian continent. "GY" is just to test !
                    "value": full_camembert[year][filter][labels[filter][3]]["Asia"].toFixed(2)
                }, {
                    "label": "NA/SA",
                    "color": "##696969",
                    //TO DO :Replace HT for the American continent. "HT" is just to test !
                    "value": full_camembert[year][filter][labels[filter][3]]["Americas"].toFixed(2)
                }, {
                    "label": "OC",
                    "color": "##696969",
                    //TO DO :Replace HN for the Oceania. "HN" is just to test !
                    "value": full_camembert[year][filter][labels[filter][3]]["Oceania"].toFixed(2)
                }]
            }, {
                "label": get_short_label(labels[filter][4]),
                "color": "##FF0000",
                "value": totals[labels[filter][4]].toFixed(2),
                "tooltext": "$valueK, $percentValue",
                "category": [{
                    "label": "EU",
                    "color": "##FF0000",
                    //TO DO :Replace AF for the European continent. "AF" is just to test !
                    "value": full_camembert[year][filter][Object.keys(totals)[4]]["Europe"].toFixed(2)
                }, {
                    "label": "AF",
                    "color": "##FF0000",
                    //TO DO :Replace GW for the African continent. "GW" is just to test !
                    "value": full_camembert[year][filter][Object.keys(totals)[4]]["Africa"].toFixed(2)
                }, {
                    "label": "AS",
                    "color": "##FF0000",
                    //TO DO :Replace GY for the Asian continent. "GY" is just to test !
                    "value": full_camembert[year][filter][Object.keys(totals)[4]]["Asia"].toFixed(2)
                }, {
                    "label": "NA/SA",
                    "color": "##FF0000",
                    //TO DO :Replace HT for the American continent. "HT" is just to test !
                    "value": full_camembert[year][filter][Object.keys(totals)[4]]["Americas"].toFixed(2)
                }, {
                    "label": "OC",
                    "color": "##FF0000",
                    //TO DO :Replace HN for the Oceania. "HN" is just to test !
                    "value": full_camembert[year][filter][Object.keys(totals)[4]]["Oceania"].toFixed(2)
                }]
            }, {
                "label": get_short_label(labels[filter][5]),
                "color": "##800080",
                "value": totals[labels[filter][5]].toFixed(2),
                "tooltext": "$valueK, $percentValue",
                "category": [{
                    "label": "EU",
                    "color": "##800080",
                    //TO DO :Replace AF for the European continent. "AF" is just to test !
                    "value": full_camembert[year][filter][labels[filter][5]]["Europe"].toFixed(2)
                }, {
                    "label": "AF",
                    "color": "##800080",
                    //TO DO :Replace GW for the African continent. "GW" is just to test !
                    "value": full_camembert[year][filter][labels[filter][5]]["Africa"].toFixed(2)
                }, {
                    "label": "AS",
                    "color": "##800080",
                    //TO DO :Replace GY for the Asian continent. "GY" is just to test !
                    "value": full_camembert[year][filter][labels[filter][5]]["Asia"].toFixed(2)
                }, {
                    "label": "NA/SA",
                    "color": "##800080",
                    //TO DO :Replace HT for the American continent. "HT" is just to test !
                    "value": full_camembert[year][filter][labels[filter][5]]["Americas"].toFixed(2)
                }, {
                    "label": "OC",
                    "color": "##800080",
                    //TO DO :Replace HN for the Oceania. "HN" is just to test !
                    "value": full_camembert[year][filter][labels[filter][5]]["Oceania"].toFixed(2)
                }]
            }, {
                "label": get_short_label(labels[filter][6]),
                "color": "#006400",
                "value": totals[labels[filter][6]].toFixed(2),
                "tooltext": "$valueK, $percentValue",
                "category": [{
                    "label": "EU",
                    "color": "#006400",
                    //TO DO :Replace AF for the European continent. "AF" is just to test !
                    "value": full_camembert[year][filter][labels[filter][6]]["Europe"].toFixed(2)
                }, {
                    "label": "AF",
                    "color": "#006400",
                    //TO DO :Replace GW for the African continent. "GW" is just to test !
                    "value": full_camembert[year][filter][labels[filter][6]]["Africa"].toFixed(2)
                }, {
                    "label": "AS",
                    "color": "#006400",
                    //TO DO :Replace GY for the Asian continent. "GY" is just to test !
                    "value": full_camembert[year][filter][labels[filter][6]]["Asia"].toFixed(2)
                }, {
                    "label": "NA/SA",
                    "color": "#006400",
                    //TO DO :Replace HT for the American continent. "HT" is just to test !
                    "value": full_camembert[year][filter][labels[filter][6]]["Americas"].toFixed(2)
                }, {
                    "label": "OC",
                    "color": "#006400",
                    //TO DO :Replace HN for the Oceania. "HN" is just to test !
                    "value": full_camembert[year][filter][labels[filter][6]]["Oceania"].toFixed(2)
                }]
            }]
        }]}
    }

function get_short_label(label) {
    let new_label;
    switch (label){
        case "Land-Use Change and Forestry":
            new_label = "LUCF";
            break;
        case "Manufacturing & Construction":
            new_label = "Manufacturing";
            break;
        case "Manufacturing/Construction energy":
            new_label = "Manufacturing";
            break;
        case "Electricity & Heat":
            new_label = "Electricity";
            break;
        case "Other Fuel Combustion":
            new_label = "Other";
            break;
        case "Intl aviation & shipping":
            new_label = "Shipping";
            break;
        case "Fugitive from energy production":
            new_label = "Fugitive Emissions";
            break;
        default:
            new_label = label;
    }
<<<<<<< HEAD

    // Draw the chart and set the chart values
    function create_pie(year) {
        const gas = 'GHG';
        set_totals(year, gas);
        // console.log(total_agriculture);
        var data = get_data(year, gas);

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

    // updates the data of the piechart
    function update_piechart(chart, year, filter) {
        //choose gas based on filter
        let gas;
        switch (filter) {
            case 'total_ghg':
                gas = 'GHG';
                break;
            case 'co2':
                gas = 'CO2';
                break;
            case 'methane':
                gas = 'CH4';
                break;
            case 'nitrous_oxide':
                gas = 'N2O';
                break;
            default:
                console.log('Filter error in piechart: unknown gas');
        }
        set_totals(year, gas);
        data = get_data(year, gas);
        chart.setJSONData(data);
    }

    function set_totals(year, filter) {
        //console.log(year);
        //console.log(filter);
        let data_year = full_camembert[year][filter];
        //total_agriculture = total_energy = total_industry = total_transport = total_heat = total_construction = total_buildings = 0.0;
        //new chart, initialize totals
        totals = {};

        for(let sector of Object.keys(data_year)) {
            //if(!(sector in totals))
            totals[sector] = 0.0;
            for(let [key,value] of Object.entries(data_year[sector]))
                totals[sector] += value;
        }
=======
    return new_label;
}

function init_labels() {
    for(let gas of gases) {
        labels[gas] = []
        set_totals(1990, gas, true);
        for(let i = 0; i < 7; i++)
            labels[gas].push(Object.keys(totals)[i]);
    }
}

// Draw the chart and set the chart values
function create_pie(year) {
    init_labels();

    const gas = 'GHG';
    set_totals(year, gas, false);
    
    var data = get_data(year, gas);
    
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

// updates the data of the piechart
function update_piechart(chart, year, filter) {
    //choose gas based on filter
    let gas;
    switch (filter) {
        case 'total_ghg':
            gas = 'GHG';
            break;
        case 'co2':
            gas = 'CO2';
            break;
        case 'methane':
            gas = 'CH4';
            break;
        case 'nitrous_oxide':
            gas = 'N2O';
            break;
        default:
            console.log('Filter error in piechart: unknown gas');
    }
    set_totals(year, gas, false);
    data = get_data(year, gas);
    chart.setJSONData(data);
}

function set_totals(year, filter, first) {
    //console.log(year);
    //console.log(filter);
    let data_year = full_camembert[year][filter];
    //total_agriculture = total_energy = total_industry = total_transport = total_heat = total_construction = total_buildings = 0.0;
    //new chart, initialize totals
    totals = {};
    
    for(let sector of Object.keys(data_year)) {
        //if(!(sector in totals))
        totals[sector] = 0.0;
        for(let [key,value] of Object.entries(data_year[sector]))
            totals[sector] += value;
    }
>>>>>>> 09e7439e7f286ba8e1ba6e0451dc9c14270c80e5

    //sort sectors by emission and compute total emission
    let sortable = [];
    for (let sector of Object.keys(totals)) {
        sortable.push([sector, totals[sector]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

<<<<<<< HEAD
        totals = {};
        firstSum = 0.0;
        sortable.forEach(function(item){
            totals[item[0]] = item[1];
            firstSum += item[1];
        })
    }
=======
    totals = {};
    if(first)
        firstSum[filter] = 0.0;
    sortable.forEach(function(item){
        totals[item[0]] = item[1];
        if(first)
            firstSum[filter] += item[1];
    })

    /*for(let [key,value] of Object.entries(data_year.Agriculture))

        total[key] += value;
    for(let [key,value] of Object.entries(data_year.Energy))
        total_energy += value;
    for(let [key,value] of Object.entries(data_year.Industry))
        total_industry += value;
    for(let [key,value] of Object.entries(data_year.Transport))
        total_transport += value;
    for(let [key,value] of Object.entries(data_year[labels[filter][3]]))
        total_heat += value;
    for(let [key,value] of Object.entries(data_year[Object.keys(totals)[4]]))
        total_construction += value;
    for(let [key,value] of Object.entries(data_year.Buildings))
        total_buildings += value;*/
}
>>>>>>> 09e7439e7f286ba8e1ba6e0451dc9c14270c80e5
