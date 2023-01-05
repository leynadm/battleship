const { indexOf } = require("lodash");
const Ship = require("./ship");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");

/* Factory function to create a gameboard */
function Gameboard(playerName) {
  const ships = [];
  const missedAttacks = [];
  const shipSquares = [];
  const successfulAttacks = [];

  function placeShip(length, x, y, shipOrientation, shipType) {
    const ship = Ship(length, x, y, shipOrientation, shipType);
    ships.push(ship);
  }

  function receiveAttack(x, y) {
    const shipSurfaceArea = [];

    const coordinate = String(y) + String(x);
    const coordinateAsANumber = Number(coordinate);
    console.log(coordinateAsANumber)
    console.log(ships)
    if (
      missedAttacks.includes(coordinateAsANumber) ||
      successfulAttacks.includes(coordinateAsANumber)
    ){console.log('includes')};

    if (
      !missedAttacks.includes(coordinateAsANumber) &&
      shipSquares.includes(coordinateAsANumber)
    ) {
      ships.forEach((element) => {
        const startSurfaceArea = element.x;
        const endSurfaceArea = element.y;

        if (coordinateAsANumber === startSurfaceArea) {
          if (element.shipOrientation === "horizontal") {
            for (
              let index = startSurfaceArea;
              index <= endSurfaceArea;
              index += 10
            ) {
              shipSurfaceArea.push(index);
              element.shipSurface.push(index);
            }
          } else {
            for (
              let index = startSurfaceArea;
              index <= endSurfaceArea;
              index++
            ) {
              shipSurfaceArea.push(index);
              element.shipSurface.push(index);
            }
          }
        }

        if (element.shipSurface.includes(coordinateAsANumber)) {
          element.hit();
          console.log(element.isSunk());
        }
      });
    } else if (missedAttacks.includes(coordinateAsANumber)) {
      alert("You already selected this cell!");
    } else {
      missedAttacks.push(coordinateAsANumber);
    }

    if (shipSurfaceArea.includes(coordinateAsANumber)) {
      successfulAttacks.push(coordinateAsANumber);
    }
  }

  function addShipsToBoard() {
    ships.forEach((element) => {
      // Match the coordinates being looped (1-100) with the ones in the ships
      const shipCoordinateValueX = element.x;
      const shipCoordinateValueY = element.y;
      const coordinateIntegerX = Number(shipCoordinateValueX);
      const coordinateIntegerY = Number(shipCoordinateValueY);

      // Get all the coordinates that have ships and save them in shipSqaures
      if (element.shipOrientation === "horizontal") {
        for (
          let indexHorizontal = coordinateIntegerX;
          indexHorizontal <= coordinateIntegerY;
          indexHorizontal += 10
        ) {
          shipSquares.push(indexHorizontal);
        }
      } else {
        for (
          let indexVertical = coordinateIntegerX;
          indexVertical <= coordinateIntegerY;
          indexVertical++
        ) {
          shipSquares.push(indexVertical);
        }
      }
    });
  }

  function checkPositionValidity(shipsCoordinates) {
    const otherShips = [];
    const limitBottom = [
      "9",
      "19",
      "29",
      "39",
      "49",
      "59",
      "69",
      "79",
      "89",
      "90",
      "99",
    ];

    let isValid = true;

    shipsCoordinates.forEach((element) => {
      let shipSize;

      const currentIteration = shipsCoordinates.indexOf(element);

      if (currentIteration === 0) {
        shipSize = 5;
      } else if (currentIteration === 1) {
        shipSize = 4;
      } else if (currentIteration === 2) {
        shipSize = 3;
      } else {
        shipSize = 2;
      }

      for (let index = 0; index < shipSize; index++) {
        let strCoordinate = element;

        if (currentIteration % 2 === 0) {
          strCoordinate += 10 * index;
        } else {
          strCoordinate = element + index;
        }

        if (strCoordinate > 99) {
          isValid = false;
        }

        strCoordinate = String(strCoordinate);

        if (otherShips.includes(strCoordinate)) {
          isValid = false;
        }
        otherShips.push(strCoordinate);
      }

      if (
        limitBottom.includes(otherShips[5]) ||
        limitBottom.includes(otherShips[6]) ||
        limitBottom.includes(otherShips[7]) ||
        limitBottom.includes(otherShips[12])
      ) {
        isValid = false;
      }

      shipSize -= 1;
    });

    return isValid;
  }

  function generateComputerShipsCoordinates() {
    if (generateComputerShipsCoordinates === true) return;

    // Generate an array of 100 undefined elements, then populate them from 0 to 99. Then shuffle.
    function getRandomNumbers() {
      const numbers = Array(100)
        .fill()
        .map((_, index) => index);
      numbers.sort(() => Math.random() - 0.5);
      const randomCoordinates = numbers.slice(0, 4);

      return randomCoordinates;
    }

    const randomCoordinates = getRandomNumbers();

    const coordinatesAreValid = checkPositionValidity(randomCoordinates);

    if (!coordinatesAreValid) {
      generateComputerShipsCoordinates();
    }

    if (coordinatesAreValid) {
      placeShip(
        5,
        randomCoordinates[0],
        randomCoordinates[0] + 10 * 4,
        "horizontal",
        "destroyer"
      );
      placeShip(
        4,
        randomCoordinates[1],
        randomCoordinates[1] + 3,
        "vertical",
        "carrier"
      );
      placeShip(
        3,
        randomCoordinates[2],
        randomCoordinates[2] + 10 * 2,
        "horizontal",
        "patrol"
      );
      placeShip(
        2,
        randomCoordinates[3],
        randomCoordinates[3] + 1,
        "vertical",
        "boat"
      );
    }
  }

  return {
    playerName,
    ships,
    placeShip,
    receiveAttack,
    shipSquares,
    generateComputerShipsCoordinates,
    addShipsToBoard,
  };
}

module.exports = Gameboard;
