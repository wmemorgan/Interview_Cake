/**
 * OFFICIAL APPROACH
 * BIG O: Time: O(log n), Space: O(1)
 */

function findRotationPoint(words) {
    const firstWord = words[0];

    let floorIndex = 0;
    let ceilingIndex = words.length - 1;

    while (floorIndex < ceilingIndex) {

        // Guess a point halfway between floor and ceiling
        const guessIndex = Math.floor(floorIndex + ((ceilingIndex - floorIndex) / 2));

        // If guess comes after first word or is the first word
        if (words[guessIndex] >= firstWord) {

            // Go right
            floorIndex = guessIndex;
        } else {

            // Go left
            ceilingIndex = guessIndex;
        }

        // If floor and ceiling have converged
        if (floorIndex + 1 === ceilingIndex) {

            // Between floor and ceiling is where we flipped to the beginning
            // so ceiling is alphabetically first
            break;
        }
    }

    return ceilingIndex;
}


/**
 * MY APPROACH #1
 * BIG O: Time: O(log n), Space: O(1)
 * Declare floor and ceiling indices
 * Find the guess point
 *  Take array length divide by 2 and round down
 * Loop while floor is less than ceiling
 * Compare guessvalue to first item
 *  If less then shift floor index to current index
 *    Assign guessIndex - 1 to targetIndex
 *    Do bstLeft
 *      Assign start index to current
 *      Compare current and target
 *      If current is smaller decrease current
 *      Else return current
 *  Else
 *    Do bstRight
 *      Assign start index to current
 *      Compare current and target
 *      If current is larger increase current
 *      Else return current
*/

function findRotationPoint(words) {
    // Edge cases
    if (!words || words.length === 0) throw new Error('Invalid input')
    if (words.length === 1) return 0
    if (words.length === 2) {
        return (words[0] > words[1]) ? 1 : 0
    }

    let guessIndex = Math.floor((words.length - 1) / 2)
    console.log(`starting index ${guessIndex}`)

    if (words[guessIndex] < words[0]) {
        let targetIndex = guessIndex - 1
        console.log(`bstLeft: `, bstLeft(words, targetIndex, guessIndex))
        return bstLeft(words, targetIndex, guessIndex)
    } else {
        let targetIndex = 0
        console.log(`bstRight: `, bstRight(words, targetIndex, guessIndex))
        return bstRight(words, 0, guessIndex)
    }

}

function bstLeft(arr, targetIndex, startIndex) {
    let currentIndex = startIndex;

    while (currentIndex > targetIndex) {
        console.log(`Is ${arr[currentIndex]} less than
    ${arr[targetIndex]} ${arr[currentIndex] < arr[targetIndex]}`)
        if (arr[currentIndex] < arr[targetIndex]) {
            return currentIndex;
        }
        else {
            currentIndex--;
        }
    }

    return 0
}

function bstRight(arr, targetIndex, startIndex) {
    let currentIndex = startIndex;

    while (currentIndex > targetIndex) {
        console.log(`Is ${arr[currentIndex]} less than
    ${arr[targetIndex]} ${arr[currentIndex] < arr[targetIndex]}`)
        if (arr[currentIndex] < arr[targetIndex]) {
            return currentIndex;
        } else {
            currentIndex++;
        }
    }

    return 0
}





















// Tests

let desc = 'small array';
let actual = findRotationPoint(['cape', 'cake']);
let expected = 1;
assertEquals(actual, expected, desc);

desc = 'medium array';
actual = findRotationPoint(['grape', 'orange', 'plum', 'radish', 'apple']);
expected = 4;
assertEquals(actual, expected, desc);

desc = 'large array';
actual = findRotationPoint(['ptolemaic', 'retrograde', 'supplant',
    'undulate', 'xenoepist', 'asymptote',
    'babka', 'banoffee', 'engender',
    'karpatka', 'othellolagkage']);
expected = 5;
assertEquals(actual, expected, desc);

function assertEquals(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}