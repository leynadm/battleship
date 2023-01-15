const Player = require("./player");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");
const utilityFunctions = require("./utilityFunctions");

function gameLoop() {

  const player = Player();

  // Create the human player object and place his ships
  const playerGameboard = player.createPlayer("User");

  const myDOM = getDOMElements();
  const myDOMFunc = myDOMFunctions();


  // Generate the human player board
  myDOMFunc.renderBoard(myDOM.firstPlayerBoard);
  // myDOMFunc.positionPlayerFleet()
  utilityFunctions(playerGameboard)

  // Generate the computer ships
  const computerGameboard = player.createComputerPlayer("Computer");
  computerGameboard.generateComputerShipsCoordinates();
  computerGameboard.addShipsToBoard();

  // render the other board
  myDOMFunc.renderBoard(myDOM.secondPlayerBoard);
  myDOMFunc.addListeners(
    computerGameboard.receiveAttack,
    playerGameboard.computerAttack
  );


}

 module.exports = gameLoop

/*  
module.exports = {
  gameLoop,
  createComputerPlayer,
};
 */
 
 
