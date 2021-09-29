var currentGame = new Game('player1');
console.log(currentGame);

var gameBtns = document.getElementById('gameBtns');
var title = document.getElementById('announcement');
var playerImage = document.getElementById('playerImage');
var dogWinCount = document.getElementById('dogWinCount');
var catWinCount = document.getElementById('catWinCount');
var winnerImage = document.getElementById('winnerImage');
var startOver = document.getElementById('resetBtn');

//EVENT LISTENERS
// - Window onload
window.addEventListener('load', pageRefresh);
gameBtns.addEventListener('click', makeAMove);
startOver.addEventListener('click', resetGame);

//FUNCTIONS
//Game Board Display Player Function
function makeAMove(event) {
  if (typeof currentGame.table[event.target.id] === 'number') {
    markSpot(event.target.id);
    displayUser();
    checkForWin();
    if (!currentGame.hasWinner && !currentGame.isTie) {
      switchTurns();
      displayNextTurn();
    } else {
      showTie();
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
  for (var property in currentGame.table) {
    var markButton = document.getElementById(property);

    if (currentGame.table[property] === 'player1') {
      markButton.innerHTML = '<img class="game-piece" src="assets/dog.png" alt="dog">';
    } else if (currentGame.table[property] === 'player2') {
      markButton.innerHTML = '<img class="game-piece" src="assets/cat.png" alt="cat">';
    } else {
      markButton.innerHTML = '';
    }
  }
};

function checkForWin() {
  var winner = currentGame.checkForWinner();
  if (winner) {
    currentGame.hasWinner = true;
    gameBtns.removeEventListener('click', makeAMove);//may update to disable
    addScore(winner);
    showWinner();
    showTie();
    updateScores(currentGame[winner]);
    window.setTimeout(startNewGame, 2500);
  }
};

function addScore(winner) {
  var wins = currentGame[winner].retrieveWinsFromStorage();
  currentGame[winner].totalWins = wins + 1;
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
  var score = document.getElementById(winnerDetails.playerPiece);
  if (winnerDetails.id === 'player1') {
    dogWinCount.innerText = currentGame[winnerDetails.id].totalWins;
  } else {
    catWinCount.innerText = currentGame[winnerDetails.id].totalWins;
  }
};

function showTie() {
  if (currentGame.isTie) {
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
  currentGame.resetGame();
  gameBtns.addEventListener('click', makeAMove);//renable buttons?
  displayUser();
  displayNextTurn();
};

function resetGame() {
  localStorage.clear();
  location.reload();
};

function pageRefresh() {
  updateScores(currentGame.player1);
  updateScores(currentGame.player2);
};



// -show & hide elements

function show(element) {
  element.classList.remove('hidden');
};

function hide(element) {
  element.classList.add('hidden');
};
