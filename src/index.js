const { gameLoop, addBoardInteractivity } = require("./gameloop");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");

function startGame() {
  const playerBoard = gameLoop();
  addBoardInteractivity(playerBoard.playerGameboard);
}

startGame();

module.exports = startGame;
