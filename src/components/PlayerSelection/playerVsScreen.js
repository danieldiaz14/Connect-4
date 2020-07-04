import React from "react";
import { Link } from "react-router-dom";

import PlayerSelection from "./PlayerSelection/PlayerSelection";

const PlayerVsScreen = props => {
  return (
    <div className="ui segment">
      <div className="ui two column very relaxed grid">
        <PlayerSelection player="firstPlayer" />
        <PlayerSelection player="secondPlayer" />
      </div>
      <div className="ui vertical divider">Vs.</div>
    </div>
  );
};

export default PlayerVsScreen;
