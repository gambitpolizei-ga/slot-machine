/*----- constants -----*/

const SYMBOLS = [
    '🦭',
    '🐟',
    '🐠',
    '🦀',
    '🐙',
    '🐬',
    '🐳',
    '🐧',
    '🐡',
    '🦞',    
    '🦑',
    '🦈',
    '🐋',
    '🦐',
  ];


/*----- state variables -----*/

/*----- cached elements  -----*/

const slots = document.querySelectorAll('.slot');
const boxes = slot.querySelector('.boxes');

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