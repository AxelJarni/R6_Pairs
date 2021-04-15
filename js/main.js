const cardArray = [
    {
        name: 'Ela',
        img: 'img/Square/ElaSquare.png'
    },
    {
        name: 'Ela',
        img: 'img/Square/ElaSquare.png'
    },
    {
        name: 'Frost',
        img: 'img/Square/FrostSquare.png'
    },
    {
        name: 'Frost',
        img: 'img/Square/FrostSquare.png'
    },
    {
        name: 'Maestro',
        img: 'img/Square/MaestroSquare.png'
    },
    {
        name: 'Maestro',
        img: 'img/Square/MaestroSquare.png'
    },
    {
        name: 'Nomad',
        img: 'img/Square/NomadSquare.png'
    },
    {
        name: 'Nomad',
        img: 'img/Square/NomadSquare.png'
    },
    {
        name: 'Tachanka',
        img: 'img/Square/TachankaSquare.png'
    },
    {
        name: 'Tachanka',
        img: 'img/Square/TachankaSquare.png'
    },
    {
        name: 'Thermite',
        img: 'img/Square/ThermiteSquare.png'
    },
    {
        name: 'Thermite',
        img: 'img/Square/ThermiteSquare.png'
    },
    {
        name: 'Valkyrie',
        img: 'img/Square/ValkyrieSquare.png'
    },
    {
        name: 'Valkyrie',
        img: 'img/Square/ValkyrieSquare.png'
    }
];

const grid = document.querySelector('.grid');
let chosenCards = [];
let chosenCardsId = [];
let cardsScore = 0;
let timerLaunch = 0;
let clickCountdown = 10;
let timeleft = 30;

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        if (i===1) {
            let space = document.createElement('div');
            space.className += 'space col-4 col-md-3 my-1';
            space.innerHTML = 
            `
            <p id= "spaceTime">${timeleft} SEC</p>`
            grid.appendChild(space);
        }
        let card = document.createElement('img')
        card.setAttribute('src', 'img/Square/R6_Logo.jpg')
        card.setAttribute('data-id', i)
        card.className += 'cardGame col-4 col-md-3 my-2'
        card.addEventListener('click', flipcard)
        grid.appendChild(card)
    }
}

function flipcard() {
    let cardId = this.getAttribute('data-id')
    chosenCards.push(cardArray[cardId].name)
    chosenCardsId.push(cardId)
    timerLaunch ++;
    if (chosenCards.length <= 2) { // To limit to only 2 cards shown
        this.setAttribute('src', cardArray[cardId].img) //Give img to the card
        this.removeEventListener('click', flipcard); //Remove click monitoring to avoid cheating and over counting tries
    }
    if (chosenCards.length === 2) {
        setTimeout(checkMatch, 1000);
        clickCountdown -=2;
    }
    if (timerLaunch === 1) {
        startTimer();
        console.log("timer should start");
    }
    if (clickCountdown === 0) {
        setTimeout(youLose, 1100);
        clickCountdown = 10;
    }
}

function checkMatch() {
    let cards = document.querySelectorAll('img')
    const firstCard = chosenCardsId[0];
    const secondCard = chosenCardsId[1];
    if (chosenCards[0] === chosenCards[1]) {
        cards[firstCard].setAttribute('style', 'background-color: green;');
        cards[secondCard].setAttribute('style', 'background-color: green;');
        cardsScore += 2;
    }
    else {
        cards[firstCard].setAttribute('src', 'img/Square/R6_Logo.jpg');
        cards[secondCard].setAttribute('src', 'img/Square/R6_Logo.jpg');
        cards[firstCard].addEventListener('click', flipcard);
        cards[secondCard].addEventListener('click', flipcard);
    }
    chosenCards = [];
    chosenCardsId = [];
    if (cardsScore === cardArray.length) {
        alert('you won');
    }
}

function startTimer() {
    let gameTimer = setInterval(function(){
        timeleft -= 1;
        if(timeleft <= 0){
          clearInterval(gameTimer);
          document.getElementById('spaceTime').innerHTML = "0";
          youLose();
          timeleft = 30;
          timerLaunch = 0;
        } 
        else {
          document.getElementById(('spaceTime')).innerHTML = timeleft + ' SEC';
        }
      }, 1000);
}

function showboard() {
    let startBtn = document.getElementById('start');
    let grid = document.getElementById('grid');
    let ending = document.getElementById('ending');
    grid.classList.remove('hidden');
    startBtn.classList.add('hidden');
    ending.classList.add('hidden');
}

function youLose() {
    let grid = document.getElementById('grid');
    let ending = document.getElementById('ending');
    ending.classList.remove('hidden');
    grid.classList.add('hidden');
}

function play(){
    let grid = document.getElementById('grid');
    cardArray.sort(() => 0.5 - Math.random()) //Sorting array with a Math Random. 0.5 To allow sorting inside with neg/pos value. Would be better with Fischer Yates
    grid.innerHTML = '';
    createBoard();
    showboard();
}


