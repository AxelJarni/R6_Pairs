// Array for smaller screen version with square Ops
const squareArray = [
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

// Array for bigger screen version with cards Ops
const bigArray = [
    {
        name: 'Aruni',
        img: 'img/Cards/AruniCard.png'
    },
    {
        name: 'Aruni',
        img: 'img/Cards/AruniCard.png'
    },
    {
        name: 'Caveira',
        img: 'img/Cards/CaveiraCard.png'
    },
    {
        name: 'Caveira',
        img: 'img/Cards/CaveiraCard.png'
    },
    {
        name: 'Doc',
        img: 'img/Cards/DocCard.png'
    },
    {
        name: 'Doc',
        img: 'img/Cards/DocCard.png'
    },
    {
        name: 'Echo',
        img: 'img/Cards/EchoCard.png'
    },
    {
        name: 'Echo',
        img: 'img/Cards/EchoCard.png'
    },
    {
        name: 'Hibana',
        img: 'img/Cards/HibanaCard.png'
    },
    {
        name: 'Hibana',
        img: 'img/Cards/HibanaCard.png'
    },
    {
        name: 'Mozzie',
        img: 'img/Cards/MozzieCard.png'
    },
    {
        name: 'Mozzie',
        img: 'img/Cards/MozzieCard.png'
    },
    {
        name: 'Zero',
        img: 'img/Cards/ZeroCard.png'
    },
    {
        name: 'Zero',
        img: 'img/Cards/ZeroCard.png'
    }
];

// *VARIABLES*
const grid = document.querySelector('.grid');
let cardArray = []
let chosenCards = [];
let chosenCardsId = [];
let cardsScore = 0;
let timerLaunch = 0;
let clickCountdown = 30;
let timeleft = 30;

// Media Query to pick the good array depending of window size
if (window.matchMedia("(min-width: 1024px").matches) {
    cardArray = bigArray;
}
else {
    cardArray = squareArray;
};

// *FUNCTIONS* 

// Create the bord by creating a grid of img (including a spacing div to put info inside)
function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        if (i===1) { // Create a spacing between 1st and 2nd card for info
            let space = document.createElement('div'); // Used for small/medium screen to show game info in the space created top middle
            space.className += 'space text-center align-items-center col-4 col-md-3 my-auto';
            space.innerHTML = 
            `
            <p id= "spaceTime">${timeleft} SEC</p>
            <hr>
            <p id= "spaceTries">${clickCountdown/2} Tries left</p>`;
            grid.appendChild(space);
            let titleInfo = document.getElementById('titleInfo'); // Used for big screen only when info is in the header with cards format
            titleInfo.classList.remove('hidden');
            titleInfo.innerHTML = 
            `
            <p id= "logoTime">${timeleft} SEC</p>
            <hr>
            <p id= "logoTries">${clickCountdown/2} Tries left</p>`;
        }
        let card = document.createElement('img');
        if (window.matchMedia("(min-width: 1024px").matches) { //Media Query to make the img be either a square or card
            card.setAttribute('src', 'img/Cards/logoCard.jpg');
        }
        else {
            card.setAttribute('src', 'img/Square/R6_Logo.jpg');
        };
        card.setAttribute('data-id', i);
        card.className += 'cardGame col-4 col-md-3 my-2';
        card.addEventListener('click', flipcard);
        grid.appendChild(card);
    }
}

// Flip the card and call other functions depending of the implications of the click
function flipcard() {
    let cardId = this.getAttribute('data-id');
    chosenCards.push(cardArray[cardId].name)
    chosenCardsId.push(cardId);
    timerLaunch ++;
    if (chosenCards.length <= 2) { // To limit to only 2 cards shown
        this.setAttribute('src', cardArray[cardId].img) //Give img to the card
        this.classList.toggle('active'); // Possible use for flip useful for hover effect
        this.removeEventListener('click', flipcard); //Remove click monitoring to avoid cheating and over counting tries
    };
    if (chosenCards.length === 2) { // When user pick a pair of cards call for checking match and deduct a try on counter
        setTimeout(checkMatch, 1000);
        clickCountdown -=2;
        document.getElementById('spaceTries').innerHTML = clickCountdown/2 + ' Tries left';
        document.getElementById('logoTries').innerHTML = clickCountdown/2 + ' Tries left';
    };
    if (timerLaunch === 1) { // Call the function to start the timer on first click
        startTimer();
    };
};

