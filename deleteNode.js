class LinkedListNode {
	constructor(value) {
		this.value = value;
		this.next = null;
	}
}

/**
 * APPROACH #1 [NOT WORKING]
 * Declare currentNode and prevNode variables
 * If head is present
 * Check if head is equal to variable
 * If yes assign head.next to head end program
 * If no traverse LL
 * Assign head to prevNode and head.next to currentNode
 * Loop while currentNode is NOT null
 * Check if currentNode.next is equal to variable
 * If yes
 *  Assign currentNode.next.next to currentNode.next
 *  Assign prevNode.next to currentNode.next
 *  End program
 * If no
 *  Assign currentNode to prevNode
 *  Assign currentNode.next to currentNode
 * Rinse and repeat
 * AFTER LOOP
 * throw 'node not found' error
 */

// function deleteNode(nodeToDelete) {

//   const nextNode = nodeToDelete.next;
//   nodeToDelete = nextNode

// }

/**
 * OFFICIAL APPROACH
 * BIG O: TIME: O(1), SPACE: O(1)
 * Declare nextNode variable and assign nodeToDelete.next
 * If nextNode NOT null
 * 	Modify nodeToDelete
 * 	Change nodeToDelete.value to nextNode.value
 * 	Change nodeToDelete.next to nextNode.next
 * Else
 * throw error "Can't delete the last node with this technique!"
 */

function deleteNode(nodeToDelete) {
	const nextNode = nodeToDelete.next;

	if (nextNode) {
		nodeToDelete.value = nextNode.value;
		nodeToDelete.next = nextNode.next;
	} else {
		throw new Error("Sorry, I'm afraid I can't do that");
	}
}

// Tests

let desc = "node at beginning";
let head = new LinkedListNode(1);
let nodeToDelete = head;
appendToList(head, 2);
appendToList(head, 3);
appendToList(head, 4);

deleteNode(head);

let node = head;
assertEquals(2, node.value, desc);
node = node.next;
assertEquals(3, node.value, desc);
node = node.next;
assertEquals(4, node.value, desc);
assertEquals(node.next, null, desc);

desc = "node in middle";
head = new LinkedListNode(1);
nodeToDelete = appendToList(head, 2);
appendToList(head, 3);
appendToList(head, 4);

deleteNode(nodeToDelete);

node = head;
assertEquals(1, node.value, desc);
node = node.next;
assertEquals(3, node.value, desc);
node = node.next;
assertEquals(4, node.value, desc);
assertEquals(node.next, null, desc);

desc = "node at end";
head = new LinkedListNode(1);
appendToList(head, 2);
appendToList(head, 3);
nodeToDelete = appendToList(head, 4);

assertThrows(() => deleteNode(nodeToDelete), desc);

desc = "node at end";
head = new LinkedListNode(1);
nodeToDelete = head;

assertThrows(() => deleteNode(nodeToDelete), desc);

function appendToList(head, value) {
	let tail = head;
	while (tail.next) {
		tail = tail.next;
	}
	tail.next = new LinkedListNode(value);
	return tail.next;
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
