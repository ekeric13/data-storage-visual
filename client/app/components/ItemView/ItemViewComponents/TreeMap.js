var React = require("react");

function createTree(treeData) {
  var w = 880 - 80,
      h = 500 - 180,
      x = d3.scale.linear().range([0, w]),
      y = d3.scale.linear().range([0, h]),
      color = d3.scale.category20(),
      root,
      node;

  var treemap = d3.layout.treemap()
      .round(false)
      .size([w, h])
      .sticky(true)
      .value(function(d) { return d.size; });

  var svg = d3.select("#treeMap").append("div")
      .attr("class", "chart")
      .style("width", w + "px")
      .style("height", h + "px")
    .append("svg:svg")
      .attr("width", w)
      .attr("height", h)
    .append("svg:g")
      .attr("transform", "translate(.5,.5)");

  // d3.json("flare.json", function(data) {
    node = root = treeData;

    var nodes = treemap.nodes(root);
        // .filter(function(d) { return !d.children; });

    var cell = svg.selectAll("g")
        .data(nodes)
      .enter().append("svg:g")
        .attr("class", "cell")
        .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; })
        .on("click", function(d) { return zoom(node == d.parent ? root : d.parent); });

    cell.append("svg:rect")
        .attr("width", function(d) { return d.dx - 1; })
        .attr("height", function(d) { return d.dy - 1; })
        .style("fill", function(d) { return color(d.parent ? d.parent.name : d.name); })
        .style("opacity", function(d) { var offset = d.depth * .15; return 1 - offset; });

    cell.append("svg:text")
        .attr("x", function(d) { return d.dx / 2; })
        .attr("y", function(d) { var offset = d.depth*7 ; return d.dy /2; })
        .attr("dy", function(d) { var offset = -2.0 + d.depth * 1; return offset + "em"} )
        .attr("text-anchor", "middle")
        .text(function(d) { return d.name; })
        .style("opacity", function(d) { d.w = this.getComputedTextLength(); return d.dx > d.w ? 1 : 0; });

    d3.select(window).on("click", function() { zoom(root); });

    d3.select("select").on("change", function() {
      treemap.value(this.value == "size" ? size : count).nodes(root);
      zoom(node);
    });
  // });

  function size(d) {
    return d.size;
  }

  function count(d) {
    return 1;
  }

  function zoom(d) {
    var kx = w / d.dx, ky = h / d.dy;
    x.domain([d.x, d.x + d.dx]);
    y.domain([d.y, d.y + d.dy]);

    var t = svg.selectAll("g.cell").transition()
        .duration(d3.event.altKey ? 7500 : 750)
        .attr("transform", function(d) { return "translate(" + x(d.x) + "," + y(d.y) + ")"; });

    t.select("rect")
        .attr("width", function(d) { return kx * d.dx - 1; })
        .attr("height", function(d) { return ky * d.dy - 1; })

    t.select("text")
        .attr("x", function(d) { return kx * d.dx / 2; })
        .attr("y", function(d) { return ky * d.dy / 2; })
        .style("opacity", function(d) { return kx * d.dx > d.w ? 1 : 0; });

    node = d;
    d3.event.stopPropagation();
  }
}

var TreeMap = React.createClass({

  componentDidMount: function() {
    console.log("TreeMap mounted", this.props);
  },

  componentDidUpdate: function() {
    console.log("TreeMap updated", this.props);
    var jsonArray = this.props.parsedItems;
    var tempObj = { "name": "main", "children" : jsonArray};
    createTree(tempObj);
  },



  render: function(){
    return (
      <div>
        <h4> tree map </h4>
        <div id="treeMap">
         </div>
      </div>
    )
  }

});

module.exports = TreeMap;
