import React from 'react';
import GridTransitionWrapper from './GridTransitionWrapper';

const LevelSelectScreen = ({gameState}) => {
  return (
    <div style={styles.listContainer}>
      <div style={styles.levelsList}>
        {gameState.availableLevels.map((level, levelIndex) => (
          <LevelRow
            key={levelIndex}
            levelName={level.name}
            active={levelIndex === gameState.levelSelectCursor}
            playersReady={gameState.playersReady}
          />
        ))}
      </div>
      <div style={styles.levelPreview}>
          <GridTransitionWrapper
            gameState={{
              gridState: gameState.availableLevels[gameState.levelSelectCursor],
              level: gameState.levelSelectCursor
            }}
            scale={0.3}
            transitionTime={0.3}
          />
      </div>
    </div>
  )
}

const LevelRow = ({levelName, active, playersReady}) => {
  console.log(playersReady)
  return (
    <div style={styles.levelRow}>
      <ReadyIndicator imageName="baba" ready={active && playersReady.you} />
      <div style={{...styles.level, ...(active ? styles.activeLevel : {}) }}>
        {levelName}
      </div>
      <ReadyIndicator imageName="keke" ready={active && playersReady.me}/>
    </div>
  )
}

const ReadyIndicator = ({imageName, ready}) => {
  console.log(ready)
  return (
    <div className={ready ? "ready-indicator-pop-in" : ""} style={{...styles.readyIndicatorContainer, ...(!ready ? {visibility: "hidden"} : {})}}>
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
    // marginBottom: "5px",
    padding: "10px",
    // width: "100%",

    borderWidth: "1px",
    borderStyle: "dotted",
    borderColor: "#130d3636",
    borderRadius: "5px",
    backgroundColor: "#8e44ad",

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