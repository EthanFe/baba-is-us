import React from 'react';
import Grid from './Grid';
import { useState } from 'react';
import { useEffect } from 'react';

const GridTransitionWrapper = ({gameState}) => {

  const [gridState, setGridState] = useState(null)
  const [currentLevel, setCurrentLevel] = useState(null)
  const [transitionState, setTransitionState] = useState("maximized")

  useEffect(() => {
    if (currentLevel !== gameState.level) {
      setCurrentLevel(gameState.level)
      setTransitionState("minimized")
      setTimeout(() => {
        setGridState(gameState.gridState)
      }, 500)
      setTimeout(() => {
        setTransitionState("maximized")
      }, 1000)
    } else if (transitionState === "maximized") {
      setGridState(gameState.gridState)
    }
  })

  return (
    <div className={"grid-transition-wrapper " + transitionState}>
      {gridState !== null ? <Grid gameState={gridState}/> : null }
    </div>
  );

}

  export default GridTransitionWrapper