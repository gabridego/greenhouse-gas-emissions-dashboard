let sankey, sankey_path, formatNumber, s_width, s_height;
const units = "billion t";

function init_sankey() {
  		 
  var margin = {top: 10, right: 10, bottom: 10, left: 10};
  s_width = 1200 - margin.left - margin.right;
  s_height = 740 - margin.top - margin.bottom;
   
  formatNumber = d3.format(",.0f"),    // zero decimal places
      format = function(d) { return formatNumber(d) + " " + units; },
      color = d3.scale.category20();
   
  // append the svg canvas to the page
  var svg = d3.select("#sankey_chart").append("svg")
      .attr("id", "sankey_svg")
      .attr("width", s_width + margin.left + margin.right)
      .attr("height", s_height + margin.top + margin.bottom)
    .append("g")
      .attr("transform", 
            "translate(" + margin.left + "," + margin.top + ")");
   
  // Set the sankey diagram properties
  sankey = d3.sankey()
      .nodeWidth(36)
      .nodePadding(10)
      .size([s_width, s_height]);

  sankey_path = sankey.link();
}

function draw_sankey(year, data) {
  var graph = jsonClone(data)
	// clear previous graphs
	d3.selectAll("#sankey_svg > g > *").remove();
 
  var nodeMap = {};
  graph.nodes.forEach(function(x) { nodeMap[x.name] = x; });
  graph.links = graph[year].map(function(x) {
    return {
      source: nodeMap[x.source],
      target: nodeMap[x.target],
      value: x.value
    };
  });
 
  sankey
      .nodes(graph.nodes)
      .links(graph.links)
      .layout(32);
 
// add in the links
  var svg = d3.select("#sankey_svg");
  var link = svg.append("g").selectAll(".link")
      .data(graph.links)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", sankey_path)
      .style("stroke-width", function(d) { return Math.max(1, d.dy); })
      .sort(function(a, b) { return b.dy - a.dy; });
 
// add the link titles
  link.append("title")
        .text(function(d) {
      	return d.source.name + " → " + 
                d.target.name + "\n" + format(d.value); });
 
// add in the nodes
  var node = svg.append("g").selectAll(".node")
      .data(graph.nodes)
    .enter().append("g")
      .attr("class", "node")
      .attr("transform", function(d) { 
		  return "translate(" + d.x + "," + d.y + ")"; })
    .call(d3.behavior.drag()
      .origin(function(d) { return d; })
      .on("dragstart", function() { 
		  this.parentNode.appendChild(this); })
      .on("drag", dragmove));
 
// add the rectangles for the nodes
  node.append("rect")
      .attr("height", function(d) { return d.dy; })
      .attr("width", sankey.nodeWidth())
      .style("fill", function(d) { 
		  return d.color = color(d.name.replace(/ .*/, "")); })
      .style("stroke", function(d) { 
		  return d3.rgb(d.color).darker(2); })
    .append("title")
      .text(function(d) { 
		  return d.name + "\n" + format(d.value); });
 
// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < s_width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");
 
// the function for moving the nodes
  function dragmove(d) {
    d3.select(this).attr("transform", 
        "translate(" + (
        		d.x = Math.max(0, Math.min(s_width - d.dx, d3.event.x))
        	) + "," + (
                d.y = Math.max(0, Math.min(s_height - d.dy, d3.event.y))
            ) + ")");
    sankey.relayout();
    link.attr("d", sankey_path);
  }
};

function jsonClone(src) {
	return JSON.parse(JSON.stringify(src));
}