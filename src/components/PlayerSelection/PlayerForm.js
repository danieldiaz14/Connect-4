import React, { useState } from 'react';
import FormError from './FormError';
import checkForError from './errorUtil';

const PlayerForm = props => {
    const [firstPlayer, updateFirstPlayer ] = useState("");
    const [secondPlayer, updateSecondPlayer ] = useState("");
    const [error, updateError ] = useState({
        isError: false,
        errorHeader: "",
        errorMessage: ""
    });

    const handleChange = e => {
        const updatePlayer = e.target.name === "firstPlayer" ? updateFirstPlayer : updateSecondPlayer;
        updatePlayer(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        updateError(checkForError({firstPlayer, secondPlayer}));
    };

    const renderErrorMessage = () => {
        const {isError, errorHeader, errorMessage} = error;
        if (isError) return <FormError errorHeader={errorHeader} errorMessage={errorMessage}/>
    };

    
    return (
        <form className="ui form" onSubmit={handleSubmit}>
            <div className=" equal width fields">
                <div className="field">
                    <label>Player 1 name:</label>
                    <input type="text" name="firstPlayer" placeholder="Player 1" value={firstPlayer} onChange={handleChange} autoComplete="off"/>
                </div>
                <div className="field">
                    <label>Player 2 name:</label>
                    <input type="text" name="secondPlayer" placeholder="Player 2" value={secondPlayer} onChange={handleChange} autoComplete="off"/>
                </div>
            </div>
            <button className="ui button primary" type="submit">Confirm</button>
            {renderErrorMessage()}
        </form>
    )
};

export default PlayerForm;