
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
      return this.hits >= this.length;
    },
  };
}

module.exports = Ship;
