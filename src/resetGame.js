const { gameLoop, addBoardInteractivity } = require("./gameloop");

function resetGame() {
 
    function startGame(){

        const playerBoard = gameLoop();
        addBoardInteractivity(playerBoard.playerGameboard);
    }

    startGame()
}

module.exports = resetGame

