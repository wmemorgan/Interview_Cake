/**
 * OFFICIAL APPROACH (Iterative)
 * BIG O ANALYSIS: Time: O(n) Space: O(1)

 We walk through servedOrders, seeing if each customer order so far matches a 
 customer order from one of the two registers. To check this, we:

1. Keep pointers to the current index in takeOutOrders, dineInOrders, and servedOrders.

2. Walk through servedOrders from beginning to end.

3. If the current order in servedOrders is the same as the current customer order in takeOutOrders, 
increment takeOutOrdersIndex and keep going. This can be thought of as "checking off" the current customer 
order in takeOutOrders and servedOrders, 
reducing the problem to the remaining customer orders in the arrays. 

4. Same as above with dineInOrders.

5. If the current order isn't the same as the customer order at the front of takeOutOrders or dineInOrders, 
we know something's gone wrong and we're not serving food first-come, first-served.

6. If we make it all the way to the end of servedOrders, we'll check that we've reached the end of takeOutOrders and dineInOrders. 
If every customer order checks out, that means we're serving food first-come, first-served.
 */

function isFirstComeFirstServed(takeOutOrders, dineInOrders, servedOrders) {
    var takeOutOrdersIndex = 0;
    var dineInOrdersIndex = 0;
    var takeOutOrdersMaxIndex = takeOutOrders.length - 1;
    var dineInOrdersMaxIndex = dineInOrders.length - 1;

    for (var i = 0; i < servedOrders.length; i++) {
        var order = servedOrders[i];

        // if we still have orders in takeOutOrders
        // and the current order in takeOutOrders is the same
        // as the current order in servedOrders
        if (takeOutOrdersIndex <= takeOutOrdersMaxIndex &&
            order === takeOutOrders[takeOutOrdersIndex]) {
            takeOutOrdersIndex++;

            // if we still have orders in dineInOrders
            // and the current order in dineInOrders is the same
            // as the current order in servedOrders
        } else if (dineInOrdersIndex <= dineInOrdersMaxIndex &&
            order === dineInOrders[dineInOrdersIndex]) {
            dineInOrdersIndex++;

            // if the current order in servedOrders doesn't match the current
            // order in takeOutOrders or dineInOrders, then we're not serving first-come,
            // first-served
        } else {
            return false;
        }
    }

    // check for any extra orders at the end of takeOutOrders or dineInOrders
    if (dineInOrdersIndex != dineInOrders.length ||
        takeOutOrdersIndex != takeOutOrders.length) {
        return false;
    }

    // all orders in servedOrders have been "accounted for"
    // so we're serving first-come, first-served!
    return true;
} 




/**
 * OFFICIAL APPROACH (Recursive)
 * BIG O ANALYSIS: Time: O(n) Space: O(n)

function isFirstComeFirstServed(takeOutOrders, dineInOrders, servedOrders, servedOrdersIndex, takeOutOrdersIndex, dineInOrdersIndex) {
    servedOrdersIndex = (typeof servedOrdersIndex !== 'undefined') ? servedOrdersIndex : 0;
    takeOutOrdersIndex = (typeof takeOutOrdersIndex !== 'undefined') ? takeOutOrdersIndex : 0;
    dineInOrdersIndex = (typeof dineInOrdersIndex !== 'undefined') ? dineInOrdersIndex : 0;

    // base case we've hit the end of servedOrders
    if (servedOrdersIndex === servedOrders.length) {
        return true;
    }

    // if we still have orders in takeOutOrders
    // and the current order in takeOutOrders is the same
    // as the current order in servedOrders
    if ((takeOutOrdersIndex < takeOutOrders.length) &&
        (takeOutOrders[takeOutOrdersIndex] === servedOrders[servedOrdersIndex])) {
        takeOutOrdersIndex++;


        // if we still have orders in dineInOrders
        // and the current order in dineInOrders is the same
        // as the current order in servedOrders
    } else if ((dineInOrdersIndex < dineInOrders.length) &&
        (dineInOrders[dineInOrdersIndex] === servedOrders[servedOrdersIndex])) {
        dineInOrdersIndex++;

        // if the current order in servedOrders doesn't match
        // the current order in takeOutOrders or dineInOrders, then we're not
        // serving in first-come, first-served order.
    } else {
        return false;
    }

    // the current order in servedOrders has now been "accounted for"
    // so move on to the next one
    servedOrdersIndex++;
    return isFirstComeFirstServed(takeOutOrders, dineInOrders, servedOrders, servedOrdersIndex, takeOutOrdersIndex, dineInOrdersIndex);
}
 */

