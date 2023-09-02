//tictactoe class
//Game logic
class Ttt {
  constructor() {
    //first player will be X;
    this.currentPlayer = "X";
    this.otherPlayer = "O";
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
      for(let col = 0; col < 3; col++) {
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
      this.otherPlayer = "O"
    } else {
      this.currentPlayer = "O";
      this.otherPlayer = "X"
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
let mainBoard;
let newGameButton;
let giveUpButton;

document.addEventListener('DOMContentLoaded', initiateGame);

function initiateGame() {
  mainBoard = document.querySelector("#container");
  mainBoard.addEventListener('click', fillTheSquare);

  newGameButton = document.querySelector("#new-game");
  newGameButton.disabled = true;
  newGameButton.addEventListener('click', createNewGame);

  giveUpButton = document.querySelector("#give-up");
  giveUpButton.addEventListener('click', giveUpGame);
}

//fill the square
function fillTheSquare(e) {
  if(e.target.matches('div') && !e.target.hasAttribute("src")) {
    playTheRound(e.target);
  }
}

//Each click will place 'O' or 'X' on the clicked empty square
function playTheRound(target) {
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
    newGameButton.disabled = false;
    giveUpButton.disabled = true;
  }

  //when all squares are filled, check if there is a winner or a tie
  if(game.emptySlots === 0) {
    if(game.winner) {
      endCurrentGame(`Winner: ${game.winner}`)
    } else {
      endCurrentGame(`Winner: None`)
    }
    newGameButton.disabled = false;
    giveUpButton.disabled = true;
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

//Helper func - ending the current game
function endCurrentGame(text) {
  mainBoard.removeEventListener('click', fillTheSquare);
  const h1 = document.querySelector('h1');
  h1.textContent = text;
  h1.style.visibility = "visible";
}

//create a new game
function createNewGame(e) {
  //prevent submitting when the button is clicked
  e.preventDefault();

  //do the following if the new game button is clickable
  if(e.target.disabled === false) {

    //after clicking it, disable it again
    e.target.disabled = true;

    //enable the give up button;
    giveUpButton.disabled = false;

    //remove status from previous game in h1 and hide it
    const h1 = document.querySelector('h1');
    h1.textContent = "HIDDEN";
    h1.style.visibility = "hidden";

    //reset game logic from game object
    game.grid = game.createGrid();
    game.winner = false;
    game.emptySlots = 9;
    game.currentPlayer = "X";

    //reset UI on the squares
    for(const square of mainBoard.children) {
      square.innerHTML = "";
    }

    //add the event listener again to the main board
    mainBoard.addEventListener('click', fillTheSquare);
  }
}

//Give up the game
function giveUpGame(e) {
  e.preventDefault();
  endCurrentGame(`Winner: ${game.otherPlayer}`)
  giveUpButton.disabled = true;
  newGameButton.disabled = false;
}
