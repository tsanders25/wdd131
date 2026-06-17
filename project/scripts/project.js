    /*MODELED AFTER CODEPEN | CURRENT YEAR*/
    const currentyear = document.querySelector("#currentyear");
    const today = new Date();

    currentyear.innerHTML = `<span class="highlight">${today.getFullYear()}</span>`;


    const lastmodified = document.getElementById("lastModified").innerHTML = document.lastModified;

    let colorHistoryArray = [];
    let playerXWins = parseInt(localStorage.getItem("playerXWins")) || 0;
    let playerOWins = parseInt(localStorage.getItem("playerOWins")) || 0;

/*Random Header Color Generator*/
function generateColor() {
    let red = Math.round(Math.random() * 255);
    let yellow = Math.round(Math.random() * 255);
    let blue = Math.round(Math.random() * 255);

    let rgbColor = `RGB(${red}, ${yellow}, ${blue})`;
    console.log(rgbColor);

    colorHistoryArray.push(rgbColor);
    if (colorHistoryArray.length > 10) { colorHistoryArray.shift(); }

    const headers = document.querySelectorAll("h1, h2, h3");
    headers.forEach((
        header) => {header.style.backgroundColor = rgbColor;
});

    window.playerXColor = rgbColor;
    window.playerOColor = rgbColor;
    
    document.querySelector("#currentColor").textContent = rgbColor;
    textContrast(red, yellow, blue);
    colorHistoryGenerator();
}

generateColor();

/* Text Contrast Generator */
function textContrast(red, yellow, blue) {
    const brightness = (red * 0.299) + (yellow * 0.587) + (blue * 0.114);
    /*const textContrastColor = brightness > 186 ? "#000000" : "#ffffff";*/

    const cellBackgroundColor = "white"/*brightness < 186 ? "#ffffff" : "#000000";*/
    const headerTextColor = brightness > 186 ? "#ffffff" : "#000000";

    const headers = document.querySelectorAll("h1, h2, h3");
    headers.forEach((header) => {
        header.style.color = headerTextColor;
        
    });

    const gameCells = document.querySelectorAll(".cell");
    gameCells.forEach((cell) => {
        cell.style.backgroundColor = cellBackgroundColor;
    });

    const textDisplay = document.querySelector("#currentTextColor");
    if (textDisplay) {
        textDisplay.textContent = textContrastColor;
    }
}



function colorHistoryGenerator() {
    const colorHistory = document.getElementById("colorHistory");
    colorHistory.innerHTML = "";

    colorHistoryArray.forEach((colorCode) => {
        const listItem = document.createElement("li");
        listItem.textContent = colorCode;
        listItem.style.backgroundColor = colorCode;
        listItem.style.listStyle = "none";
        listItem.style.padding = "5px";
        listItem.style.margin = "5px 0";
        listItem.style.borderRadius = "4px";
    
        const rgbValues = colorCode.match(/\d+/g).map(Number);
        const brightness = (rgbValues[0] * 0.299) + (rgbValues[1] * 0.587) + (rgbValues[2] * 0.114);
        listItem.style.color = brightness > 186 ? "#000000" : "#ffffff";

        colorHistory.appendChild(listItem);
    });
}



/*TIc Tac Toe*/
const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let running = false;

function initializeGame() {
    cells.forEach(cell => cell.addEventListener("click", cellClicked));
    restartBtn.addEventListener("click", restartGame);
    statusText.textContent = `${currentPlayer}'s turn!`;
    running = true;

}

function cellClicked() {
    const cellIndex = this.getAttribute("cellIndex");

    if (options[cellIndex] != "" || !running) {
        return; 
    }

    updateCell(this, cellIndex);
    checkWinner();
}

function updateCell(cell, index) {
    options[index] = currentPlayer;
    cell.textContent = currentPlayer;

    if (currentPlayer === "X") {
        cell.style.color = window.playerXColor;
    } else {
        cell.style.color = window.playerOColor;
    }
}

function changePlayer() {
    currentPlayer = (currentPlayer == "X") ? "O" : "X";
    statusText.textContent = `${currentPlayer}'s turn!`;
}

function checkWinner() {
    let roundWon = false;
    for (let i = 0; i < winConditions.length; i++) {
        const condition = winConditions[i];
        const cellA = options[condition[0]];
        const cellB = options[condition[1]];
        const cellC = options[condition[2]];

        if (cellA == "" || cellB == "" || cellC == "") {
            continue;
        }

        if (cellA == cellB && cellB == cellC) {
            roundWon = true;
            break;
        }
    }

    if (roundWon) {
        statusText.textContent = `${currentPlayer} wins!`;
        running = false;

        if (currentPlayer === "X") {
            playerXWins++;
            localStorage.setItem("playerXWins", playerXWins);
            document.getElementById("player1-score").textContent = `Player X: ${playerXWins} wins`;
        } else {
            playerOWins++;
            localStorage.setItem("playerOWins", playerOWins);
            document.getElementById("player2-score").textContent = `Player O: ${playerOWins} wins`;
        }

    }
    else if (!options.includes("")) {
        statusText.textContent = "Draw!";

    }
    else { 
        changePlayer();
    }
}

function restartGame() {
    currentPlayer = "X";
    options = ["", "", "", "", "", "", "", "", ""];
    statusText.textContent = `${currentPlayer}'s turn!`;
    cells.forEach(cell => {cell.textContent = "";
    cell.style.color = "";
});
    running = true;

    generateColor();
}

initializeGame();

/*Player Scores*/

document.addEventListener("DOMContentLoaded", () => {
    document.getElementById("player1-score").textContent = `Player X: ${playerXWins} points`;
    document.getElementById("player2-score").textContent = `Player O: ${playerOWins} points`;

    
})

const clearScoresBtn = document.getElementById("clearPlayerScores");
if (clearScoresBtn) {
    clearScoresBtn.addEventListener("click", clearAllScores);
}

function clearAllScores() {
    localStorage.removeItem("playerXWins");
    localStorage.removeItem("playerOWins");

    playerXWins = 0;
    playerOWins = 0;

    document.getElementById("player1-score").textContent = `Player X: 0 points`;
    document.getElementById("player2-score").textContent = `Player O: 0 points`;

}

