const cardArray = [
  {
    name: 'cheeseburger',
    img: 'image/cheeseburger.png'
  },
  {
    name: 'fries',
    img: 'image/fries.png'
  },
  {
    name: 'hotdog',
    img: 'image/hotdog.png'
  },
  {
    name: 'ice-cream',
    img: 'image/ice-cream.png'
  },
  {
    name: 'milkshake',
    img: 'image/milkshake.png'
  },
  {
    name: 'pizza',
    img: 'image/pizza.png'
  },
  {
    name: 'cheeseburger',
    img: 'image/cheeseburger.png'
  },
  {
    name: 'fries',
    img: 'image/fries.png'
  },
  {
    name: 'hotdog',
    img: 'image/hotdog.png'
  },
  {
    name: 'ice-cream',
    img: 'image/ice-cream.png'
  },
  {
    name: 'milkshake',
    img: 'image/milkshake.png'
  },
  {
    name: 'pizza',
    img: 'image/pizza.png'
  }
];
cardArray.sort(() => 0.5 - Math.random());
console.log(cardArray);
const gridDisplay = document.querySelector('.grid');
const resultDisplay = document.querySelector('.result');

let choosenCard = [];
let choosenCardId = [];
const cardsWon = []

function creatBord() {
  cardArray.forEach((_array,index) => {
    const card = document.createElement('img');
    card.setAttribute('src','image/blank.png');
    card.setAttribute('data-id',index);
    gridDisplay.appendChild(card);
    card.addEventListener('click', fleepCard);
  });
}
creatBord();

function checkWin() {
  const cards = document.querySelectorAll('img');
  const optionOneId = choosenCardId[0];
  const optionTwoId = choosenCardId[1];
  if(optionOneId === optionTwoId) {
    cards[optionOneId].setAttribute('src','image/blank.png');
    cards[optionTwoId].setAttribute('src','image/blank.png');
    alert('You clicked the same card!');
  }else {
    if(choosenCard[0] ===choosenCard[1] ) {
      alert('You found a mach!');
      cards[optionOneId].setAttribute('src','image/white.png');
      cards[optionTwoId].setAttribute('src','image/white.png');
      cards[optionOneId].removeAttribute('click', fleepCard);
      cards[optionTwoId].removeAttribute('click', fleepCard);
      cardsWon.push(choosenCard[0].name);
    }else {
      cards[optionOneId].setAttribute('src','image/blank.png');
      cards[optionTwoId].setAttribute('src','image/blank.png');
      alert('Sorry try agin!');
    }
  }
  resultDisplay.textContent = cardsWon.length;
  choosenCard = [];
  choosenCardId = [];
  if(cardsWon.length === cardArray.length/2) {
    resultDisplay.textContent = 'Congratulation you found all!';
  }
}

function fleepCard() {
  const cardId = this.getAttribute('data-id');
  choosenCard.push(cardArray[cardId].name);
  choosenCardId.push(cardId);
  this.setAttribute('src',cardArray[cardId].img);
  if(choosenCard.length === 2) {
    setTimeout(checkWin, 500);
  }
}