/**
 * Module permettant de générer un graphique du type camembert multi level
 * des percentages des émissions de gaz à effet de serre selon les
 * 7 secteurs et les 5 continents.
 *
 * 2020 - Rebeca CARAMEZ
 */

//global variables
 var total_agriculture = 0;
 var total_energy = 0;
 var total_industry = 0;
 var total_transport = 0;
 var total_heat = 0;
 var total_construction = 0;
 var total_buildings = 0;

 // Draw the chart and set the chart values
 function create_pie(year) {
   set_totals(year);
   console.log(total_agriculture);
   var topProductsChart = new FusionCharts({
    type: 'multilevelpie',
    renderAt: 'piechart',
    id: "myChart",
    width: '700',
    height: '700',
    dataFormat: 'json',
    dataSource: {
      "chart": {
        "caption": "Émissions de GHG selon les secteurs et les continents",
        "subcaption": "Year : "+ year.toString(),
        "showPlotBorder": "1",
        "piefillalpha": "60",
        "pieborderthickness": "2",
        "piebordercolor": "#FFFFFF",
        "hoverfillcolor": "#CCCCCC",
        "numberprefix": "$",
        "plottooltext": "$label, $$valueK, $percentValue",
        "theme": "fusion"
      },
      "category": [{
        "label": "Secteurs",
        "color": "#ffffff",
        "value": "100",
        "category": [{
          "label": "Agriculture",
          "color": "#f8bd19",
          "value": total_agriculture,
          "tooltext": "Food & Beverages, $$valueK, $percentValue",
          "category": [{
            "label": "EU",
            "color": "#f8bd19",
            //TO DO :Replace AF for the European continent. "AF" is just to test !
            "value": gas_complete_data["AF"][year]["Agriculture (GHG)"]
          }, {
            "label": "AF",
            "color": "#f8bd19",
            //TO DO :Replace GW for the African continent. "GW" is just to test !
            "value": gas_complete_data["GW"][year]["Agriculture (GHG)"]
          }, {
            "label": "AS",
            "color": "#f8bd19",
            //TO DO :Replace GY for the Asian continent. "GY" is just to test !
            "value": gas_complete_data["GY"][year]["Agriculture (GHG)"]
          }, {
            "label": "NA/SA",
            "color": "#f8bd19",
            //TO DO :Replace HT for the American continent. "HT" is just to test !
            "value": gas_complete_data["HT"][year]["Agriculture (GHG)"]
          }, {
            "label": "OC",
            "color": "#f8bd19",
            //TO DO :Replace HN for the Oceania. "HN" is just to test !
            "value": gas_complete_data["HN"][year]["Agriculture (GHG)"]
          }]
        }, {
          "label": "Énergie",
          "color": "#33ccff",
          "value": total_energy,
          "tooltext": "Apparel & Accessories, $$valueK, $percentValue",
          "category": [{
            "label": "EU",
            "color": "#33ccff",
            //TO DO :Replace AF for the European continent. "AF" is just to test !
            "value": gas_complete_data["AF"][year]["Energy (GHG)"]
          }, {
            "label": "AF",
            "color": "#33ccff",
            //TO DO :Replace GW for the African continent. "GW" is just to test !
            "value": gas_complete_data["GW"][year]["Energy (GHG)"]
          }, {
            "label": "AS",
            "color": "#33ccff",
            //TO DO :Replace GY for the Asian continent. "GY" is just to test !
            "value": gas_complete_data["GY"][year]["Energy (GHG)"]
          }, {
            "label": "NA/SA",
            "color": "#33ccff",
            //TO DO :Replace HT for the American continent. "HT" is just to test !
            "value": gas_complete_data["HT"][year]["Energy (GHG)"]
          }, {
            "label": "OC",
            "color": "#33ccff",
            //TO DO :Replace HN for the Oceania. "HN" is just to test !
            "value": gas_complete_data["HN"][year]["Energy (GHG)"]
          }]
        }, {
          "label": "Industrie",
          "color": "#FF69B4",
          "value": total_industry,
          "tooltext": "Baby Products, $$valueK, $percentValue",
          "category": [{
            "label": "EU",
            "color": "#FF69B4",
            //TO DO :Replace AF for the European continent. "AF" is just to test !
            "value": gas_complete_data["AF"][year]["Industry (GHG)"],
            "tooltext": "Bath & Grooming, $$valueK, $percentValue"
          }, {
            "label": "AF",
            "color": "#FF69B4",
            //TO DO :Replace GW for the African continent. "GW" is just to test !
            "value": gas_complete_data["GW"][year]["Industry (GHG)"]
          }, {
            "label": "AS",
            "color": "#FF69B4",
            //TO DO :Replace GY for the Asian continent. "GY" is just to test !
            "value": gas_complete_data["GY"][year]["Industry (GHG)"]
          }, {
            "label": "NA/SA",
            "color": "#FF69B4",
            //TO DO :Replace HT for the American continent. "HT" is just to test !
            "value": gas_complete_data["HT"][year]["Industry (GHG)"]
          }, {
            "label": "OC",
            "color": "#FF69B4",
            //TO DO :Replace HN for the Oceania. "HN" is just to test !
            "value": gas_complete_data["HN"][year]["Industry (GHG)"]
          }]
        }, {
          "label": "Chaleur & {br}Electricité",
          "color": "##696969",
          "value": total_heat,
          "tooltext": "Baby Products, $$valueK, $percentValue",
          "category": [{
            "label": "EU",
            "color": "##696969",
            //TO DO :Replace AF for the European continent. "AF" is just to test !
            "value": gas_complete_data["AF"][year]["Electricity & Heat (GHG)"],
            "tooltext": "Bath & Grooming, $$valueK, $percentValue"
          }, {
            "label": "AF",
            "color": "##696969",
            //TO DO :Replace GW for the African continent. "GW" is just to test !
            "value": gas_complete_data["GW"][year]["Electricity & Heat (GHG)"]
          }, {
            "label": "AS",
            "color": "##696969",
            //TO DO :Replace GY for the Asian continent. "GY" is just to test !
            "value": gas_complete_data["GY"][year]["Electricity & Heat (GHG)"]
          }, {
            "label": "NA/SA",
            "color": "##696969",
            //TO DO :Replace HT for the American continent. "HT" is just to test !
            "value": gas_complete_data["HT"][year]["Electricity & Heat (GHG)"]
          }, {
            "label": "OC",
            "color": "##696969",
            //TO DO :Replace HN for the Oceania. "HN" is just to test !
            "value": gas_complete_data["HN"][year]["Electricity & Heat (GHG)"]
          }]
        }, {
          "label": "Énergie de {br}Construction",
          "color": "##FF0000",
          "value": total_construction,
          "tooltext": "Baby Products, $$valueK, $percentValue",
          "category": [{
            "label": "EU",
            "color": "##FF0000",
            //TO DO :Replace AF for the European continent. "AF" is just to test !
            "value": gas_complete_data["AF"][year]["Manufacturing/Construction energy (GHG)"],
            "tooltext": "Bath & Grooming, $$valueK, $percentValue"
          }, {
            "label": "AF",
            "color": "##FF0000",
            //TO DO :Replace GW for the African continent. "GW" is just to test !
            "value": gas_complete_data["GW"][year]["Manufacturing/Construction energy (GHG)"]
          }, {
            "label": "AS",
            "color": "##FF0000",
            //TO DO :Replace GY for the Asian continent. "GY" is just to test !
            "value": gas_complete_data["GY"][year]["Manufacturing/Construction energy (GHG)"]
          }, {
            "label": "NA/SA",
            "color": "##FF0000",
            //TO DO :Replace HT for the American continent. "HT" is just to test !
            "value": gas_complete_data["HT"][year]["Manufacturing/Construction energy (GHG)"]
          }, {
            "label": "OC",
            "color": "##FF0000",
            //TO DO :Replace HN for the Oceania. "HN" is just to test !
            "value": gas_complete_data["HN"][year]["Manufacturing/Construction energy (GHG)"]
          }]
        }, {
          "label": "Transport",
          "color": "##800080",
          "value": total_transport,
          "tooltext": "Baby Products, $$valueK, $percentValue",
          "category": [{
            "label": "EU",
            "color": "##800080",
            //TO DO :Replace AF for the European continent. "AF" is just to test !
            "value": gas_complete_data["AF"][year]["Transport (GHG)"],
            "tooltext": "Bath & Grooming, $$valueK, $percentValue"
          }, {
            "label": "AF",
            "color": "##800080",
            //TO DO :Replace GW for the African continent. "GW" is just to test !
            "value": gas_complete_data["GW"][year]["Transport (GHG)"]
          }, {
            "label": "AS",
            "color": "##800080",
            //TO DO :Replace GY for the Asian continent. "GY" is just to test !
            "value": gas_complete_data["GY"][year]["Transport (GHG)"]
          }, {
            "label": "NA/SA",
            "color": "##800080",
            //TO DO :Replace HT for the American continent. "HT" is just to test !
            "value": gas_complete_data["HT"][year]["Transport (GHG)"]
          }, {
            "label": "OC",
            "color": "##800080",
            //TO DO :Replace HN for the Oceania. "HN" is just to test !
            "value": gas_complete_data["HN"][year]["Transport (GHG)"]
          }]
        }, {
          "label": "Batiments",
          "color": "#006400",
          "value": total_buildings,
          "category": [{
            "label": "EU",
            "color": "#006400",
            //TO DO :Replace AF for the European continent. "AF" is just to test !
            "value": gas_complete_data["AF"][year]["Buildings (GHG)"]
          }, {
            "label": "AF",
            "color": "#006400",
            //TO DO :Replace GW for the African continent. "GW" is just to test !
            "value": gas_complete_data["GW"][year]["Buildings (GHG)"]
          }, {
            "label": "AS",
            "color": "#006400",
            //TO DO :Replace GY for the Asian continent. "GY" is just to test !
            "value": gas_complete_data["GY"][year]["Buildings (GHG)"]
          }, {
            "label": "NA/SA",
            "color": "#006400",
            //TO DO :Replace HT for the American continent. "HT" is just to test !
            "value": gas_complete_data["HT"][year]["Buildings (GHG)"]
          }, {
            "label": "OC",
            "color": "#006400",
            //TO DO :Replace HN for the Oceania. "HN" is just to test !
            "value": gas_complete_data["HN"][year]["Buildings (GHG)"]
          }]
        }]
      }]
    }
  });
  topProductsChart.render();
}

