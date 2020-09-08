import React from 'react';
import './App.css';
import { useState } from 'react';
import { emptyGameState } from './consts.js'
import { useHistory, Route, Switch, useRouteMatch, useParams } from "react-router-dom";

import WelcomeScreen from './components/WelcomeScreen';
import GameScreen from './components/GameScreen';
import { useEffect } from 'react';

const makeGame = (socket) => {
  socket.emit('makeGame')
}

const joinGame = (socket, gameId) => {
  socket.emit('joinGame', gameId)
}

function App({socket}) {
  const [socketReady, setSocketReady] = useState(false)
  const [gameState, setGameState] = useState(emptyGameState)
  const history = useHistory();
  const match = useRouteMatch("/:gameId")

  const newGameCreated = (gameId) => {
    history.push(`/${gameId}`)
  }

  const gameJoinAttemptFailed = () => {
    history.push(`/`)
  }
  
  const updateGameState = (newGameState) => {
    setGameState(newGameState)
  }

  socket.on('connect', () => setSocketReady(true));
  socket.on('updateGameState', updateGameState)
  socket.on('newGameCreated', newGameCreated)
  socket.on('gameJoinAttemptFailed', gameJoinAttemptFailed)

  useEffect(() => {
    if (match !== null) {
      const gameId = match.params.gameId
      joinGame(socket, gameId)
    }
  }, match ? [match.params.gameId] : [""])

  return (
    <Switch>
      <Route path="/:gameId" children={<GameScreen socketReady={socketReady} gameState={gameState} socket={socket} />} />
      <Route path="/" children={<WelcomeScreen socketReady={socketReady} makeGame={() => makeGame(socket)} />} />
    </Switch>
  );
}

export default App;
