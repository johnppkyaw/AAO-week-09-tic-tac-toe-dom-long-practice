// Your code here

//tictactoe class
class Ttt {
  constructor() {
    this.currentPlayer = "O";
    this.grid = this.createGrid();
    this.emptySlots = 9;
    this.winner = false;
  }

  announce() {
    console.log('Current player:', this.currentPlayer);
  }

  createGrid() {
    const grid = [];
    for(let row = 0; row < 3; row++) {
      const currentRow = [];
      for(let col = 0; col< 3; col++) {
        currentRow.push(null);
      }
      grid.push(currentRow);
    }
    return grid;
  }

  makeAMove(row, col) {
    this.grid[row][col] = this.currentPlayer;
    this.emptySlots--;
    this.changePlayer();
  }

  changePlayer() {
    if(this.currentPlayer === "O") {
      this.currentPlayer = "X";
    } else {
      this.currentPlayer = "O";
    }
    return `It's now player ${this.currentPlayer}'s turn.`;
  }

  checkWinner() {
    const horizontalOWin = this.checkHorizontalWin('O');
    const horizontalXWin = this.checkHorizontalWin('X');
    const verticalOWin = this.checkVerticalWin('O');
    const verticalXWin = this.checkVerticalWin('X');

    const winnerO = horizontalOWin || verticalOWin;
    const winnerX = horizontalXWin || verticalXWin;





    //const diagonalWin = this.grid.some(diagonal);
    if(winnerO) {
      return 'O';
    } else if (winnerX) {
      return 'X';
    } else {
      return false;
    }
  }

  checkHorizontalWin(player) {
    return this.grid.some(row => row.every(element => element === player))
  }

  checkVerticalWin(player) {
    for (let col = 0; col < this.grid.length; col++) {
      const currentColumn = []
      for (let row = 0; row < 3; row++) {
        currentColumn.push(this.grid[row][col]);
      }
      if (currentColumn.every(element => element === player)) {
        return true;
      }
    }
    return false;
  }
}

//Testing
const game = new Ttt();
console.log(game.emptySlots);
console.log(game.grid);
game.announce();
game.makeAMove(0, 0);
game.makeAMove(0, 1);
game.makeAMove(1, 0);
game.makeAMove(2, 1);
game.makeAMove(2, 0);
console.log(game.grid);
console.log(game.checkWinner());
game.announce();




//window addeventlistener domloaded
  //container addeventlistener click
     //if current location is not null
       //currentplayer
       //get the div clicked
       //add img src based on current player
       //check winner or tie
         //if not, switch player
