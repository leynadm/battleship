const Ship = require("./ship");
const Gameboard = require("./gameboard");
const Player = require("./player");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");

function gameLoop() {
  const players = [];

  const player = Player();

  // Create the human player object and place his ships
  const playerGameboard = player.createPlayer("Daniel");
  playerGameboard.placeShip(5, "00", "40", "horizontal", "boat");
  playerGameboard.placeShip(3, "02", "04", "vertical", "boat");
  playerGameboard.placeShip(4, "22", "52", "horizontal", "boat");
  playerGameboard.placeShip(2, "57", "58", "vertical", "boat");

  const myDOM = getDOMElements();
  const myDOMFunc = myDOMFunctions();

  // Generate the human player board
  myDOMFunc.renderBoard(myDOM.firstPlayerBoard);
  playerGameboard.addShipsToBoard();
  const shipSq = playerGameboard.shipSquares;
  myDOMFunc.renderShipsOnBoard(shipSq);

  /* 
  const computerGameboard = player.createComputerPlayer();
  computerGameboard.generateComputerShipsCoordinates(5);
  console.log(computerGameboard.ships);
  computerGameboard.renderBoard(myDOM.secondPlayerBoard);

  players.forEach((element) => {});
 */
}

module.exports = gameLoop;
