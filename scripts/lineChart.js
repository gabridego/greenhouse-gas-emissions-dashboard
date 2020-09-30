let myChart;

  function getDataLineChart(filter)
  {
    return dataSource = {
        chart: {
          yaxisname: "Émissions de gaz (en tonnes éq. CO₂)",
          showhovereffect: "1",
          numbersuffix: " M",
          drawcrossline: "1",
          legendItemFontSize: "10",
          legendNumRows: "2",
          alignLegendWithCanvas: "0",
          theme: "fusion"
        },
        categories: [
          {
            category: (() => {

                let arrayLabel = [];
                for (let i = 1990; i < 2017; i++) {
                    arrayLabel.push({
                        label: i.toString()
                      });
                }

                return arrayLabel;
            })()
          }
        ],
        dataset: (() => {

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

            let arraySectors = [];
            let i = 0;

            for (const key in full_camembert[1990][gas]) {
            	let c;
            	if(col_graphs[gas][key])
            		c = col_graphs[gas][key];
            	else
            		c = color_picker[i++]

                arraySectors.push({
                    seriesname: get_short_label(key),
                    color: col_graphs[gas][key],
                    data: []
                })
            }

            for (i = 1990; i < 2017; i++) {

                let obj = full_camembert[i][gas]

                for(let j = 0; j < Object.keys(obj).length; j++) {
                    let tot = 0.0;
                    for(let cont in obj[Object.keys(obj)[j]])
                        tot += obj[Object.keys(obj)[j]][cont]['value'];
                    arraySectors[j].data.push({
                        value: tot.toString()
                    });
                }
            }

            return arraySectors;
        })()
      };
  }

  function create_line(filter)
  {
    FusionCharts.ready(function() {
        myChart = new FusionCharts({
          type: "msline",
          renderAt: "chart-container",
          width: "100%",
          height: "100%",
          dataFormat: "json",
          dataSource: getDataLineChart(filter)
        }).render();
      });
  }

  function update_linechart(filter)
  {
    myChart.setJSONData(getDataLineChart(filter));
  }
