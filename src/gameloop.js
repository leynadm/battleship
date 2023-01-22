const Player = require("./player");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");
const dragAndDrop = require("./dragAndDrop");

function gameLoop() {

  const player = Player();

  // Create the human player object and place his ships
  const playerGameboard = player.createPlayer("User");

  const myDOM = getDOMElements();
  const myDOMFunc = myDOMFunctions();

  myDOMFunc.addMenuFunctions()
  myDOMFunc.prepareGame()
  
  // Generate the human player board
  myDOMFunc.renderBoard(myDOM.firstPlayerBoard);
  // myDOMFunc.positionPlayerFleet()
  myDOMFunc.addShipButtonsFunctions()
 
  return {
    playerGameboard
  }

}

function addBoardInteractivity(board){
  dragAndDrop(board)
}
 
module.exports = {
  gameLoop,
  addBoardInteractivity
};

 
 
