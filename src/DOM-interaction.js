function getDOMElements() {
  const startButton = document.querySelector(".start-button");
  const divCoordinates = document.querySelectorAll(".div-coordinate");
  const firstPlayerBoard = document.querySelector(".first-player-board");
  const secondPlayerBoard = document.querySelector(".second-player-board");

  return {
    startButton,
    divCoordinates,
    firstPlayerBoard,
    secondPlayerBoard,
  };
}

function myDOMFunctions() {
  function renderBoard(playerBoard) {
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

  function renderShipsOnBoard(shipSquares) {
    const DOMElements = getDOMElements();

    // Render the ships on the board
    DOMElements.divCoordinates.forEach((divCoordinateCell) => {
      // Get the coordinate value on the board
      const coordinateValue = Number(
        divCoordinateCell.getAttribute("div-coordinate")
      );

      shipSquares.forEach((element) => {
        if (element === coordinateValue) {
          divCoordinateCell.classList.add("ship-square");
        }
      });
    });
  }

  return {
    renderBoard,
    renderShipsOnBoard,
  };
}

module.exports = {
  getDOMElements,
  myDOMFunctions,
};
