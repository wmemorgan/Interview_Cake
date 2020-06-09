class BinaryTreeNode {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }

    insertLeft(value) {
        this.left = new BinaryTreeNode(value);
        return this.left;
    }

    insertRight(value) {
        this.right = new BinaryTreeNode(value);
        return this.right;
    }
}


/**
 * OFFICIAL APPROACH
 * BIG O: TIME:, SPACE:
*/

function isBinarySearchTree(treeRoot) {

    // Start at the root, with an arbitrarily low lower bound
    // and an arbitrarily high upper bound
    const nodeAndBoundsStack = [];
    nodeAndBoundsStack.push({
        node: treeRoot,
        lowerBound: Number.NEGATIVE_INFINITY,
        upperBound: Number.POSITIVE_INFINITY,
    });

    // Depth-first traversal
    while (nodeAndBoundsStack.length) {
        const { node, lowerBound, upperBound } = nodeAndBoundsStack.pop();

        // If this node is invalid, we return false right away
        if (node.value <= lowerBound || node.value >= upperBound) {
            return false;
        }

        if (node.left) {

            // This node must be less than the current node
            nodeAndBoundsStack.push({
                node: node.left,
                lowerBound,
                upperBound: node.value,
            });
        }

        if (node.right) {

            // This node must be greater than the current node
            nodeAndBoundsStack.push({
                node: node.right,
                lowerBound: node.value,
                upperBound,
            });
        }
    }

    // If none of the nodes were invalid, return true
    // (At this point we have checked all nodes)
    return true;
}



/**
 * MY APPROACH #1
 * Loop while node is not null
 * If node has left check value is less than parent
 * If node has right check value is greater than parent
*/

// function isBinarySearchTree(treeRoot) {
//     const stack = [treeRoot]
//     const graph = {}

//     while (stack.length > 0) {
//         let node = stack.pop()
//         if (!graph.hasOwnProperty(node)) {
//             if (node.left && node.left >= node.value) return false;
//             if (node.right && node.right <= node.value) return false;

//             graph[node] = { 'left': node.left, 'right': node.right }

//             if (node.left) stack.push(node.left)
//             if (node.right) stack.push(node.right)

//         } else {
//             if (graph[node]['left'] && graph[node]['left'] >= node.value) return false;
//             if (graph[node]['right'] && graph[node]['right'] <= node.value) return false
//         }
//     }

//     return true


// }


















// Tests

let desc = 'valid full tree';
let treeRoot = new BinaryTreeNode(50);
let leftNode = treeRoot.insertLeft(30);
leftNode.insertLeft(10);
leftNode.insertRight(40);
let rightNode = treeRoot.insertRight(70);
rightNode.insertLeft(60);
rightNode.insertRight(80);
assertEquals(isBinarySearchTree(treeRoot), true, desc);

desc = 'both subtrees valid';
treeRoot = new BinaryTreeNode(50);
leftNode = treeRoot.insertLeft(30);
leftNode.insertLeft(20);
leftNode.insertRight(60);
rightNode = treeRoot.insertRight(80);
rightNode.insertLeft(70);
rightNode.insertRight(90);
assertEquals(isBinarySearchTree(treeRoot), false, desc);

desc = 'descending linked list';
treeRoot = new BinaryTreeNode(50);
leftNode = treeRoot.insertLeft(40);
leftNode = leftNode.insertLeft(30);
leftNode = leftNode.insertLeft(20);
leftNode = leftNode.insertLeft(10);
assertEquals(isBinarySearchTree(treeRoot), true, desc);

desc = 'out of order linked list';
treeRoot = new BinaryTreeNode(50);
rightNode = treeRoot.insertRight(70);
rightNode = rightNode.insertRight(60);
rightNode = rightNode.insertRight(80);
assertEquals(isBinarySearchTree(treeRoot), false, desc);

desc = 'one node tree';
treeRoot = new BinaryTreeNode(50);
assertEquals(isBinarySearchTree(treeRoot), true, desc);

function assertEquals(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`)
    }
}