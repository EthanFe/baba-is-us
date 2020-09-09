import React from 'react';
import Grid from './Grid';

const ActiveLevelScreen = ({gameState}) => {
  return (
    <Grid gameState={gameState.gridState}/>
  );
}

export default ActiveLevelScreen


    // <GridTransitionWrapper gameState={gameState}/>