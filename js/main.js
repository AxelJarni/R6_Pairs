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

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement('img')
        card.setAttribute('src', 'img/Square/R6_Logo.jpg')
        card.setAttribute('data-id', i)
        card.className += 'cardGame col-4 my-2'
        card.addEventListener('click', flipcard)
        grid.appendChild(card)
    }
}

function flipcard() {
    let cardId = this.getAttribute('data-id')
    chosenCards.push(cardArray[cardId].name)
    chosenCardsId.push(cardId)
    this.setAttribute('src', cardArray[cardId].img) //Give img to the card
    if (chosenCards.length === 2) {
        // document.getElementsByClassName("cardGame").disabled = true;
        // setTimeout(function(){document.getElementsByClassName("cardGame").disabled = false;},500);
        setTimeout(checkformatch, 500);
    }
}

function checkformatch() {
    let cards = document.querySelectorAll('img')
    const firstCard = chosenCardsId[0];
    const secondCard = chosenCardsId[1];
    if (chosenCards[0] === chosenCards[1]) {
        cards[firstCard].setAttribute('style', 'background-color: green;');
        cards[secondCard].setAttribute('style', 'background-color: green;');
        cardsScore += 2;
    }
    else {
        cards[firstCard].setAttribute('src', 'img/Square/R6_Logo.jpg')
        cards[secondCard].setAttribute('src', 'img/Square/R6_Logo.jpg')
    }
    chosenCards = [];
    chosenCardsId = [];
    if (cardsScore === cardArray.length) {
        alert('you won');
    }
}

createBoard();

