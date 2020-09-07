const { Game } = require("./Game")

const game = new Game()

const startServer = () => {
  const port = process.env.PORT || '3000'
  const server = require('socket.io').listen(port);

  game.setSocketObject(server)

  server.on('connection', (socket) => {
    console.log(`New client connected, creating socket connection with socket id ${socket.id}`)
    const wasRoomToJoin = game.playerJoined(socket.id)
    if (!wasRoomToJoin) {
      // do something to make them a spectator or make a new game or something, idk i didn't actually think this through
    }
    sendInitialDataToConnectingClient(socket)
    registerSocketEvents(socket)
  });

  console.log("Socket is ready.")

  return server
}

function sendInitialDataToConnectingClient(socket) {
  socket.emit("updateGameState", game.latestState)
}

function registerSocketEvents(socket) {
  socket.on("move", (direction) => {
    if (game.isConnectedPlayer(socket.id)) {
      game.moveCommandIssued(socket.id, direction)
    }
  })
}

const server = startServer()