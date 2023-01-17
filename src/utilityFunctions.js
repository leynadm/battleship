// const gameLoop = require("./gameloop");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");
const { gameLoop, createComputerPlayer } = require("./gameloop");

function utilityFunctions(argument) {
  function checkPositionValidity() {}

  function positionPlayerFleet() {
    const myDOM = getDOMElements();
    const myDOMFunc = myDOMFunctions();

    const shipsImgArr = [
      myDOM.boatImgToDrag,
      myDOM.destroyerImgToDrag,
      myDOM.carrierImgToDrag,
      myDOM.patrolImgToDrag,
    ];

    for (let index = 0; index < shipsImgArr.length; index++) {
      const shipImg = shipsImgArr[index];
      shipImg.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", shipImg.id);
        e.dataTransfer.setData(
          "data-ship-position",
          shipImg.getAttribute("data-ship-position")
        );
        e.dataTransfer.setData(
          "data-ship-length",
          shipImg.getAttribute("data-ship-length")
        );
        e.dataTransfer.setData(
          "data-ship-type",
          shipImg.getAttribute("data-ship-type")
        );
      });
    }
    myDOM.firstPlayerDivs.forEach((element) => {
      const elementX = element.getAttribute("div-coordinate-x");
      const elementY = element.getAttribute("div-coordinate-y");

      const firstCoordinateX = Number(String(elementY) + String(elementX));
      let secondCoordinate;

      element.addEventListener("dragover", (e) => {
        e.preventDefault();

        element.classList.add("drop-zone-over");
      });

      element.addEventListener("dragleave", () => {
        element.classList.remove("drop-zone-over");
        element.classList.remove("drop-zone-over-error");
      });

      element.addEventListener("drop", (e) => {

        const shipPosition = e.dataTransfer.getData("data-ship-position");
        const shipLength = e.dataTransfer.getData("data-ship-length");
        const shipType = e.dataTransfer.getData("data-ship-type");

        if (shipPosition === "horizontal") {
          secondCoordinate = firstCoordinateX + (shipLength - 1) * 10;
        } else if (shipPosition === "vertical") {
          secondCoordinate = firstCoordinateX + (shipLength - 1);
        }

        if (secondCoordinate > 99) {
          element.classList.remove("drop-zone-over");
          element.classList.add("drop-zone-over-error");
        }

        const droppedElementId = e.dataTransfer.getData("text/plain");
        const droppedElement = document.getElementById(droppedElementId);

        if (secondCoordinate > 99) {
          e.preventDefault();
          element.classList.remove("drop-zone-over-error");
        } else {
          element.appendChild(droppedElement);
          element.classList.remove("drop-zone-over");
          argument.placeShip(
            shipLength,
            firstCoordinateX,
            secondCoordinate,
            shipPosition,
            shipType
          );
          argument.addShipsToBoard();
          myDOMFunc.renderShipsOnBoard(argument.shipSquares);
          console.log(argument.ships);
        }
      });
    });
  }

  positionPlayerFleet();

  return {
    positionPlayerFleet,
  };
}

module.exports = utilityFunctions;
