let form1 = document.getElementById('player1Name');
let form2 = document.getElementById('player2Name');
let input1 = document.getElementById('player1Input')
let input2 = document.getElementById('player2Input')
let player1NewName = document.getElementById('player1');
let player2NewName = document.getElementById('player2');
let player1Letter = document.getElementById('player1Letter');
let player2Letter = document.getElementById('player2Letter');

//Players enter their names and having the scoreboard Player Name Placeholders change accordingly.

form1.addEventListener('submit', function (ev) {
    ev.preventDefault();
    let player1NameInput = input1.value;
    player1NewName.innerText = player1NameInput;
});

form2.addEventListener('submit', function (ev) {
    ev.preventDefault();
    let player2NameInput = input2.value;
    player2NewName.innerText = player2NameInput;
});

// //Game Functionality

//constants

const tiles = Array.from(document.querySelectorAll('#the-game div'));
const messages = document.querySelector('#message');
const gameBoard = document.getElementById('the-game')
const restartBtn = document.getElementById('restart-button');

const winConditions = [//The game will check throughout it's duration to see if there is a row with the same character combination as the winCondition
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// state
let state;

const xChar = player1Letter.innerText;
const oChar = player2Letter.innerText;
let currentPlayer = xChar;
let currentPlayerName = player1NewName.innerText;

let win;

function buildInitialState() {
    board = ['', '', '', '', '', '', '', '', ''];

    renderState();
};

buildInitialState();

// render
function renderState() {
    board.forEach(function (val, index) {
        tiles[index].innerText = val;
    });
    if (win === 'Tie') {
        messages.innerText = 'It\'s a Tie!';
    }
    else if (win) {
        messages.innerText = win + ' wins the game!';
    } else {
        messages.innerText = 'It\'s ' + currentPlayerName + '\'s turn!';
    }
};

function checkWin() {
    let winner = null;
    winConditions.forEach(function (row, index) {
        if (board[row[0]] && board[row[0]] === board[row[1]] && board[row[0]] === board[row[2]]) {
            winner = board[row[0]];
            if (board[row[0]] === 'X') {
                winner = player1NewName.innerText;
            } else if (board[row[0]] === 'O') {
                winner = player2NewName.innerText;
            }
        }
    });
    if (winner) {
        return winner;
    } else if (board.includes('')) {
        return null //If there is an empty space and no combinations have been met, the game will continue because there is not a winner yet.
    } else {
        return 'Tie' //If there are no empty spaces left and there are no combinations met, the result is a tie.
    }
    return winner;
};

// listeners

gameBoard.addEventListener('click', changePlayer);
restartBtn.addEventListener('click', buildInitialState);//Reset button functionality

function changePlayer(ev) {//This function will check to see whether 'X' or 'O' is the current player after an input. Switching the current player to 'O' and 'X' respectively.
    let idx = tiles.findIndex(function (tile) {
        return tile === ev.target;
    });
    if (tiles[idx].innerText === '') {
        board[idx] = currentPlayer;
        win = checkWin();
        if (currentPlayer === xChar) {
            currentPlayerName = player2NewName.innerText;
            currentPlayer = oChar;
        } else {
            currentPlayerName = player1NewName.innerText;
            currentPlayer = xChar;
        }
    }
    renderState();
};