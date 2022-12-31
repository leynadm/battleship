const Player = require("./player");
 
test("Create computer instance", () =>{

    const player = Player()
    const computerPlayerGameboard = player.createComputerPlayer()

    expect(computerPlayerGameboard).toBeDefined()
    expect(computerPlayerGameboard.playerName).toBe('Computer')
})

test("Create player instance", () =>{

    const player = Player()
    const playerGameboard = player.createPlayer("Daniel");
    expect(playerGameboard).toBeDefined()
    expect(playerGameboard.playerName).toBe('Daniel')
})

