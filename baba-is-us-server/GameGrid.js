const { movementOffsets } = require("./data/movementOffsets")
const { listOfNouns, listOfAdjectives } = require("./data/wordLists")

class GameGrid {
  constructor(initialState) {
    Object.assign(this, initialState)
  }

  get levelHasBeenWon() {
    const winObjectTypes = this.activeRules.filter(rule => rule.value === "win").map(rule => rule.subject)
    const winObjects = this.entitiesOfTypes(winObjectTypes)
    const players = [this.entitiesControlledByPlayer("you"), this.entitiesControlledByPlayer("me")]
    const won = players.every(controlledEntities => this.entityGroupsOverlap(controlledEntities, winObjects))
    return won
  }

  addNewEntity(entity) {
    this.entities.push(entity)
  }

  entityGroupsOverlap(entities1, entities2) {
    return entities1.some(entity1 => entities2.some(entity2 => entity1.x === entity2.x && entity1.y === entity2.y))
  }

  entitiesOfTypes(types) {
    return this.entities.filter(entity => types.includes(entity.type))
  }
  
  entitiesControlledByPlayer(player) {
    const entityTypes = this.activeRules.filter(rule => rule.value === player).map(rule => rule.subject)
    return this.entitiesOfTypes(entityTypes)
  }

  moveCommandIssued(player, direction) {
    const controlledEntities = this.entitiesControlledByPlayer(player)
    controlledEntities.forEach(entity => this.moveEntity(entity, this.movementOffsetForDirection(direction)))
  }

  movementOffsetForDirection(direction) {
    return movementOffsets[direction]
  }

  moveEntity(entity, movementOffset) {
    const movementValid = this.isMovementFromPositionValid(entity, movementOffset)

    if (movementValid) {
      const newPosition = this.applyMovement(entity, movementOffset)
      const entitiesAtNewPosition = this.collidableEntitiesAtPosition(newPosition).entities
      entitiesAtNewPosition.forEach(entity => {
        this.moveEntity(entity, movementOffset)
      })
      entity.y = newPosition.y
      entity.x = newPosition.x
    }
  }

  applyMovement(position, offset) {
    return {x: position.x + offset.x, y: position.y + offset.y}
  }

  isWithinMapBounds(position) {
    return position.y >= 0 && position.y < this.height &&
           position.x >= 0 && position.x < this.width 
  }

  isMovementFromPositionValid(position, movementOffset) {
    const newPosition = this.applyMovement(position, movementOffset)
    const {entities, pushable} = this.collidableEntitiesAtPosition(newPosition)

    if (pushable) {
      if (entities.length > 0) {
        return this.isMovementFromPositionValid(newPosition, movementOffset)
      } else {
        return this.isWithinMapBounds(newPosition)
      }
    } else {
      return false
    }
  }

  collidableEntitiesAtPosition(position) {
    const entitiesAtPosition = this.entitiesAtPosition(position)
    const pushableEntities = entitiesAtPosition.filter(entity => entity.type === "text")
    const immobileEntities = entitiesAtPosition.filter(entity => this.activeRules.some(rule => rule.subject === entity.type && rule.value === "stop"))

    return {entities: [...pushableEntities, ...immobileEntities], pushable: immobileEntities.length === 0}
    // this will need to modified later to account for rules making things push/etc
  }

  entitiesAtPosition({x, y}) {
    return this.entities.filter(entity => entity.x === x && entity.y === y)
  }

  get activeRules() {
    const nouns = this.entities.filter(entity => entity.type === "text" && listOfNouns.includes(entity.value))
    return nouns.reduce((phrases, noun) => [...phrases, ...this.getActivePhrases(noun)], [])
  }

  getActivePhrases(noun) {
    const phrases = []

    const IStextBelow = this.entitiesAtPosition({x: noun.x, y: noun.y + 1}).filter(entity => entity.type === "text" && entity.value === "is")
    const validPredicatesBelow = this.entitiesAtPosition({x: noun.x, y: noun.y + 2}).filter(entity => entity.type === "text" && this.isValidPhrasePredicate(entity.value))
    if (IStextBelow.length > 0) {
      validPredicatesBelow.forEach(entity => {
        phrases.push({subject: noun.value, value: entity.value})
      })
    }
    const IStextAdjacent = this.entitiesAtPosition({x: noun.x + 1, y: noun.y}).filter(entity => entity.type === "text" && entity.value === "is")
    const validPredicatesAdjacent = this.entitiesAtPosition({x: noun.x + 2, y: noun.y}).filter(entity => entity.type === "text" && this.isValidPhrasePredicate(entity.value))
    if (IStextAdjacent.length > 0) {
      validPredicatesAdjacent.forEach(entity => {
        phrases.push({subject: noun.value, value: entity.value})
      })
    }

    return phrases
  }

  isValidPhrasePredicate(value) {
    return listOfNouns.includes(value) || listOfAdjectives.includes(value)
  }
}

module.exports = {
  GameGrid
}