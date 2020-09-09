import React, { useContext } from 'react';
import Grid from './Grid';
import GameStateContext from './GameStateContext';

const ActiveLevelScreen = () => {
  const gameState = useContext(GameStateContext)
  return (
    <Grid gameState={gameState.gridState}/>
  );
}

export default ActiveLevelScreen


    // <GridTransitionWrapper gameState={gameState}/>