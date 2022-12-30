function Ship(length,x,y,shipOrientation) {
  return {
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
