const { GameGrid } = require("./GameGrid")
const { getLevelLayout, levelLayouts } = require("./data/levels")

class Game {
    constructor(sendStateToClients) {
        this.activeLevel = null
        this.levelsCompleted = {}
        this.levelSelectCursor = 0
        this.joinedPlayers = {you: null, me: null}
        this.resetPlayerReadiness()

        this.grid = null
        // this.initializeLevel(this.level)
        this.movementCooldown = false;

        this.sendStateToClients = sendStateToClients
    }

    resetPlayerReadiness() {
        this.playersReady = {you: false, me: false}
    }

    initializeLevel(level) {
        this.level = level
        this.grid = new GameGrid(getLevelLayout(this.level))
        // this.sendStateToClients()
    }

    get latestState() {
      return this.activeLevel !== null ? {
        activeLevel: this.activeLevel,
        gridState: this.grid
      } : {
        activeLevel: this.activeLevel,
        availableLevels: levelLayouts,
        levelsCompleted: this.levelsCompleted,
        levelSelectCursor: this.levelSelectCursor,
        playersReady: this.playersReady
      }
    }

    playerJoined(id) {
        if (!this.joinedPlayers.you) {
            this.joinedPlayers.you = id
            this.sendStateToClients()
            return "you"
        } else if (!this.joinedPlayers.me) {
            this.joinedPlayers.me = id
            this.sendStateToClients()
            return "me"
        } else {
            return null
        }
    }

    isConnectedPlayer(id) {
        return this.joinedPlayers.you === id ||
               this.joinedPlayers.me === id
    }

    moveCommandIssued(id, direction) {
        const issuingPlayer = this.joinedPlayers.you === id ? "you" : "me"
        if (this.activeLevel !== null) {
            if (!this.movementCooldown) {
                this.grid.moveCommandIssued(issuingPlayer, direction)
                this.movementCooldown = true
                this.setMovementCooldownTimer()
                this.checkForLevelWin()
                this.sendStateToClients()
            }
            // players should be able to queue up move commands if movement is on cd
        } else {
            if (direction === "up" || direction === "down") {
                if (direction === "up") {
                    this.levelSelectCursor--
                    if (this.levelSelectCursor < 0) {
                        this.levelSelectCursor = levelLayouts.length - 1
                    }
                } else if (direction === "down") {
                    this.levelSelectCursor++
                    if (this.levelSelectCursor > levelLayouts.length - 1) {
                        this.levelSelectCursor = 0
                    }
                }
                this.resetPlayerReadiness()
                this.sendStateToClients()
            }
        }
    }

    readyToggled(id, playerIsReady) {
        const issuingPlayer = this.joinedPlayers.you === id ? "you" : "me"
        this.playersReady[issuingPlayer] = playerIsReady
        this.sendStateToClients()
    }

    setMovementCooldownTimer() {
        setTimeout(() => this.movementCooldownEnded(), 1000 / 6)
    }

    movementCooldownEnded() {
        this.movementCooldown = false
    }

    checkForLevelWin() {
        if (this.grid.levelHasBeenWon) {
            if (getLevelLayout(this.level + 1)) { // this is jank error handling
                this.initializeLevel(this.level + 1)
            }
        }
    }
}

module.exports = {
    Game
}