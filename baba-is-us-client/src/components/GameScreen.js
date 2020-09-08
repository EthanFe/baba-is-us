import React from 'react';
import { movementKeys } from '../consts.js'
import GridTransitionWrapper from './GridTransitionWrapper';

const keyPressed = (key, socket) => {
  if (movementKeys[key]) {
    socket.emit('move', movementKeys[key])
  }
}

const GameScreen = ({socketReady, gameState, socket}) => {
  return (
    <div tabIndex={0} onKeyDown={({key}) => keyPressed(key, socket)}>
      {socketReady ? <GridTransitionWrapper gameState={gameState}/> : "connecting..."}
    </div>
  )
}

export default GameScreen;


