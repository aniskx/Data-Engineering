document.addEventListener('DOMContentLoaded', () => {
    const width = 800;
    const height = 600;

    const svg = d3.select("svg")
        .attr("width", width)
        .attr("height", height);

    const data = {
        nodes: [
            { id: 'box1', label: 'Node 1', url: 'page1.html' },
            { id: 'box2', label: 'Node 2', url: 'page2.html' },
            { id: 'box3', label: 'Node 3', url: 'page3.html' },
            { id: 'box4', label: 'Node 4', url: 'page4.html' },
            { id: 'box5', label: 'Node 5', url: 'page5.html' },
        ],
        links: [
            { source: 'box1', target: 'box3' },
            { source: 'box2', target: 'box3' },
            { source: 'box3', target: 'box4' },
            { source: 'box3', target: 'box5' },
        ]
    };

    const link = svg.selectAll(".link")
        .data(data.links)
        .enter().append("line")
        .attr("class", "link");

    const node = svg.selectAll(".node")
        .data(data.nodes)
        .enter().append("g")
        .attr("class", "node")
        .on("mouseover", function (event, d) {
            highlightConnectedNodes(d.id, true);
        })
        .on("mouseout", function (event, d) {
            highlightConnectedNodes(d.id, false);
        })
        .call(d3.drag());

    node.append("rect")
        .attr("x", -50)
        .attr("y", -25)
        .attr("width", 100)
        .attr("height", 50)
        .attr("rx", 10)
        .attr("ry", 10);

    node.append("a")
        .attr("href", d => d.url)
        .append("text")
        .attr("dy", ".35em")
        .attr("text-anchor", "middle")
        .text(d => d.label);

    const simulation = d3.forceSimulation(data.nodes)
        .force("link", d3.forceLink(data.links).id(d => d.id).distance(150))
        .force("charge", d3.forceManyBody().strength(-500))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);

    function ticked() {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("transform", d => `translate(${d.x},${d.y})`);
    }

    function highlightConnectedNodes(nodeId, highlight) {
        const connectedNodes = data.links
            .filter(link => link.source.id === nodeId || link.target.id === nodeId)
            .map(link => link.source.id === nodeId ? link.target.id : link.source.id);
        
        node.selectAll("rect")
            .attr("class", d => connectedNodes.includes(d.id) || d.id === nodeId ? (highlight ? 'highlight' : '') : '');
    }
});
