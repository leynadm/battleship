const Ship = require("./ship");


test("Create one standard ship", ()=> {
    
    const expectedResult = {
        length:4,
        sunk:false,
        hits:0,
        hit: expect.any(Function),
        isSunk:expect.any(Function)
    };

    const result = Ship(4);
    expect(result).toStrictEqual(expectedResult);
});


test("Hit the ship", ()=> {

    const ship = Ship(4)
    ship.hit()

    expect(ship.hits).toBe(1);
});

