var currentGame = new Game('player1');
console.log(currentGame);

//1. What represent the data model?
  // player arrays - accessing player arrays
  // whatever we're storing in currentGame - updating the dataModel

//2. Am I updating the currentGame?
  // yes, on new Game?

//3. Currently, are we updating the dataModel?
  // updating DOM on image src, and innerHTML
  // currentGame is the dataModel that we're storing
  // update the dataModel first - move currentGame to the top.
    // currentGame is storing an instance of the game class.
      // then we can say that we are updating the data model but using the Game properties to render DOM elements


// QUERY SELECTORS
// Will need the following
//   - "all" game board buttons
var gameBtns = document.getElementById('gameBtns');
var title = document.getElementById('announcement');
var playerSpot = document.querySelectorAll('.btn');//may not need this
//   - player turn title
var turnDisplay = document.getElementById('turnDisplay');//may remove
//   - player turn image/icon/token
//   - winner display title
var winnerDisplay = document.getElementById('winnerDisplay');//may remove
//     - maybe winner image/icon/token, if can't use player turn img
//   - "it's a draw" display title
var tieDisplay = document.getElementById('tieDisplay');//may remove
//   - Player 1 win count
//   - Player 2 win count
var playerImage = document.getElementById('playerImage');
var dogWinCount = document.getElementById('dogWinCount');
var catWinCount = document.getElementById('catWinCount');
var winnerImage = document.getElementById('winnerImage');
//   - Start Over button
var startOver = document.getElementById('resetBtn');

//EVENT LISTENERS
// - Window onload
window.addEventListener('load', pageRefresh());
// window.addEventListener('load', function() {
//   updateScores(currentGame.player1);
//   updateScores(currentGame.player2);
// });
// - click on gameboard
gameBtns.addEventListener('click', makeAMove);
startOver.addEventListener('click', startOver);
// - click on new game button


//FUNCTIONS
//Game Board Display Player Function
function makeAMove(event) {
  if (typeof currentGame.table[event.target.id] === 'number') {
    markSpot(event.target.id);
    displayUser();
    checkForWin();
    checkTie();
    if (!currentGame.hasWinner && !currentGame.checkForTie()) {
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
console.log('winnerDetails -', winnerDetails.playerPiece);

console.log('winnerDetails.id -', winnerDetails.id);
console.log('[winnerDetails.id].totalWins -', currentGame[winnerDetails.id].totalWins);
console.log('winnerDetails.totalWins -', winnerDetails.totalWins);
};

function checkTie() {
  if (currentGame.checkForTie()) {
    title.innerHTML = `<p class="title">It's a tie! Play again.</p>`
    window.setTimeout(startNewGame, 3000);
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
  gameBtns.addEventListener('click', makeAMove);//can we do this with a toggle?
  displayUser();
  displayNextTurn();
};

function startOver() {
  currentGame.player1.totalWins = 0;
  currentGame.player1.saveWinsToStorage();
  currentGame.player2.totalWins = 0;
  currentGame.player2.saveWinsToStorage();
  pageRefresh();
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
