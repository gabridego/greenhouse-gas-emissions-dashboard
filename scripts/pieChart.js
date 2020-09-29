/**
* Module permettant de générer un graphique du type camembert multi level
* des percentages des émissions de gaz à effet de serre selon les
* 7 secteurs et les 5 continents.
*
*/

//global variables
let totals, firstSum = {}, labels = {};
let gases = ['GHG','CO2','CH4','N2O'];

function get_data(year, filter) {
	let colors = ["#5F9EA0","#B8860B","#FF69B4","#696969","#FF0000","#800080","#006400"];
	let category = [];

    //add information for each sector
	for(i = 0; i < 7 && i < Object.keys(labels[filter]).length; i++) {
        let info = [];
        
        //add information for each continent
        for(let cont of ["Europe","Africa","Asia","Americas","Oceania"]) {
            tooltext = cont + ", $percentValue{br}";
            for(let country of full_camembert[year][filter][labels[filter][i]][cont]['countries'])
                tooltext = tooltext + "{br}" + country;

            let val = full_camembert[year][filter][labels[filter][i]][cont]['value'];
            let obj = {
                "color": colors[i],
                "tooltext": tooltext,
                "value": val.toFixed(2)
            }

            //show continent label only if big
            if(val / firstSum[filter] > 0.02)
                obj["label"] = get_short_label(cont);

            info.push(obj);
        }

        let obj = {
                "color": colors[i],
                "value": totals[labels[filter][i]].toFixed(2),
                "category": info
            };

        if(totals[labels[filter][i]] / firstSum[filter] > 0.03)
            obj["label"] = get_short_label(labels[filter][i]);

		category.push(obj);
	}

    return {
        "chart": {
            "subcaption": "Valeurs : Millions des tonnes/"+ filter.toString(),
            "subcaptionFontSize": "16",
            "subcaptionFontColor": "#000000",
            "showPlotBorder": "1",
            "piefillalpha": "60",
            "pieborderthickness": "2",
            "piebordercolor": "#FFFFFF",
            "hoverfillcolor": "#00FFFF",
            "numberprefix": "$",
            "plottooltext": "$valueM, $percentValue",
            "theme": "fusion",
            "showLabels":"1", // 1 = yes
            "toolTipBorderColor": "#666666",
            "toolTipBgColor": "#F0FFFF",
            "toolTipBgAlpha": "80",
            "baseFontSize": "10"
        },
        "category": [{
            "label": "Secteurs",
            "showLabels": "0",
            "color": "#ffffff",
            "value": firstSum[filter].toFixed(2),
            "category": category
        }]
    }
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
            new_label = "Fugitive";
            break;
        case "Fugitive Emissions":
            new_label = "Fugitive";
            break;

        case "Europe":
            new_label = "EU";
            break;
        case "Africa":
            new_label = "AF"
            break;
        case "Asia":
            new_label = "AS"
            break;
        case "Americas":
            new_label = "NA/SA"
            break;
        case "Oceania":
            new_label = "OC"
            break;

        default:
            new_label = label;
    }
    return new_label;
}

function init_labels() {
    for(let gas of gases) {
        labels[gas] = []
        set_totals(1990, gas, true);
        for(let i = 0; i < 7 && i < Object.keys(totals).length; i++)
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
            totals[sector] += value['value'];
    }

    //sort sectors by emission and compute total emission
    let sortable = [];
    for (let sector of Object.keys(totals)) {
        sortable.push([sector, totals[sector]]);
    }

    sortable.sort(function(a, b) {
        return b[1] - a[1];
    });

    totals = {};
    if(first)
        firstSum[filter] = 0.0;
    sortable.forEach(function(item){
        totals[item[0]] = item[1];
        if(first)
            firstSum[filter] += item[1];
    })
}