// Check for match between the pair of cards chosen by User
function checkMatch() {
    let cards = document.querySelectorAll('div.grid > img')
    const firstCard = chosenCardsId[0];
    const secondCard = chosenCardsId[1];
    if (chosenCards[0] === chosenCards[1]) { // Matched pair = different background and add score
        cards[firstCard].setAttribute('style', 'background-color: green;');
        cards[secondCard].setAttribute('style', 'background-color: green;');
        cardsScore += 2;
    }
    else {
        if (window.matchMedia("(min-width: 1024px").matches) {
            cards[firstCard].setAttribute('src', 'img/Cards/logoCard.jpg')
            cards[secondCard].setAttribute('src', 'img/Cards/logoCard.jpg')
        }
        else {
            cards[firstCard].setAttribute('src', 'img/Square/R6_Logo.jpg');
            cards[secondCard].setAttribute('src', 'img/Square/R6_Logo.jpg');
        }
        cards[firstCard].addEventListener('click', flipcard); // Give back the click event listener since it's not a match so that User can try those cards again.
        cards[secondCard].addEventListener('click', flipcard);
        cards[firstCard].classList.toggle('active'); //Wanted to use it for flip
        cards[secondCard].classList.toggle('active');
    }
    chosenCards = []; //Reset the pair chosen
    chosenCardsId = [];
};

// Start the time limit
function startTimer() {
    let gameTimer = setInterval(function(){
        timeleft -= 1;
        if(timeleft === 0 || clickCountdown === 0){ // Losing conditions by time or click count
            setTimeout(youLose, 1100); // Calling losing screen
            clearInterval(gameTimer);
            clickCountdown = 30; // Resetting values, useful if replay.
            timeleft = 30;
            timerLaunch = 0;
            cardsScore = 0;
            chosenCards = [];
            chosenCardsId = [];
            return; // Exit function to avoid timer problem if losing on time then replay
        }
        if(cardsScore === cardArray.length) { // Winning condition and call winning screen
            youWin();
            clearInterval(gameTimer);
            return;
        } 
        else { // Update the time on for game info every interval (1s)
          document.getElementById(('spaceTime')).innerHTML = timeleft + ' SEC';
          document.getElementById(('logoTime')).innerHTML = timeleft + ' SEC';
        };
      }, 1000);
};

// Show the board when User click play/replay and hide the other elements
function showboard() {
    let start = document.getElementById('start');
    let grid = document.getElementById('grid');
    let losing = document.getElementById('losing');
    let winning = document.getElementById('winning');
    let titles = document.getElementById('titles');
    grid.classList.remove('hidden');
    winning.classList.add('hidden');
    start.classList.add('hidden');
    losing.classList.add('hidden');
    titles.classList.add('hidden');
}

// Losing screen shown and hide other elements
function youLose() {
    let grid = document.getElementById('grid');
    let losing = document.getElementById('losing');
    losing.classList.remove('hidden');
    grid.classList.add('hidden');
}

// Winning screen shown and hide other elements
function youWin(){
    let grid = document.getElementById('grid');
    let winning = document.getElementById('winning');
    winning.classList.remove('hidden');
    grid.classList.add('hidden');
}

// Game function called on button click
function play(){
    let grid = document.getElementById('grid');
    // cardArray.sort(() => 0.5 - Math.random()) //Shuffle array with simple random. Not random enough results.
    cardArray = shuffleArray(cardArray); // Shuffle Array
    grid.innerHTML = ''; // Reset grid and values then call the playing functions
    clickCountdown = 30;
    timeleft = 30;
    timerLaunch = 0;
    cardsScore = 0;
    createBoard();
    showboard(); 
}

// function shuffleArray(cardArray) { // Durstenfeld shuffle
//     if (window.matchMedia("(min-width: 1024px").matches) {
//         cardArray = bigArray;
//     }
//     else {
//         cardArray = squareArray;
//     }
//     for (let i = cardArray.length - 1; i > 0; i--) {
//         const j = Math.floor(Math.random() * (i + 1));
//         [cardArray[i], cardArray[j]] = [cardArray[j], cardArray[i]];
//     }
//     return cardArray;
// }
function shuffleArray(cardArray) { // Using Fisher-Yates shuffle for best random
    if (window.matchMedia("(min-width: 1024px").matches) {
        cardArray = bigArray;
    }
    else {
        cardArray = squareArray;
    };
    var currentIndex = cardArray.length, temporaryValue, randomIndex;
  
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
  
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
  
      // And swap it with the current element.
      temporaryValue = cardArray[currentIndex];
      cardArray[currentIndex] = cardArray[randomIndex];
      cardArray[randomIndex] = temporaryValue;
    };
  
    return cardArray;
  };

