const Gameboard = require("./gameboard");

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
