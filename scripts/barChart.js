/* Bar chart script */


/* return bar chart data */
function getBarChartData(country, year) {
    var retrieved = gas_complete_data[country][year];
	var data = [
		{
			sector: "Agriculture",
			frequency: retrieved["Agriculture (GHG)"]
		},
		{
			sector: "Bunker fuels",
			frequency: retrieved["Bunker Fuels (GHG)"]
		},
		{
			sector: "Energy",
			frequency: retrieved["Energy (GHG)"]
		},
		{
			sector: "Industry",
			frequency: retrieved["Industry (GHG)"]
		},
		{
			sector: "Waste",
			frequency: retrieved["Waste (GHG)"]
		},
		{
		 	sector: "Transport",
		 	frequency: retrieved["Transport (GHG)"]
		},
		{
			sector: "Other fuel combustion",
			frequency: retrieved["Other Fuel Combustion (GHG)"]
		}
	]
	return data;
}
