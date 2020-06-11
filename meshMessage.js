// A simple, somewhat inefficient queue implementation
class Queue {
    constructor() {
        this.queue = [];
        this.size = 0;
    }

    enqueue(item) {
        this.queue.unshift(item);
        this.size += 1;
    }

    dequeue() {
        this.size -= 1;
        return this.queue.pop();
    }
}

/**
 * OFFICIAL APPROACH
 * BIG O: TIME: O(N+M), SPACE: O(N)
 */

// Assume we have an efficient queue implementation, Queue()
// with enqueue and dequeue methods and a size property
function reconstructPath(howWeReachedNodes, endNode) {

    const reversedShortestPath = [];

    // Start from the end of the path and work backwards
    let currentNode = endNode;

    while (currentNode !== null) {
        reversedShortestPath.push(currentNode);
        currentNode = howWeReachedNodes[currentNode];
    }

    // Reverse our path to get the right order
    return reversedShortestPath.reverse(); // No longer reversed
}

function bfsGetPath(graph, startNode, endNode) {

    if (!graph.hasOwnProperty(startNode)) {
        throw new Error('Start node not in graph!');
    }
    if (!graph.hasOwnProperty(endNode)) {
        throw new Error('End node not in graph!');
    }

    const nodesToVisit = new Queue();
    nodesToVisit.enqueue(startNode);

    // Keep track of how we got to each node
    // We'll use this to reconstruct the shortest path at the end
    // We'll ALSO use this to keep track of which nodes we've
    // already visited
    const howWeReachedNodes = {};
    howWeReachedNodes[startNode] = null;

    while (nodesToVisit.size > 0) {
        const currentNode = nodesToVisit.dequeue();

        // Stop when we reach the end node
        if (currentNode === endNode) {
            return reconstructPath(howWeReachedNodes, endNode);
        }

        graph[currentNode].forEach(neighbor => {
            if (!howWeReachedNodes.hasOwnProperty(neighbor)) {
                nodesToVisit.enqueue(neighbor);
                howWeReachedNodes[neighbor] = currentNode;
            }
        });
    }

    // If we get here, then we never found the end node
    // so there's NO path from startNode to endNode
    return null;
}



/**
 * MY APPROACH #1
 * BIG O: TIME: O(N+M), SPACE: O(N)
 * Create a queue to manage traversal paths
 * Create a set to track nodes visited
 * Enqueue the starting node as an inital path
 * Loop while queue size is greater than 0
 * Dequeue path
 * Assign current node
 * If current node is equal to destination node return path
 * If current node has not been visited
 * Mark as visited
 * Iterate through nearby users
 * Create a new path array with the current path
 * Add the nearby user
 * Enqueue new path
 * If loop completes that means no path was found return null
 * 
 * EDGE CASES
 * Mising input(s)
 * Start or end nodes not present in graph
 * 
*/
// Assume we have an efficient queue implementation, Queue()
// with enqueue and dequeue methods and a size property
function getPath(graph, startNode, endNode) {
    // Edge cases
    if (!graph || !startNode || !endNode) throw new Error('Missing input');
    if (!graph.hasOwnProperty(startNode) || !graph.hasOwnProperty(endNode)) {
        throw new Error('Node not in graph');
    }

    const queue = new Queue();
    const visited = new Set();
    queue.enqueue([startNode]);

    while (queue.size > 0) {
        const currentPath = queue.dequeue();
        const currentNode = currentPath[currentPath.length - 1];

        if (currentNode === endNode) return currentPath;

        if (!visited.has(currentNode)) {
            visited.add(currentNode);

            for (node of graph[currentNode]) {
                const pathCopy = [...currentPath];
                pathCopy.push(node);
                queue.enqueue(pathCopy);
            }
        }
    }

    console.log(`No available path`)
    return null;
}




// Tests
const graph = {
    'a': ['b', 'c', 'd'],
    'b': ['a', 'd'],
    'c': ['a', 'e'],
    'd': ['a', 'b'],
    'e': ['c'],
    'f': ['g'],
    'g': ['f']
};

let desc = 'two hop path 1';
let actual = getPath(graph, 'a', 'e');
let expected = ['a', 'c', 'e'];
assertDeepEqual(actual, expected, desc);

desc = 'two hop path 2';
actual = getPath(graph, 'd', 'c');
expected = ['d', 'a', 'c'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 1';
actual = getPath(graph, 'a', 'c');
expected = ['a', 'c'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 2';
actual = getPath(graph, 'f', 'g');
expected = ['f', 'g'];
assertDeepEqual(actual, expected, desc);

desc = 'one hop path 3';
actual = getPath(graph, 'g', 'f');
expected = ['g', 'f'];
assertDeepEqual(actual, expected, desc);

desc = 'zero hop path';
actual = getPath(graph, 'a', 'a');
expected = ['a'];
assertDeepEqual(actual, expected, desc);

desc = 'no path';
actual = getPath(graph, 'a', 'f');
expected = null;
assertDeepEqual(actual, expected, desc);

desc = 'start node not present';
assertThrowsError(() => {
    getPath(graph, 'h', 'a');
}, desc);

desc = 'end node not present';
assertThrowsError(() => {
    getPath(graph, 'a', 'h');
}, desc);

function assertDeepEqual(a, b, desc) {
    const aStr = JSON.stringify(a);
    const bStr = JSON.stringify(b);
    if (aStr !== bStr) {
        console.log(`${desc} ... FAIL: ${aStr} != ${bStr}`);
    } else {
        console.log(`${desc} ... PASS`);
    }
}

function assertThrowsError(func, desc) {
    try {
        func();
        console.log(`${desc} ... FAIL`);
    } catch (e) {
        console.log(`${desc} ... PASS`);
    }
}