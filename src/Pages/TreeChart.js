import d3  from "d3"

var treeData = {
    "name": "Top Level",
    "children" : [
        {
            "name" : "level 2: A",
            "children": [{
                "name" : "Level 3: A1"
            },
        {
            "name" : "Level 3: A2"
        }]
        },
        {
            "name" : "Level 2: B",
            "children": [
                {"name": "Level 3: B1"},
                {"name": "Level 3: B2"}
            ]
        }
    ]
}

var tree = d3.tree()
  .size([height, width]);

// Set the root node of the tree
var root = tree(treeData);

// Create an SVG group element to contain all the nodes and links in the tree
var svg = d3.select("svg"),
    svgGroup = svg.append("g");

// Define the node and link selection variables
var node = svgGroup.selectAll(".node"),
    link = svgGroup.selectAll(".link");

// Bind the data to the nodes and links in the tree
node = node.data(root.descendants(), function(d) { return d.id; });
link = link.data(root.links(), function(d) { return d.target.id; });

// Create the nodes and links in the tree
node.enter().append("circle")
    .attr("class", "node")
    .attr("r", 10)
    .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

link.enter().insert("path", "g")
    .attr("class", "link")
    .attr("d", d3.linkHorizontal()
    .x(function(d) { return d.y; })
    .y(function(d) { return d.x; }));

// Apply transitions to the nodes and links in the tree
node.transition()
    .duration(duration)
    .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

link.transition()
    .duration(duration)
    .attr("d", d3.linkHorizontal()
    .x(function(d) { return d.target.y; })
    .y(function(d) { return d.target.x; }));