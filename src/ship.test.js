const Ship = require("./ship");

test("Create one standard ship", () => {
  const expectedResult = {
    shipType: "Carrier",
    shipOrientation: "horizontal",
    length: 4,
    sunk: false,
    hits: 0,
    hit: expect.any(Function),
    isSunk: expect.any(Function),
    x: 3,
    y: 4,
  };

  const result = Ship(4, 3, 4, "horizontal", "Carrier");
  expect(result).toStrictEqual(expectedResult);
});

test("Hit the ship", () => {
  const ship = Ship(4);
  ship.hit();

  expect(ship.hits).toBe(1);
});

test("Check ship type", () => {
  const ship = Ship(4, 3, 6, "horizontal", "Carrier");
  expect(ship.shipType).toBe("Carrier");
});
