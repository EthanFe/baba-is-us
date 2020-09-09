import React from 'react';
import { movementKeys } from '../consts.js'
import ActiveLevelScreen from './ActiveLevelScreen';
import LevelSelectScreen from './LevelSelectScreen.js';
import TransitionWrapper from './TransitionWrapper.js';
import GameStateContext from './GameStateContext.js';

const GameView = ({socketReady, gameState, socket, playingAs}) => {
  const keyPressed = (key) => {
    if (movementKeys[key]) {
      socket.emit('move', movementKeys[key])
    }
    if (key === "Enter") {
      socket.emit('ready', !gameState.playersReady[playingAs])
    }
  }

  if (!socketReady) {
    return <div>connecting...</div>
  }

  return (
    <div className="wrapper-thing" tabIndex={0} onKeyDown={({key}) => keyPressed(key)}>
        <TransitionWrapper diffData={gameState.activeLevel} scale={1} transitionTime={1} transitionInitially={false}>
          <GameStateContext.Provider value={gameState}>
            {gameState.activeLevel !== null ?
            <ActiveLevelScreen/> :
            <LevelSelectScreen/>}
          </GameStateContext.Provider>
        </TransitionWrapper>
    </div>
  )
}

export default GameView;