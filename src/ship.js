function Ship(length) {
  return {
    length,
    hits: 0,
    sunk: false,
    hit() {
      this.hits += 1;
    },
    isSunk() {
      return this.hits >= this.length;
    }
  };
}

module.exports = Ship;
