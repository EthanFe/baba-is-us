const { GameGrid } = require("./GameGrid")
const { levels } = require("./data/levels")

class Game {
    constructor() {
        this.level = 1
        this.loadGridForLevel(this.level)
        this.joinedPlayers = {you: null, me: null}
        this.movementCooldown = false;
        this.socket = null;
    }

    loadGridForLevel(level) {
        this.level = level
        this.grid = new GameGrid(levels[this.level])
    }

    get latestState() {
      return {level: this.level, gridState: this.grid}
    }

    setSocketObject(socket) {
        this.socket = socket
    }

    playerJoined(id) {
        if (!this.joinedPlayers.you) {
            this.joinedPlayers.you = id
            this.grid.addNewEntity({x: 4, y: 3, type: "baba"})
            this.grid.addNewEntity({x: 1, y: 3, type: "text", value: "baba"})
            this.grid.addNewEntity({x: 1, y: 4, type: "text", value: "is"})
            this.grid.addNewEntity({x: 1, y: 5, type: "text", value: "you"})

            this.sendStateToClients()
        } else if (!this.joinedPlayers.me) {
            this.joinedPlayers.me = id
            this.grid.addNewEntity({x: 4, y: 5, type: "keke"})
            this.grid.addNewEntity({x: 7, y: 3, type: "text", value: "keke"})
            this.grid.addNewEntity({x: 7, y: 4, type: "text", value: "is"})
            this.grid.addNewEntity({x: 7, y: 5, type: "text", value: "me"})

            this.grid.addNewEntity({x: 4, y: 4, type: "flag"})
            this.grid.addNewEntity({x: 2, y: 1, type: "text", value: "flag"})
            this.grid.addNewEntity({x: 3, y: 1, type: "text", value: "is"})
            this.grid.addNewEntity({x: 4, y: 1, type: "text", value: "win"})
            // this.grid.addNewEntity({x: 6, y: 1, type: "text", value: "is"})
            // this.grid.addNewEntity({x: 5, y: 7, type: "text", value: "win"})

            this.sendStateToClients()
        } else {
            return false
        }

        return true
    }
    
    sendStateToClients() {
        this.socket.emit("updateGameState", this.latestState)
    }

    isConnectedPlayer(id) {
        return this.joinedPlayers.you === id ||
               this.joinedPlayers.me === id
    }

    moveCommandIssued(id, direction) {
        const issuingPlayer = this.joinedPlayers.you === id ? "you" : "me"
        if (!this.movementCooldown) {
            this.grid.moveCommandIssued(issuingPlayer, direction)
            this.movementCooldown = true
            this.setMovementCooldownTimer()
            this.checkForLevelWin()
            this.sendStateToClients()
        }
        // players should be able to queue up move commands if movement is on cd
    }

    setMovementCooldownTimer() {
        setTimeout(() => this.movementCooldownEnded(), 1000 / 6)
    }

    movementCooldownEnded() {
        this.movementCooldown = false
    }

    checkForLevelWin() {
        if (this.grid.levelHasBeenWon) {
            if (levels[this.level + 1]) { // this is jank error handling
                this.loadGridForLevel(this.level + 1)
            }
        }
    }
}

module.exports = {
    Game
}