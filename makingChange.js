/**
 * MY APPROACH #1
 * BIG O: TIME: , SPACE:
 * Iterate through denominations
 * Start with first denomination and
 *  Confirm if denom is greater than amount and terminate program
 *  Calculate available quantity 'q' for the current denomination
 *    Floor divide amountLeft by denomination
 *    Loop through 'q' times
 *    Subtract denomination value from amountLeft
 *  If there's amount left over go to the next denom and repeat
 *  Else break loop
 *  Start the whole process over until you hit the last denomination
 */

// function changePossibilities(amountLeft, denominations) {
// 	// Edge case check
// 	if (amountLeft < 0 || !denominations) throw new Error("Invalid input");

// 	if (amountLeft === 0 || denominations.length === 0) return 0;

// 	console.log(`denominations: `, denominations);

// 	let count = 0;
// 	// Calculate the number of ways to make change
// 	for (let i = 0; i < denominations.length; i++) {
// 		let currentAmt = amountLeft;
// 		if (currentAmt >= denominations[i]) {
// 			while (currentAmt >= denominations[i]) {
// 				console.log(`starting amount: `, currentAmt);
// 				currentAmt = processDenom(currentAmt, denominations[i]);
// 				count++;
// 				console.log(`ending amount: ${currentAmt} current count: ${count}`);
// 			}
// 		}
// 	}
// 	console.log(`NUMBER OF COMBINATIONS ${count}`);
// 	return count;
// }

// function processDenom(amount, denom) {
// 	console.log(`Processing denom: ${denom}`);
// 	const qty = Math.floor(amount / denom);

// 	for (let i = 0; i < qty; i++) {
// 		amount -= denom;
// 	}

// 	return amount;
// }

/**
 * OFFICIAL APPROACH #1 (Recursive)
 * BIG O: TIME: O(2^N), SPACE: O(N)
 *
*/
// function changePossibilities(amountLeft, denominations, currentIndex = 0) {
//   // Base cases:
//   // We hit the amount spot on. yes!
//   if (amountLeft === 0) return 1;

//   // We overshot the amount left (used too many coins)
//   if (amountLeft < 0) return 0;

//   // We're out of denominations
//   if (currentIndex === denominations.length) return 0;

//   //console.log('checking ways to make ' + amountLeft + ' with [' + denominations.slice(currentIndex).join(', ') + ']');

//   // Choose a current coin
//   const currentCoin = denominations[currentIndex];

//   // See how many possibilities we can get
//   // for each number of times to use currentCoin
//   let numPossibilities = 0;
//   while (amountLeft >= 0) {
//     numPossibilities += changePossibilities(amountLeft, denominations, currentIndex + 1);
//     amountLeft -= currentCoin;
//   }

//   return numPossibilities;
// }


/**
 * OFFICIAL APPROACH #2 (Memoization)
 * BIG O: TIME: O(N), SPACE: O(N) 
*/
class Change {
  constructor() {
    this.memo = {};
  }

  changePossibilitiesTopDown(amountLeft, denominations, currentIndex = 0) {

    // Check our memo and short-circuit if we've already solved this one
    const memoKey = [amountLeft, currentIndex].join(', ');
    if (this.memo.hasOwnProperty(memoKey)) {
      //console.log('grabbing memo [' + memoKey + ']');
      return this.memo[memoKey];
    }

    // Base cases:
    // We hit the amount spot on. yes!
    if (amountLeft === 0) return 1;

    // We overshot the amount left (used too many coins)
    if (amountLeft < 0) return 0;

    // We're out of denominations
    if (currentIndex === denominations.length) return 0;

    //console.log('checking ways to make ' + amountLeft + ' with [' + denominations.slice(currentIndex).join(', ') + ']');

    // Choose a current coin
    const currentCoin = denominations[currentIndex];

    // See how many possibilities we can get
    // for each number of times to use currentCoin
    let numPossibilities = 0;
    while (amountLeft >= 0) {
      numPossibilities += this.changePossibilitiesTopDown(amountLeft, denominations, currentIndex + 1);
      amountLeft -= currentCoin;
    }

    // Save the answer in our memo so we don't compute it again
    this.memo[memoKey] = numPossibilities;
    return numPossibilities;
  }
}

// Execute solution
const change = new Change();

const changePossibilities = (amountLeft, denominations) => {
  return change.changePossibilitiesTopDown(amountLeft, denominations);
}






// Tests

// let desc = "sample input";
// let actual = changePossibilities(4, [1, 2, 3]);
// let expected = 4;
// assertEqual(actual, expected, desc);

// desc = "one way to make zero cents";
// actual = changePossibilities(0, [1, 2]);
// expected = 1;
// assertEqual(actual, expected, desc);

// desc = "no ways if no coins";
// actual = changePossibilities(1, []);
// expected = 0;
// assertEqual(actual, expected, desc);

// desc = "big coin value";
// actual = changePossibilities(5, [25, 50]);
// expected = 0;
// assertEqual(actual, expected, desc);

desc = "big target amount";
actual = changePossibilities(50, [5, 10]);
expected = 6;
assertEqual(actual, expected, desc);

desc = "change for one dollar";
actual = changePossibilities(100, [1, 5, 10, 25, 50]);
expected = 292;
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
	if (a === b) {
		console.log(`${desc} ... PASS`);
	} else {
		console.log(`${desc} ... FAIL: ${a} != ${b}`);
	}
}
