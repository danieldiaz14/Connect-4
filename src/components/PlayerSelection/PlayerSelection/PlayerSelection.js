import React from "react";

import PlayerForm from "./PlayerForm";
import PlayerColorGrid from "../PlayerColorGrid/PlayerColorGrid";

const PlayerSelection = ({ player, updatePlayer }) => {
  const handleFormSubmission = formSubmission => {
    console.log(formSubmission);
  };

  const handleColorPick = colorPicked => {
    console.log(colorPicked);
  };

  return (
    <div className="column">
      <PlayerForm
        onSubmit={handleFormSubmission}
        player={player}
        updatePlayer={updatePlayer}
      />
      <div className="ui divider" />
      <PlayerColorGrid handleClick={handleColorPick} player={player} />
    </div>
  );
};

export default PlayerSelection;
