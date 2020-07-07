//  Implement the enqueue and dequeue methods

/**
 * MY APPROACH #1
 * BIG O: TIME: O(N); O(N);
 */
class QueueTwoStacks {
    constructor() {
        this.stack1 = [];
        this.stack2 = [];
    }

    enqueue(item) {
        this.stack1.push(item);
    }

    dequeue() {
        if (this.stack1.length === 0) {
            throw new Error("Empty queue");
        }

        while (this.stack1.length > 1) {
            this.stack2.push(this.stack1.pop())
        }

        let removedItem = this.stack1.pop()

        while (this.stack2.length > 0) {
            this.stack1.push(this.stack2.pop())
        }

        return removedItem;
    }
}

/**
 * OFFICIAL APPROACH
 * BIG O: TIME: O(1), SPACE: O(M)
 */
class QueueTwoStacks {
    constructor() {
        this.inStack = [];
        this.outStack = [];
    }

    enqueue(item) {
        this.inStack.push(item);
    }

    dequeue() {
        if (this.outStack.length === 0) {

            // Move items from inStack to outStack, reversing order
            while (this.inStack.length > 0) {
                const newestInStackItem = this.inStack.pop();
                this.outStack.push(newestInStackItem);
            }

            // If outStack is still empty, raise an error
            if (this.outStack.length === 0) {
                throw new Error("Can't dequeue from empty queue!");
            }
        }
        return this.outStack.pop();
    }
}
















// Tests
const q = new QueueTwoStacks();

q.enqueue(1);
q.enqueue(2);
q.enqueue(3);

let desc = 'dequeue #1';
let actual = q.dequeue();
let expected = 1;
assertEquals(actual, expected, desc);

desc = 'dequeue #2';
actual = q.dequeue();
expected = 2;
assertEquals(actual, expected, desc);

q.enqueue(4);

desc = 'dequeue #3';
actual = q.dequeue();
expected = 3;
assertEquals(actual, expected, desc);

desc = 'dequeue #4';
actual = q.dequeue();
expected = 4;
assertEquals(actual, expected, desc);

desc = 'dequeue from empty queue';
const emptyDequeue = () => q.dequeue();
assertThrowsError(emptyDequeue, desc);

function assertEquals(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
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