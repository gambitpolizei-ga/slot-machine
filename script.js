const SYMBOLS = [
    '🧜🏼‍♂️',
    '🐟',
    '🐠',
    '🧜🏻‍♀️',
    '🐙',
    '🐬',
    '🐳',
    '🐧',
    '🐡',
    '🦞',    
    '🦑',
    '🦈',
    '🐋',
    '🪼',
    '🦭',
    '🦐'
  ]; // Array of 'SYMBOLS' used to display what is on each of the 5 slots

const slots = document.querySelectorAll('.slot'); // Selects all elements with a class of 'slot' and stores them in the 'slots' constant

let hasWon = false; // Initializes the variable 'hasWon' to 'false' 
  
document.querySelector('#spin-button').addEventListener('click', spin); // Attaches event listener to the 'spin-button' ID and listens for a 'click' event to call the 'spin' function
document.querySelector('#play-again').addEventListener('click', init); // Attaches event listener to the 'play-again' ID and listens for a 'click' event to call the 'init' function

init();

function init(firstInit = true, groups = 1, duration = 1) { // The 'init' function takes on 3 parameters ('firstInit', 'groups', and 'duration') with default values of 'true', '1', and '1'
  for(const slot of slots) { // The function loops through each 'slot' element using a 'for...of' loop
    if(firstInit) { // If 'firstInit' is true the functions sets the 'dataset.spinned' attribute of the current 'slot' element to '0'
        slot.dataset.spinned = '0';
    } else if(slot.dataset.spinned === '1') { // If 'firstInit' is 'false' and the 'dataset.spinned' attribute of the current 'slot' element is '1'...
      return; // The function returns without doing anything else
    }

  const squares = slot.querySelector('.squares'); // Finds element in 'slot' with a class of 'squares' and assigns it to the 'squares' constant
  const squaresClone = squares.cloneNode(false); // Creates a clone of 'squares' element using the 'cloneNode' method; the 'false' parameter passed to the 'cloneNode' means that the cloned node will not include any child nodes
  const pool = shuffle([...SYMBOLS]); // Initializes 'pool' variable by calling  'shuffle' function on all elements of the SYMBOLS array values in a random order and returns the shuffled array

  result = pool[Math.floor(Math.random() * pool.length)]; // Generates a random number between 0 and the length of the 'pool' array, then uses value to access a random element from the 'pool' array to assign to the 'result' variable used later to check if the player has won

  if(!firstInit) { // If it's not the first initlization of the game...
    const arr = []; // Create an empty array and...
      for(let n = 0; n < (groups > 0 ? groups : 1); n++) { // Loop through 'groups' parameter
        arr.push(...SYMBOLS); // Add all 'SYMBOLS' from 'SYMBOLS' array to 'arr'
      }
        pool.push(...shuffle(arr)); // Add the shuffled 'SYMBOLS' to the 'pool' array

  squaresClone.addEventListener('reel-start', function() { // Adds event listener to the cloned set of 'square' elements in a 'slot', which happens when a CSS transition ('reel-start') starts on any of the 'squares'
        slot.dataset.spinned = '1'; // When transition starts the dataset of the parent 'slot' element is updated to shows that it spinned
        this.querySelectorAll('.square').forEach((square) => { // The CSS filter property is applied to each square element in the cloned set
          square.style.filter = 'blur(2px)'; //  Adds a blur effect while spinning
     });
    }, {once: true}); // Event listener is to be executed only once

  squaresClone.addEventListener('reel-end', function() { // When the transition ends ('reel-end'), this function executes
        this.querySelectorAll('.square').forEach((square, index) => { // For each square element in the clined squares container
          square.style.filter = 'blur(0)'; // Remove blur effect
          if(index > 0) this.removeChild(square); // If the 'square' element is not the first, remove it from the container
       });
    }, {once: true}); // Event listener is to be executed only once
}

  for(let i = pool.length - 1; i >= 0; i--) { // Loops through the 'SYMBOLS' in the 'pool' array in reverse order and creates a new 'square' element for each 'SYMBOL'
    const square = document.createElement('div');
      square.classList.add('square');
      square.style.width = slot.clientWidth + 'px'; // Sets the width dimensions of the 'square' to match the 'slot'
      square.style.height = slot.clientHeight + 'px'; // Sets the height dimensions of the 'square' to match the 'slot'
      square.textContent = pool[i]; // Set the text content of the 'square' to the 'SYMBOL'
      squaresClone.appendChild(square); // Add the 'square' to the new cloned set of 'squares'
    }
      squaresClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`; // Sets the duration of the transition animation, with a default of 1 second if the value is less than or equal to 0
      squaresClone.style.transform = `translateY(-${slot.clientHeight * (pool.length - 1)}px)`; // Sets the starting position of the new set of 'squares' to animate down
      slot.replaceChild(squaresClone, squares); // Replace old set of 'squares' with a new one
    }
}

async function spin() {
  init(false, 1, 2, 3); // Initializes the payline with the group of 'SYMBOLS' for a duration of 3 seconds
  for(const slot of slots) { // Loops through each 'slot' element
    const squares = slot.querySelector('.squares');
    const duration = parseInt(squares.style.transitionDuration); // Gets the transition duration of the 'squares' element
    squares.style.transform = 'translateY(0)'; // Animates the 'squares' by moving them down
    await new Promise((resolve) => setTimeout(resolve, duration * 300)); // Waits for animation to complete
  }
  checkWin(); // Checks whether the player has won or not
}

function shuffle([...arr]) { // Takes an array as an argument and shuffles its elements randomly
  let m = arr.length;
  while (m) { // While there are elements in the array...
    const i = Math.floor(Math.random() * m--); // Pick a random index and...
    [arr[m], arr[i]] = [arr[i], arr[m]]; // Swap the last element with the randomly chosen one
  }
  return arr; // Return the shuffled array
}

function checkWin() { // Check if all 'SYMBOLS' on the 'slots' are the same
  const slotValues = []; // Creates an empty array to hold the 'slot' values
  slots.forEach((slot) => { // Loop through each 'slot'
    const squares = slot.querySelector('.squares'); // Get the 'squares' element and its child 'square' element
    const square = squares.querySelector('.square');
    slotValues.push(square.textContent); // Add the value of the 'square' to the 'slotValues' array
  });
  if(slotValues.every((val) => val === slotValues[0])) { // If all the values in 'slotValues' array are the same...
    const winningSymbol = slotValues[0]; // Get the winning 'SYMBOL' and...
    getWinner(`Congratulations, you won with ${winningSymbol}!`); // Call the 'getWinner' function with this winning message, or...
  } else {
    getWinner("If at first you don't succeed, try diving deeper"); // Call the 'getWinner function with this lossing message
  }
}

function getWinner(message) { // Displays message in the 'result' element after the player plays
  const result = document.querySelector('#result'); // Selects the result element
  setTimeout(() => { // Set the message to the 'result' element with a delay of 1.7 seconds
    result.textContent = message;
  }, 1700);
}

const playAgainButton = document.querySelector('#play-again'); // Selects the 'play-again' button
  playAgainButton.addEventListener('click', () => { // Adds a 'click' event listener to the 'play-again' button for when the player wants to play again
  document.querySelector('#result').textContent = ''; // Selects the 'result' element and set its content to an empty string
});