const {gameLoop,addBoardInteractivity} = require("./gameloop");

function startGame(){

    const playerBoard = gameLoop();

    addBoardInteractivity(playerBoard.playerGameboard)

}

startGame()

module.exports = startGame;




