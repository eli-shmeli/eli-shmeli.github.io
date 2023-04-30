import React from 'react';

const GameModeButton = ({ setGameMode, currentGameMode, title, gameMode }) => {

  let dynamicButtonStyle = '';
  if (gameMode === currentGameMode) {
    dynamicButtonStyle = "btn-dark";
  } else {
    dynamicButtonStyle = "btn-secondary";
  }
  
  return (
    <button className={`btn ${dynamicButtonStyle} btn-lg mb-4 mx-1`} onClick={() => setGameMode(gameMode)}>
        {title}
    </button>
  );
}

export default GameModeButton;