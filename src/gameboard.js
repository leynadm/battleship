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

  function renderBoard(playerBoard) {
    console.log(playerBoard);

    const myDOM = getDOMElements();

    let xCoordinate = 0;

    for (let index = 0; index < 10; index++) {
      let yCoordinate = 0;

      for (let index = 0; index < 10; index++) {
        const divCoordinate = document.createElement("div");
        divCoordinate.classList.add(
          "div-coordinate",
          `div-coordinate-${xCoordinate}${yCoordinate}`
        );
        divCoordinate.setAttribute(
          "div-coordinate",
          `${yCoordinate}${xCoordinate}`
        );

        divCoordinate.textContent = `"${yCoordinate}${xCoordinate}"`;
        playerBoard.appendChild(divCoordinate);

        yCoordinate += 1;
      }
      xCoordinate += 1;
    }
  }

  function addShipsToBoard() {
    const myDOM = getDOMElements();

    const shipSquares = [];

    ships.forEach((element) => {
      // Match the coordinates being looped (1-100) with the ones in the ships
      const shipCoordinateValueX = element.x;
      const shipCoordinateValueY = element.y;

      const coordinateIntegerX = Number(shipCoordinateValueX);
      const coordinateIntegerY = Number(shipCoordinateValueY);

      if (element.shipOrientation === "horizontal") {
        for (
          let indexHorizontal = coordinateIntegerX;
          indexHorizontal <= coordinateIntegerY;
          indexHorizontal += 10
        ) {

            shipSquares.push(indexHorizontal)

        }
      } else {
        for (
          let indexVertical = coordinateIntegerX;
          indexVertical <= coordinateIntegerY;
          indexVertical++
        ) {
          shipSquares.push(indexVertical)
        }
      }


      console.log(shipSquares)

    myDOM.divCoordinates.forEach((divCoordinateCell) => {
      // Get the coordinate value on the board
      const coordinateValue = Number(divCoordinateCell.getAttribute("div-coordinate"));

      shipSquares.forEach(element => {
        if(element === coordinateValue){

          divCoordinateCell.classList.add('ship-square')
        }
      });  
      

      });
    });
  }

  function generateComputerShips() {}

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
