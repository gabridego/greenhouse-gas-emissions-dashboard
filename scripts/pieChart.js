/**
 * Module permettant de générer un graphique du type camembert multi level
 * des percentages des émissions de gaz à effet de serre selon les
 * 7 secteurs et les 5 continents.
 *
 * 2020 - Rebeca CARAMEZ
 */

 // Draw the chart and set the chart values
 function create_pie() {
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
        "subcaption": "Year : 1990",
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
        "value": "150",
        "category": [{
          "label": "Agriculture",
          "color": "#f8bd19",
          "value": "55.5",
          "tooltext": "Food & Beverages, $$valueK, $percentValue",
          "category": [{
            "label": "EU",
            "color": "#f8bd19",
            "value": "11.1"
          }, {
            "label": "AF",
            "color": "#f8bd19",
            "value": "27.75"
          }, {
            "label": "AS",
            "color": "#f8bd19",
            "value": "9.99"
          }, {
            "label": "NA/SA",
            "color": "#f8bd19",
            "value": "6.66"
          }, {
            "label": "OC",
            "color": "#f8bd19",
            "value": "9.99"
          }]
        }, {
          "label": "Énergie",
          "color": "#33ccff",
          "value": "42",
          "tooltext": "Apparel & Accessories, $$valueK, $percentValue",
          "category": [{
            "label": "EU",
            "color": "#33ccff",
            "value": "10.08"
          }, {
            "label": "AF",
            "color": "#33ccff",
            "value": "18.9"
          }, {
            "label": "AS",
            "color": "#33ccff",
            "value": "6.3"
          }, {
            "label": "NA/SA",
            "color": "#33ccff",
            "value": "6.72"
          }, {
            "label": "OC",
            "color": "#33ccff",
            "value": "6.72"
          }]
        }, {
          "label": "Industrie",
          "color": "#ffcccc",
          "value": "22.5",
          "tooltext": "Baby Products, $$valueK, $percentValue",
          "category": [{
            "label": "EU",
            "color": "#ffcccc",
            "value": "9.45",
            "tooltext": "Bath & Grooming, $$valueK, $percentValue"
          }, {
            "label": "AF",
            "color": "#ffcccc",
            "value": "6.3"
          }, {
            "label": "AS",
            "color": "#ffcccc",
            "value": "6.75"
          }, {
            "label": "NA/SA",
            "color": "#ffcccc",
            "value": "6.75"
          }, {
            "label": "OC",
            "color": "#ffcccc",
            "value": "6.75"
          }]
        }, {
          "label": "Chaleur & {br}Electricité",
          "color": "##696969",
          "value": "22.5",
          "tooltext": "Baby Products, $$valueK, $percentValue",
          "category": [{
            "label": "EU",
            "color": "##696969",
            "value": "9.45",
            "tooltext": "Bath & Grooming, $$valueK, $percentValue"
          }, {
            "label": "AF",
            "color": "##696969",
            "value": "6.3"
          }, {
            "label": "AS",
            "color": "##696969",
            "value": "6.75"
          }, {
            "label": "NA/SA",
            "color": "##696969",
            "value": "6.75"
          }, {
            "label": "OC",
            "color": "##696969",
            "value": "6.75"
          }]
        }, {
          "label": "Énergie de {br}Construction",
          "color": "##FF0000",
          "value": "22.5",
          "tooltext": "Baby Products, $$valueK, $percentValue",
          "category": [{
            "label": "EU",
            "color": "##FF0000",
            "value": "9.45",
            "tooltext": "Bath & Grooming, $$valueK, $percentValue"
          }, {
            "label": "AF",
            "color": "##FF0000",
            "value": "6.3"
          }, {
            "label": "AS",
            "color": "##FF0000",
            "value": "6.75"
          }, {
            "label": "NA/SA",
            "color": "##FF0000",
            "value": "6.75"
          }, {
            "label": "OC",
            "color": "##FF0000",
            "value": "6.75"
          }]
        }, {
          "label": "Transport",
          "color": "##EE82EE",
          "value": "22.5",
          "tooltext": "Baby Products, $$valueK, $percentValue",
          "category": [{
            "label": "EU",
            "color": "##EE82EE",
            "value": "9.45",
            "tooltext": "Bath & Grooming, $$valueK, $percentValue"
          }, {
            "label": "AF",
            "color": "##EE82EE",
            "value": "6.3"
          }, {
            "label": "AS",
            "color": "##EE82EE",
            "value": "6.75"
          }, {
            "label": "NA/SA",
            "color": "##EE82EE",
            "value": "6.75"
          }, {
            "label": "OC",
            "color": "##EE82EE",
            "value": "6.75"
          }]
        }, {
          "label": "Batiments",
          "color": "#ccff66",
          "value": "30",
          "category": [{
            "label": "EU",
            "color": "#ccff66",
            "value": "8.1"
          }, {
            "label": "AF",
            "color": "#ccff66",
            "value": "10.5"
          }, {
            "label": "AS",
            "color": "#ccff66",
            "value": "11.4"
          }, {
            "label": "NA/SA",
            "color": "#ccff66",
            "value": "11.4"
          }, {
            "label": "OC",
            "color": "#ccff66",
            "value": "11.4"
          }]
        }]
      }]
    }
  });
  topProductsChart.render();
}

//Food & {br}Beverages

 function update_pie(data_json) {
     // Le traitement des données d'émissions est réalisé ici
 }
