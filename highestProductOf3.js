/**
 * OFFICIAL APPROACH
 * BIG O: Time: O(n), Space: O(1)
 */
// function highestProductOf3(arrayOfInts) {
//     if (arrayOfInts.length < 3) {
//         throw new Error('Less than 3 items!');
//     }

//     // We're going to start at the 3rd item (at index 2)
//     // So pre-populate highests and lowests based on the first 2 items
//     // We could also start these as null and check below if they're set
//     // but this is arguably cleaner
//     let highest = Math.max(arrayOfInts[0], arrayOfInts[1]);
//     let lowest = Math.min(arrayOfInts[0], arrayOfInts[1]);

//     let highestProductOf2 = arrayOfInts[0] * arrayOfInts[1];
//     let lowestProductOf2 = arrayOfInts[0] * arrayOfInts[1];

//     // Except this one--we pre-populate it for the first *3* items
//     // This means in our first pass it'll check against itself, which is fine
//     let highestProductOf3 = arrayOfInts[0] * arrayOfInts[1] * arrayOfInts[2];

//     // Walk through items, starting at index 2
//     for (let i = 2; i < arrayOfInts.length; i++) {
//         const current = arrayOfInts[i];

//         // Do we have a new highest product of 3?
//         // It's either the current highest
//         // or the current times the highest product of two
//         // or the current times the lowest product of two
//         highestProductOf3 = Math.max(
//             highestProductOf3,
//             current * highestProductOf2,
//             current * lowestProductOf2
//         );

//         // Do we have a new highest product of two?
//         highestProductOf2 = Math.max(
//             highestProductOf2,
//             current * highest,
//             current * lowest
//         );

//         // Do we have a new lowest product of two?
//         lowestProductOf2 = Math.min(
//             lowestProductOf2,
//             current * highest,
//             current * lowest
//         );

//         // Do we have a new highest?
//         highest = Math.max(highest, current);

//         // Do we have a new lowest?
//         lowest = Math.min(lowest, current);
//     }

//     return highestProductOf3;
// }




/**
 * MY APPROACH #1*
 * BIG O: Time: O(n), Space: O(1)
 * Declare variable to store highest product
 * Declare variables to track max values of n1, n2, n3
 * Iterate through array
 * Evaluate if n, n+1, n+2 are max values
 * Multiple 3 numbers in the array
 * and compare the answer to the highest product
 *
*/


// function highestProductOf3(arrayOfInts) {
//   if (!arrayOfInts || arrayOfInts.length < 3) {
//     throw new Error('Invalid input')
//   }

//   let num1 = arrayOfInts[0]
//   let num2 = arrayOfInts[1]
//   let num3 = arrayOfInts[2]
//   let highestProductOf3 = num1 * num2 * num3

//   for (let i = 3; i < arrayOfInts.length; i++) {
//     let currentNum = arrayOfInts[i]
//     highestProductOf3 = Math.max(highestProductOf3, (num1 * num2 * currentNum))
//     highestProductOf3 = Math.max(highestProductOf3, (num2 * num3 * currentNum))
//     highestProductOf3 = Math.max(highestProductOf3, (num3 * num1 * currentNum))
//   }



//   return highestProductOf3;
// }


/**
 * MY APPROACH #2*
 * BIG O: Time: O(n), Space: O(1)
 * Declare variables to track max values of n1, n2, n3
 * Declare variable to store highest product of 3
 * Declare variable to store highest product of 2
 * Declare variable to store lowest product of 2
 * Iterate through array
 * Evaluate if current value * highestProductOf2
 * or current value * lowestProductOf2 is greatest
 * Return highestProductOf3
*/

function highestProductOf3(arrayOfInts) {
  if (!arrayOfInts || arrayOfInts.length < 3) {
    throw new Error('Invalid input')
  }

  let num1 = arrayOfInts[0]
  let num2 = arrayOfInts[1]
  let num3 = arrayOfInts[2]
  let highestNum = Math.max(num1, num2, num3)
  let lowestNum = Math.min(num1, num2, num3)
  let highestProductOf3 = num1 * num2 * num3
  let highestProductOf2 = Math.max((num1*num2), (num2*num3), (num1*num3))
  let lowestProductOf2 = Math.min((num1*num2), (num2*num3), (num1*num3))

  for (let i = 3; i < arrayOfInts.length; i++) {
    let currentNum = arrayOfInts[i]
      highestProductOf3 = Math.max(highestProductOf3, (highestProductOf2 * currentNum), (lowestProductOf2 * currentNum))
      highestProductOf2 = Math.max(highestProductOf2, (highestNum * currentNum))
      lowestProductOf2 = Math.min(lowestProductOf2, (lowestNum * currentNum))
    highestNum = Math.max(highestNum, currentNum)
    lowestNum = Math.min(lowestNum, currentNum)
  }



  return highestProductOf3;
}

// Tests

let desc = 'short array';
let actual = highestProductOf3([1, 2, 3, 4]);
let expected = 24;
assertEqual(actual, expected, desc);

desc = 'longer array';
actual = highestProductOf3([6, 1, 3, 5, 7, 8, 2]);
expected = 336;
assertEqual(actual, expected, desc);

desc = 'array has one negative';
actual = highestProductOf3([-5, 4, 8, 2, 3]);
expected = 96;
assertEqual(actual, expected, desc);

desc = 'array has two negatives';
actual = highestProductOf3([-10, 1, 3, 2, -10]);
expected = 300;
assertEqual(actual, expected, desc);

desc = 'array is all negatives';
actual = highestProductOf3([-5, -1, -3, -2]);
expected = -6;
assertEqual(actual, expected, desc);

desc = 'error with empty array';
const emptyArray = () => (highestProductOf3([]));
assertThrowsError(emptyArray, desc);

desc = 'error with one number';
const oneNumber = () => (highestProductOf3([1]));
assertThrowsError(oneNumber, desc);

desc = 'error with two numbers';
const twoNumber = () => (highestProductOf3([1, 1]));
assertThrowsError(twoNumber, desc);

function assertEqual(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`)
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