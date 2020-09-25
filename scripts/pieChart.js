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
    width: '500',
    height: '500',
    dataFormat: 'json',
    dataSource: {
      "chart": {
        "caption": "Sales Breakup - Top Product Categories",
        "subcaption": "Last Quarter",
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
        "label": "Products",
        "color": "#ffffff",
        "value": "150",
        "category": [{
          "label": "Food & {br}Beverages",
          "color": "#f8bd19",
          "value": "55.5",
          "tooltext": "Food & Beverages, $$valueK, $percentValue",
          "category": [{
            "label": "Breads",
            "color": "#f8bd19",
            "value": "11.1"
          }, {
            "label": "Juice",
            "color": "#f8bd19",
            "value": "27.75"
          }, {
            "label": "Noodles",
            "color": "#f8bd19",
            "value": "9.99"
          }, {
            "label": "Seafood",
            "color": "#f8bd19",
            "value": "6.66"
          }]
        }, {
          "label": "Apparel &{br}Accessories",
          "color": "#33ccff",
          "value": "42",
          "tooltext": "Apparel & Accessories, $$valueK, $percentValue",
          "category": [{
            "label": "Sun Glasses",
            "color": "#33ccff",
            "value": "10.08"
          }, {
            "label": "Clothing",
            "color": "#33ccff",
            "value": "18.9"
          }, {
            "label": "Handbags",
            "color": "#33ccff",
            "value": "6.3"
          }, {
            "label": "Shoes",
            "color": "#33ccff",
            "value": "6.72"
          }]
        }, {
          "label": "Baby {br}Products",
          "color": "#ffcccc",
          "value": "22.5",
          "tooltext": "Baby Products, $$valueK, $percentValue",
          "category": [{
            "label": "Bath &{br}Grooming",
            "color": "#ffcccc",
            "value": "9.45",
            "tooltext": "Bath & Grooming, $$valueK, $percentValue"
          }, {
            "label": "Food",
            "color": "#ffcccc",
            "value": "6.3"
          }, {
            "label": "Diapers",
            "color": "#ffcccc",
            "value": "6.75"
          }]
        }, {
          "label": "Electronics",
          "color": "#ccff66",
          "value": "30",
          "category": [{
            "label": "Laptops",
            "color": "#ccff66",
            "value": "8.1"
          }, {
            "label": "Televisions",
            "color": "#ccff66",
            "value": "10.5"
          }, {

            "label": "SmartPhones",
            "color": "#ccff66",
            "value": "11.4"
          }]
        }]
      }]
    }
  });
  topProductsChart.render();
}

 function update_pie(data_json) {
     // Le traitement des données d'émissions est réalisé ici
     var data = google.visualization.arrayToDataTable([
            ['Task', 'Hours per Day'],
            ['Agriculture',     11],
            ['Energie',      2],
            ['Industrie',  2],
            ['Batiments', 2],
            ['Electricité & Chaleur',    7],
            ['Énergie de fabrication/construction',    7],
            ['Transport',    7]
          ]);

          var options = {
            title: 'My Daily Activities',
            pieHole: 0.4,
          };

          var chart = new google.visualization.PieChart(document.getElementById('piechart'));

          chart.draw(data, options);
 }
