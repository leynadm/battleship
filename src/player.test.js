const Player = require("./player");

test("Create computer instance", () => {
  const player = Player();
  const computerPlayerGameboard = player.createComputerPlayer();

  expect(computerPlayerGameboard).toBeDefined();
  expect(computerPlayerGameboard.playerName).toBe("Computer");
});

test("Create player instance", () => {
  const player = Player();
  const playerGameboard = player.createPlayer("Daniel");
  expect(playerGameboard).toBeDefined();
  expect(playerGameboard.playerName).toBe("Daniel");
});

test("Create ship for player instance and check length", () => {
    
    const player = Player();
    const playerGameboard = player.createPlayer("Daniel");
    expect(playerGameboard).toBeDefined();
    expect(playerGameboard.playerName).toBe("Daniel");

    playerGameboard.placeShip(5,0,0,"horizontal")
    
    playerGameboard.placeShip(5, 0, 0, "horizontal");
    
    // playerGameboard.receiveAttack(0, 0);
  
    const ship = playerGameboard.ships[0];
  
    expect(ship.length).toBe(5);


  });
  