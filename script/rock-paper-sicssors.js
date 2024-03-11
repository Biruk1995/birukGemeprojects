const score = JSON.parse(localStorage.getItem('score')) || {
  Win: 0,
  Loss: 0,
  Tie: 0 
};
let result = "";
let computerMove = '';
let player = '';
let autoPlayIs = false;
let intervalId;
document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    evaluateGame('rock');
  });
  document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    evaluateGame('paper');
  });
  document.querySelector('.js-sicssors-button')
  .addEventListener('click', () => {
    evaluateGame('scissors');
  });
  document.querySelector('.js-reset-button')
    .addEventListener('click', () => {
      resetScore();
    });
    document.querySelector('.js-auto-play-button')
      .addEventListener('click', () => {
        autoPlay();
      })
    
function resetScore() {
  document.querySelector('.js-ask')
  .innerHTML = `Are you sure you want reset the score? <button class="yes-button">Yes</button><button class="no-button">no</button>`;
  document.querySelector('.yes-button')
.addEventListener('click', () => {
 score.Win = 0;
score.Loss = 0;
score.Tie = 0;
updateScore();
localStorage.removeItem('score');
document.querySelector('.js-ask')
  .innerHTML = '';
});
document.querySelector('.no-button')
.addEventListener('click', () => {
  document.querySelector('.js-ask')
    .innerHTML = '';
});
}
function autoPlay() {

  if (!autoPlayIs){
    autoPlayIs = true;
   intervalId = setInterval(() => {
      let randomNumber = Math.random();
    if(0 <= randomNumber && randomNumber <= 0.3) {
      player = 'rock';
    }else if (0.3 < randomNumber && randomNumber <= 0.6) {
      player = 'paper';
    }else if(0.6 < randomNumber && randomNumber < 1) {
      player = 'scissors';
    }
      evaluateGame(player);
  
    },1000);
    document.querySelector('.js-auto-play-button')
      .textContent = 'Stop playing';
  }else {
    clearInterval(intervalId);
    document.querySelector('.js-auto-play-button')
    .textContent = 'Auto play';

  }

}      
  
function evaluateGame(playerMove) {
  let randomNumber = Math.random();
  if(0 <= randomNumber && randomNumber <= 0.3) {
    computerMove = 'rock';
  }else if (0.3 < randomNumber && randomNumber <= 0.6) {
    computerMove = 'paper';

  }else if(0.6 < randomNumber && randomNumber < 1) {
    computerMove = 'scissors';
  }
  if(playerMove === 'rock') {
    if (computerMove === 'rock') {
      result = 'You tie!';
    }else if (computerMove === 'paper') {
      result = 'You loss!';
    }else if (computerMove === 'scissors') {
      result = 'You win!';
    }
  }else if (playerMove === 'paper') {
    if (computerMove === 'rock') {
      result = 'You win!';
    }else if (computerMove === 'paper') {
      result = 'You tie!';
    }else if (computerMove === 'scissors') {
      result = 'You loss!';
    }
  }else if (playerMove === 'scissors') {
     if (computerMove === 'rock') {
      result = 'You loss!';
    }else if (computerMove === 'paper') {
      result = 'You win!';
    }else if (computerMove === 'scissors') {
      result = 'You tie!';
    }
  }
  if (result === 'You win!') {
    score.Win++;
  }else if (result === 'You loss!'){
    score.Loss++;
  }else if (result === 'You tie!') {
    score.Tie++;
  }
  document.querySelector('.js-result')
    .textContent = result;
  document.querySelector('.js-position')
    .innerHTML = `You <img class="emoji-image" src="image/${playerMove}-emoji.png" alt=""> Computer <img class="emoji-image" src="image/${computerMove}-emoji.png" alt="">` ;
  document.querySelector('.js-score')
    .textContent = `Wins: ${score.Win},Losses: ${score.Loss},Ties: ${score.Tie}`;
    localStorage.setItem('score', JSON.stringify(score));
}
function updateScore() {
  document.querySelector('.js-score')
  .textContent = `Wins: ${score.Win},Losses: ${score.Loss},Ties: ${score.Tie}`;
}