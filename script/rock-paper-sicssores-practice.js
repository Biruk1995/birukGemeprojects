let score = JSON.parse(localStorage.getItem('score')) || {
  win: 0,
  losses: 0,
  tie: 0
};
const userChoose = document.querySelector('.js-user-choose');
const computerChoose = document.querySelector('.js-computer-choose');
const result = document.querySelector('.js-result');
const possibleChoose = document.querySelectorAll('.play-button');
const scoreDisplay = document.querySelector('.score');
const autoPlayButton = document.querySelector('.autoplay');
const askOption = document.querySelector('.ask-option');
document.querySelector('.reset').
  addEventListener('click',() => {
    askOption.innerHTML = ` Are you sure you want to reset the score? <button class="yes-button" onclick="
       score.win = 0;
      score.losses = 0;
      score.tie = 0;
      askOption.innerHTML = '';
      renderResult();
      localStorage.removeItem('score');
      ">Yes</button><button class="no-button" onclick="
      askOption.innerHTML = '';
      ">No</button>`;
  });

 autoPlayButton.addEventListener('click', () => {
      autoPlay();
    });
let choose;
let computer;
let intervalId;
let autoPlayClicked = false;
possibleChoose.forEach(possibleChoose => possibleChoose.addEventListener('click',(e) => {
  choose = e.target.id;
  userChoose.innerHTML = choose;
  gameResult();
}));
function autoPlay() {
  if(!autoPlayClicked) {
    autoPlayClicked = true;
    intervalId = setInterval(() => {
      let randomNumber = Math.random();
      if (randomNumber < 0.3){
        choose = 'rock';
      }else if(randomNumber >= 0.3 && randomNumber < 0.6) {
        choose = 'paper'
      }else if(randomNumber >= 0.6 && randomNumber < 1) {
        choose = 'sicssors'
      }
      userChoose.innerHTML = choose;
      gameResult();
    }, 1000);
    autoPlayButton.textContent = 'Stop playing...'
  }else{
    clearInterval(intervalId);
    autoPlayClicked = false;
    autoPlayButton.textContent = 'Autoplay'
  }
 
}
function gameResult() {
  let computerMove = Math.random();
  if (computerMove < 0.3){
    computer = 'rock';
  }else if(computerMove >= 0.3 && computerMove < 0.6) {
    computer = 'paper'
  }else if(computerMove >= 0.6 && computerMove < 1) {
    computer = 'sicssors'
  }
  computerChoose.innerHTML = computer;

  if(computer ===  'rock' && choose === 'rock') {
    result.innerHTML = 'It is a draw.';
    score.tie++;
  }else if(computer ===  'rock' && choose === 'paper') {
    result.innerHTML = 'You win!';
    score.win++;
  }else if(computer ===  'rock' && choose === 'sicssors') {
    result.innerHTML = 'You loose!';
    score.losses++;
  }else if(computer ===  'paper' && choose === 'paper') {
    result.innerHTML = 'It is a draw.';
    score.tie++;
  }else if(computer ===  'paper' && choose === 'rock') {
    result.innerHTML = 'You loose!';
    score.losses++;
  }else if(computer ===  'paper' && choose === 'sicssors') {
    result.innerHTML = 'You win!';
    score.win++;
  }else if(computer ===  'sicssors' && choose === 'paper') {
    result.innerHTML = 'You loose!';
    score.losses++;
  }else if(computer ===  'sicssors' && choose === 'rock') {
    result.innerHTML = 'You win!';
    score.win++;
  }else if(computer ===  'sicssors' && choose === 'sicssors') {
    result.innerHTML = 'It is a draw.';
    score.tie++;
  }
  localStorage.setItem('score', JSON.stringify(score));
 renderResult();
}

function renderResult() {
  scoreDisplay.innerHTML = `Win: ${score.win},Losses: ${score.losses},Draw: ${score.tie}`;
}
