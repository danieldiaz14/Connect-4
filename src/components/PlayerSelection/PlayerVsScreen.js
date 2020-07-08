import React from "react";
import { Link } from "react-router-dom";

import PlayerSelection from "./PlayerSelection/PlayerSelection";
import { updatePlayerOne, updatePlayerTwo } from "../../actions/index";
const PlayerVsScreen = props => {
  return (
    <div className="ui segment">
      <div className="ui two column very relaxed grid">
        <PlayerSelection player="firstPlayer" updatePlayer={updatePlayerOne} />
        <PlayerSelection player="secondPlayer" updatePlayer={updatePlayerTwo} />
      </div>
      <div className="ui vertical divider">Vs.</div>
    </div>
  );
};

export default PlayerVsScreen;
