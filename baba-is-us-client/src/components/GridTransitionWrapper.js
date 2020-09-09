import React from 'react';
import Grid from './Grid';
import { useState } from 'react';
import { useEffect } from 'react';

const GridTransitionWrapper = ({gameState, scale, transitionTime}) => {

  const [gridState, setGridState] = useState(null)
  const [currentLevel, setCurrentLevel] = useState(null)
  const [transitionState, setTransitionState] = useState("maximized")

  useEffect(() => {
    if (currentLevel !== gameState.level) {
      setCurrentLevel(gameState.level)
      setTransitionState("minimized")
      setTimeout(() => {
        setGridState(gameState.gridState)
      }, 500 * transitionTime)
      setTimeout(() => {
        setTransitionState("maximized")
      }, 1000 * transitionTime)
    } else if (transitionState === "maximized") {
      setGridState(gameState.gridState)
    }
  })

  return (
    <div style={{transform: `scale(${scale})`}}>
      <div className={"grid-transition-wrapper " + transitionState} style={{transition: `all ${transitionTime}s`}}>
        {gridState !== null ? <Grid gameState={gridState}/> : null }
      </div>
    </div>
  );

}

export default GridTransitionWrapper