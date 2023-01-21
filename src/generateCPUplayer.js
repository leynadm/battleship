const Player = require("./player");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");

function generateCPUPlayer(board) {
  const player = Player();

  const myDOM = getDOMElements();
  const myDOMFunc = myDOMFunctions();

  // Generate the computer ships
  const computerGameboard = player.createComputerPlayer("Computer");
  computerGameboard.generateComputerShipsCoordinates();
  computerGameboard.addShipsToBoard();

  // render the other board
  myDOMFunc.renderBoard(myDOM.secondPlayerBoard);
  myDOMFunc.addListeners(computerGameboard.receiveAttack, board.computerAttack);
}

module.exports = generateCPUPlayer