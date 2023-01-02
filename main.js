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

eval("function getDOMElements() {\n  const startButton = document.querySelector(\".start-button\");\n  const divCoordinates = document.querySelectorAll(\".div-coordinate\");\n  const firstPlayerBoard = document.querySelector(\".first-player-board\");\n  const secondPlayerBoard = document.querySelector(\".second-player-board\");\n  return {\n    startButton,\n    divCoordinates,\n    firstPlayerBoard,\n    secondPlayerBoard\n  };\n}\nfunction myDOMFunctions() {\n  const DOMElements = getDOMElements();\n  DOMElements.divCoordinates.forEach(element => {\n    console.log(element);\n  });\n}\nmodule.exports = {\n  getDOMElements,\n  myDOMFunctions\n};\n\n//# sourceURL=webpack://battleship/./src/DOM-interaction.js?");

/***/ }),

/***/ "./src/gameboard.js":
/*!**************************!*\
  !*** ./src/gameboard.js ***!
  \**************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst {\n  getDOMElements,\n  myDOMFunctions\n} = __webpack_require__(/*! ./DOM-interaction */ \"./src/DOM-interaction.js\");\n\n/* Factory function to create a gameboard */\nfunction Gameboard(playerName) {\n  const ships = [];\n  const missedAttacks = [];\n  function placeShip(length, x, y, shipOrientation, shipType) {\n    const ship = Ship(length, x, y, shipOrientation, shipType);\n    ships.push(ship);\n  }\n  function receiveAttack(x, y) {\n    ships.forEach(element => {\n      if (x >= element.x && x <= element.y) {\n        element.hit();\n        element.isSunk();\n        return element;\n      }\n      missedAttacks.push(`${x},${y}`);\n      if (element.sunk) {\n        // remove item from the array\n      }\n    });\n  }\n  function renderBoard(playerBoard) {\n    console.log(playerBoard);\n    const myDOM = getDOMElements();\n    let xCoordinate = 1;\n    for (let index = 1; index <= 10; index++) {\n      let yCoordinate = 1;\n      for (let index = 1; index <= 10; index++) {\n        const divCoordinate = document.createElement(\"div\");\n        divCoordinate.classList.add(\"div-coordinate\", `div-coordinate-${xCoordinate}-${yCoordinate}`);\n        divCoordinate.setAttribute(\"div-coordinate\", `${yCoordinate}-${xCoordinate}`);\n        divCoordinate.textContent = `\"${yCoordinate}-${xCoordinate}\"`;\n        playerBoard.appendChild(divCoordinate);\n        yCoordinate += 1;\n      }\n      xCoordinate += 1;\n    }\n  }\n  function addShipsToBoard() {\n    const myDOM = getDOMElements();\n    myDOM.divCoordinates.forEach(divCoordinateCell => {\n      const coordinateValue = divCoordinateCell.getAttribute(\"div-coordinate\");\n      ships.forEach(element => {\n        // Match the coordinates being looped (1-100) with the ones in the ships\n        const shipCoordinateValue = element.x;\n        if (coordinateValue == shipCoordinateValue) {\n          divCoordinateCell.classList.add(\"ship-square\");\n        }\n      });\n    });\n  }\n  function generateComputerShips() {}\n  function checkFleetStatus() {}\n  return {\n    playerName,\n    ships,\n    placeShip,\n    receiveAttack,\n    renderBoard,\n    addShipsToBoard\n  };\n}\nmodule.exports = Gameboard;\n\n//# sourceURL=webpack://battleship/./src/gameboard.js?");

/***/ }),

/***/ "./src/gameloop.js":
/*!*************************!*\
  !*** ./src/gameloop.js ***!
  \*************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Gameboard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst {\n  getDOMElements,\n  myDOMFunctions\n} = __webpack_require__(/*! ./DOM-interaction */ \"./src/DOM-interaction.js\");\nfunction gameLoop() {\n  const players = [];\n  const player = Player();\n  const playerGameboard = player.createPlayer(\"Daniel\");\n  playerGameboard.placeShip(5, \"1-1\", \"5-1\", \"horizontal\", \"boat\");\n  playerGameboard.placeShip(3, \"1-3\", \"3-3\", \"horizontal\", \"boat\");\n  const myDOM = getDOMElements();\n  console.log(myDOM);\n  // Generate the two boards\n  playerGameboard.renderBoard(myDOM.firstPlayerBoard);\n  playerGameboard.renderBoard(myDOM.secondPlayerBoard);\n  playerGameboard.addShipsToBoard();\n  console.log(playerGameboard.ships);\n  const computerGameboard = player.createComputerPlayer();\n  computerGameboard.placeShip(5, \"1-5\", \"2-5\", \"horizontal\", \"boat\");\n  players.forEach(element => {});\n}\nmodule.exports = gameLoop;\n\n/* \n\nplayerGameboard.placeShip(5, \"1-2\", \"3-2\", \"horizontal\",\"patrol\");\nplayerGameboard.placeShip(5, \"1-3\", \"3-3\", \"horizontal\",\"carrier\");\nplayerGameboard.placeShip(5, \"1-4\", \"4-4\", \"horizontal\",\"submarine\");\n\ncomputerGameboard.placeShip(5, \"1-6\", \"3-6\", \"horizontal\",\"patrol\");\ncomputerGameboard.placeShip(5, \"1-7\", \"3-7\", \"horizontal\",\"carrier\");\ncomputerGameboard.placeShip(5, \"1-8\", \"4-8\", \"horizontal\",\"submarine\");\n */\n\n//# sourceURL=webpack://battleship/./src/gameloop.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const Ship = __webpack_require__(/*! ./ship */ \"./src/ship.js\");\nconst Gameboard = __webpack_require__(/*! ./gameboard */ \"./src/gameboard.js\");\nconst Player = __webpack_require__(/*! ./player */ \"./src/player.js\");\nconst getDOMElements = __webpack_require__(/*! ./DOM-interaction */ \"./src/DOM-interaction.js\");\nconst gameLoop = __webpack_require__(/*! ./gameloop */ \"./src/gameloop.js\");\nfunction createBoard() {\n  let xCoordinate = 1;\n  for (let index = 1; index <= 10; index++) {\n    let yCoordinate = 1;\n    for (let index = 1; index <= 10; index++) {\n      const divCoordinate = document.createElement(\"div\");\n      divCoordinate.classList.add('div-coordinate', `div-coordinate-${xCoordinate}-${yCoordinate}`);\n      divCoordinate.textContent = `${yCoordinate}-${xCoordinate}`;\n      first_player_board.appendChild(divCoordinate);\n      yCoordinate += 1;\n    }\n    xCoordinate += 1;\n  }\n}\nlet first_player_board = document.querySelector(\".first-player-board\");\ngameLoop();\n\n// createBoard();\n\n//# sourceURL=webpack://battleship/./src/index.js?");

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