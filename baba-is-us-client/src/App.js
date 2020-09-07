import React from 'react';
import './App.css';
import { useState } from 'react';
import GridTransitionWrapper from './components/GridTransitionWrapper';
import { emptyGameState, movementKeys } from './consts.js'

const keyPressed = (key, socket) => {
  if (movementKeys[key]) {
    socket.emit('move', movementKeys[key])
  }
}

function App({socket}) {
  const [socketReady, setSocketReady] = useState(false)
  const [gameState, setGameState] = useState(emptyGameState)
  
  const updateGameState = (newGameState) => {
    setGameState(newGameState)
  }

  socket.on('connect', () => setSocketReady(true));
  socket.on('updateGameState', updateGameState)

  return (
    <div tabIndex={0} onKeyDown={({key}) => keyPressed(key, socket)}>
      {socketReady ? <GridTransitionWrapper gameState={gameState}/> : "connecting..."}
    </div>
  );
}

export default App;
