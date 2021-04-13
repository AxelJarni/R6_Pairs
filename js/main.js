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
        img: 'img/Square/NomadSquare.png'
    },
    {
        name: 'Maestro',
        img: 'img/Square/NomadSquare.png'
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

function createBoard() {
    for (let i = 0; i < cardArray.length; i++) {
        let card = document.createElement('img')
        card.setAttribute('src', 'img/Square/R6_Logo.jpg')
        card.setAttribute('data-id', i)
        card.className += 'cardGame col-4 my-2'
        grid.appendChild(card)
    }
}
createBoard();