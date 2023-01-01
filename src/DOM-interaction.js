function getDOMElements() {
  const startButton = document.querySelector(".start-button");
  const divCoordinates = document.querySelectorAll(".div-coordinate");
  const firstPlayerBoard = document.querySelector(".first-player-board");
  const secondPlayerBoard = document.querySelector(".first-player-board");

  return {
    startButton,
    divCoordinates,
    firstPlayerBoard,
    secondPlayerBoard
  };
}

function myDOMFunctions() {

    const DOMElements = getDOMElements()
    console.log(DOMElements)

    
    DOMElements.divCoordinates.forEach(element => {
        console.log(element)
    });
}

module.exports = {
  getDOMElements,
  myDOMFunctions,
};
