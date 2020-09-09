import React from 'react';
import TransitionWrapper from './TransitionWrapper';
import Grid from './Grid';
import { combineStyles } from '../utils';

const LevelSelectScreen = ({gameState}) => {
  return (
    <div style={styles.listContainer}>
      <div style={styles.levelsList}>
        {gameState.availableLevels.map((level, levelIndex) => (
          <LevelRow
            key={levelIndex}
            level={level}
            active={levelIndex === gameState.levelSelectCursor}
            playersReady={gameState.playersReady}
          />
        ))}
      </div>
      <div style={styles.levelPreview}>
        <GridTransitionWrapper
          levelNumber={gameState.levelSelectCursor}
          gridState={gameState.availableLevels[gameState.levelSelectCursor]}
        />
      </div>
    </div>
  )
}

const LevelRow = ({level, active, playersReady}) => {
  const readyToLaunch = playersReady.you && playersReady.me && active
  const className = (readyToLaunch ? "ready-level-pulse" : "") + (active ? " active-level-pulse" : "")
  return (
    <div style={styles.levelRow}>
      <ReadyIndicator imageName="baba" ready={active && playersReady.you} />
      <div
        className={className}
        style={combineStyles([
          styles.level,
          {if: active, thenUse: styles.activeLevel},
          {if: readyToLaunch, thenUse: styles.readyLevel},
          {if: level.completed, thenUse: styles.completedLevel}
        ])}
      >
        {level.name}
      </div>
      <ReadyIndicator imageName="keke" ready={active && playersReady.me}/>
    </div>
  )
}

const ReadyIndicator = ({imageName, ready}) => {
  return (
    <div className={ready ? "ready-indicator-pop-in" : ""} style={combineStyles([
        styles.readyIndicatorContainer,
        {if: !ready, thenUse: {visibility: "hidden"} }
      ])}>
      <div className="ready-indicator-durdle" style={styles.readyIndicatorImageWrapper}>
        <img 
          style={styles.readyIndicatorImage}
          src={require(`../images/${imageName}.png`)}
          alt=""
        />
      </div>
      <div style={styles.readyIndicatorText}>ready!</div>
    </div>
  )
}

const GridTransitionWrapper = ({levelNumber, gridState}) => {
  return (
    <TransitionWrapper diffData={levelNumber} scale={0.3} transitionTime={0.45} transitionInitially={true}>
      <Grid gameState={gridState}/>
    </TransitionWrapper>
  );
}

const styles = {
  listContainer: {
    margin: "auto",
    width: "80vw",
    height: "500px",
    marginTop: "5vh",
    padding: "10px",

    borderWidth: "1px",
    borderStyle: "dotted",
    borderColor: "#130d3636",
    borderRadius: "5px",
    backgroundColor: "#2c3e50",

    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
  },

  levelRow: {
    display: "flex",
    flexFlow: "row",
    justifyContent: "center",
    width: "100%",
  },

  level: {
    flex: 1,
    margin: "5px",
    padding: "10px",

    borderWidth: "1px",
    borderStyle: "solid",
    borderColor: "#130d3636",
    borderRadius: "5px",
    backgroundColor: "#8e44ad",
    transition: "background-color 0.3s cubic-bezier(0.37, 0, 0.63, 1)",

    display: "flex",
    flexFlow: "column",
    justifyContent: "center",
    textAlign: "center"
  },

  readyIndicatorImageWrapper: {
    flex: .2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },

  readyIndicatorContainer: {
    display: "flex",
    flexFlow: "column"
  },

  readyIndicatorText: {
    fontFamily: "'Rokkitt', serif",
    color: "#2ecc71"
  },

  readyIndicatorImage: {
    width: "32px",
    height: "32px"
  },

  activeLevel: {
    backgroundColor: "#C798DA",
  },

  readyLevel: {
    backgroundColor: "#2ecc71",
  },

  completedLevel: {
    borderColor: "#f1c40f",
    borderWidth: "3px",
    borderRadius: "3px",
  },

  levelsList: {
    margin: "0px 15px",
    display: "flex",
    flexFlow: "column",
    alignItems: "center",
    flex: 6 
  },

  levelPreview: {
    flex: 4,
    width: "0px",
    justifyContent: "center",
    alignItems: "center",
    display: "flex"
  },
}

export default LevelSelectScreen;