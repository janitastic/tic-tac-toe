class Player {
  constructor(id, playerPiece) {
    this.id = id;
    this.playerPiece = playerPiece;
    this.totalWins = localStorage.getItem(this.id) || 0;
    this.plays = [];
    this.isWinner = false;
  }

  saveWinsToStorage() {
    var storedWins = JSON.stringify(this.totalWins);
    localStorage.setItem(`${this.id}`, storedWins);
  }

  retrieveWinsFromStorage() {
    var retrievedWins = JSON.parse(localStorage.getItem(`${this.id}`));
    return retrievedWins;
  }
};
