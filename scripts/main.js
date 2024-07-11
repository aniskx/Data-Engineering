document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    const data = {
        name: "Data Engineer Learning Path",
        url: "#",
        children: [
            {
                name: "SQL",
                url: "pages/sql.html",
                children: [
                    {
                        name: "Advanced SQL",
                        url: "pages/advanced_sql.html",
                        children: []
                    }
                ]
            },
            {
                name: "Python",
                url: "pages/python.html",
                children: [
                    {
                        name: "Data Analysis with Python",
                        url: "pages/data_analysis_python.html",
                        children: []
                    }
                ]
            }
            // More nodes...
        ]
    };

    function createGraph(data) {
        var margin = {top: 20, right: 120, bottom: 20, left: 120},
            width = 960 - margin.right - margin.left,
            height = 500 - margin.top - margin.bottom;

        var svg = d3.select("#graph-container")
            .append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        var tree = d3.tree().size([height, width]);

        var root = d3.hierarchy(data);
        tree(root);

        var nodes = root.descendants(),
            links = root.links();

        var link = svg.selectAll(".link")
            .data(links)
            .enter().append("path")
            .attr("class", "link")
            .attr("d", d3.linkHorizontal()
                .x(function(d) { return d.y; })
                .y(function(d) { return d.x; }));

        var node = svg.selectAll(".node")
            .data(nodes)
            .enter().append("g")
            .attr("class", "node")
            .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

        node.append("circle")
            .attr("r", 10);

        node.append("a")
            .attr("xlink:href", function(d) { return d.data.url; })
            .append("text")
            .attr("dy", ".35em")
            .attr("x", function(d) { return d.children ? -13 : 13; })
            .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
            .text(function(d) { return d.data.name; });
    }

    createGraph(data);
});
