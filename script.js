/*----- constants -----*/

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


/*----- state variables -----*/

let hasWon = false;

/*----- cached elements  -----*/

const slots = document.querySelectorAll('.slot');

/*----- event listeners -----*/

document.querySelector('#spinner').addEventListener('click', spin);
document.querySelector('#reseter').addEventListener('click', init);

/*----- functions -----*/

init();

function init(firstInit = true, groups = 1, duration = 1) {
  for (const slot of slots) {
    if (firstInit) {
        slot.dataset.spinned = '0';
    } else if (slot.dataset.spinned === '1') {
      return;
    }

  const boxes = slot.querySelector('.boxes');
  const boxesClone = boxes.cloneNode(false);
  const pool = shuffle([...SYMBOLS]);

  result = pool[Math.floor(Math.random() * pool.length)];

  if(!firstInit) {
    const arr = [];
      for(let n = 0; n < (groups > 0 ? groups : 1); n++) {
        arr.push(...SYMBOLS);
      }
        pool.push(...shuffle(arr));

  boxesClone.addEventListener(
    'transitionstart',
      function() {
        slot.dataset.spinned = '1';
        this.querySelectorAll('.box').forEach((box) => {
        box.style.filter = 'blur(2px)';
     });
    },
    { once: true }
  );

  boxesClone.addEventListener(
    'transitionend',
      function() {
        this.querySelectorAll('.box').forEach((box, index) => {
        box.style.filter = 'blur(0)';
        if(index > 0) this.removeChild(box);
     });
    },
    { once: true }
  );
}

for(let i = pool.length - 1; i >= 0; i--) {
    const box = document.createElement('div');
      box.classList.add('box');
      box.style.width = slot.clientWidth + 'px';
      box.style.height = slot.clientHeight + 'px';
      box.textContent = pool[i];
      boxesClone.appendChild(box);
    }
      boxesClone.style.transitionDuration = `${duration > 0 ? duration : 1}s`;
      boxesClone.style.transform = `translateY(-${slot.clientHeight * (pool.length - 1)}px)`;
      slot.replaceChild(boxesClone, boxes);
    }
}

async function spin() {
  init(false, 1, 2);
  for(const slot of slots) {
    const boxes = slot.querySelector('.boxes');
    const duration = parseInt(boxes.style.transitionDuration);
    boxes.style.transform = 'translateY(0)';
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
    const boxes = slot.querySelector('.boxes');
    const box = boxes.querySelector('.box');
    slotValues.push(box.textContent);
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