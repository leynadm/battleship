/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/DOM-interaction.js":
/*!********************************!*\
  !*** ./src/DOM-interaction.js ***!
  \********************************/
/***/ ((module) => {

eval("function getDOMElements() {\n  const startButton = document.querySelector(\".start-button\");\n  const divCoordinates = document.querySelectorAll(\".div-coordinate\");\n  const firstPlayerBoard = document.querySelector(\".first-player-board\");\n  const secondPlayerBoard = document.querySelector(\".second-player-board\");\n  return {\n    startButton,\n    divCoordinates,\n    firstPlayerBoard,\n    secondPlayerBoard\n  };\n}\nfunction myDOMFunctions() {\n  function renderBoard(playerBoard) {\n    let xCoordinate = 0;\n    for (let index = 0; index < 10; index++) {\n      let yCoordinate = 0;\n      for (let index = 0; index < 10; index++) {\n        const divCoordinate = document.createElement(\"div\");\n        divCoordinate.classList.add(\"div-coordinate\", `div-coordinate-${xCoordinate}${yCoordinate}`);\n        divCoordinate.setAttribute(\"div-coordinate\", `${yCoordinate}${xCoordinate}`);\n        divCoordinate.textContent = `\"${yCoordinate}${xCoordinate}\"`;\n        playerBoard.appendChild(divCoordinate);\n        yCoordinate += 1;\n      }\n      xCoordinate += 1;\n    }\n  }\n  function renderShipsOnBoard(shipSquares) {\n    const DOMElements = getDOMElements();\n\n    // Render the ships on the board\n    DOMElements.divCoordinates.forEach(divCoordinateCell => {\n      // Get the coordinate value on the board\n      const coordinateValue = Number(divCoordinateCell.getAttribute(\"div-coordinate\"));\n      shipSquares.forEach(element => {\n        if (element === coordinateValue) {\n          divCoordinateCell.classList.add(\"ship-square\");\n        }\n      });\n    });\n  }\n  return {\n    renderBoard,\n    renderShipsOnBoard\n  };\n}\nmodule.exports = {\n  getDOMElements,\n  myDOMFunctions\n};\n\n//# sourceURL=webpack://battleship/./src/DOM-interaction.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst {\n  getDOMElements,\n  myDOMFunctions\n} = __webpack_require__(/*! ./DOM-interaction */ \"./src/DOM-interaction.js\");\n\n/* Factory function to create a gameboard */\nfunction Gameboard(playerName) {\n  const ships = [];\n  const missedAttacks = [];\n  const shipSquares = [];\n  function placeShip(length, x, y, shipOrientation, shipType) {\n    const ship = Ship(length, x, y, shipOrientation, shipType);\n    ships.push(ship);\n  }\n  function receiveAttack(x, y) {\n    ships.forEach(element => {\n      if (x >= element.x && x <= element.y) {\n        element.hit();\n        element.isSunk();\n        return element;\n      }\n      missedAttacks.push(`${x},${y}`);\n      if (element.sunk) {\n        // remove item from the array\n      }\n    });\n  }\n  function addShipsToBoard() {\n    ships.forEach(element => {\n      // Match the coordinates being looped (1-100) with the ones in the ships\n      const shipCoordinateValueX = element.x;\n      const shipCoordinateValueY = element.y;\n      const coordinateIntegerX = Number(shipCoordinateValueX);\n      const coordinateIntegerY = Number(shipCoordinateValueY);\n\n      // Get all the coordinates that have ships and save them in shipSqaures\n      if (element.shipOrientation === \"horizontal\") {\n        for (let indexHorizontal = coordinateIntegerX; indexHorizontal <= coordinateIntegerY; indexHorizontal += 10) {\n          shipSquares.push(indexHorizontal);\n        }\n      } else {\n        for (let indexVertical = coordinateIntegerX; indexVertical <= coordinateIntegerY; indexVertical++) {\n          shipSquares.push(indexVertical);\n        }\n      }\n      // console.log(shipSquares)\n    });\n  }\n\n  function generateComputerShipsCoordinates() {\n    // Generate an array of 100 undefined elements, then populate them from 0 to 99. Then shuffle.\n    const numbers = Array(100).fill().map((_, index) => index);\n    numbers.sort(() => Math.random() - 0.5);\n    const randomCoordinates = numbers.slice(0, 4);\n    const limitBottomAndRight = [\"09\", \"19\", \"29\", \"39\", \"49\", \"59\", \"69\", \"79\", \"89\", \"90\", \"91\", \"92\", \"93\", \"94\", \"95\", \"96\", \"97\", \"98\", \"99\"];\n    const shipProperties = {\n      0: {\n        type: \"destroyer\",\n        length: 5\n      },\n      1: {\n        type: \"carrier\",\n        length: 4\n      },\n      2: {\n        type: \"submarine\",\n        length: 3\n      },\n      3: {\n        type: \"boat\",\n        length: 2\n      }\n    };\n    for (let index = 0; index <= randomCoordinates.length - 1; index++) {\n      const shipType = shipProperties[index % 4].type;\n      console.log(shipType);\n      let shipLength = shipProperties[index % 4].length;\n      shipLength -= 1;\n      console.log(shipLength);\n      const shipOrientation = index % 2 === 0 ? \"horizontal\" : \"vertical\";\n      console.log(shipOrientation);\n      if (limitBottomAndRight.includes(randomCoordinates[index])) {\n        // const y = randomCoordinates[index] - shipLength\n        placeShip(shipLength, randomCoordinates[index], randomCoordinates[index] - shipLength, shipOrientation, shipType);\n      } else {\n        placeShip(shipLength, randomCoordinates[index], randomCoordinates[index] + shipLength, shipOrientation, shipType);\n      }\n    }\n  }\n  return {\n    playerName,\n    ships,\n    placeShip,\n    receiveAttack,\n    shipSquares,\n    generateComputerShipsCoordinates,\n    addShipsToBoard\n  };\n}\nmodule.exports = Gameboard;\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/gameloop.js":
/*!*************************!*\
  !*** ./src/gameloop.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Gameboard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst {\n  getDOMElements,\n  myDOMFunctions\n} = __webpack_require__(/*! ./DOM-interaction */ \"./src/DOM-interaction.js\");\nfunction gameLoop() {\n  const players = [];\n  const player = Player();\n\n  // Create the human player object and place his ships\n  const playerGameboard = player.createPlayer(\"Daniel\");\n  playerGameboard.placeShip(5, \"00\", \"40\", \"horizontal\", \"boat\");\n  playerGameboard.placeShip(3, \"02\", \"04\", \"vertical\", \"boat\");\n  playerGameboard.placeShip(4, \"22\", \"52\", \"horizontal\", \"boat\");\n  playerGameboard.placeShip(2, \"57\", \"58\", \"vertical\", \"boat\");\n  const myDOM = getDOMElements();\n  const myDOMFunc = myDOMFunctions();\n\n  // Generate the human player board\n  myDOMFunc.renderBoard(myDOM.firstPlayerBoard);\n  playerGameboard.addShipsToBoard();\n  const shipSq = playerGameboard.shipSquares;\n  myDOMFunc.renderShipsOnBoard(shipSq);\n\n  /* \n  const computerGameboard = player.createComputerPlayer();\n  computerGameboard.generateComputerShipsCoordinates(5);\n  console.log(computerGameboard.ships);\n  computerGameboard.renderBoard(myDOM.secondPlayerBoard);\n   players.forEach((element) => {});\n  */\n}\n\nmodule.exports = gameLoop;\n\n//# sourceURL=webpack://battleship/./src/gameloop.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Gameboard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst getDOMElements = __webpack_require__(/*! ./DOM-interaction */ \"./src/DOM-interaction.js\");\nconst gameLoop = __webpack_require__(/*! ./gameloop */ \"./src/gameloop.js\");\ngameLoop();\n\n// createBoard();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

/***/ }),

/***/ "./src/player.js":
/*!***********************!*\
  !*** ./src/player.js ***!
  \***********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Gameboard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\n\n/* Factory function to create a player, which in turns creates a gameboard\nusing the imported Gameboard factory function */\n\nfunction Player() {\n  function createComputerPlayer() {\n    const computerGameboard = Gameboard(\"Computer\");\n    return computerGameboard;\n  }\n  function createPlayer(playerName) {\n    const playerGameboard = Gameboard(playerName);\n    return playerGameboard;\n  }\n  return {\n    createComputerPlayer,\n    createPlayer\n  };\n}\nmodule.exports = Player;\n\n//# sourceURL=webpack://battleship/./src/player.js?");

/***/ }),

/***/ "./src/ship.js":
/*!*********************!*\
  !*** ./src/ship.js ***!
  \*********************/
/***/ ((module) => {

eval("// Export factory function to create a ship\nfunction Ship(length, x, y, shipOrientation, shipType) {\n  return {\n    shipType,\n    shipOrientation,\n    length,\n    hits: 0,\n    sunk: false,\n    x,\n    y,\n    hit() {\n      this.hits += 1;\n    },\n    isSunk() {\n      return this.hits >= this.length;\n    }\n  };\n}\nmodule.exports = Ship;\n\n//# sourceURL=webpack://battleship/./src/ship.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;