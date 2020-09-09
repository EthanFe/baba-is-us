import React from 'react';
import GridTransitionWrapper from './GridTransitionWrapper';

const ActiveLevelScreen = ({gameState}) => {
  return (
    <GridTransitionWrapper gameState={gameState}/>
  );
}

export default ActiveLevelScreen