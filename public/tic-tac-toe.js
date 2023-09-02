// Your code here

//tictactoe class
class Ttt {
  constructor() {
    //first player will be X;
    this.currentPlayer = "X";
    this.grid = this.createGrid();
    this.emptySlots = 9;
    this.winner = false;
  }

  announce() {
    console.log('Current player:', this.currentPlayer);
    return;
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
    const horizontalXWin = this.checkHorizontalWin('X');
    const horizontalOWin = this.checkHorizontalWin('O');

    const verticalXWin = this.checkVerticalWin('X');
    const verticalOWin = this.checkVerticalWin('O');

    const winnerX = horizontalXWin || verticalXWin;
    const winnerO = horizontalOWin || verticalOWin;

    //const diagonalWin = this.grid.some(diagonal);
    if(winnerX) {
      return 'X';
    } else if (winnerO) {
      return 'O';
    } else {
      return false;
    }
  }

  //Check for a win in any of the rows
  checkHorizontalWin(player) {
    return this.grid.some(row => row.every(element => element === player))
  }

  //Check for a win in any of the columns
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

// console.log(game.grid);
// game.makeAMove(0, 0);
// game.makeAMove(0, 1);
// game.makeAMove(1, 0);
// game.makeAMove(2, 1);
// game.makeAMove(2, 0);
// console.log(game.grid);
// console.log(game.checkWinner());





//window addeventlistener domloaded
document.addEventListener('DOMContentLoaded', initiateGame);

function initiateGame() {
  const mainBoard = document.querySelector("#container");
  mainBoard.addEventListener('click', (e) => {
    const target = e.target;
    if (!target.hasAttribute("src")) {
      const currentPlayer = game.currentPlayer;
      e.target.innerHTML = markXOrO(currentPlayer);
      game.changePlayer();
    }
  });
}

//Each click will place 'O' or 'X' on the clicked empty square
// function playTheRound(e) {
//   if (e.target.children.length === 0) {
//     const currentPlayer = game.currentPlayer;
//     e.target.innerHTML = markXOrO(currentPlayer);
//     console.log('here')
//     // game.changePlayer(); //change later
//   } else {
//     console.log('already has children')
//   }
// }

function markXOrO(player) {
  if (player === "O") {
    return `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg">`
  } else {
    return `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg">`
  }
}


  //container addeventlistener click
     //if current location is not null
       //currentplayer
       //get the div clicked
       //add img src based on current player
       //check winner or tie
         //if not, switch player
