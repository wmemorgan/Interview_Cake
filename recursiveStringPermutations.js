/**
 * OFFICIAL APPROACH
 * BIG O: TIME: 
 * If we're making all permutations for "cat," 
 * we take all permutations for "ca" and then put "t" in 
 * each possible position in each of those permutations. 
 * We use this approach recursively.
 */


function getPermutations(string) {

    // Base case
    if (string.length <= 1) {
        return new Set([string]);
    }

    const allCharsExceptLast = string.slice(0, -1);
    const lastChar = string[string.length - 1];

    // Recursive call: get all possible permutations for all chars except last
    const permutationsOfAllCharsExceptLast = getPermutations(allCharsExceptLast);

    // Put the last char in all possible positions for each of the above permutations
    const permutations = new Set();
    permutationsOfAllCharsExceptLast.forEach(permutationOfAllCharsExceptLast => {
        for (let position = 0; position <= allCharsExceptLast.length; position++) {
            const permutation = permutationOfAllCharsExceptLast.slice(0, position) + lastChar + permutationOfAllCharsExceptLast.slice(position);
            permutations.add(permutation);
        }
    });

    return permutations;
}

// Tests

let desc = 'empty string';
let input = '';
let actual = getPermutations(input);
let expected = new Set(['']);
assert(isSetsEqual(actual, expected), desc);

desc = 'one character string';
input = 'a';
actual = getPermutations(input);
expected = new Set(['a']);
assert(isSetsEqual(actual, expected), desc);

desc = 'two character string';
input = 'ab';
actual = getPermutations(input);
expected = new Set(['ab', 'ba']);
assert(isSetsEqual(actual, expected), desc);

desc = 'three character string';
input = 'abc';
actual = getPermutations(input);
expected = new Set(['abc', 'acb', 'bac', 'bca', 'cab', 'cba']);
assert(isSetsEqual(actual, expected), desc);

function isSetsEqual(as, bs) {
    if (as.size !== bs.size) {
        return false;
    }
    for (let a of as) {
        if (!bs.has(a)) return false;
    }
    return true;
}

function assert(condition, desc) {
    if (condition) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL`);
    }
}