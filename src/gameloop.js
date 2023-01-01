const Ship = require("./ship");
const Gameboard = require("./gameboard");
const Player = require("./player");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");

function gameLoop() {

  const players = []

  const player = Player();

  const playerGameboard = player.createPlayer("Daniel");
  playerGameboard.placeShip(5, "1-1", "2-1", "horizontal","boat");
  playerGameboard.renderBoard()
  playerGameboard.addShipsToBoard()
  console.log(playerGameboard.ships)
  
  const computerGameboard = player.createComputerPlayer();
  computerGameboard.placeShip(5, "1-5", "2-5", "horizontal","boat");

  
}

module.exports = gameLoop;








/* 

playerGameboard.placeShip(5, "1-2", "3-2", "horizontal","patrol");
playerGameboard.placeShip(5, "1-3", "3-3", "horizontal","carrier");
playerGameboard.placeShip(5, "1-4", "4-4", "horizontal","submarine");

computerGameboard.placeShip(5, "1-6", "3-6", "horizontal","patrol");
computerGameboard.placeShip(5, "1-7", "3-7", "horizontal","carrier");
computerGameboard.placeShip(5, "1-8", "4-8", "horizontal","submarine");
 */