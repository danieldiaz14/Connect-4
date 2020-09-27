import React, { useState, useContext } from "react";
import FormError from "./FormError";
import validPlayerNames from "../utils/errorUtil";
import { PlayerInfoContext } from "../../App";

const renderButtons = (playerState, onClickEvents) => {
  const { onSubmit, onUndo } = onClickEvents;
  const { playerName, colorPicked } = playerState;
  const checkNameAndColor = playerName.length > 0 || colorPicked.length < 8;
  if (checkNameAndColor) {
    return (
      <div>
        <button className="ui button primary" type="submit" onClick={onSubmit}>
          Confirm
        </button>
        <button className="ui button negative" type="button" onClick={onUndo}>
          Undo
        </button>
      </div>
    );
  }
};
const PlayerForm = ({ player, onSubmit, updateName, undoPlayer }) => {
  const [error, updateError] = useState({
    isError: false,
    isReady: false,
    errorHeader: "",
    errorMessage: ""
  });
  const playerInfo = useContext(PlayerInfoContext);
  const playerName = playerInfo.playerState[player].playerName;
  const handleChange = e => {
    updateName(playerInfo, e.target.value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const checkForError = validPlayerNames(playerName);
    updateError(checkForError);
    if (!checkForError.isError) {
      onSubmit(playerName);
    }
  };

  const handleUndo = () => {
    undoPlayer(playerInfo);
  };

  const renderErrorMessage = () => {
    const { isError, errorHeader, errorMessage } = error;
    if (isError)
      return (
        <FormError
          onClose={closeErrorBox}
          errorHeader={errorHeader}
          errorMessage={errorMessage}
        />
      );
  };

  const closeErrorBox = () => updateError({ ...error, isError: false });
  const renderName = !playerName.length ? "Player" : playerName;
  return (
    <form className="ui form" onSubmit={handleSubmit}>
      <div className="equal width fields">
        <div className="field">
          <label>
            <h1>{renderName}</h1>
          </label>
          <input
            type="text"
            placeholder="Player"
            value={playerName}
            onChange={handleChange}
            autoComplete="off"
          />
        </div>
      </div>
      {renderButtons(playerInfo.playerState[player], {
        onSubmit: () => console.log("confirm"),
        onUndo: handleUndo
      })}
      {renderErrorMessage()}
    </form>
  );
};

export default PlayerForm;
