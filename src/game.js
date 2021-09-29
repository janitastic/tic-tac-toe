class Game {
  constructor(firstPlayer) {
    this.player1 = new Player ('player1', 'dog');
    this.player2 = new Player ('player2', 'cat');
    this.movesMade = 0;
    this.hasWinner = false;
    this.playerTurn = firstPlayer;
    this.isTie = false;
    this.table = {spotOne: 1, spotTwo: 2, spotThree: 3, spotFour: 4, spotFive: 5, spotSix: 6, spotSeven: 7, spotEight: 8, spotNine: 9}
  };

  switchPlayers() {
    if (this.playerTurn === 'player1') {
      currentGame = new Game('player2');
    } else {
      currentGame = new Game('player1');
    }
  }

  checkForWinner() {
    var winner = '';
    var button = this.table;

    if (button.spotOne === button.spotTwo && button.spotOne === button.spotThree) {
      winner = button.spotOne;
    }
    if (button.spotOne === button.spotFive && button.spotOne === button.spotNine) {
      winner = button.spotOne;
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
    if (button.spotFour === button.spotFive && button.spotFour === button.spotSix) {
      winner = button.spotFour;
    }
    if (button.spotSeven === button.spotEight && button.spotSeven === button.spotNine) {
      winner = button.spotSeven;
    }
    return winner;
  }

  checkForTie() {
    if (!this.hasWinner && this.movesMade === 9) {
      this.isTie = true;
    }
    return;
  }
};
