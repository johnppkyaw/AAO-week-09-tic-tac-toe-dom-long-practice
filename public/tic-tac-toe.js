//tictactoe class
//Game logic
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

    const diagonalXWin = this.checkDiagonalWin('X');
    const diagonalOWin = this.checkDiagonalWin('O');

    const winnerX = horizontalXWin || verticalXWin || diagonalXWin;
    const winnerO = horizontalOWin || verticalOWin || diagonalOWin;
    console.log(winnerX);
    console.log(winnerO);

    if(winnerX) {
      this.winner = 'X';
    } else if (winnerO) {
      this.winner = 'O';
    } else {
      return;
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

  //Check for a win in a diagonal
  checkDiagonalWin(player) {
    const leftDown = [];
    const leftUp = [];
    for (let row = 0; row < this.grid.length; row++) {
      for (let col = 0; col < this.grid[row].length; col++) {
        if (col === row) {
          leftDown.push(this.grid[row][col]);
          if(row === 1) {
            leftUp.push(this.grid[row][col]);
          }
        }
        if (Math.abs(row - col) === 2) {
          leftUp.push(this.grid[row][col]);
        }
      }
    }
    return leftDown.every(element => element === player) || leftUp.every(element => element === player);
  }
}

const game = new Ttt();

//Testing
// console.log(game.grid);
// game.makeAMove(0, 0);
// game.makeAMove(0, 1);
// game.makeAMove(1, 1);
// game.makeAMove(2, 1);
// game.makeAMove(2, 2);
// console.log(game.grid);
// console.log(game.checkWinner());


//UI manipulation
//window addeventlistener domloaded
document.addEventListener('DOMContentLoaded', initiateGame);

function initiateGame() {
  const mainBoard = document.querySelector("#container");
  mainBoard.addEventListener('click', playTheRound);
}

//Each click will place 'O' or 'X' on the clicked empty square
function playTheRound(e) {
  const target = e.target;
  if (!target.hasAttribute("src")) {
    const currentPlayer = game.currentPlayer;
    target.innerHTML = markXOrO(currentPlayer);

    //updates the game grid based on the square location
    const squareNumber = Number(target.getAttribute("id").split('-')[1]);
    const row = findRow(squareNumber);
    const col = findCol(squareNumber);
    game.makeAMove(row, col);

    //check if there is a winner;
    game.checkWinner();
    if(game.winner) {
      endCurrentGame(`Winner: ${game.winner}`)
    }

    //when all squares are filled, check if there is a winner or a tie
    if(game.emptySlots === 0) {
      if(game.winner) {
        endCurrentGame(`Winner ${game.winner}`)
      } else {
        endCurrentGame(`Winner: None`)
      }
    }
  }
}

//Helper func that assigns O or X image based on who the current player is
function markXOrO(player) {
  if (player === "O") {
    return `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-o.svg">`
  } else {
    return `<img src="https://assets.aaonline.io/Module-DOM-API/formative-project-tic-tac-toe/player-x.svg">`
  }
}

//Helper func - Get row # based on the square #
function findRow(number) {
  if (number < 3) {
    return 0;
  }
  if (number >= 3 & number < 6) {
    return 1;
  }
  return 2;
}

//Helper func - Get col # based on the square #
function findCol(number) {
  if (number < 3) {
    return (number - 2) + 2;
  }
  if (number >= 3 & number < 6) {
    return (number - 5) + 2;
  }
  return (number - 8) + 2;
}

function endCurrentGame(text) {
  const mainBoard = document.querySelector("#container");mainBoard.removeEventListener('click', playTheRound);
  const h1 = document.querySelector('h1');
  h1.textContent = text;
  h1.style.visibility = "visible";
}
