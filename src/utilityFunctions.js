// const gameLoop = require("./gameloop");
const { getDOMElements, myDOMFunctions } = require("./DOM-interaction");
 const { gameLoop, createComputerPlayer } = require("./gameloop");

function utilityFunctions(argument){


  function positionPlayerFleet() {
    
    const myDOM = getDOMElements();
    const myDOMFunc = myDOMFunctions();

    console.log('now inside position')
    myDOM.boatImgToDrag.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", myDOM.boatImgToDrag.id);
    });

    myDOM.firstPlayerDivs.forEach((element) => {

      element.addEventListener("dragover", (e) => {
        e.preventDefault();
        element.classList.add("drop-zone-over");
      });

      element.addEventListener("dragleave", (e) => {
        element.classList.remove("drop-zone-over");
      });

      element.addEventListener("drop", (e) => {
        e.preventDefault();

        const droppedElementId = e.dataTransfer.getData("text/plain");
        const droppedElement = document.getElementById(droppedElementId);

        element.appendChild(droppedElement);
        element.classList.remove("drop-zone-over");


        const elementX = element.getAttribute("div-coordinate-x");
        const elementY = element.getAttribute("div-coordinate-y");

        const firstCoordinateX = Number(String(elementY) + String(elementX))
        console.log(firstCoordinateX)


        argument.placeShip(5, firstCoordinateX, 75, "horizontal", "destroyer");
        
        argument.addShipsToBoard();         
        myDOMFunc.renderShipsOnBoard(argument.shipSquares);


        if(argument.ships.length === 1){
          console.log('length is 1')
        
        }
        
        console.log(argument)

      });
    });

  }
 
  positionPlayerFleet()


  return {
    positionPlayerFleet
  }

}

module.exports = utilityFunctions;
