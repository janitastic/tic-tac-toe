class Game {
  constructor() {
    this.player1 = new Player('player1', 'dog');
    this.player2 = new Player('player2', 'cat');
    this.isWinner = false;
    this.wins = [];
  }

  checkWinningPlays(currentPlayer) {
    var winningPlays = [
      [1, 4, 7],//0
      [2, 5, 8],//1
      [3, 6, 9],//2
      [1, 2, 3],//3
      [4, 5, 6],//4
      [7, 8, 9],//5
      [1, 5, 9],//6
      [3, 5, 7]//7
    ];
    for (var i = 0; i < winningPlays.length; i++) {
      if (currentPlayer.plays.includes(winningPlays[i][0]) && currentPlayer.plays.includes(winningPlays[i][1]) && currentPlayer.plays.includes(winningPlays[i][2])) {
        currentPlayer.isWinner = true;
        currentPlayer.wins++;
        this.isWinner = true;
      }
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
