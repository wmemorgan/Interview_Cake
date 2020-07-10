class LinkedListNode {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

/**
 * MY APPROACH #1
 * BIG O: TIME: O(N), SPACE: O(1)
 * Reverse the LL and track LL length
 * Traverse LL
 * Loop while current node is NOT null AND steps are greater than 1
 * Moving forward 'k-1' number of times
 * RETURN current node
 * EDGE CASE Check
 * K is greater than length of LL
 * K is zero
 */

// function kthToLastNode(k, head) {
// 	console.log(`k: ${k}`);
// 	// Edge case check
// 	if (k < 1) throw new Error("k is less than or equal to zero");

// 	const reversedList = reverse(head);
// 	const listLength = reversedList[1];

// 	// Edge case check
// 	if (k > listLength) throw new Error("k greater than linked list length");

// 	console.log(`listLength: ${listLength}`);

// 	let node = reversedList[0];
// 	let steps = k - 1;

// 	while (node && steps > 0) {
// 		node = node.next;
// 		steps--;
// 	}

// 	return node;
// }

// function reverse(headOfList) {
// 	let currentNode = headOfList;
// 	let previousNode = null;
// 	let nextNode = null;
// 	// Track list length
// 	let length = 0;

// 	// Until we have 'fallen off' the end of the list
// 	while (currentNode) {
// 		// Copy a pointer to the next element
// 		// before we overwrite currentNode.next
// 		nextNode = currentNode.next;

// 		// Reverse the 'next' pointer
// 		currentNode.next = previousNode;

// 		// Step forward in the list
// 		previousNode = currentNode;
// 		currentNode = nextNode;
// 		length++;
// 	}

// 	return [previousNode, length];
// }

/**
 * MY APPROACH #2
 * BIG O: TIME: O(N), SPACE: O(1)
 * Declare length variable to get length of LL
 * Traverse through LL and track length
 * Calculate target steps by subtracting k from length
 * Loop through list while steps > 0
 * Decrement steps in each iteration
 * RETURN current node
 * EDGE CASE Check
 * K is greater than length of LL
 * K is zero
*/
function kthToLastNode(k, head) {
  console.log(`k: ${k}`)
  // Edge case check
  if (k < 1) throw new Error('k is less than or equal to zero')
  
  let node = head;
  let listLength = 0;
  
  while (node) {
    node = node.next
    listLength++;
  }
  console.log(`listLength ${listLength}`)
  // Edge case check
  if (k > listLength) throw new Error('k greater than linked list length')
  
  let steps = listLength - k;
  node = head;
  while(steps > 0) {
    node = node.next;
    steps--;
  }
  
  return node;
  
}

/**
 * OFFICIAL APPROACH #1
 * BIG O: TIME: O(N), SPACE: O(1)
 */
function kthToLastNode(k, head) {
    if (k < 1) {
        throw new Error(`Impossible to find less than first to last node: ${k}`);
    }

    // STEP 1: get the length of the list
    // Start at 1, not 0
    // else we'd fail to count the head node!
    let listLength = 1;
    let currentNode = head;

    // Traverse the whole list,
    // counting all the nodes
    while (currentNode.next) {
        currentNode = currentNode.next;
        listLength += 1;
    }

    // If k is greater than the length of the list, there can't
    // be a kth-to-last node, so we'll return an error!
    if (k > listLength) {
        throw new Error(`k is larger than the length of the linked list: ${k}`);
    }

    // STEP 2: walk to the target node
    // Calculate how far to go, from the head,
    // to get to the kth to last node
    const howFarToGo = listLength - k;

    currentNode = head;
    for (let i = 0; i < howFarToGo; i++) {
        currentNode = currentNode.next;
    }

    return currentNode;
}

/**
 * OFFICIAL APPROACH #2
 * BIG O: TIME: O(N), SPACE: O(1)
 */
function kthToLastNode(k, head) {
	if (k < 1) {
		throw new Error(`Impossible to find less than first to last node: ${k}`);
	}

	let leftNode = head;
	let rightNode = head;

	// Move rightNode to the kth node
	for (let i = 0; i < k - 1; i++) {
		// But along the way, if a rightNode doesn't have a next,
		// then k is greater than the length of the list and there
		// can't be a kth-to-last node! we'll raise an error
		if (!rightNode.next) {
			throw new Error(`k is larger than the length of the linked list: ${k}`);
		}

		rightNode = rightNode.next;
	}

	// Starting with leftNode on the head,
	// move leftNode and rightNode down the list,
	// maintaining a distance of k between them,
	// until rightNode hits the end of the list
	while (rightNode.next) {
		leftNode = leftNode.next;
		rightNode = rightNode.next;
	}

	// Since leftNode is k nodes behind rightNode,
	// leftNode is now the kth to last node!
	return leftNode;
}


// Tests

let desc = "first to last node";
let nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
let actual = kthToLastNode(1, nodes[0]);
let expected = nodes[3];
assertEquals(actual, expected, desc);

desc = "second to last node";
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
actual = kthToLastNode(2, nodes[0]);
expected = nodes[2];
assertEquals(actual, expected, desc);

desc = "first node";
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
actual = kthToLastNode(4, nodes[0]);
expected = nodes[0];
assertEquals(actual, expected, desc);

desc = "k greater than linked list length";
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
const fifthFromLast = () => kthToLastNode(5, nodes[0]);
assertThrows(fifthFromLast, desc);

desc = "k is zero";
nodes = valuesToLinkedListNodes([1, 2, 3, 4]);
const zeroFromLast = () => kthToLastNode(0, nodes[0]);
assertThrows(zeroFromLast, desc);

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

function assertThrows(func, desc) {
	try {
		func();
		console.log(`${desc} ... FAIL`);
	} catch (e) {
		console.log(`${desc} ... PASS`);
	}
}
