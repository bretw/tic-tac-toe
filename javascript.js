function Player() {
    function Create(name,marker) {
        return {
            name: name,
            marker: marker,
            score: 0,
            updateName: function(newName) {
                this.name = newName;
            },
            wins: function() {
                this.score++;
            }
            };
        }
    return {
        Create: Create,
    };
}

function CheckforWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => Gameboard[index] === PlayerTurn.marker));
}

function CheckForTie() {
    return Gameboard.every(cell => cell !== '') && !CheckforWin();
}

function FinishGame() {
    alert(CheckForTie() ? "It's a tie!" : `Player ${PlayerTurn.name} wins!`);
    if (!CheckForTie()) {
        PlayerTurn.wins(); // Increment the score for the winning player
        document.getElementById('Xscore').innerHTML= X.score;
        document.getElementById('Oscore').innerHTML= O.score;
    }

    setTimeout(() => {
        Gameboard.fill('');
        PlayerTurn = X; // Reset PlayerTurn to the first player
        renderBoard(); // Re-render the board
    }, 300); // Delay to allow the user to see the final state
}

function handleBoardClick(event) {
    const index = event.target.id;
    if (Gameboard[index] === '') {
        Gameboard[index] = PlayerTurn.marker;
        renderBoard();
        if (CheckforWin() || CheckForTie()) setTimeout(FinishGame, 3);
        else PlayerTurn = PlayerTurn === X ? O : X;
    }
}

function renderBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = Gameboard.map((value, index) =>
        `<div id="${index}">${value}</div>`).join('');
}

function Reset() {   //reset scores
    X.score = 0;
    O.score = 0;
    X.updateName('Player1');    //update names to default
    O.updateName('Player2');
    UpdateScreen();
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    Gameboard = ['', '', '', '', '', '', '', '', ''];
    renderBoard();



}

let Gameboard = ['', '', '', '', '', '', '', '', ''];
document.getElementById('board').addEventListener('click', handleBoardClick);
renderBoard();

function UpdateScreen() {
    document.getElementById('Xscore').innerHTML = X.score;
    document.getElementById('Oscore').innerHTML = O.score;
}

const X = Player().Create('Player1','X');
const O = Player().Create('Player2','O');
let PlayerTurn = X;

const Xname = document.getElementById('player1');
Xname.addEventListener('input', function(event) {
    const newName = event.target.value;
    X.updateName(newName);
});

const Oname = document.getElementById('player2');
Oname.addEventListener('input', function(event) {
    const newName = event.target.value;
    O.updateName(newName);
});

document.getElementById('reset').addEventListener('click', Reset);

