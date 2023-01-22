const {gameLoop,addBoardInteractivity} = require("./gameloop");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");

function startGame(){

    const playerBoard = gameLoop();

    addBoardInteractivity(playerBoard.playerGameboard)

}

function prepareGame(callback){
    
    const myDOM = getDOMElements()


}

startGame()

module.exports = startGame;




