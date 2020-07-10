class LinkedListNode {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

/**
 * MY APPROACH #1
 * BIG O: TIME: O(N), SPACE: O(1)
 * Declare node variable to map out descending nodes
 * Save head to node
 * Loop while node AND node.next are not null
 * Save node.next to a temp variable
 * Change node.next pointer to node
 * Assign temp node to node
 * Rinse and repeat
 * AFTER loop
 * Save node to head
 * RETURN head
 * EDGE CASES
 * If head is empty RETURN NULL
 */
function reverse(headOfList) {
	// Edge case check
	if (!headOfList) return null;

	let node = headOfList;

	while (node && node.next) {
		let temp = node.next;
		node.next = node;
		node = temp;
    }
    
	return node;
}

/**
 * OFFICIAL SOLUTION
 * BIG O: TIME: O(N), SPACE: O(1)
 */
function reverse(headOfList) {
    let currentNode = headOfList;
    let previousNode = null;
    let nextNode = null;

    // Until we have 'fallen off' the end of the list
    while (currentNode) {
        // Copy a pointer to the next element
        // before we overwrite currentNode.next
        nextNode = currentNode.next;

        // Reverse the 'next' pointer
        currentNode.next = previousNode;

        // Step forward in the list
        previousNode = currentNode;
        currentNode = nextNode;
    }

    return previousNode;
}



// Tests

let desc = "short linked list";
let nodes = valuesToLinkedListNodes([1, 2]);
let reversedList = reverse(nodes[0]);
assertEquals(isListReversed(reversedList, nodes), true, desc);

desc = "long linked list";
nodes = valuesToLinkedListNodes([1, 2, 3, 4, 5, 6]);
reversedList = reverse(nodes[0]);
assertEquals(isListReversed(reversedList, nodes), true, desc);

desc = "one element linked list";
const node = new LinkedListNode(1);
reversedList = reverse(node);
assertEquals(
	node.value === reversedList.value && node.next === reversedList.next,
	true,
	desc
);

desc = "empty linked list";
reversedList = reverse(null);
assertEquals(reversedList, null, desc);

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

function isListReversed(list, originalNodes) {
	let i = originalNodes.length - 1;
	while (list != null && i >= 0) {
		if (originalNodes[i] != list) {
			return false;
		}
		list = list.next;
		i--;
	}
	return list == null;
}

function assertEquals(a, b, desc) {
	if (a === b) {
		console.log(`${desc} ... PASS`);
	} else {
		console.log(`${desc} ... FAIL: ${a} != ${b}`);
	}
}
