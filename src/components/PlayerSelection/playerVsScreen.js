import React from "react";

import PlayerSelection from "./PlayerSelection";

const PlayerVsScreen = (props) => {
  return (
    <div className="ui segment">
      <div className="ui two column very relaxed grid">
        <PlayerSelection />
        <PlayerSelection />
      </div>
      <div className="ui vertical divider">Vs.</div>
    </div>
  );
};

export default PlayerVsScreen;
