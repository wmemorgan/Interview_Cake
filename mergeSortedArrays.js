/**
 * Official Solution
 */

function mergeArrays(myArray, alicesArray) {

  // Set up our mergedArray
  const mergedArray = [];

  let currentIndexAlices = 0;
  let currentIndexMine = 0;
  let currentIndexMerged = 0;

  while (currentIndexMerged < (myArray.length + alicesArray.length)) {

    const isMyArrayExhausted = currentIndexMine >= myArray.length;
    const isAlicesArrayExhausted = currentIndexAlices >= alicesArray.length;

    // Case: next comes from my array
    // My array must not be exhausted, and EITHER:
    // 1) Alice's array IS exhausted, or
    // 2) The current element in my array is less
    //    than the current element in Alice's array
    if (!isMyArrayExhausted && (isAlicesArrayExhausted ||
      (myArray[currentIndexMine] < alicesArray[currentIndexAlices]))) {

      mergedArray[currentIndexMerged] = myArray[currentIndexMine];
      currentIndexMine++;

      // Case: next comes from Alice's array
    } else {
      mergedArray[currentIndexMerged] = alicesArray[currentIndexAlices];
      currentIndexAlices++;
    }

    currentIndexMerged++;
  }

  return mergedArray;
} 


/*
 * MY APPROACH #1
 Create a stack to store the merged orders
 Identify the shorter list
 Iterate through the shorter list
 Compare the values of each list with each other
 Identify min, max, or same values
 If same value pass it to STACK MANAGEMENT
 Else pass min and max values to STACK MANAGEMENT

 If orders have different lengths go to DIFFERENT LENGTHS MANAGEMENT

 return the updated stack


 STACK MANAGEMENT
 Compare the min or same value with the top of the stack
 If smaller
  Pop stack and store in temp variable
  Push min to stack
  Compare variable with maxVal (if available)
  Push smaller value to stack followed by larger value

 DIFFERENT LENGTHS MANAGEMENT
 If there remaining values in the longer array
 Identify the remaining values of the longer array
 Pop and save the top of the stack
 Insert it into the remaining values array in a sorted manner
 Combine the updated remaining values array into the stack


function mergeArrays(myArray, alicesArray) {
  let mergedArr = []
  const shorterArr = myArray.length <= alicesArray.length ?
  myArray : alicesArray
  const longerArr = myArray.length > alicesArray.length ?
  myArray : alicesArray

  for (let i = 0; i < shorterArr.length; i++) {
    let minVal = Math.min(shorterArr[i], longerArr[i])
    let maxVal = Math.max(shorterArr[i], longerArr[i])

    let sameVal = shorterArr[i] === longerArr[i] ? shorterArr[i] : null

    if (sameVal) sortStack(mergedArr, sameVal)
    else sortStack(mergedArr, minVal, maxVal)
  }

  if (longerArr.length > shorterArr.length) {
    let remainingArr = longerArr.slice(shorterArr.length)
    let minVal = mergedArr.pop()

    insertInOrder(minVal, remainingArr)

    mergedArr = [...mergedArr, ...remainingArr]
  }
  console.log(`mergedArr: `, mergedArr)
  return mergedArr;
}

function sortStack(stack, val1, val2=null) {
  if(!val2) {
    if(stack.length !== 0 &&
    val1 < stack[stack.length-1]) {
      let temp = stack.pop()
      stack.push(val1)
      stack.push(temp)
    } else {
      stack.push(val1)
    }
  } else {
    if (stack.length === 0 || val1 > stack[stack.length-1]) {
      stack.push(val1)
      stack.push(val2)
    } else {
      let temp = stack.pop()
      let minStackVal = Math.min(temp, val2)
      let maxStackVal = Math.max(temp, val2)
      stack.push(val1)
      mergedArr.push(minStackVal)
      mergedArr.push(maxStackVal)
    }
  }
}

function insertInOrder(val, arr) {
  for (let i = 0; i < arr.length; i++) {
    if (val < arr[i]) {
      arr.splice(i, 0, val)
      return
    }
  }

  arr.push(val)
  return
}


*/

// Tests

let desc = 'both arrays are empty';
let actual = mergeArrays([], []);
let expected = [];
assertDeepEqual(actual, expected, desc);

desc = 'first array is empty';
actual = mergeArrays([], [1, 2, 3]);
expected = [1, 2, 3];
assertDeepEqual(actual, expected, desc);

desc = 'second array is empty';
actual = mergeArrays([5, 6, 7], []);
expected = [5, 6, 7];
assertDeepEqual(actual, expected, desc);

desc = 'both arrays have some numbers';
actual = mergeArrays([2, 4, 6], [1, 3, 7]);
expected = [1, 2, 3, 4, 6, 7];
assertDeepEqual(actual, expected, desc);

desc = 'arrays are different lengths';
actual = mergeArrays([2, 4, 6, 8], [1, 7]);
expected = [1, 2, 4, 6, 7, 8];
assertDeepEqual(actual, expected, desc);

function assertDeepEqual(a, b, desc) {
  const aStr = JSON.stringify(a);
  const bStr = JSON.stringify(b);
  if (aStr !== bStr) {
    console.log(`${desc} ... FAIL: ${aStr} != ${bStr}`);
  } else {
    console.log(`${desc} ... PASS`);
  }
}