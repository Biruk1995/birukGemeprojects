const squars = document.querySelectorAll('.square');
const mole = document.querySelector('.mole');
const score  = document.querySelector('.score');
const timeLeft = document.querySelector('.time-left');

let result = 0;
let hitposition;
let countTimer = 10;
let timerId = null;

function randomSquare() {
  squars.forEach(square => {
    square.classList.remove('mole');
  });

  let random = squars[Math.floor(Math.random() * 9)];
  random.classList.add('mole');
  hitposition = random.id;
}
squars.forEach(square => {
  square.addEventListener('mousedown', () => {
    if(square.id === hitposition) {
      result++;
      score.textContent = result;
      hitposition = null;
    }
  });
});
function moveMole() {
  timerId = setInterval(randomSquare , 500);
}
moveMole();
function countDown() {
  countTimer--;
  timeLeft.textContent = countTimer;
  if (countTimer == 0) {
    clearInterval(countDownTimerId);
    clearInterval(timerId);
    alert('GAME OVER! your final score is ' + result)
  }
}

let countDownTimerId = setInterval(countDown ,1000);