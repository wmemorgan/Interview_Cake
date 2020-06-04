/**
 * OFFICIAL APPROACH
 * BIG O: Time: O(n) Space: O(n)
 * 
 */

function canTwoMoviesFillFlight(movieLengths, flightLength) {

    // Movie lengths we've seen so far
    const movieLengthsSeen = new Set();

    for (let i = 0; i < movieLengths.length; i++) {
        const firstMovieLength = movieLengths[i];

        const matchingSecondMovieLength = flightLength - firstMovieLength;
        if (movieLengthsSeen.has(matchingSecondMovieLength)) {
            return true;
        }

        movieLengthsSeen.add(firstMovieLength);
    }

    // We never found a match, so return false
    return false;
}


/**
 * MY APPROACH #1
 * BIG O: Time: O(n) Space: O(n)
 * Add movie lengths in a hashtable length as key and index as value
* Iterate through the movieLengths array
* If the diff between current movie and flightLength is in the hashtable
* AND the value isn't equal to the index return true
* If iteration completes return false
*/

function canTwoMoviesFillFlight(movieLengths, flightLength) {
    const map = {}

    for (let i = 0; i < movieLengths.length; i++) {
        map[movieLengths[i]] = i
    }

    for (let i = 0; i < movieLengths.length; i++) {
        let diff = flightLength - movieLengths[i]

        if (map.hasOwnProperty(diff) && map[diff] !== i) {
            return true
        }
    }

    return false;
}


// Tests

let desc = 'short flight';
let actual = canTwoMoviesFillFlight([2, 4], 1);
let expected = false;
assertEquals(actual, expected, desc);

desc = 'long flight';
actual = canTwoMoviesFillFlight([2, 4], 6);
expected = true;
assertEquals(actual, expected, desc);

desc = 'one movie half flight length';
actual = canTwoMoviesFillFlight([3, 8], 6);
expected = false;
assertEquals(actual, expected, desc);

desc = 'two movies half flight length';
actual = canTwoMoviesFillFlight([3, 8, 3], 6);
expected = true;
assertEquals(actual, expected, desc);

desc = 'lots of possible pairs';
actual = canTwoMoviesFillFlight([1, 2, 3, 4, 5, 6], 7);
expected = true;
assertEquals(actual, expected, desc);

desc = 'not using first movie';
actual = canTwoMoviesFillFlight([4, 3, 2], 5);
expected = true;
assertEquals(actual, expected, desc);

desc = 'only one movie';
actual = canTwoMoviesFillFlight([6], 6);
expected = false;
assertEquals(actual, expected, desc);

desc = 'no movies';
actual = canTwoMoviesFillFlight([], 2);
expected = false;
assertEquals(actual, expected, desc);

function assertEquals(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}