/**
 * OFFICIAL APPROACH
 * BIG O: Time: O(n), Space: O(n)
 * Declare array to keep track of products
 * Traverse the list multiplying each element with the preceding element
 * Save the product to the products array
 *  Traverse forward
 *  Traverse backword
 */
function getProductsOfAllIntsExceptAtIndex(intArray) {
    if (intArray.length < 2) {
        throw new Error('Getting the product of numbers at other indices requires at least 2 numbers');
    }

    const productsOfAllIntsExceptAtIndex = [];
    console.log(`original array: `, intArray)
    // For each integer, we find the product of all the integers
    // before it, storing the total product so far each time
    let productSoFar = 1;
    console.log(`LEFT PRODUCTS:`)
    for (let i = 0; i < intArray.length; i++) {
        productsOfAllIntsExceptAtIndex[i] = productSoFar;
        console.log(`push ${productsOfAllIntsExceptAtIndex[i]} at productsOfAllIntsExceptAtIndex[${i}] to array: ${productsOfAllIntsExceptAtIndex}`)
        let temp = productSoFar
        productSoFar *= intArray[i];
        console.log(`productSoFar ${temp} * intArray[${i}] ${intArray[i]} = ${productSoFar}`)
    }

    // For each integer, we find the product of all the integers
    // after it. since each index in products already has the
    // product of all the integers before it, now we're storing
    // the total product of all other integers
    productSoFar = 1;
    console.log(`RIGHT PRODUCTS:`)
    for (let j = intArray.length - 1; j >= 0; j--) {
        productsOfAllIntsExceptAtIndex[j] *= productSoFar;
        console.log(`push ${productsOfAllIntsExceptAtIndex[j]} at productsOfAllIntsExceptAtIndex[${j}] to array: ${productsOfAllIntsExceptAtIndex}`)
        let temp = productSoFar
        productSoFar *= intArray[j];
        console.log(`productSoFar ${temp} * intArray[${j}] ${intArray[j]} = ${productSoFar}`)
    }

    return productsOfAllIntsExceptAtIndex;
}


/**
 * MY APPROACH #1*
 * BIG O: Time: O(n^2), Space: O(n+m)
 * Declare array to keep track of products
 * Iterate through intArray
 * Create a copy of the array with the current element removed
 * Get the product of the array and push it to the products array
 * Return products array
*/

// function getProductsOfAllIntsExceptAtIndex(intArray) {
//   if (!intArray || intArray.length < 2) {
//     throw new Error('Invalid input')
//   }

//   const productList = []

//   for (let i = 0; i < intArray.length; i++) {
//     let product = intArray.filter((num, indx) => indx !== i)
//     .reduce((product, num) => product *= num,1)

//     productList.push(product)
//   }

//   return productList
// }

/**
 ** MY APPROACH #2
 * BIG O: Time: O(n*m), Space: O(n)
 * Declare array to keep track of products
 * Iterate through intArray
 * Get left and right index differences
 * Iterate each side based on respective left/right differences
 * Multiply leftProduct and rightProduct
 * Push to product list
 * Return product list
*/

// function getProductsOfAllIntsExceptAtIndex(intArray) {
//     if (!intArray || intArray.length < 2) {
//         throw new Error('Invalid input')
//     }

//     let products = []

//     for (let i = 0; i < intArray.length; i++) {
//         let leftProduct = 1
//         let rightProduct = 1

//         for (let leftIndex = 0; leftIndex < i; leftIndex++) {
//             leftProduct *= intArray[leftIndex]
//         }

//         for (let rightIndex = i + 1; rightIndex < intArray.length; rightIndex++) {
//             rightProduct *= intArray[rightIndex]
//         }

//         products.push(leftProduct * rightProduct)
//     }

//     return products

// }

// Helper function
// function getProduct(arr, currentIndex) {
//   let leftProduct = 1
//   let rightProduct = 1

//   for (let leftIndex = 0; leftIndex < currentIndex; leftIndex++) {
//     leftProduct *= arr[leftIndex]
//   }

//   for (let rightIndex = currentIndex+1; rightIndex < arr.length; rightIndex++ ) {
//     rightProduct *= arr[rightIndex]
//   }

//   //console.log(`leftProduct ${leftProduct} * rightProduct ${rightProduct} is ${leftProduct*rightProduct}`)
//   return leftProduct*rightProduct
// }



// Tests

let desc = 'short array';
let actual = getProductsOfAllIntsExceptAtIndex([1, 2, 3]);
let expected = [6, 3, 2];
assertArrayEquals(actual, expected, desc);

desc = 'longer array',
    actual = getProductsOfAllIntsExceptAtIndex([8, 2, 4, 3, 1, 5]);
expected = [120, 480, 240, 320, 960, 192];
assertArrayEquals(actual, expected, desc);

desc = 'array has one zero',
    actual = getProductsOfAllIntsExceptAtIndex([6, 2, 0, 3]);
expected = [0, 0, 36, 0];
assertArrayEquals(actual, expected, desc);

desc = 'array has two zeros';
actual = getProductsOfAllIntsExceptAtIndex([4, 0, 9, 1, 0]);
expected = [0, 0, 0, 0, 0];
assertArrayEquals(actual, expected, desc);

desc = 'one negative number';
actual = getProductsOfAllIntsExceptAtIndex([-3, 8, 4]);
expected = [32, -12, -24];
assertArrayEquals(actual, expected, desc);

desc = 'all negative numbers';
actual = getProductsOfAllIntsExceptAtIndex([-7, -1, -4, -2]);
expected = [-8, -56, -14, -28];
assertArrayEquals(actual, expected, desc);

desc = 'error with empty array';
const emptyArray = () => (getProductsOfAllIntsExceptAtIndex([]));
assertThrowsError(emptyArray, desc);

desc = 'error with one number';
const oneNumber = () => (getProductsOfAllIntsExceptAtIndex([1]));
assertThrowsError(oneNumber, desc);

function assertArrayEquals(a, b, desc) {
    const arrayA = JSON.stringify(a);
    const arrayB = JSON.stringify(b);
    if (arrayA !== arrayB) {
        console.log(`${desc} ... FAIL: ${arrayA} != ${arrayB}`)
    } else {
        console.log(`${desc} ... PASS`);
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