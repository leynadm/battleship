const Ship = require("./ship");

test.only("Create one standard ship", () => {
  const expectedResult = {
    shipOrientation:"horizontal",
    length: 4,
    sunk: false,
    hits: 0,
    hit: expect.any(Function),
    isSunk: expect.any(Function),
    x:3,
    y:4
};

  const result = Ship(4,3,4,"horizontal");
  expect(result).toStrictEqual(expectedResult);
});

test("Hit the ship", () => {
  const ship = Ship(4);
  ship.hit();

  expect(ship.hits).toBe(1);
});
