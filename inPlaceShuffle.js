// Random Number Generator
function getRandom(floor, ceiling) {
    return Math.floor(Math.random() * (ceiling - floor + 1)) + floor;
}


/**
 * OFFICIAL APPROACH
 * BIG O: Time: O(n), Space O(1):
 */

function shuffle3(array) {

    // If it's 1 or 0 items, just return
    if (array.length <= 1) return;

    // Walk through from beginning to end
    for (let indexWeAreChoosingFor = 0;
        indexWeAreChoosingFor < array.length - 1; indexWeAreChoosingFor++) {

        // Choose a random not-yet-placed item to place there
        // (could also be the item currently in that spot)
        // must be an item AFTER the current item, because the stuff
        // before has all already been placed
        const randomChoiceIndex = getRandom(indexWeAreChoosingFor, array.length - 1);

        // Place our random choice in the spot by swapping
        if (randomChoiceIndex !== indexWeAreChoosingFor) {
            const valueAtIndexWeChoseFor = array[indexWeAreChoosingFor];
            array[indexWeAreChoosingFor] = array[randomChoiceIndex];
            array[randomChoiceIndex] = valueAtIndexWeChoseFor;
        }
    }
}


/**
 * MY APPROACH #1
 * BIG O: Time: O(n), Space O(n):
 * Declare new prefilled array for shuffled items
 * Iterate through the array
 *  Get random index
 *  If newArr[random index] === 0
 *    Save current element to newArr[random index]
 *  Else: Save current element to newArr[newArr.indexOf(0)]
 * Return newArr
*/


function shuffle1(array) {
    if (!array || array.length < 1) throw new Error('Invalid input')

    if (array.length === 1) return array

    let shuffledArr = new Array(array.length).fill(0)

    for (let i = 0; i < array.length; i++) {
        let randomIndex = getRandom(0, array.length - 1)
        // console.log(`randomIndex ${randomIndex}`)
        if (shuffledArr[randomIndex] === 0) {
            shuffledArr[randomIndex] = array[i]
        } else {
            shuffledArr[shuffledArr.indexOf(0)] = array[i]
        }
    }

    return shuffledArr

}


/**
 * MY APPROACH #2
 * BIG O: Time: O(n), Space O(1):
 * Iterate through the array
 *  Get random index floor is current index and ceiling is (length - currentIndex)
 *  If random index not equal to current index
 *    Save array[random index] in temp
 *    Save current element into array[random index]
 *    Save temp into array[current index]
 * Return array
*/

function shuffle2(array) {
    if (!array || array.length < 1) throw new Error('Invalid input')

    if (array.length === 1) return array

    for (let i = 0; i < array.length; i++) {
        let randomIndex = getRandom(i, array.length - 1)
        if (randomIndex !== i) {
            let temp = array[randomIndex]
            array[randomIndex] = array[i]
            array[i] = temp
        }
    }

    return array
}


const sample = [1, 2, 3, 4, 5];
console.log('Initial array: ', sample);
console.log('Shuffled array O(n): ', shuffle1(sample));
shuffle2(sample);
console.log('Shuffled array O(1): ', sample);
shuffle3(sample);
console.log(`Official shuffle O(1): `, sample)