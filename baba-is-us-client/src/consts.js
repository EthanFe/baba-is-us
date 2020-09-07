const emptyGameState = {
  level: 0,
  gridState: {
    width: 3,
    height: 3,
    entities: []
  }
}

const movementKeys = {
  "w": "up",
  "a": "left",
  "s": "down",
  "d": "right"
}


module.exports = {
  emptyGameState,
  movementKeys
}