const getCell = document.querySelectorAll("[data-cell]");
const showMessage = document.querySelector("[data-endgame-message]");
const restartButton = document.getElementById("rebutton");
const getCells = document.getElementById("cells");


const WIN_CONDITIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let playerOneTurn = true;

const swapTurn = () => (playerOneTurn = !playerOneTurn);

const drawSymbol = (cell, symbol) => {
    cell.classList.add(symbol);
    getCells.classList.remove(symbol);
    getCells.classList.add(`${symbol == "cross" ? "circle" : "cross"}`);
};

const checkWin = (playerOneTurn) => {
    return WIN_CONDITIONS.some((combination) => {
        return combination.every((index) => {
            return getCell[index].classList.contains(
                playerOneTurn ? "cross" : "circle"
            );
        });
    });
};

const checkDraw = () => {
    return [...getCell].every((cell) => {
        return (
            cell.classList.contains("cross") ||
            cell.classList.contains("circle")
        );
    });
};

const endGame = (message = "") => {
    showMessage.innerHTML = message;
    getCell.forEach((eachElement) => {
        eachElement.removeEventListener("click", handleClick, { once: true });
    });
    getCells.classList.remove("cross") || getCells.classList.remove("circle");
};

const handleClick = (e) => {
    const cell = e.target;

    playerOneTurn ? drawSymbol(cell, "cross") : drawSymbol(cell, "circle");

    if (checkWin(playerOneTurn)) {
        endGame(`${playerOneTurn ? "Player 1" : "Player 2"} WINS!`);
    } else if (checkDraw()) {
        endGame("DRAW!");
    } else {
        swapTurn();
    }
};

function startGame() {
    endGame();

    getCells.classList.add("cross");



    getCell.forEach((eachElement) => {
        eachElement.classList.remove("cross") || 
        eachElement.classList.remove("circle") 
        return eachElement.addEventListener("click", handleClick, { once: true });
    });
}

startGame();

restartButton.addEventListener('click', startGame);