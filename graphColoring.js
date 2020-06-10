class GraphNode {
    constructor(label) {
        this.label = label;
        this.neighbors = new Set();
        this.color = null;
    }
}


/**
 * OFFICIAL APPROACH
 * BIG O: TIME: O(N+M), SPACE: O(D)
 */

// function colorGraph(graph, colors) {

//     graph.forEach(node => {

//         if (node.neighbors.has(node)) {
//             throw new Error(`Legal coloring impossible for node with loop: ${node.label}`);
//         }

//         // Get the node's neighbors' colors, as a set so we
//         // can check if a color is illegal in constant time
//         const illegalColors = new Set();

//         node.neighbors.forEach(neighbor => {
//             if (neighbor.color !== null) {
//                 illegalColors.add(neighbor.color);
//             }
//         });

//         // Assign the first legal color
//         for (let i = 0; i < colors.length; i++) {
//             const color = colors[i];

//             if (!illegalColors.has(color)) {
//                 node.color = color;
//                 break;
//             }
//         }
//     });
// }


/**
 * MY APPROACH #2 (Adapted from Official Approach)
 * BIG O: TIME: 0(N*M), SPACE: O(D)
*/

function colorGraph(graph, colors) {
    for (let node of graph) {
        if (node.neighbors.has(node)) throw new Error('Loop detected')

        const illegalColors = new Set();

        for (let neighbor of node.neighbors) {

            if (neighbor.color !== null) {
                illegalColors.add(neighbor.color);
            }
        }

        for (let color of colors) {
            if (!illegalColors.has(color)) {
                node.color = color
                break;
            }
        }
    }
}


/**
 * MY APPROACH #1
 * BIG O: TIME: O(N), SPACE: O(N+M)
 * BFS
 * Create queue
 * Add first node into queue
 * While queue is not empty
 * Dequeue node
 * Queue neighbors
 * Invoke assignColor function on node
 * Assign current node to prev node
 * 
 * ASSIGN COLOR FUNCTION (current, prev, colors)
 * if (!prev)
 * Get random index (between 0, colors.length)
 * Assign color[random index] to current
 * else
 * Filter prev.color from colors
 * Get random index (Between 0, filter.length)
 * Assign filter[random index] to current
*/

// function colorGraph(graph, colors) {
//   //Edge case
//   if (!graph || graph.length < 1) return new Error('Invalid input');

//   if (graph.length === 1) {
//     graph[0].color = colors[0];
//     return graph;
//   }

//   const queue = [graph[0]];
//   const visited = new Set();
//   let prevNode;

//   while (queue.length > 0) {
//     let currentNode = queue.shift();
//     if (!visited.has(currentNode)) {
//       visited.add(currentNode);

//       assignColor(currentNode, prevNode, colors)

//       // Add neighbors to queue
//       for (let neighbor of currentNode.neighbors) {
//         queue.push(neighbor)
//       }

//       // console.log(`queued neighbors: `, queue);

//       prevNode = currentNode;
//     }

//   }

//   // return graph




//   function assignColor(current, prev, colors) {
//     // console.log(`INVOKE ASSIGN COLOR`)
//     if (prev===undefined) {
//       const randomIndex = Math.floor(Math.random() * colors.length);
//       current.color = colors[randomIndex];
//     } else {
//       const filteredColors = colors.filter(color => color !== prev.color)
//       // console.log(`filteredColors: `, filteredColors);
//       const randomIndex = Math.floor(Math.random() * filteredColors.length);
//       current.color = filteredColors[randomIndex];
//     }
//   }

// }











// Tests
const colors = ['red', 'green', 'blue', 'orange', 'yellow', 'white'];

let graph = [];
{
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    const nodeD = new GraphNode('D');
    nodeA.neighbors.add(nodeB);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeC.neighbors.add(nodeB);
    nodeC.neighbors.add(nodeD);
    nodeD.neighbors.add(nodeC);
    graph = [nodeA, nodeB, nodeC, nodeD];
}
colorGraph(graph, colors)
assertEqual(validateGraphColoring(graph), true, 'line graph');

{
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    const nodeD = new GraphNode('D');
    nodeA.neighbors.add(nodeB);
    nodeB.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeD);
    nodeD.neighbors.add(nodeC);
    graph = [nodeA, nodeB, nodeC, nodeD];
}
colorGraph(graph, colors);
assertEqual(validateGraphColoring(graph), true, 'separate graph');

{
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    nodeA.neighbors.add(nodeB);
    nodeA.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeC.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeB);
    graph = [nodeA, nodeB, nodeC];
}
colorGraph(graph, colors);
assertEqual(validateGraphColoring(graph), true, 'triangle graph');

{
    const nodeA = new GraphNode('A');
    const nodeB = new GraphNode('B');
    const nodeC = new GraphNode('C');
    const nodeD = new GraphNode('D');
    const nodeE = new GraphNode('E');
    nodeA.neighbors.add(nodeB);
    nodeA.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeA);
    nodeB.neighbors.add(nodeC);
    nodeB.neighbors.add(nodeD);
    nodeB.neighbors.add(nodeE);
    nodeC.neighbors.add(nodeA);
    nodeC.neighbors.add(nodeB);
    nodeC.neighbors.add(nodeD);
    nodeC.neighbors.add(nodeE);
    nodeD.neighbors.add(nodeB);
    nodeD.neighbors.add(nodeC);
    nodeD.neighbors.add(nodeE);
    nodeE.neighbors.add(nodeB);
    nodeE.neighbors.add(nodeC);
    nodeE.neighbors.add(nodeD);
    graph = [nodeA, nodeB, nodeC, nodeD, nodeE];
}
colorGraph(graph, colors);
assertEqual(validateGraphColoring(graph), true, 'envelope graph');

{
    const nodeA = new GraphNode('A');
    nodeA.neighbors.add(nodeA);
    graph = [nodeA];
}
assertThrows(() => {
    colorGraph(graph, colors);
}, 'loop graph');

function validateGraphColoring(graph) {

    const maxDegree = Math.max(...graph.map(node => node.neighbors.size));

    const colorsUsed = new Set();

    graph.forEach(node => {
        colorsUsed.add(node.color);
    });

    if (colorsUsed.has(null)) {
        console.log(`colorsUsed.has(null)`)
        return false;
    }

    if (colorsUsed.size > maxDegree + 1) {
        console.log(`colorsUsed.size > maxDegree + 1`)
        return false;
    }

    let badEdges = 0;

    graph.forEach(node => {
        node.neighbors.forEach(neighbor => {
            if (neighbor.color === node.color) {
                badEdges += 1;
            }
        });
    });

    if (badEdges > 0) {
        console.log(`badEdges > 0`)
        return false;
    }

    return true;
}

function assertEqual(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}

function assertThrows(func, desc) {
    try {
        func();
        console.log(`${desc} ... FAIL`);
    } catch (e) {
        console.log(`${desc} ... PASS`);
    }
}