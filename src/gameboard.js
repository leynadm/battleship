const Ship = require("./ship");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");

/* Factory function to create a gameboard */
function Gameboard(playerName) {
  const ships = [];
  const missedAttacks = [];

  function placeShip(length, x, y, shipOrientation, shipType) {
    const ship = Ship(length, x, y, shipOrientation, shipType);
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

  function renderBoard() {
    const myDOM = getDOMElements();
    console.log(myDOM);
    let xCoordinate = 1;

    for (let index = 1; index <= 10; index++) {
      let yCoordinate = 1;

      for (let index = 1; index <= 10; index++) {
        const divCoordinate = document.createElement("div");
        divCoordinate.classList.add(
          "div-coordinate",
          `div-coordinate-${xCoordinate}-${yCoordinate}`
        );
        divCoordinate.setAttribute(
          "div-coordinate",
          `${yCoordinate}-${xCoordinate}`
        );
        divCoordinate.textContent = `"${yCoordinate}-${xCoordinate}"`;
        myDOM.firstPlayerBoard.appendChild(divCoordinate);

        yCoordinate += 1;
      }
      xCoordinate += 1;
    }
  }

  function addShipsToBoard() {
    const myDOM = getDOMElements();

    myDOM.divCoordinates.forEach((divCoordinateCell) => {
      const coordinateValue = divCoordinateCell.getAttribute("div-coordinate");

      ships.forEach((element) => {
        const shipCoordinateValue = element.x;

        if (coordinateValue == shipCoordinateValue) {
          divCoordinateCell.classList.add("ship-square");
        }
      });
    });
  }

  function checkFleetStatus() {}

  return {
    playerName,
    ships,
    placeShip,
    receiveAttack,
    renderBoard,
    addShipsToBoard,
  };
}

module.exports = Gameboard;
