class LinkedListNode {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

/**
 * APPROACH #1
 * BIG O: TIME: O(N), SPACE: O(N)
 */
// function containsCycle(firstNode) {
// 	const trackNodes = new Set();

// 	let currentNode = firstNode;
// 	while (currentNode) {
// 		if (trackNodes.has(currentNode)) {
// 			console.log(`We have a cycle`);
// 			return true;
// 		}

// 		trackNodes.add(currentNode);
// 		currentNode = currentNode.next;
// 	}

// 	return false;
// }

// /**
//  * APPROACH #2 [NOT WORKING]
//  * BIG O: TIME: O(N), SPACE: O(1);
//  * slowNode fastNode approach
//  */
// function containsCycle(firstNode) {
// 	let slowNode = firstNode;
// 	let fastNode = firstNode;

// 	while (fastNode) {
// 		if (slowNode === fastNode) {
// 			console.log(`We have a cycle`);
// 			return true;
// 		}
// 		slowNode = slowNode.next;
// 		fastNode = fastNode.next.next;
// 	}

// 	return false;
// }

/**
 * APPROACH #2 [WITH CORRECTIONS]
 * BIG O: TIME: O(N), SPACE: O(1);
 * slowNode fastNode approach
 */
function containsCycle(firstNode) {
	let slowNode = firstNode;
	let fastNode = firstNode;

    while (fastNode && fastNode.next) {
        slowNode = slowNode.next;
        fastNode = fastNode.next.next;
        
		if (slowNode === fastNode) {
			console.log(`We have a cycle`);
			return true;
		}

	}

	return false;
}

/**
 * OFFICIAL APPROACH
 * BIG 0: TIME: O(N), SPACE: O(1)
 * slow node/fast node approach
 */
// function containsCycle(firstNode) {
//     // Start both runners at the beginning
//     let slowRunner = firstNode;
//     let fastRunner = firstNode;

//     // Until we hit the end of the list
//     while (fastRunner && fastRunner.next) {
//         slowRunner = slowRunner.next;
//         fastRunner = fastRunner.next.next;

//         // Case: fastRunner is about to "lap" slowRunner
//         if (fastRunner === slowRunner) {
//             return true;
//         }
//     }

//     // Case: fastRunner hit the end of the list
//     return false;
// }


// Tests

let desc = "linked list with no cycle";
let nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
assertEquals(containsCycle(nodes[0]), false, desc);

desc = "cycle loops to beginning";
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
nodes[3].next = nodes[0];
assertEquals(containsCycle(nodes[0]), true, desc);

desc = "cycle loops to middle";
nodes = valuesToLinkedListNodes([1, 2, 3, 4, 5]);
nodes[4].next = nodes[2];
assertEquals(containsCycle(nodes[0]), true, desc);

desc = "two node cycle at end";
nodes = valuesToLinkedListNodes([1, 2, 3, 4, 5]);
nodes[4].next = nodes[3];
assertEquals(containsCycle(nodes[0]), true, desc);

desc = "empty list";
assertEquals(containsCycle(null), false, desc);

desc = "one element linked list no cycle";
let firstNode = new LinkedListNode(1);
assertEquals(containsCycle(firstNode), false, desc);

desc = "one element linked list cycle";
firstNode = new LinkedListNode(1);
firstNode.next = firstNode;
assertEquals(containsCycle(firstNode), true, desc);

function valuesToLinkedListNodes(values) {
	const nodes = [];
	for (let i = 0; i < values.length; i++) {
		const node = new LinkedListNode(values[i]);
		if (i > 0) {
			nodes[i - 1].next = node;
		}
		nodes.push(node);
	}
	return nodes;
}

function assertEquals(a, b, desc) {
	if (a === b) {
		console.log(`${desc} ... PASS`);
	} else {
		console.log(`${desc} ... FAIL: ${a} != ${b}`);
	}
}
