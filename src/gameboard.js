const Ship = require("./ship");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");

/* Factory function to create a gameboard */
function Gameboard(playerName) {
  const ships = [];
  const missedAttacks = [];
  const shipSquares = [];

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
      // console.log(shipSquares)
    });
  
  }

  function generateComputerShipsCoordinates() {
    // Generate an array of 100 undefined elements, then populate them from 0 to 99. Then shuffle.
    const numbers = Array(100)
      .fill()
      .map((_, index) => index);
    numbers.sort(() => Math.random() - 0.5);
    const randomCoordinates = numbers.slice(0, 4);

    const limitBottomAndRight = [
      "09",
      "19",
      "29",
      "39",
      "49",
      "59",
      "69",
      "79",
      "89",
      "90",
      "91",
      "92",
      "93",
      "94",
      "95",
      "96",
      "97",
      "98",
      "99",
    ];

    const shipProperties = {
      0: { type: "destroyer", length: 5 },
      1: { type: "carrier", length: 4 },
      2: { type: "submarine", length: 3 },
      3: { type: "boat", length: 2 },
    };

    for (let index = 0; index <= randomCoordinates.length - 1; index++) {
      const shipType = shipProperties[index % 4].type;
      console.log(shipType);
      let shipLength = shipProperties[index % 4].length;
      shipLength -= 1;
      console.log(shipLength);
      const shipOrientation = index % 2 === 0 ? "horizontal" : "vertical";
      console.log(shipOrientation);

      if (limitBottomAndRight.includes(randomCoordinates[index])) {
        // const y = randomCoordinates[index] - shipLength
        placeShip(
          shipLength,
          randomCoordinates[index],
          randomCoordinates[index] - shipLength,
          shipOrientation,
          shipType
        );
      } else {
        placeShip(
          shipLength,
          randomCoordinates[index],
          randomCoordinates[index] + shipLength,
          shipOrientation,
          shipType
        );
      }
    }
  }

  return {
    playerName,
    ships,
    placeShip,
    receiveAttack,
    shipSquares,
    generateComputerShipsCoordinates,
    addShipsToBoard
  };
}

module.exports = Gameboard;
