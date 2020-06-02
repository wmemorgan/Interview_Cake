function reverseWords(message) {
    let startMsg = 0
    let endMsg = message.length - 1
    swapLetters(message, startMsg, endMsg)

    let startWord = 0
    for (let i = 0; i <= message.length; i++) {
        if (i === message.length || message[i] == ' ') {
            swapLetters(message, startWord, i - 1)
            startWord = i + 1
        }
    }


    return message

}

function swapLetters(input, start, end) {

    while (start < end) {
        let temp = input[start]
        input[start] = input[end]
        input[end] = temp
        start++
        end--
    }

}


/**
 * OFFICIAL ALGORITHM
 * Reverse all characters in the entire message
 * Make words forward again by reversing each word's characters
 * Hold the index of the *start* of the current word
 * as we look for the *end* of the current word
 * 
 * Once the end of the current word is found
 * Increment the index of the current word
* /
 
 
   function reverseWords(message) {

  // First we reverse all the characters in the entire message
  reverseCharacters(message, 0, message.length - 1);
  // This gives us the right word order
  // but with each word backward

  // Now we'll make the words forward again
  // by reversing each word's characters

  // We hold the index of the *start* of the current word
  // as we look for the *end* of the current word
  let currentWordStartIndex = 0;
  for (let i = 0; i <= message.length; i++) {

    // Found the end of the current word!
    if (i === message.length || message[i] === ' ') {

      // If we haven't exhausted the string our
      // next word's start is one character ahead
      reverseCharacters(message, currentWordStartIndex, i - 1);
      currentWordStartIndex = i + 1;
    }
  }
}

function reverseCharacters(message, leftIndex, rightIndex) {

  // Walk towards the middle, from both sides
  while (leftIndex < rightIndex) {

    // Swap the left char and right char
    const temp = message[leftIndex];
    message[leftIndex] = message[rightIndex];
    message[rightIndex] = temp;
    leftIndex++;
    rightIndex--;
  }
}
 


/**
 * ALGORITM #2
 * Reverse all the characters in the message
 * Find midpoint
 * Declare start and end points
 * Loop while start < midpoint
 * Swap characters between start and end point
 * Increment start, decrement end
 * 
 * Traverse through message increment by whitespace
 * 
 * Declare start and end points (use indexOf())
 * Calculate midpoint
 * Loop while start < midpoint
 * Swap characters beween start and endpoint

*/


/*
 * ALGORITHM #1
// Find midpoint
 Traverse message simulatenously from start and end points
 Find the first and last words in the message
 Swap the first and last words with each other
 Increment start point to next word
 Decrement end point to next word
 Repeat unti end is no longer greater than or equal to start
 
 Find word helper function algorithm
 params (message, startpoint, direction)
 Declare start and end variables to track position of word in message
 Assign start and end variable to 0
 Traverse through the input
 If direction '+' start from beginning and go forward
   If whitespace
   return (start, current index) tuple
 
 If direction '-' start from end and go backward
  if whitespace
  return (current index + 1, start + 1) tuple

*/















// Tests

let desc = 'one word';
let input = 'vault'.split('');
reverseWords(input);
let actual = input.join('');
let expected = 'vault';
assertEqual(actual, expected, desc);

desc = 'two words';
input = 'thief cake'.split('');
reverseWords(input);
actual = input.join('');
expected = 'cake thief';
assertEqual(actual, expected, desc);

desc = 'three words';
input = 'one another get'.split('');
reverseWords(input);
actual = input.join('');
expected = 'get another one';
assertEqual(actual, expected, desc);

desc = 'multiple words same length';
input = 'rat the ate cat the'.split('');
reverseWords(input);
actual = input.join('');
expected = 'the cat ate the rat';
assertEqual(actual, expected, desc);

desc = 'multiple words different lengths';
input = 'yummy is cake bundt chocolate'.split('');
reverseWords(input);
actual = input.join('');
expected = 'chocolate bundt cake is yummy';
assertEqual(actual, expected, desc);

desc = 'empty string';
input = ''.split('');
reverseWords(input);
actual = input.join('');
expected = '';
assertEqual(actual, expected, desc);

function assertEqual(a, b, desc) {
    if (a === b) {
        console.log(`${desc} ... PASS`);
    } else {
        console.log(`${desc} ... FAIL: ${a} != ${b}`);
    }
}