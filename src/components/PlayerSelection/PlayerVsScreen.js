import React from "react";

import PlayerSelection from "./PlayerSelection/PlayerSelection";
import {
  updatePlayerOneName,
  updatePlayerOneColor,
  undoPlayerOne,
  updatePlayerTwoName,
  updatePlayerTwoColor,
  undoPlayerTwo
} from "../../actions/index";

const PlayerVsScreen = () => {
  return (
    <div className="ui segment">
      <div className="ui two column very relaxed grid">
        <PlayerSelection
          player="firstPlayer"
          updateName={updatePlayerOneName}
          updateColor={updatePlayerOneColor}
          undoPlayer={undoPlayerOne}
        />
        <PlayerSelection
          player="secondPlayer"
          updateName={updatePlayerTwoName}
          updateColor={updatePlayerTwoColor}
          undoPlayer={undoPlayerTwo}
        />
      </div>
      <div className="ui vertical divider">Vs.</div>
    </div>
  );
};

export default PlayerVsScreen;
