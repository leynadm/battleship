const Gameboard = require("./gameboard");

test.only("Receive attack and increase the hit count", () => {
  const gameboard = Gameboard();

  gameboard.placeShip(5, 0, 0, "horizontal");

  gameboard.receiveAttack(0, 0);

  const ship = gameboard.ships[0];

  expect(ship.hits).toBe(1);
  expect(ship.isSunk()).toBe(false);
});
