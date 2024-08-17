// Initialize Gameboard and initial values
let Gameboard = ['', '', '', '', '', '', '', '', ''];
let PlayerTurn = 'X';

// Check for winning condition
function CheckforWin() {
    let GameboardRow1 = Gameboard.slice(0, 3);
    let GameboardRow2 = Gameboard.slice(3, 6);
    let GameboardRow3 = Gameboard.slice(6, 9);
    let GameboardColumn1 = [Gameboard[0], Gameboard[3], Gameboard[6]];
    let GameboardColumn2 = [Gameboard[1], Gameboard[4], Gameboard[7]];
    let GameboardColumn3 = [Gameboard[2], Gameboard[5], Gameboard[8]];
    let GameboardCross1 = [Gameboard[0], Gameboard[4], Gameboard[8]];
    let GameboardCross2 = [Gameboard[2], Gameboard[4], Gameboard[6]];
    let allX = ['X', 'X', 'X'];
    let allO = ['O', 'O', 'O'];

    function arraysMatch(arr) {
        return JSON.stringify(arr) === JSON.stringify(allX) || 
               JSON.stringify(arr) === JSON.stringify(allO);
    }

    let isWin = 
        arraysMatch(GameboardRow1) ||
        arraysMatch(GameboardRow2) || 
        arraysMatch(GameboardRow3) ||
        arraysMatch(GameboardColumn1) || 
        arraysMatch(GameboardColumn2) || 
        arraysMatch(GameboardColumn3) || 
        arraysMatch(GameboardCross1) || 
        arraysMatch(GameboardCross2);
    
    return isWin;
}

function CheckForTie() {
    // Check if there are no empty spaces on the board
    const isBoardFull = Gameboard.every(cell => cell !== '');
    if (isBoardFull && !CheckforWin()) {
        return true;
    } else {
        return false;
    }
}
// Function to display the Gameboard in rows in console

function UpdateName(Number, Name) {
    if (Number === 1) {
        Player1Name = Name;
    } else {
        Player2Name = Name;
    }
}

function InitiateTurn() {
    if (PlayerTurn == 'X') {
        PlayerTurn = 'O';
    } else {
        PlayerTurn = 'X';
    }
}

function FinishGame() {
    if (!CheckForTie()) {
        alert(`Player ${PlayerTurn} wins!`);}
        else {
            alert("It's a tie!");
        }
    Player1Name = '';
    Player2Name = '';
    Gameboard = ['','','','','','','','',''];
    PlayerTurn = 'X'; // Reset to X
    renderBoard(); // Re-render the board after resetting
}

function handleBoardClick(event) {
    let target = event.target;
    const index = target.id;

    if (index && Gameboard[index] === '') { // Check if the cell is empty
        Gameboard[index] = PlayerTurn;
        renderBoard(); // Render the updated board before checking for win

        if (CheckforWin() || CheckForTie()) {
            setTimeout(FinishGame, 5); // Delay the finish to allow board to render
        } 
        else {
            InitiateTurn(); // Switch the turn
            renderBoard(); // Re-render the board
        }
    }
}

function renderBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = ''; // Clear the board before rendering

    Gameboard.forEach((value, index) => {
        const cell = document.createElement('div');
        cell.textContent = value;
        cell.id = index;
        boardDiv.appendChild(cell);
    });
}

// Set up the event listener
document.getElementById('board').addEventListener('click', handleBoardClick);

// Initialize the game
renderBoard();