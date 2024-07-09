function createGraph() {
    const width = 800;
    const height = 600;

    const svg = d3.select("#graph-container")
        .append("svg")
        .attr("width", width)
        .attr("height", height);

    const data = {
        nodes: [
            { id: "Learn the Basics", group: 1 },
            { id: "Data Structures and Algorithms", group: 1 },
            { id: "Advanced Topics", group: 1 },
            { id: "Learn a Framework", group: 1 },
            { id: "Testing your Apps", group: 1 },
            { id: "Version Control", group: 2 },
            { id: "Databases", group: 2 },
            { id: "APIs", group: 2 },
            { id: "Deployment", group: 2 },
            { id: "Security", group: 2 },
            { id: "Scalability", group: 2 },
            { id: "Design Patterns", group: 2 },
            { id: "Continuous Integration", group: 2 },
            { id: "Cloud Computing", group: 2 },
            { id: "Mobile Development", group: 3 },
            { id: "Web Development", group: 3 },
            { id: "Data Science", group: 3 },
            { id: "Machine Learning", group: 3 },
            { id: "DevOps", group: 3 }
        ],
        links: [
            { source: "Learn the Basics", target: "Data Structures and Algorithms" },
            { source: "Data Structures and Algorithms", target: "Advanced Topics" },
            { source: "Advanced Topics", target: "Learn a Framework" },
            { source: "Learn a Framework", target: "Testing your Apps" },
            { source: "Learn the Basics", target: "Version Control" },
            { source: "Learn the Basics", target: "Databases" },
            { source: "Learn the Basics", target: "APIs" },
            { source: "Advanced Topics", target: "Deployment" },
            { source: "Advanced Topics", target: "Security" },
            { source: "Advanced Topics", target: "Scalability" },
            { source: "Advanced Topics", target: "Design Patterns" },
            { source: "Testing your Apps", target: "Continuous Integration" },
            { source: "Deployment", target: "Cloud Computing" },
            { source: "Learn a Framework", target: "Mobile Development" },
            { source: "Learn a Framework", target: "Web Development" },
            { source: "Data Structures and Algorithms", target: "Data Science" },
            { source: "Data Science", target: "Machine Learning" },
            { source: "Cloud Computing", target: "DevOps" }
        ]
    };

    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links).id(d => d.id))
        .force("charge", d3.forceManyBody().strength(-300))
        .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
        .selectAll("line")
        .data(data.links)
        .join("line")
        .attr("class", "link");

    const node = svg.append("g")
        .selectAll("g")
        .data(data.nodes)
        .join("g")
        .attr("class", "node")
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    node.append("rect")
        .attr("width", d => d.id.length * 8)
        .attr("height", 30)
        .attr("rx", 5)
        .attr("ry", 5);

    node.append("text")
        .text(d => d.id)
        .attr("x", 5)
        .attr("y", 20);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x - d.id.length * 4},${d.y - 15})`);
    });

    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed');
    try {
        createGraph();
        console.log('Graph created successfully');
    } catch (error) {
        console.error('Error creating graph:', error);
    }
});