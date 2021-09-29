class Game {
  constructor(firstPlayer) {
    this.player1 = new Player ('player1', 'dog');
    this.player2 = new Player ('player2', 'cat');
    this.movesMade = 0;
    this.hasWinner = false;
    this.playerTurn = firstPlayer;
    this.isTie = false;
    // this.board = [1,2,3,4,5,6,7,8,9];
    this.table = {
      spotOne: 1,
      spotTwo: 2,
      spotThree: 3,
      spotFour: 4,
      spotFive: 5,
      spotSix: 6,
      spotSeven: 7,
      spotEight: 8,
      spotNine: 9
    }
  }

  checkForWinner() {
    var button = this.table;
    var winner = '';

    if (button.spotOne === button.spotTwo && button.spotOne === button.spotThree) {
      winner = button.spotOne;
    }
    if (button.spotFour === button.spotFive && button.spotFour === button.spotSix) {
      winner = button.spotFour;
    }
    if (button.spotSeven === button.spotEight && button.spotSeven === button.spotNine) {
      winner = button.spotSeven;
    }
    if (button.spotOne === button.spotFour && button.spotOne === button.spotSeven) {
      winner = button.spotOne;
    }
    if (button.spotTwo === button.spotFive && button.spotTwo === button.spotEight) {
      winner = button.spotTwo;
    }
    if (button.spotThree === button.spotSix && button.spotThree === button.spotNine) {
      winner = button.spotThree;
    }
    if (button.spotThree === button.spotFive && button.spotThree === button.spotSeven) {
      winner = button.spotThree;
    }
    if (button.spotOne === button.spotFive && button.spotOne === button.spotNine) {
      winner = button.spotOne;
    }
    return winner;
  }

  // checkForWinner() {
  //   var winner = ``;
  //   var winningPlays = [//refactor later
  //     [1, 4, 7],//0
  //     [2, 5, 8],//1
  //     [3, 6, 9],//2
  //     [1, 2, 3],//3
  //     [4, 5, 6],//4
  //     [7, 8, 9],//5
  //     [1, 5, 9],//6
  //     [3, 5, 7]//7
  //   ];
  // }

  checkForTie() {
    if (!this.hasWinner && this.movesMade === 9) {
      this.isTie = true;
    }
    return;
  }

  resetGame() {
    if (this.playerTurn === 'player1') {
      currentGame = new Game('player2');
    } else {
      currentGame = new Game('player1');
    }
  }
};


/*
Additionally file should include -
- A way to keep track of the data for game gameboard
- A way to keep track of the Game's board data for win conditions
- A way to check the Game's board data for win conditions
- A way to detect when a game is a draw (no one has won)
- A way to reset the Game's board to begin a new game
*/
