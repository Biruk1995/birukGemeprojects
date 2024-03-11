const timeLeftDisplay = document.querySelector('.time-left');
const resultDisplay = document.querySelector('.score');
const startPauseButton = document.querySelector('.start-pause-button');
const squars = document.querySelectorAll('.grid div');
const logLeft = document.querySelectorAll('.log-left');
const logRight = document.querySelectorAll('.log-right');
const carRight = document.querySelectorAll('.car-right');
const carLeft = document.querySelectorAll('.car-left');
const width = 9;
let currentIndex = 76;
let timerId;
let outcomeIntervalId;
let timeLeft = 20;
function moveFrog(e) {
  squars[currentIndex].classList.remove('frog');
  switch(e.key) {
    case 'ArrowLeft':
      if(currentIndex % width !== 0) currentIndex -= 1;
      break;
    case 'ArrowRight':
      if(currentIndex % width < width - 1) currentIndex += 1;
      break;
    case 'ArrowUp':
      if(currentIndex - width >= 0) currentIndex -= width;
      break; 
    case 'ArrowDown':
      if(currentIndex + width < width * width) currentIndex += width;
      break;   
  }
  squars[currentIndex].classList.add('frog');
}

function autoMoveElements() {
  logLeft.forEach(logLeft => moveLogLeft(logLeft) );
  logRight.forEach(logRight => moveLogRight(logRight) );
  carLeft.forEach(carLeft => moveCarLeft(carLeft));
  carRight.forEach(carRight => movecarRight(carRight));
  if(timeLeft > 0) {
    timeLeft--;
  }
  timeLeftDisplay.textContent = timeLeft;
}
function checkOutcome(){
  win();
  lose();
}
function moveLogLeft(logLeft) {
  switch(true) {
    case logLeft.classList.contains('l1'):
      logLeft.classList.remove('l1');
      logLeft.classList.add('l2');
      break;
    case logLeft.classList.contains('l2'):
      logLeft.classList.remove('l2');
      logLeft.classList.add('l3');
      break;  
    case logLeft.classList.contains('l3'):
      logLeft.classList.remove('l3');
      logLeft.classList.add('l4');
      break;  
    case logLeft.classList.contains('l4'):
      logLeft.classList.remove('l4');
      logLeft.classList.add('l5');
      break;
    case logLeft.classList.contains('l5'):
      logLeft.classList.remove('l5');
      logLeft.classList.add('l1');
      break;

  }
}

function moveLogRight(logRight) {
  switch(true) {
    case logRight.classList.contains('l1'):
      logRight.classList.remove('l1');
      logRight.classList.add('l5');
      break;
    case logRight.classList.contains('l2'):
      logRight.classList.remove('l2');
      logRight.classList.add('l1');
      break;  
    case logRight.classList.contains('l3'):
      logRight.classList.remove('l3');
      logRight.classList.add('l2');
      break;  
    case logRight.classList.contains('l4'):
      logRight.classList.remove('l4');
      logRight.classList.add('l3');
      break;
    case logRight.classList.contains('l5'):
      logRight.classList.remove('l5');
      logRight.classList.add('l4');
      break;

  }
}
function moveCarLeft(carLeft) {
  switch(true) {
    case carLeft.classList.contains('c1'):
      carLeft.classList.remove('c1');
      carLeft.classList.add('c2');
      break;
    case carLeft.classList.contains('c2'):
      carLeft.classList.remove('c2');
      carLeft.classList.add('c3');
      break;  
    case carLeft.classList.contains('c3'):
      carLeft.classList.remove('c3');
      carLeft.classList.add('c1');
      break;  
  }
}
function movecarRight(carRight) {
  switch(true) {
    case carRight.classList.contains('c1'):
      carRight.classList.remove('c1');
      carRight.classList.add('c3');
      break;
    case carRight.classList.contains('c2'):
      carRight.classList.remove('c2');
      carRight.classList.add('c1');
      break;  
    case carRight.classList.contains('c3'):
      carRight.classList.remove('c3');
      carRight.classList.add('c2');
      break;  
  }
}

function lose() {
  if( squars[currentIndex].classList.contains('c1') ||
      squars[currentIndex].classList.contains('l4') ||
      squars[currentIndex].classList.contains('l5') ||
      timeLeft === 0){
        resultDisplay.textContent = 'You lose!';
        clearInterval(timerId);
        clearInterval(outcomeIntervalId);
        squars[currentIndex].classList.remove('frog');
        document.removeEventListener('keyup', moveFrog );
  }
}

function win() {
  if(squars[currentIndex].classList.contains('ending-block')) {
    resultDisplay.textContent = 'You win!';
    clearInterval(timerId);
    clearInterval(outcomeIntervalId);
    document.removeEventListener('keyup', moveFrog );
  }
}
startPauseButton.addEventListener('click', clickButton);
function clickButton(){
  if(timerId) {
    clearInterval(timerId);
    clearInterval(outcomeIntervalId);
    timerId = null;
    outcomeIntervalId = null;
    document.removeEventListener('keyup', moveFrog);
  }else {
    timerId = setInterval(autoMoveElements , 1000);
    outcomeIntervalId = setInterval(checkOutcome,50);
    document.addEventListener('keyup', moveFrog);
  }
}
