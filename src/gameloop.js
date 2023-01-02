const Ship = require("./ship");
const Gameboard = require("./gameboard");
const Player = require("./player");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");

function gameLoop() {

  const players = []

  /* The gameloop has the following logic:
  
  1. Start game
  2. Render both boards of the players ✓
  3. Place 4 ships ✓
  4. Render the board with the ships ✓
  5. Generate CPU ships ✓
  6. Click on enemy board in order to hit it
  7. Add an event listener "on click" on the enemy board
  8. When clicking on the enemy board run "Receive attack function"
    
  */
  const player = Player();

  
  const playerGameboard = player.createPlayer("Daniel");
  playerGameboard.placeShip(5, "00", "40", "horizontal","boat");
  playerGameboard.placeShip(3, "02", "04", "vertical","boat");
  playerGameboard.placeShip(4, "22", "52", "horizontal","boat");
  playerGameboard.placeShip(3, "57", "58", "vertical","boat");
  
  const myDOM = getDOMElements()
  console.log(myDOM)
 
  // Generate the two boards
  playerGameboard.renderBoard(myDOM.firstPlayerBoard)

  playerGameboard.addShipsToBoard()
  console.log(playerGameboard.ships)
  
  const computerGameboard = player.createComputerPlayer();
  // computerGameboard.placeShip(5, "1-5", "2-5", "horizontal","boat");

  computerGameboard.renderBoard(myDOM.secondPlayerBoard)

  players.forEach(element => {
    
  });
  
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