var currentGame = new Game('player1');

var gameBtns = document.getElementById('gameBtns');
var title = document.getElementById('announcement');
var playerImage = document.getElementById('playerImage');
var dogWinCount = document.getElementById('dogWinCount');
var catWinCount = document.getElementById('catWinCount');
var winnerImage = document.getElementById('winnerImage');
var startOver = document.getElementById('resetBtn');

//EVENT LISTENERS
window.addEventListener('load', pageRefresh);
gameBtns.addEventListener('click', makeAMove);
startOver.addEventListener('click', resetGame);

//FUNCTIONS
function makeAMove(event) {
  if (typeof currentGame.table[event.target.id] === 'number') {
    markSpot(event.target.id);
    displayUser();
    checkForWin();
    if (!currentGame.hasWinner && !currentGame.isTie) {
      switchTurns();
      displayNextTurn();
    }
  }
};

function markSpot(buttonId) {
  if (typeof currentGame.table[buttonId] === 'number') {
    currentGame.table[buttonId] = currentGame.playerTurn;
    currentGame.movesMade++;
  }
};

function displayUser() {
  for (var spot in currentGame.table) {
    var markButton = document.getElementById(spot);
    if (currentGame.table[spot] === 'player1') {
      markButton.innerHTML = '<img class="game-piece" src="assets/dog.png" alt="dog">';
    } else if (currentGame.table[spot] === 'player2') {
      markButton.innerHTML = '<img class="game-piece" src="assets/cat.png" alt="cat">';
    } else {
      markButton.innerHTML = '';
    }
  }
};

function pageRefresh() {
  updateScores(currentGame.player1);
  updateScores(currentGame.player2);
};

function resetGame() {
  localStorage.clear();
  location.reload();
};

function checkForWin() {
  var winner = currentGame.checkForWinner();
  if (winner) {
    currentGame.hasWinner = true;
    gameBtns.removeEventListener('click', makeAMove);
    addScore(winner);
    showWinner();
    updateScores(currentGame[winner]);
    window.setTimeout(startNewGame, 2500);
  } else if (!currentGame.hasWinner && currentGame.movesMade === 9) {
    title.innerHTML = `<p class="title">It's a tie! Play again.</p>`;
    window.setTimeout(startNewGame, 2500);
  }
};

function switchTurns() {
  if (currentGame.playerTurn === 'player1') {
    currentGame.playerTurn = 'player2';
  } else {
    currentGame.playerTurn = 'player1';
  }
};

function addScore(winner) {
  var accumulatedWins = currentGame[winner].retrieveWinsFromStorage();
  currentGame[winner].totalWins = accumulatedWins + 1;
  currentGame[winner].saveWinsToStorage();
};

function showWinner() {
  if (currentGame.playerTurn === 'player1') {
    title.innerHTML = `<img class="small-image" id="winnerImage" src="assets/dog.png" alt="dog">
    <p class="title">Wins!</p>`;
  } else {
    title.innerHTML = `<img class="small-image" id="winnerImage" src="assets/cat.png" alt="cat">
    <p class="title">Wins!</p>`;
  }
};

function updateScores(winnerDetails) {
  if (winnerDetails.id === 'player1') {
    dogWinCount.innerText = currentGame[winnerDetails.id].totalWins;
  } else {
    catWinCount.innerText = currentGame[winnerDetails.id].totalWins;
  }
};

function displayNextTurn() {
  if (currentGame.playerTurn === 'player1') {
    title.innerHTML = `<img class="small-image" id="playerImage" src="assets/dog.png" alt="dog">
    <p class="title">  's Turn</p>`;
  } else {
    title.innerHTML = `<img class="small-image" id="playerImage" src="assets/cat.png" alt="cat">
    <p class="title">  's Turn</p>`;
  }
};

function startNewGame() {
  currentGame.switchPlayers();
  gameBtns.addEventListener('click', makeAMove);
  displayUser();
  displayNextTurn();
};
