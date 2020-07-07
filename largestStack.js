// Implement the push, pop, and getMax methods

/**
 * MY APPROACH #1
 * BIG O: TIME: O(N), SPACE: O(N)
 */
// class MaxStack {
//     constructor() {
//         // Initialize an empty stack
//         this.items = [];
//     }

//     push(item) {
//         this.items.push(item);
//     }

//     pop() {
//         if (!this.items.length) {
//             return null;
//         }
//         return this.items.pop();
//     }

//     getMax() {
//         const temp = []
//         let maxValue = null;

//         while (this.items.length > 0) {
//             let currentValue = this.pop();
//             if (!maxValue) maxValue = currentValue;
//             else maxValue = Math.max(maxValue, currentValue);

//             temp.push(currentValue);
//         }

//         for (let i = temp.length - 1; i >= 0; i--) {
//             this.push(temp[i]);
//         }

//         return maxValue;
//     }
// }

class Stack {
    constructor() {

        // Initialize an empty stack
        this.items = [];
    }

    // Push a new item onto the stack
    push(item) {
        this.items.push(item);
    }

    // Remove and return the last item
    pop() {

        // If the stack is empty, return null
        // (It would also be reasonable to throw an exception)
        if (!this.items.length) {
            return null;
        }
        return this.items.pop();
    }

    // Return the last item without removing it
    peek() {
        if (!this.items.length) {
            return null;
        }
        return this.items[this.items.length - 1];
    }
}

/**
 * MY OPTIMIZED APPROACH
 * BIG O: TIME: O(1), SPACE: O(M)
 */

class MaxStack {
    constructor() {
        // Initialize an empty stack
        this.items = new Stack();
        this.maxes = new Stack();
    }

    push(item) {
        this.items.push(item);
        if (!this.maxes.peek()) this.maxes.push(item);
        else {
            if (this.maxes.peek() <= item) {
                this.maxes.push(item);
            }
        }
    }

    pop() {
        const currentItem = this.items.pop();

        if (currentItem === this.maxes.peek()) {
            this.maxes.pop();
        }

        return currentItem;
    }

    getMax() {
        return this.maxes.peek();
    }
}


/**
 * OFFICIAL APPROACH
 * BIG O: TIME: O(1), SPACE: O(M)
 */

class MaxStack {
    constructor() {
        this.stack = new Stack();
        this.maxesStack = new Stack();
    }

    // Add a new item to the top of our stack. If the item is greater
    // than or equal to the last item in maxesStack, it's
    // the new max! So we'll add it to maxesStack.
    push(item) {
        this.stack.push(item);
        if (this.maxesStack.peek() === null || item >= this.maxesStack.peek()) {
            this.maxesStack.push(item);
        }
    }

    // Remove and return the top item from our stack. If it equals
    // the top item in maxesStack, they must have been pushed in together.
    // So we'll pop it out of maxesStack too.
    pop() {
        const item = this.stack.pop();
        if (item === this.maxesStack.peek()) {
            this.maxesStack.pop();
        }
        return item;
    }

    // The last item in maxesStack is the max item in our stack.
    getMax() {
        return this.maxesStack.peek();
    }
}














// Tests

const s = new MaxStack();
s.push(5);

assertEquals(5, s.getMax(), 'check max after 1st push');

s.push(4);
s.push(7);
s.push(7);
s.push(8);

assertEquals(8, s.getMax(), 'check before 1st pop');
assertEquals(8, s.pop(), 'check pop #1');
assertEquals(7, s.getMax(), 'check max after 1st pop');
assertEquals(7, s.pop(), 'check pop #2');
assertEquals(7, s.getMax(), 'check max after 2nd pop');
assertEquals(7, s.pop(), 'check pop #3');
assertEquals(5, s.getMax(), 'check max after 3rd pop');
assertEquals(4, s.pop(), 'check pop #4');
assertEquals(5, s.getMax(), 'check max after 4th pop');

function assertEquals(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}