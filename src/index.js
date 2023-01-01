const Ship = require("./ship");
const Gameboard = require("./gameboard");
const Player = require("./player");
const getDOMElements = require("./DOM-interaction")
const gameLoop = require("./gameloop")

function createBoard() {

  let xCoordinate = 1;

  for (let index = 1; index <= 10; index++) {

    let yCoordinate = 1;

    for (let index = 1; index <= 10; index++) {

      const divCoordinate = document.createElement("div");
      divCoordinate.classList.add('div-coordinate',`div-coordinate-${xCoordinate}-${yCoordinate}`);
      divCoordinate.textContent = `${  yCoordinate  }-${  xCoordinate}`
      first_player_board.appendChild(divCoordinate);
    
      yCoordinate += 1;
    
    }
    xCoordinate += 1;
  
  }
}

let first_player_board = document.querySelector(".first-player-board");

gameLoop()

// createBoard();
