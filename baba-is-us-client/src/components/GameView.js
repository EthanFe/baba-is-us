import React from 'react';
import { movementKeys } from '../consts.js'
import ActiveLevelScreen from './ActiveLevelScreen';
import LevelSelectScreen from './LevelSelectScreen.js';

const GameView = ({socketReady, gameState, socket, playingAs}) => {
  const keyPressed = (key) => {
    if (movementKeys[key]) {
      socket.emit('move', movementKeys[key])
    }
    if (key === "Enter") {
      socket.emit('ready', !gameState.playersReady[playingAs])
    }
  }

  return (
    <div className="wrapper-thing" tabIndex={0} onKeyDown={({key}) => keyPressed(key)}>
      {socketReady ? (
        gameState.activeLevel !== null ?
        <ActiveLevelScreen gameState={gameState}/> :
        <LevelSelectScreen gameState={gameState}/>
        ) : "connecting..."}
    </div>
  )
}

export default GameView;


