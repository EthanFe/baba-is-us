import React from 'react';

const WelcomeView = ({makeGame, socketReady}) => {
  return (
    <div>
      <div>hi</div>
      {socketReady ? <button onClick={makeGame}>make a game! whee!</button> : "connecting..."}
    </div>
  )
}

export default WelcomeView;