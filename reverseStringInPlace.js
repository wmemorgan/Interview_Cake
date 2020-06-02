function reverse(arrayOfChars) {
    // Edge case check
    if (!arrayOfChars.length) return undefined
    else if (arrayOfChars.length === 1) return arrayOfChars

    for (let startIndex = 0; startIndex < (arrayOfChars.length - 1) - startIndex; startIndex++) {
        const endIndex = (arrayOfChars.length - 1) - startIndex
        const start = arrayOfChars[startIndex]
        const end = arrayOfChars[endIndex]
        //console.log(`BEGINNING start value ${start} at index ${startIndex}, end value ${end} at index ${endIndex}`)
        arrayOfChars[startIndex] = end
        arrayOfChars[endIndex] = start
        //console.log(`ENDING start value ${start} at index ${startIndex}, end value ${end} at index ${endIndex}`)
    }

    return arrayOfChars

}


















// Tests

let desc = 'empty string';
let input = ''.split('');
reverse(input);
let actual = input.join('');
let expected = '';
assertEqual(actual, expected, desc);

desc = 'single character string';
input = 'A'.split('');
reverse(input);
actual = input.join('');
expected = 'A';
assertEqual(actual, expected, desc);

desc = 'longer string';
input = 'ABCDE'.split('');
reverse(input);
actual = input.join('');
expected = 'EDCBA';
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}