let currentPlayer = "X";
let moveCount = 0;
let playerXScore = 0;
let playerOScore = 0;
let drawScore = 0;

function makeMove(cellIndex) {
  const cell = document.getElementsByClassName("cell")[cellIndex];
  if (cell.innerText === "") {
    cell.innerText = currentPlayer;
    moveCount++;
    updateMoveCount();
    checkWin();
    switchPlayer();
  }
}

function updateMoveCount() {
  const moveCountElement = document.getElementById("move-count");
  moveCountElement.innerText = moveCount;
}

function switchPlayer() {
  currentPlayer = currentPlayer === "X" ? "O" : "X";
  const currentPlayerElement = document.getElementById("current-player");
  currentPlayerElement.innerText = currentPlayer;
}

function checkWin() {
  const board = getBoard();
  const winningCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let combo of winningCombos) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      highlightWinningCombo(a, b, c);
      updateScore(board[a]);
      resetBoard();
      return;
    }
  }

  if (moveCount === 9) {
    updateDrawScore();
    resetBoard();
  }
}

function highlightWinningCombo(a, b, c) {
  const cells = document.getElementsByClassName("cell");
  cells[a].classList.add("winning-cell");
  cells[b].classList.add("winning-cell");
  cells[c].classList.add("winning-cell");
}

function updateScore(winner) {
  if (winner === "X") {
    playerXScore++;
    const playerXScoreElement = document.getElementById("player-x-score");
    playerXScoreElement.innerText = playerXScore;
  } else if (winner === "O") {
    playerOScore++;
    const playerOScoreElement = document.getElementById("player-o-score");
    playerOScoreElement.innerText = playerOScore;
  }
}

function updateDrawScore() {
  drawScore++;
  const drawScoreElement = document.getElementById("draw-score");
  drawScoreElement.innerText = drawScore;
}

function resetBoard() {
  const cells = document.getElementsByClassName("cell");
  for (let cell of cells) {
    cell.innerText = "";
    cell.classList.remove("winning-cell");
  }
  currentPlayer = "X";
  moveCount = 0;
  updateMoveCount();
}

function getBoard() {
  const cells = document.getElementsByClassName("cell");
  const board = [];
  for (let cell of cells) {
    board.push(cell.innerText);
  }
  return board;
}
