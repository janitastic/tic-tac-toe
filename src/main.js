var currentGame = new Game();

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
var playerSpot = document.querySelectorAll('.btn');//may not need this
//   - player turn title
var turnDisplay = document.getElementById('turnDisplay');
//   - player turn image/icon/token
//   - winner display title
var winnerDisplay = document.getElementById('winnerDisplay');
//     - maybe winner image/icon/token, if can't use player turn img
//   - "it's a draw" display title
var tieDisplay = document.getElementById('tieDisplay');
//   - Player 1 win count
//   - Player 2 win count
//   - Start Over button
var startOver = document.getElementById('resetBtn');

//EVENT LISTENERS
// - Window onload
// - click on gameboard
gameBtns.addEventListener('click', makeAMove);
startOver.addEventListener('click', resetGame);
// - click on new game button


//FUNCTIONS
//Game Board Display Player Function

function makeAMove(event) {
  for (var i = 0; i < playerSpot.length; i++) {
    // if ()
    playerSpot[i].innerHTML = `<img class="game-dog" src="assets/dog.png" alt="dog">`;
    playerSpot[i].disabled = true;
    show(turnDisplay);
    hide(winnerDisplay);
    hide(tieDisplay);
  }
}


function resetGame() {
  for (var i = 0; i < playerSpot.length; i++) {
    playerSpot[i].innerHTML = '';
    playerSpot[i].disabled = false;
  }
  currentGame.player1.wins = 0;
  currentGame.player2.wins = 0;
}

// -show & hide elements

function show(element) {
  element.classList.remove('hidden');
}

function hide(element) {
  element.classList.add('hidden');
}
