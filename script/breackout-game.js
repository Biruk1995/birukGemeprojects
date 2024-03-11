const grid = document.querySelector('.grid');
const scoreDisplay = document.querySelector('.score');
const blockWidth = 100;
const blockHeight = 20;
const userStart = [230, 10];
const borderWidth = 560;
const borderHeight = 300;
const ballDimeter = 20;
let timerId;
let score = 0;
let xDirection = -2;
let yDirection = 2;

let currentPsition = userStart;
const ballStart = [270, 40];
let ballCurrentPosition = ballStart;
class Block {
  constructor(xAxis, yAxis) {
    this.bottomLeft = [xAxis,yAxis];
    this.bottomRight = [xAxis + blockWidth,yAxis];
    this.topLeft = [xAxis,yAxis + blockHeight];
    this.topRight = [xAxis + blockWidth,yAxis + blockHeight]
  }
} 
const blocks =[
  new Block(10,270),
  new Block(120,270),
  new Block(230,270),
  new Block(340,270),
  new Block(450,270),
  new Block(10,240),
  new Block(120,240),
  new Block(230,240),
  new Block(340,240),
  new Block(450,240),
  new Block(10,210),
  new Block(120,210),
  new Block(230,210),
  new Block(340,210),
  new Block(450,210)
];  

function addBlocks() {
for(let i = 0;i < blocks.length;i++) {
  const block = document.createElement('div');
  block.classList.add('block');
  block.style.left = blocks[i].bottomLeft[0] + 'px';
  block.style.bottom = blocks[i].bottomLeft[1] + 'px'
  grid.appendChild(block);
}
}

addBlocks();

const user = document.createElement('div');
user.classList.add('user');
drawUser();
grid.appendChild(user);

function drawUser() {
  user.style.left = currentPsition[0] + 'px';
  user.style.bottom = currentPsition[1] + 'px';
}

function drawBall() {
  ball.style.left = ballCurrentPosition[0] + 'px';
  ball.style.bottom = ballCurrentPosition[1] + 'px';
}

function moveUser(e) {
  switch(e.key) {
    case 'ArrowLeft':
      if(currentPsition[0] > 0) {
        currentPsition[0] -= 10;
        drawUser();
      }
      break;
    case 'ArrowRight':
      if(currentPsition[0]< borderWidth - blockWidth) {
        currentPsition[0] += 10;
        drawUser();
      }
      break; 
  }
}
document.addEventListener('keydown', moveUser);

const ball = document.createElement('div');
ball.classList.add('ball');
drawBall();
grid.appendChild(ball);

function moveBall() {
  ballCurrentPosition[0] += xDirection;
  ballCurrentPosition[1] += yDirection;
  drawBall();
  checkForCollision();  
}
timerId = setInterval(moveBall, 15);

function checkForCollision() {
  blocks.forEach((_block,index) => {
    if(
      (ballCurrentPosition[0] > blocks[index].bottomLeft[0] && ballCurrentPosition[0] < blocks[index].bottomRight[0]) &&
      ((ballCurrentPosition[1] + ballDimeter) > blocks[index].bottomLeft[1]) && (ballCurrentPosition[1] < blocks[index].topLeft[1])
    ) {
      const allBlocks = Array.from(document.querySelectorAll('.block'));
      allBlocks[index].classList.remove('block');
      blocks.splice(index, 1);
      changeDirection();
      score++;
      scoreDisplay.innerHTML = score;
    }
  });

  if (
    ballCurrentPosition[0] >= (borderWidth - ballDimeter) ||
    ballCurrentPosition[1] >= (borderHeight - ballDimeter) ||
    ballCurrentPosition[0] <= 0) {
    changeDirection();
  }
  if(
    (ballCurrentPosition[0] > currentPsition[0] && ballCurrentPosition[0] < currentPsition[0] + blockWidth) &&
    (ballCurrentPosition[1] > currentPsition[1] && ballCurrentPosition[1] < currentPsition[1] + blockHeight)
  ){
    changeDirection();
  }
  if(blocks.length === 0) {
    scoreDisplay.innerHTML = 'You win!';
    clearInterval(timerId);
    document.removeEventListener('keydown',moveUser);
  }
  if (ballCurrentPosition[1] <= 0) {
    clearInterval(timerId);
    scoreDisplay.innerHTML = 'You lose!';
    document.removeEventListener('keydown', moveUser);
  }
}
function changeDirection() {
  if (xDirection === 2 && yDirection === 2) {
    yDirection = -2;
    return;
  }
  if (xDirection === 2 && yDirection === -2) {
    xDirection = -2;
    return;
  }
  if (xDirection === -2 && yDirection === -2) {
    yDirection = 2;
    return;
  }
  if (xDirection === -2 && yDirection === 2) {
    xDirection = 2;
    return;
  }

} 

