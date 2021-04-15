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
let clickCountdown = 30;
let timeleft = 30;

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        if (i===1) {
            let space = document.createElement('div');
            space.className += 'space text-center align-items-center col-4 col-md-3 my-auto';
            space.innerHTML = 
            `
            <p id= "spaceTime">${timeleft} SEC</p>
            <p id= "spaceTries">${clickCountdown/2} Tries left</p>`
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
        document.getElementById('spaceTries').innerHTML = clickCountdown/2 + ' Tries left';
    }
    if (timerLaunch === 1) {
        startTimer();
        console.log("timer should start");
    }
    // if (clickCountdown === 0 || timeleft === 0) {
    //     setTimeout(youLose, 1100);
    //     clickCountdown = 30;
    // }
}

function checkMatch() {
    let cards = document.querySelectorAll('div.grid > img')
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
    // if (cardsScore === cardArray.length) {
    //     youWin();
    // }
}

function startTimer() {
    let gameTimer = setInterval(function(){
        timeleft -= 1;
        if(timeleft === 0 || clickCountdown === 0){
            clearInterval(gameTimer);
            document.getElementById('spaceTime').innerHTML = "0";
            setTimeout(youLose, 1100);
            clickCountdown = 30;
            timeleft = 30;
            timerLaunch = 0;
            cardsScore = 0;
        }
        if(cardsScore === cardArray.length) {
            youWin();
            clearInterval(gameTimer);
        } 
        else {
          document.getElementById(('spaceTime')).innerHTML = timeleft + ' SEC';
        }
      }, 1000);
}

function showboard() {
    let start = document.getElementById('start');
    let grid = document.getElementById('grid');
    let losing = document.getElementById('losing');
    let winning = document.getElementById('winning');
    let titles = document.getElementById('titles');
    grid.classList.remove('hidden');
    winning.classList.add('hidden')
    start.classList.add('hidden');
    losing.classList.add('hidden');
    titles.classList.add('hidden');
}

function youLose() {
    let grid = document.getElementById('grid');
    let losing = document.getElementById('losing');
    losing.classList.remove('hidden');
    grid.classList.add('hidden');
}

function youWin(){
    let grid = document.getElementById('grid');
    let winning = document.getElementById('winning');
    winning.classList.remove('hidden');
    grid.classList.add('hidden');
    console.log('win function declared');
}

function play(){
    let grid = document.getElementById('grid');
    cardArray.sort(() => 0.5 - Math.random()) //Sorting array with a Math Random. 0.5 to allow sorting inside with neg/pos value. Would be better with Fischer Yates
    grid.innerHTML = '';
    clickCountdown = 30;
    timeleft = 30;
    timerLaunch = 0;
    cardsScore = 0;
    createBoard();
    showboard(); 
}


