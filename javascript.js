function Player() {
    function Create(name, marker) {
        return {
            name: name,
            marker: marker,
            score: 0,
            updateName: function(newName) {
                this.name = newName;
            },
            wins: function() {
                console.log(this); // Debugging: Log the current player object
                this.score++;
                document.getElementById(`${this.marker}score`).style.textShadow= '0 0 1px #fff, 0 0 1px #fff, 0 0 2px rgb(3, 202, 93), 0 0 3px rgb(3, 202, 93), 0 0 4px rgb(3, 202, 93), 0 0 5px rgb(3, 202, 93), 0 0 6px rgb(3, 202, 93), 0 0 7px rgb(3, 202, 93)';
                
                setTimeout(() => {
                    document.getElementById(`${this.marker}score`).style.textShadow= '0 0 1px #fff, 0 0 1px #fff, 0 0 2px #00f, 0 0 3px #00f, 0 0 4px #00f, 0 0 5px #00f, 0 0 6px #00f, 0 0 7px #00f';
                }, 1000); // Change color back to white after 1 second
            },
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
    if (!CheckForTie()) {
        PlayerTurn.wins(); // Increment the score for the winning player
        document.getElementById('Xscore').innerHTML= X.score;
        document.getElementById('Oscore').innerHTML= O.score;
        console.log("x");
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

    UpdateScreen();

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

