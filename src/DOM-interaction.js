const Gameboard = require("./gameboard");

function getDOMElements() {
  const startButton = document.querySelector(".start-button");
  const divCoordinates = document.querySelectorAll(".div-coordinate");
  const firstPlayerBoard = document.querySelector(".first-player-board");
  const secondPlayerBoard = document.querySelector(".second-player-board");
  const secondPlayerDivs =
    secondPlayerBoard.querySelectorAll(".div-coordinate");

  return {
    startButton,
    divCoordinates,
    firstPlayerBoard,
    secondPlayerBoard,
    secondPlayerDivs,
  };
}

function myDOMFunctions() {
  function renderHitResult(hitCoordinate, hitResult) {
    const myDOM = getDOMElements();

    const div = myDOM.secondPlayerBoard.querySelector(
      `div.div-coordinate[div-coordinate="${hitCoordinate}"]`
    );

    if (hitResult === "Success") {
      const hitResultImg = document.createElement("img");
      hitResultImg.src = "/src/images/bullet-hit.svg";
      hitResultImg.classList.add("hit-result-img", "successful-hit-img");
      div.appendChild(hitResultImg);
    } else {
      const hitResultImg = document.createElement("img");
      hitResultImg.src = "/src/images/bullet-missed.svg";
      hitResultImg.classList.add("hit-result-img", "failed-hit-img");
      div.appendChild(hitResultImg);
    }
    console.log(div);
  }

  function renderBoard(playerBoard) {
    let xCoordinate = 0;

    for (let index = 0; index < 10; index++) {
      let yCoordinate = 0;

      for (let index = 0; index < 10; index++) {
        const divCoordinate = document.createElement("div");
        divCoordinate.classList.add("div-coordinate");
        divCoordinate.setAttribute(
          "div-coordinate",
          `${yCoordinate}${xCoordinate}`
        );
        divCoordinate.setAttribute("div-coordinate-y", `${yCoordinate}`);
        divCoordinate.setAttribute("div-coordinate-x", `${xCoordinate}`);

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

  function addEventListeners(receiveAttack) {
    const DOMElements = getDOMElements();
    DOMElements.secondPlayerDivs.forEach((element) => {
      element.addEventListener("click", () => {
        const elementX = element.getAttribute("div-coordinate-x");
        const elementY = element.getAttribute("div-coordinate-y");

        receiveAttack(elementX, elementY);
      });
    });
  }

  return {
    renderBoard,
    renderShipsOnBoard,
    addEventListeners,
    renderHitResult,
  };
}

module.exports = {
  getDOMElements,
  myDOMFunctions,
};
