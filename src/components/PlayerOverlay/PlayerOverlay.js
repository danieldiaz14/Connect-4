import React from "react";

const PlayerOverlay = (props) => {
  const { player1, player2, score1, score2 } = props;
  return (
    <div className="ui segment">
      <div className="ui two column grid">
        <div className="column">
          <h1 className="ui header">{player1}</h1>
          <h2 className="ui header">Score: {score1}</h2>
        </div>
        <div className="column">
          <h1 className="ui header">{player2}</h1>
          <h2 className="ui header">Score: {score2}</h2>
        </div>
      </div>
    </div>
  );
};

export default PlayerOverlay;
