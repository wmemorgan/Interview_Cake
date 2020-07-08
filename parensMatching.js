/**
 * APPROACH #1
 * BIG O: TIME: O(N+M); SPACE: O(N)
 * Create two arrays to track open and close parens
 * Iterate through the sentence
 * Save indices of open and close parens in their respective arrays
 * AFTER ITERATION
 * Find number of backtrack steps (indexOf openingParenIndex)
 * Use result to find corresponding close paren
 * Loop through sentence 'n' times (n == backtrack steps)
 * For each instance of '(' dequeue closeParens array
 * Return first element in the closeParens array
 *
 * EDGE CASE CHECK
 * Missing or empty sentence
 * Unbalanced open/close parens
 */

function getClosingParen(sentence, openingParenIndex) {
	// Edge Case Check: Missing/empty sentence
	if (!sentence || sentence.length === 0) throw new Error("Invalid input");

	const openParens = [];
	const closeParens = [];

	for (let i = 0; i < sentence.length; i++) {
		if (sentence[i] === "(") openParens.push(i);
		if (sentence[i] === ")") closeParens.push(i);
	}

	// Edge Case Check: unbalanced open/close parens
	if (openParens.length !== closeParens.length)
		throw new Error("parens mismatch");

	const backTrackSteps = openParens.indexOf(openingParenIndex);

	// Edge Case Check: invalid openingParenIndex
	if (backTrackSteps === -1) throw new Error("Invalid openingParenIndex");

	for (let i = sentence.length - 1; i > backTrackSteps; i--) {
		if (sentence[i] == "(") closeParens.shift();
	}

	return closeParens[0];
}

/**
 * OFFICIAL APPROACH
 * BIG O: TIME: O(N); SPACE: O(1)
 * Walk through the string, starting at our input opening parenthesis position.
 * Count how many additional "(" we find as openNestedParens
 * When a ")" is found decrement openNestedParens
 * If element is ")" and openNestedParens is 0 return its position
 */
  function getClosingParen(sentence, openingParenIndex) {
		let openNestedParens = 0;

		for (
			let position = openingParenIndex + 1;
			position < sentence.length;
			position++
		) {
			const char = sentence[position];

			if (char === "(") {
				openNestedParens += 1;
			} else if (char === ")") {
				if (openNestedParens === 0) {
					return position;
				}
				openNestedParens -= 1;
			}
		}

		throw new Error("No closing parenthesis :(");
	}

// Tests

let desc = "all openers then closers";
let actual = getClosingParen("((((()))))", 2);
let expected = 7;
assertEqual(actual, expected, desc);

desc = "mixed openers and closers";
actual = getClosingParen("()()((()()))", 5);
expected = 10;
assertEqual(actual, expected, desc);

desc = "no matching closer";
const noCloser = () => getClosingParen("()(()", 2);
assertThrowsError(noCloser, desc);

function assertEqual(a, b, desc) {
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
