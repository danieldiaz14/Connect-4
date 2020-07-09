import React from "react";

import PlayerForm from "./PlayerForm";
import PlayerColorGrid from "../PlayerColorGrid/PlayerColorGrid";

const PlayerSelection = ({ player, updateName, updateColor, undoPlayer }) => {
  const handleFormSubmission = formSubmission => {
    console.log(formSubmission);
  };

  return (
    <div className="column">
      <PlayerForm
        onSubmit={handleFormSubmission}
        player={player}
        updateName={updateName}
        undoPlayer={undoPlayer}
      />
      <div className="ui divider" />
      <PlayerColorGrid player={player} updateColor={updateColor} />
    </div>
  );
};

export default PlayerSelection;
