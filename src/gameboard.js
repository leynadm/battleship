const Ship = require("./ship");

function Gameboard(playerName) {
  
  const ships = [];
  const missedAttacks = [];

  function placeShip(length, x, y, shipOrientation) {
    const ship = Ship(length, x, y, shipOrientation);
    ships.push(ship);
  }

  function receiveAttack(x, y) {
    ships.forEach((element) => {
      if (x >= element.x && x <= element.y) {
        element.hit();
        element.isSunk();
        return element;
      }
      missedAttacks.push(`${x},${y}`);

      if (element.sunk) {
        // remove item from the array
      }
    });
  }

  function checkFleetStatus(){

  }

  return {
    playerName,
    ships,
    placeShip,
    receiveAttack,
  };
}

module.exports = Gameboard;
