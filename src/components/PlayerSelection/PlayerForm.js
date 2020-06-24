import React, { useState } from "react";
import FormError from "./FormError";
import validPlayerNames from "./errorUtil";

// Utilize the confirmation and undo. Once the conditions of playername being filled, colored pick and no errors. Render the submit button.
const PlayerForm = (props) => {
  const [player, updatePlayer] = useState("");
  const [error, updateError] = useState({
    isError: false,
    isReady: false,
    errorHeader: "",
    errorMessage: "",
  });

  const handleChange = (e) => {
    updatePlayer(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const checkForError = validPlayerNames(player);
    updateError(checkForError);
    if (!checkForError.isError) {
      props.onSubmit(player);
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
  const renderName = !player.length ? "Player" : player;

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
            value={player}
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
