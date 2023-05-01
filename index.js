const tiles = Array.from(document.querySelectorAll(".tile"));
const playerDisplay = document.querySelector(".display-player");
const resetButton = document.querySelector("#reset");
const announcer = document.querySelector(".announcer");

const PLAYER_X = "X";
const PLAYER_O = "O";
const WINNING_OPTIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let isPlayerXMove = true;
let gameActive = true;
let counterX = 1;
let counterY = 1;
let tieCountX = 0;
let tieCountO = 0;

tiles.forEach((tile, index) => {
  tile.addEventListener("click", () => userAction(tile, index));
});

resetButton.addEventListener("click", resetBoard);

function resetBoard() {
  window.location.reload();
}

/// START CODE GAME
//-------------------------------------------------------------------------------

function handleChangePlayer(tile) {
  console.log(tile);
  if (isPlayerXMove) {
    tile.innerHTML = PLAYER_X;
    tile.disabled = true;
    tieCountX = tieCountX + 1;
    playerDisplay.innerHTML = PLAYER_O;
    isPlayerXMove = false;
  } else {
    tile.innerHTML = PLAYER_O;
    tile.disabled = true;
    tieCountO = tieCountO + 1;
    playerDisplay.innerHTML = PLAYER_X;
    isPlayerXMove = true;
    tile.classList.add("o");
  }
}

function validate(tile) {
  if (tile.innerHTML !== "") {
    alert("Hey, please choose another field");
  } else {
    handleChangePlayer(tile);
  }
}

function checkWin(player) {
  for (const [a, b, c] of WINNING_OPTIONS) {
    if (
      tiles[a].innerHTML === player &&
      tiles[b].innerHTML === player &&
      tiles[c].innerHTML === player
    ) {
      tiles[a].classList.add("tilebackground");
      tiles[b].classList.add("tilebackground");
      tiles[c].classList.add("tilebackground");
      return true;
    }
  }
  return false;
}

function handleWin() {
  return checkWin(PLAYER_X) || checkWin(PLAYER_O);
}

function showMessage(hasWon) {
  if (hasWon) {
    announcer.classList.add("output");
    announcer.innerHTML = "Congratulations, you won ✌️";
  } else {
    if (
      (tieCountO === 5 && tieCountX === 4) ||
      (tieCountO === 4 && tieCountX === 5)
    ) {
      announcer.classList.add("output");
      announcer.innerHTML =
        "Hey it's a tie, click the reset button and try it again 😉";
    }
  }
}

function handleGame(tile) {
  validate(tile);

  let hasWon = handleWin();

  showMessage(hasWon);
}

function userAction(tile, index) {
  handleGame(tile);
}
