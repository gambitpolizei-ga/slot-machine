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
  ];

const slots = document.querySelectorAll('.slot');

let hasWon = false;
  
document.querySelector('#spin-button').addEventListener('click', spin);
document.querySelector('#play-again').addEventListener('click', init);

init();

function init(firstInit = true, groups = 1, duration = 1) {
  for(const slot of slots) {
    if(firstInit) {
        slot.dataset.spinned = '0';
    } else if(slot.dataset.spinned === '1') {
      return;
    }

  const squares = slot.querySelector('.squares');
  const squaresClone = squares.cloneNode(false);
  const pool = shuffle([...SYMBOLS]);

  result = pool[Math.floor(Math.random() * pool.length)];

  if(!firstInit) {
    const arr = [];
      for(let n = 0; n < (groups > 0 ? groups : 1); n++) {
        arr.push(...SYMBOLS);
      }
        pool.push(...shuffle(arr));

  squaresClone.addEventListener('transitionstart', function() {
        slot.dataset.spinned = '1';
        this.querySelectorAll('.square').forEach((square) => {
          square.style.filter = 'blur(2px)';
     });
    }, {once: true});

  squaresClone.addEventListener('transitionend', function() {
        this.querySelectorAll('.square').forEach((square, index) => {
          square.style.filter = 'blur(0)';
          if(index > 0) this.removeChild(square);
       });
    }, {once: true});
}

  for(let i = pool.length - 1; i >= 0; i--) {
    const square = document.createElement('div');
      square.classList.add('square');
      square.style.width = slot.clientWidth + 'px';
      square.style.height = slot.clientHeight + 'px';
      square.textContent = pool[i];
      squaresClone.appendChild(square);
    }
      squaresClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      squaresClone.style.transform = `translateY(-${slot.clientHeight * (pool.length - 1)}px)`;
      slot.replaceChild(squaresClone, squares);
    }
}

async function spin() {
  init(false, 1, 2);
  for(const slot of slots) {
    const squares = slot.querySelector('.squares');
    const duration = parseInt(squares.style.transitionDuration);
    squares.style.transform = 'translateY(0)';
    await new Promise((resolve) => setTimeout(resolve, duration * 300));
  }
  checkWin();
}

function shuffle([...arr]) {
  let m = arr.length;
  while (m) {
    const i = Math.floor(Math.random() * m--);
    [arr[m], arr[i]] = [arr[i], arr[m]];
  }
  return arr;
}

function checkWin() {
  const slotValues = [];
  slots.forEach((slot) => {
    const squares = slot.querySelector('.squares');
    const square = squares.querySelector('.square');
    slotValues.push(square.textContent);
  });
  if(slotValues.every((val) => val === slotValues[0])) {
    const winningSymbol = slotValues[0];
    getWinner(`Congratulations, you won with ${winningSymbol}!`);
  } else {
    getWinner("If at first you don't succeed, try diving deeper");
  }
}

function getWinner(message) {
  const result = document.querySelector('#result');
  setTimeout(() => {
    result.textContent = message;
  }, 1700);
}

const playAgainButton = document.querySelector('#play-again');
  playAgainButton.addEventListener('click', () => {
  document.querySelector('#result').textContent = '';
});

function playRoll() {
    const roll = document.getElementById("roll")
    roll.play();
}