/*
 * MY APPROACH #1*
 * BIG O ANALYSIS: Time: O(n^2) Space: O(n)
 * 
 Create two arrays to store tuples of servedOrder indices with indices of each order source
 Iterate through servedOrders
 Save served orders in respective arrays

 Compare served orders with original sourced orders



 function isFirstComeFirstServed(takeOutOrders, dineInOrders, servedOrders) {
  const takeOutServed = []
  const dineInServed = []

  for (let order of servedOrders) {
    if (takeOutOrders.indexOf(order) !== -1) takeOutServed.push(order)
    else dineInServed.push(order)
  }


  return arraysMatch(takeOutServed, takeOutOrders) &&
  arraysMatch(dineInServed, dineInOrders);
}

function arraysMatch (arr1, arr2) {
  if (arr1.length !== arr2.length) return false

  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] !== arr2[i]) return false
  }

  return true
}
*/

/*
 * MY APPROACH #2*
 *  BIG O ANALYSIS: Time: O(n) Space: O(1)
 Edge case check for missing/additional orders
 Declare variables for takeOut and dineIn indices
 Iterate through the served orders
 Check each order and see if it is either the next available takeOut or dineIn order
 If it is neither return false
 If it is takeOut increment takeOut index
 If it is dineIn increment dineIn index

 If iteration completes return true

 function isFirstComeFirstServed(takeOutOrders, dineInOrders, servedOrders) {
    // Edge case - missing/additional orders
  if ((takeOutOrders.length + dineInOrders.length) !== servedOrders.length) return false

  let takeOutIndex = 0
  let dineInIndex = 0

  for (let i = 0; i < servedOrders.length; i++) {
    if (servedOrders[i] === takeOutOrders[takeOutIndex]) takeOutIndex++
    else if (servedOrders[i] === dineInOrders[dineInIndex]) dineInIndex++
    else return false
  }

  return true
}
*/

// Tests
let desc = 'both registers have same number of orders';
let actual = isFirstComeFirstServed([1, 4, 5], [2, 3, 6], [1, 2, 3, 4, 5, 6]);
assertEquals(actual, true, desc);

desc = 'registers have different lengths';
actual = isFirstComeFirstServed([1, 5], [2, 3, 6], [1, 2, 6, 3, 5]);
assertEquals(actual, false, desc);

desc = 'one register is empty';
actual = isFirstComeFirstServed([], [2, 3, 6], [2, 3, 6]);
assertEquals(actual, true, desc);

desc = 'served orders is missing orders';
actual = isFirstComeFirstServed([1, 5], [2, 3, 6], [1, 6, 3, 5]);
assertEquals(actual, false, desc);

desc = 'served orders has extra orders';
actual = isFirstComeFirstServed([1, 5], [2, 3, 6], [1, 2, 3, 5, 6, 8]);
assertEquals(actual, false, desc);

desc = 'one register has extra orders';
actual = isFirstComeFirstServed([1, 9], [7, 8], [1, 7, 8]);
assertEquals(actual, false, desc);

desc = 'one register has unserved orders';
actual = isFirstComeFirstServed([55, 9], [7, 8], [1, 7, 8, 9]);
assertEquals(actual, false, desc);

desc = 'order numbers are not sequential';
actual = isFirstComeFirstServed([27, 12, 18], [55, 31, 8], [55, 31, 8, 27, 12, 18]);
assertEquals(actual, true, desc);

function assertEquals(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}