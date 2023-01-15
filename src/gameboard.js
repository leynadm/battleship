const { indexOf } = require("lodash");
const Ship = require("./ship");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");

/* Factory function to create a gameboard */
function Gameboard(playerName) {
  const ships = [];
  const missedAttacks = [];
  const shipSquares = [];
  const successfulAttacks = [];
  let turn = false;
  const player = playerName;
  let functionInProgress = false;

  function takeTurn() {
    turn = !turn;
  }

  function isTurn() {
    return turn;
  }

  function placeShip(length, x, y, shipOrientation, shipType) {
    const ship = Ship(length, x, y, shipOrientation, shipType);
    ship.getShipSurface();
    ships.push(ship);
  }

  function checkSunkShips() {
    console.log(ships)

    let sunkShips = 0;
    ships.forEach((ship) => {
      if (ship.sunk) {
        sunkShips++;
      }
    });

    if(sunkShips === 4){
      console.log('Game over!')
    } else {
      console.log(`Ships sunk until now: ${  sunkShips}`)
    }

  }

  function receiveAttack(x, y, callback) {
    if (functionInProgress) {
      return;
    }

    const strCoordinate = String(y) + String(x);
    const intCoordinate = Number(strCoordinate);
    const myDomFunc = myDOMFunctions();

    if (
      missedAttacks.includes(intCoordinate) ||
      successfulAttacks.includes(intCoordinate)
    ) {
      alert("You already attacked this zone!");
      return;
    }

    if (
      !missedAttacks.includes(intCoordinate) &&
      !successfulAttacks.includes(intCoordinate) &&
      shipSquares.includes(intCoordinate)
    ) {
      ships.forEach((element) => {
        if (element.shipSurface.includes(intCoordinate)) {
          element.hit();
          element.isSunk();
          successfulAttacks.push(intCoordinate);
          myDomFunc.renderHitResult(strCoordinate, "Success", player);
        }
      });
    } else {
      missedAttacks.push(intCoordinate);
      myDomFunc.renderHitResult(strCoordinate, "Failed", player);
    }

    functionInProgress = true;

    const delay = Math.floor(Math.random() * (3000 - 1000) + 1000);

    setTimeout(() => {
      functionInProgress = false;
      callback();
    }, delay);

    checkSunkShips();
  }

  function computerAttack() {
    let ComputerHitXCoordinate;
    let ComputerHitYCoordinate;

    function generateCoordinates() {
      ComputerHitXCoordinate = Math.floor(Math.random() * 10);
      ComputerHitYCoordinate = Math.floor(Math.random() * 10);

      const intCoordinate = Number(
        String(ComputerHitYCoordinate) + String(ComputerHitXCoordinate)
      );

      if (
        missedAttacks.includes(intCoordinate) ||
        successfulAttacks.includes(intCoordinate)
      ) {
        generateCoordinates();
      }
    }

    generateCoordinates();

    functionInProgress = false;

    receiveAttack(ComputerHitXCoordinate, ComputerHitYCoordinate, null);
  
    checkSunkShips()
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
    takeTurn,
    isTurn,
    computerAttack,
  };
}

module.exports = Gameboard;
