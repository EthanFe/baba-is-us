import React from 'react';
import './App.css';
import { useState } from 'react';
import { useHistory, Route, Switch, useRouteMatch } from "react-router-dom";

import WelcomeView from './components/WelcomeView';
import GameView from './components/GameView';
import { useEffect } from 'react';

const makeGame = (socket) => {
  socket.emit('makeGame')
}

const joinGame = (socket, gameId) => {
  socket.emit('joinGame', gameId)
}

function App({socket}) {
  const [socketReady, setSocketReady] = useState(false)
  const [gameState, setGameState] = useState(null)
  const [playingAs, setPlayingAs] = useState(null)
  const history = useHistory();
  const match = useRouteMatch("/:gameId")

  const newGameCreated = (gameId) => {
    history.push(`/${gameId}`)
  }

  const gameJoinResult = (joinedAs) => {
    if (joinedAs === null) {
      history.push(`/`)
    } else {
      setPlayingAs(joinedAs)
    }
  }
  
  const updateGameState = (newGameState) => {
    setGameState(newGameState)
  }

  socket.on('connect', () => setSocketReady(true));
  socket.on('updateGameState', updateGameState)
  socket.on('newGameCreated', newGameCreated)
  socket.on('gameJoinResult', gameJoinResult)

  useEffect(() => {
    if (match !== null) {
      const gameId = match.params.gameId
      joinGame(socket, gameId)
    }
  }, match ? [match.params.gameId] : [""])

  return (
    <Switch>
      <Route path="/:gameId" children={<GameView socketReady={socketReady} gameState={gameState} socket={socket} playingAs={playingAs}/>} />
      <Route path="/" children={<WelcomeView socketReady={socketReady} makeGame={() => makeGame(socket)} />} />
    </Switch>
  );
}

export default App;
