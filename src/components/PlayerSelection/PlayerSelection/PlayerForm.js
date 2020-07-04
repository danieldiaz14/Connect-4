import React, { useState, useContext } from "react";
import FormError from "./FormError";
import validPlayerNames from "../utils/errorUtil";
import { PlayerInfoContext } from "../../App";

const PlayerForm = props => {
  const [error, updateError] = useState({
    isError: false,
    isReady: false,
    errorHeader: "",
    errorMessage: ""
  });

  const PlayerInfo = useContext(PlayerInfoContext);
  const { state } = PlayerInfo;
  const playerName = state[props.player].playerName;
  const handleChange = e => {
    const type =
      props.player === "firstPlayer" ? "updatePlayerOne" : "updatePlayerTwo";
    PlayerInfo.dispatch({
      type,
      payload: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const checkForError = validPlayerNames(playerName);
    updateError(checkForError);
    if (!checkForError.isError) {
      props.onSubmit(playerName);
    }
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
      <button className="ui button primary" type="submit">
        Confirm
      </button>
      <button className="ui button negative" type="button">
        Undo
      </button>
      {renderErrorMessage()}
    </form>
  );
};

export default PlayerForm;
