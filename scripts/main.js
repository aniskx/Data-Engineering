document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM fully loaded and parsed");

    try {
        const width = 1200;  // Adjusted width to accommodate horizontal layout
        const height = 200;  // Reduced height since it's a horizontal layout

        console.log("Creating SVG");
        const svg = d3.select("#graph-container")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        console.log("SVG created successfully");

        const nodes = [
            { id: "Learn the Basics", x: 50, y: 50 },
            { id: "Data Structures and Algorithms", x: 200, y: 50 },
            { id: "Advanced Topics", x: 350, y: 50 },
            { id: "Learn a Framework", x: 500, y: 50 },
            { id: "Testing your Apps", x: 650, y: 50 },
            { id: "Version Control", x: 800, y: 50 },
            { id: "Databases", x: 950, y: 50 },
            { id: "APIs", x: 1100, y: 50 }
            // Add more nodes if necessary, adjust x-coordinates for horizontal layout
        ];

        const links = [
            { source: "Learn the Basics", target: "Data Structures and Algorithms" },
            { source: "Data Structures and Algorithms", target: "Advanced Topics" },
            { source: "Advanced Topics", target: "Learn a Framework" },
            { source: "Learn a Framework", target: "Testing your Apps" },
            { source: "Testing your Apps", target: "Version Control" },
            { source: "Version Control", target: "Databases" },
            { source: "Databases", target: "APIs" }
            // Add more links if necessary
        ];

        console.log("Data prepared");

        const link = svg.append("g")
            .selectAll("line")
            .data(links)
            .enter()
            .append("line")
            .attr("class", "link")
            .attr("x1", d => nodes.find(n => n.id === d.source).x)
            .attr("y1", d => nodes.find(n => n.id === d.source).y)
            .attr("x2", d => nodes.find(n => n.id === d.target).x)
            .attr("y2", d => nodes.find(n => n.id === d.target).y);

        console.log("Links created");

        const node = svg.append("g")
            .selectAll("g")
            .data(nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .attr("transform", d => `translate(${d.x},${d.y})`);

        console.log("Nodes created");

        node.append("rect")
            .attr("width", d => d.id.length * 8)
            .attr("height", 30)
            .attr("rx", 5)
            .attr("ry", 5);

        node.append("text")
            .text(d => d.id)
            .attr("x", 5)
            .attr("y", 20);

        console.log("Node rectangles and text created");

    } catch (error) {
        console.error("An error occurred:", error);
    }
});
