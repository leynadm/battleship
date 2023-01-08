const Ship = require("./ship");
const Gameboard = require("./gameboard");
const Player = require("./player");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");

function gameLoop() {
  const players = [];

  const player = Player();

  // Create the human player object and place his ships
  const playerGameboard = player.createPlayer("Daniel");
  playerGameboard.placeShip(5, 0, 40, "horizontal", "destroyer");
  playerGameboard.placeShip(3, 2, 4, "vertical", "carrier");
  playerGameboard.placeShip(4, 22, 52, "horizontal", "submarine");
  playerGameboard.placeShip(2, 57, 58, "vertical", "boat");

  const myDOM = getDOMElements();
  const myDOMFunc = myDOMFunctions();

  // Generate the human player board
  myDOMFunc.renderBoard(myDOM.firstPlayerBoard);
  playerGameboard.addShipsToBoard();
  myDOMFunc.renderShipsOnBoard(playerGameboard.shipSquares);

  // Generate the computer ships
  const computerGameboard = player.createComputerPlayer();
  computerGameboard.generateComputerShipsCoordinates();
  computerGameboard.addShipsToBoard();

  // render the other board
  myDOMFunc.renderBoard(myDOM.secondPlayerBoard);
  myDOMFunc.addEventListeners(computerGameboard.receiveAttack)
  
}

module.exports = gameLoop;
