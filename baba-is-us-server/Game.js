const { GameGrid } = require("./GameGrid")
const { getLevelLayout, levelLayouts } = require("./data/levels")

class Game {
    constructor(sendStateToClients) {
        this.activeLevel = null
        this.levelsCompleted = {}
        this.levelSelectCursor = 0
        this.players = {you: {id: null, ready: false}, me: {id: null, ready: false}}

        this.grid = null
        this.movementCooldown = false;
        this.levelStartTimer = null

        this.sendStateToClients = sendStateToClients
    }

    resetPlayerReadiness() {
        this.players.you.ready = false
        this.players.me.ready = false
    }

    launchLevel() {
        this.activeLevel = this.levelSelectCursor
        this.resetPlayerReadiness()
        this.grid = new GameGrid(getLevelLayout(this.activeLevel))
        this.sendStateToClients()
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
        playersReady: {you: this.players.you.ready, me: this.players.me.ready}
      }
    }

    playerJoined(id) {
        if (this.players.you.id === null) {
            this.players.you.id = id
            this.sendStateToClients()
            return "you"
        } else if (this.players.me.id === null) {
            this.players.me.id = id
            this.sendStateToClients()
            return "me"
        } else {
            return null
        }
    }

    playerIdentityFromId(id) {
        return this.players.you.id === id ? "you" : "me"
    }

    moveCommandIssued(id, direction) {
        const issuingPlayer = this.playerIdentityFromId(id)
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

    setMovementCooldownTimer() {
        setTimeout(() => this.movementCooldownEnded(), 1000 / 6)
    }

    movementCooldownEnded() {
        this.movementCooldown = false
    }

    readyToggled(id, playerIsReady) {
        const issuingPlayer = this.playerIdentityFromId(id)
        this.players[issuingPlayer].ready = playerIsReady
        if (this.playersAreReady) {
            this.beginLevelStartTimer()
        } else if (this.levelStartTimer !== null) {
            clearTimeout(this.levelStartTimer)
            this.levelStartTimer = null
        }
        this.sendStateToClients()
    }

    get playersAreReady() {
        return this.players.you.ready && this.players.me.ready
    }

    beginLevelStartTimer() {
        this.levelStartTimer = setTimeout(() => {
            this.launchLevel()
        }, 2000)
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