const boardEl = document.querySelector(".board");
const cellsEl = [...document.querySelectorAll(".cell")];
const gameStatusEl = document.querySelector(".game-status");

const CLASS_X = "x";
const CLASS_CIRCLE = "circle";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [0, 4, 8],
];

const xPositions = [];

cellsEl.forEach((cell) =>
  cell.addEventListener("click", handleClick, { once: true })
);

function handleClick(e) {
  const currentXCell = e.target;

  updateCell(currentXCell, CLASS_X);

  xPositions.push(cellsEl.indexOf(currentXCell));

  const xWins = checkWin(CLASS_X);

  xWins ? showGameModal(`won`) : addO();
}

function addO() {
  const position = getOPositon();

  const currentOCell = cellsEl[position];

  if (currentOCell) {
    updateCell(currentOCell, CLASS_CIRCLE);
    currentOCell.removeEventListener("click", handleClick);
    const oWins = checkWin(CLASS_CIRCLE);

    if (oWins) showGameModal(`lost`);
  }
}

function updateCell(cell, currentClass) {
  cell.classList.add(currentClass);
}
