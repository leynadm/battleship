// Export factory function to create a ship
function Ship(length, x, y, shipOrientation, shipType) {
  return {
    shipType,
    shipOrientation,
    length,
    hits: 0,
    sunk: false,
    x,
    y,
    hit() {
      this.hits += 1;
    },
    isSunk() {
      if(this.hits >= this.length){
        this.sunk = true
      }
    },
    shipSurface: [],
    getShipSurface() {
      let step = 1;
      if (this.shipOrientation === "horizontal") {
        step = 10;
      }
      for (let i = this.x; i <= this.y; i += step) {
        this.shipSurface.push(i);
      }
    },
  };
}

module.exports = Ship;
