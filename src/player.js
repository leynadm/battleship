const Gameboard = require("./gameboard");

/* Factory function to create a player, which in turns creates a gameboard
using the imported Gameboard factory function */

function Player() {

  function createComputerPlayer() {
    const computerGameboard = Gameboard("Computer");
    return computerGameboard
  }

  function createPlayer(playerName) {
    const playerGameboard = Gameboard(playerName);
    return playerGameboard
  }
  
    return{
      createComputerPlayer,
      createPlayer
    }
}

module.exports = Player;
