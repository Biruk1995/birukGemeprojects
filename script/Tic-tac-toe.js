const gameBord = document.querySelector('.js-bord');
const display = document.querySelector('.js-display-info');
const gameStart = [
  '','','','','','','','',''
];
let go = 'circle';
display.textContent = 'first go is circle.'
let count = 0;
function createBord() {
  gameStart.forEach((array,index) => {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', addGo );
    cell.id = index;
    gameBord.append(cell);
  });
}
createBord();
function addGo(e) {
  const goDisplay = document.createElement('div');
  goDisplay.classList.add(go);
  go = go === 'circle' ? 'cross' : 'circle';
  display.textContent = "it's now " + go + " turns.";
  e.target.removeEventListener('click', addGo);
  e.target.append(goDisplay);
  checkScore();
  
  if (count === 8){
    display.textContent = 'it is a draw!';
  }
  count++;
}
function checkScore() {
  const AllCells = document.querySelectorAll('.cell');
  const winningCombination = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  winningCombination.forEach(array => {
   const circleWins = array.every(index => 
    AllCells[index].firstChild?.classList.contains('circle')
    );
    if(circleWins) {
      display.textContent = 'Circle is the winner!';
      AllCells.forEach(cell => cell.replaceWith(cell.cloneNode(true)));
      return;
    }
  });
  
  winningCombination.forEach(array => {
    const crossWins = array.every(index => 
     AllCells[index].firstChild?.classList.contains('cross'));
     if(crossWins) {
       display.textContent = 'Cross is the winner!';
       AllCells.forEach(cell => cell.replaceWith(cell.cloneNode(true)));
       return;
     }
   });
}