// const gameLoop = require("./gameloop");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");
 const { gameLoop, createComputerPlayer } = require("./gameloop");

function utilityFunctions(argument){


  function checkPositionValidity(){

  }

  function positionPlayerFleet() {
    
    const myDOM = getDOMElements();
    const myDOMFunc = myDOMFunctions();


    myDOM.boatImgToDrag.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", myDOM.boatImgToDrag.id);
    });

    myDOM.firstPlayerDivs.forEach((element) => {

      let elementX = element.getAttribute("div-coordinate-x");
      let elementY = element.getAttribute("div-coordinate-y");

      const firstCoordinateX = Number(String(elementY) + String(elementX))
      let secondCoordinate;

      const shipPosition = myDOM.boatImgToDrag.getAttribute("data-ship-position");
      console.log(shipPosition)
      const shipLength = myDOM.boatImgToDrag.getAttribute("data-ship-length");
      console.log(shipLength)
    
      element.addEventListener("dragover", (e) => {
        e.preventDefault();

        element.classList.add("drop-zone-over");

        elementX = element.getAttribute("div-coordinate-x");
        elementY = element.getAttribute("div-coordinate-y");

      
        console.log(firstCoordinateX)
        console.log(secondCoordinate)
      
        
        if(shipPosition ==="horizontal"){
          secondCoordinate = firstCoordinateX+(shipLength-1)*10
          // console.log(secondCoordinate)
        } else if(shipPosition === "vertical"){
          secondCoordinate = firstCoordinateX + (shipLength-1)
          // console.log(secondCoordinate)
        }

        if(secondCoordinate>99){
          element.classList.remove("drop-zone-over");
          element.classList.add("drop-zone-over-error");
        }

      });

      element.addEventListener("dragleave", (e) => {
        element.classList.remove("drop-zone-over");
        element.classList.remove("drop-zone-over-error");
      });

      element.addEventListener("drop", (e) => {
        e.preventDefault();

        const droppedElementId = e.dataTransfer.getData("text/plain");
        const droppedElement = document.getElementById(droppedElementId);

        if(secondCoordinate>99){
          e.preventDefault()
          element.classList.remove("drop-zone-over-error");
          
        } else {
          element.appendChild(droppedElement);
          element.classList.remove("drop-zone-over");
          argument.placeShip(shipLength, firstCoordinateX, secondCoordinate, shipPosition, "destroyer");
          argument.addShipsToBoard();         
          myDOMFunc.renderShipsOnBoard(argument.shipSquares);

        }

      });
    });

  }
 
  positionPlayerFleet()


  return {
    positionPlayerFleet
  }

}

module.exports = utilityFunctions;
