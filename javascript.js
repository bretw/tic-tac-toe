let Gameboard = ['', '', '', '', '', '', '', '', ''], PlayerTurn = 'X';

function CheckforWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => Gameboard[index] === PlayerTurn));
}

function CheckForTie() {
    return Gameboard.every(cell => cell !== '') && !CheckforWin();
}

function FinishGame() {
    alert(CheckForTie() ? "It's a tie!" : `Player ${PlayerTurn} wins!`);
    Gameboard.fill(''); PlayerTurn = 'X'; renderBoard();
}

function handleBoardClick(event) {
    const index = event.target.id;
    if (Gameboard[index] === '') {
        Gameboard[index] = PlayerTurn;
        renderBoard();
        if (CheckforWin() || CheckForTie()) setTimeout(FinishGame, 5);
        else PlayerTurn = PlayerTurn === 'X' ? 'O' : 'X';
    }
}

function renderBoard() {
    const boardDiv = document.getElementById('board');
    boardDiv.innerHTML = Gameboard.map((value, index) =>
        `<div id="${index}">${value}</div>`).join('');
}

document.getElementById('board').addEventListener('click', handleBoardClick);
renderBoard();