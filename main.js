/* main.js */
/*
var data = [1100, 1000, 900, 800, 1050];
d3.select(".bar_chart").selectAll("div").data(data).enter().append("div").style("width", d => {return d / 10 + "px";}).text(d => {return d});
*/
var data2 = [
	{name: "A", value: "100"},
	{name: "B", value: "150"},
	{name: "C", value: "200"},
	{name: "D", value: "250"},
	{name: "E", value: "350"}
];

//d3.select(".xy_bar_chart").selectAll("div").data(data2).enter().append("rect").attr("class", "bar").attr("x", d => {return d.name}).attr("y", d => {return d.value}).attr("height", d => {return d.value}).attr("width", d => {return "30"});
//

const drawFromCSV = (file, elemId) => {
	d3.csv(file, data => {
		return {
			name: data.name,
			value: data.sales
		};
	}).then(data => {
		d3.select(elemId).selectAll("div").data(data).enter()
			.append("div")
			.style("width", d => {return d.value + "px"})
			.style("height", "30px")
			.attr("class", "bar")
			.text(d => {return d.name})
	})
}

drawFromCSV("./table.csv", "#chart1")
