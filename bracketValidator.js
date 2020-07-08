/**
 * APPROACH #2
 * BIG O: TIME: O(N), SPACE: O(N)
 * Create an array to track open parens
 * Iterate through string
 * If find closer
 * If open parens stack is empty
 * RETURN FALSE
 * Lookup corresponding opener
 * Pop the open parens stack
 * If values don't match
 * RETURN FALSE
 * 
 * AFTER ITERATION
 * If open parens stack is not empty
 * RETURN FALSE
 */

function isValid(code) {
	// Edge case check
  if (code.length === 0) {
    console.log("empty string");
    return true;
  };

	const openers = ["(", "{", "["];
	const closers = [")", "}", "]"];

	const openerStack = [];

	for (let i = 0; i < code.length; i++) {
		if (openers.indexOf(code[i]) !== -1) openerStack.push(code[i]);
		if (closers.indexOf(code[i]) !== -1) {
			if (openerStack.length === 0) {
        console.log("extra closer");
        
				return false;
      }
      
			const closePosition = closers.indexOf(code[i]);
			const correspondingOpener = openers[closePosition];
			const topOfStack = openerStack.pop();
			if (correspondingOpener !== topOfStack) {
				console.log("mismatched opener and closer");
				console.log(
					`Expected '${correspondingOpener}' doesn't match actual '${topOfStack}'`
        );
        
				return false;
			}
		}
	}

	if (openerStack.length > 0) {
		console.log(`missing closer`);
		console.log(`openerStack: `, openerStack);

		return false;
	}

	return true;
}

/**
 * OFFICIAL APPROACH
 * BIG O: TIME: O(N), SPACE: O(N)
 */

  function isValid(code) {
		const openersToClosers = {
			"(": ")",
			"[": "]",
			"{": "}",
		};

		const openers = new Set(["(", "[", "{"]);
		const closers = new Set([")", "]", "}"]);

		const openersStack = [];

		for (let i = 0; i < code.length; i++) {
			const char = code.charAt(i);

			if (openers.has(char)) {
				openersStack.push(char);
			} else if (closers.has(char)) {
				if (!openersStack.length) {
					return false;
				}
				const lastUnclosedOpener = openersStack.pop();

				// If this closer doesn't correspond to the most recently
				// seen unclosed opener, short-circuit, returning false
				if (openersToClosers[lastUnclosedOpener] !== char) {
					return false;
				}
			}
		}
		return openersStack.length === 0;
	}


/**
 * APPROACH #1 (NOT WORKING)
 * BIG O: TIME: O(N), SPACE: O(N+M)
 * Create stacks to track openers and closers
 * Iterate through code
 * If you find an opener save it to openers stack [position, opener]
 * If you find a closer save it to closers stack [position, closer]
 * AFTER ITERATION
 * If stack lengths don't match return false
 * Iterate through stacks and pop each one
 * If the characters don't match return false
 *
 * return true
 *
 * EDGE CASE CHECK:
 * Missing/empty code
 *
 */

// function isValid(code) {
//   console.log(`code: ${code}`);
// 	console.log(`code split up: `, code.split(""));
// 	// Edge case check
// 	if (code.length === 0) return true;

// 	const openers = ["(", "{", "["];
// 	const closers = [")", "}", "]"];

// 	const openerStack = [];
// 	const closerQueue = [];

// 	for (let i = 0; i < code.length; i++) {
// 		if (openers.indexOf(code[i]) !== -1) openerStack.push(code[i]);
// 		if (closers.indexOf(code[i]) !== -1) {
// 			closerQueue.push(code[i]);
// 		}
// 	}

// 	if (openerStack.length !== closerQueue.length) {
// 		console.log(`Stack lengths don't match`);
// 		console.log(`openerStack: `, openerStack);
// 		console.log(`closerQueue: `, closerQueue);
// 		return false;
// 	}

// 	console.log(`openerStack: `, openerStack);
// 	console.log(`closerQueue: `, closerQueue);

// 	while (openerStack.length > 0) {
// 		const openParen = openerStack.pop();
// 		const closeParen = closerQueue.shift();
//     console.log(
// 			`compare openParen '${openParen}' with closeParen '${closeParen}'`
// 		);
// 		if (openers.indexOf(openParen) !== closers.indexOf(closeParen)) {
// 			console.log(`HALT pop '${openParen}' does not match '${closeParen}'`);
// 			console.log(`openerStack: `, openerStack);
// 			console.log(`closerQueue: `, closerQueue);
// 			return false;
// 		}
// 	}

// 	return true;
// }

// Tests

let desc = 'valid short code';
assertEqual(isValid('()'), true, desc);

desc = "valid longer code";
assertEqual(isValid("([]{[]})[]{{}()}"), true, desc);

desc = 'mismatched opener and closer';
assertEqual(isValid('([][]}'), false, desc);

desc = 'missing closer';
assertEqual(isValid('[[]()'), false, desc);

desc = 'extra closer';
assertEqual(isValid('[[]]())'), false, desc);

desc = 'empty string';
assertEqual(isValid(''), true, desc);

function assertEqual(a, b, desc) {
	if (a === b) {
		console.log(`${desc} ... PASS`);
	} else {
		console.log(`${desc} ... FAIL: ${a} != ${b}`);
	}
}