function set_totals(year) {
  total_agriculture = parseFloat(gas_complete_data["AF"][year]["Agriculture (GHG)"])
  + parseFloat(gas_complete_data["GW"][year]["Agriculture (GHG)"])
  + parseFloat(gas_complete_data["GY"][year]["Agriculture (GHG)"])
  + parseFloat(gas_complete_data["HT"][year]["Agriculture (GHG)"])
  + parseFloat(gas_complete_data["HN"][year]["Agriculture (GHG)"]);

  total_energy = parseFloat(gas_complete_data["AF"][year]["Energy (GHG)"])
  + parseFloat(gas_complete_data["GW"][year]["Energy (GHG)"])
  + parseFloat(gas_complete_data["GY"][year]["Energy (GHG)"])
  + parseFloat(gas_complete_data["HT"][year]["Energy (GHG)"])
  + parseFloat(gas_complete_data["HN"][year]["Energy (GHG)"]);

  var total_industry = parseFloat(gas_complete_data["AF"][year]["Industry (GHG)"])
  + parseFloat(gas_complete_data["GW"][year]["Industry (GHG)"])
  + parseFloat(gas_complete_data["GY"][year]["Industry (GHG)"])
  + parseFloat(gas_complete_data["HT"][year]["Industry (GHG)"])
  + parseFloat(gas_complete_data["HN"][year]["Industry (GHG)"]);

  var total_transport = parseFloat(gas_complete_data["AF"][year]["Transport (GHG)"])
  + parseFloat(gas_complete_data["GW"][year]["Transport (GHG)"])
  + parseFloat(gas_complete_data["GY"][year]["Transport (GHG)"])
  + parseFloat(gas_complete_data["HT"][year]["Transport (GHG)"])
  + parseFloat(gas_complete_data["HN"][year]["Transport (GHG)"]);

  var total_heat = parseFloat(gas_complete_data["AF"][year]["Electricity & Heat (GHG)"])
  + parseFloat(gas_complete_data["GW"][year]["Electricity & Heat (GHG)"])
  + parseFloat(gas_complete_data["GY"][year]["Electricity & Heat (GHG)"])
  + parseFloat(gas_complete_data["HT"][year]["Electricity & Heat (GHG)"])
  + parseFloat(gas_complete_data["HN"][year]["Electricity & Heat (GHG)"]);

  var total_construction = parseFloat(gas_complete_data["AF"][year]["Manufacturing/Construction energy (GHG)"])
  + parseFloat(gas_complete_data["GW"][year]["Manufacturing/Construction energy (GHG)"])
  + parseFloat(gas_complete_data["GY"][year]["Manufacturing/Construction energy (GHG)"])
  + parseFloat(gas_complete_data["HT"][year]["Manufacturing/Construction energy (GHG)"])
  + parseFloat(gas_complete_data["HN"][year]["Manufacturing/Construction energy (GHG)"]);

  var total_buildings = parseFloat(gas_complete_data["AF"][year]["Buildings (GHG)"])
  + parseFloat(gas_complete_data["GW"][year]["Buildings (GHG)"])
  + parseFloat(gas_complete_data["GY"][year]["Buildings (GHG)"])
  + parseFloat(gas_complete_data["HT"][year]["Buildings (GHG)"])
  + parseFloat(gas_complete_data["HN"][year]["Buildings (GHG)"]);
}
