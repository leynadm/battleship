const Ship = require("./ship");
const Gameboard = require("./gameboard");
const Player = require("./player");
const {gameLoop,addBoardInteractivity} = require("./gameloop");
// const { gameLoop, createComputerPlayer } = require("./gameloop");


const playerBoard = gameLoop();

addBoardInteractivity(playerBoard.playerGameboard)
console.log(playerBoard.playerGameboard)

