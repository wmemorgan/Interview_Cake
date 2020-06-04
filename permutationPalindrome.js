/**
 * OFFICIAL APPROACH
 * BIG O: Time: O(n) Space: O(n)
 * Iterate through each character in the input string
 * Track characters we’ve seen an odd number of times using a set
 * If the character is not in unpairedCharacters, we add it
 * If the character is already in unpairedCharacters, we remove it
 * Check if less than two characters don’t have a pair
 */

function hasPalindromePermutation(theString) {

    // Track characters we've seen an odd number of times
    const unpairedCharacters = new Set();

    for (let char of theString) {
        if (unpairedCharacters.has(char)) {
            unpairedCharacters.delete(char);
        } else {
            unpairedCharacters.add(char);
        }
    }

    // The string has a palindrome permutation if it
    // has one or zero characters without a pair
    return unpairedCharacters.size <= 1;
} 


/**
 * MY APPROACH #1
 * BIG O: Time: O(n) Space: O(n)
 * Create a hashtable to track number of occurrences of letters
 * Enumerate hashtable
 * If length of string is even
 *  Make sure all letters are even
 * If length is odd
 *  Make sure one letter is odd and all the rest are even
 * 
*/

// function hasPalindromePermutation(theString) {
//     const charMap = {}
//     let oddCount = 0

//     for (let char of theString) {
//         if (charMap.hasOwnProperty(char)) {
//             charMap[char]++
//         } else {
//             charMap[char] = 1
//         }
//     }

//     for (let item of Object.entries(charMap)) {
//         if (!isEven(item[1])) oddCount++
//     }

//     if (isEven(theString.length) && oddCount === 0) return true
//     if (!isEven(theString.length) && oddCount === 1) return true

//     return false;
// }

// function isEven(num) {
//     return num % 2 === 0
// }

// Tests

let desc = 'permutation with odd number of chars';
assertEqual(hasPalindromePermutation('aabcbcd'), true, desc);

desc = 'permutation with even number of chars';
assertEqual(hasPalindromePermutation('aabccbdd'), true, desc);

desc = 'no permutation with odd number of chars';
assertEqual(hasPalindromePermutation('aabcd'), false, desc);

desc = 'no permutation with even number of chars';
assertEqual(hasPalindromePermutation('aabbcd'), false, desc);

desc = 'empty string';
assertEqual(hasPalindromePermutation(''), true, desc);

desc = 'one character string ';
assertEqual(hasPalindromePermutation('a'), true, desc);

function assertEqual(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}