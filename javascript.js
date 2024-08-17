// initalize Gameboard with zeros
let Gameboard = [0,'O',0,0,'X','O','X','X',0];      

// check for winning condition
function CheckforWin() {
    let GameboardRow1 = Gameboard.slice(0,3);
    let GameboardRow2 = Gameboard.slice(3,6);
    let GameboardRow3 = Gameboard.slice(6,9);
    let GameboardColumn1 = [Gameboard[0], Gameboard[3], Gameboard[6]];
    let GameboardColumn2 = [Gameboard[1], Gameboard[4], Gameboard[7]];
    let GameboardColumn3 = [Gameboard[2], Gameboard[5], Gameboard[8]];
    let GameboardCross1 = [Gameboard[0], Gameboard[4], Gameboard[8]];
    let GameboardCross2 = [Gameboard[2], Gameboard[4], Gameboard[7]];
    let allX = ['X','X','X'];
    let allO = ['O','O','O'];
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
        arraysMatch(GameboardCross2) 
    return isWin;
}


// display the Gameboard in rows
function DisplayGameboard () {
    console.log(Gameboard);
}

// update Gameboard with an X or O
// dont do anything if it already has an X or O in that spot  already
function UpdateGameBoard (OX, Position) {
    if (Gameboard[Position] == "O" || Gameboard[Position] == "X" ){
        return;
    }
    Gameboard[Position] = OX;
};

DisplayGameboard();
console.log(CheckforWin());





