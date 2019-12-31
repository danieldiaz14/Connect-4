import React, { useState } from 'react';
import FormError from './FormError';
import validPlayerNames from './errorUtil';

const PlayerForm = props => {
    const [player, updatePlayer ] = useState("");
    const [error, updateError ] = useState({
        isError: false,
        errorHeader: "",
        errorMessage: ""
    });

    const handleChange = e => {
        updatePlayer(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
        const checkForError = validPlayerNames(player);
        updateError(checkForError);
        if (!checkForError.isError) {
            props.onSubmit(player)
        }
    };

    const renderErrorMessage = () => {
        const {isError, errorHeader, errorMessage} = error;
        if (isError) return <FormError onClose={closeErrorBox} errorHeader={errorHeader} errorMessage={errorMessage}/>
    };

    const closeErrorBox = () => updateError({...error, isError: false});
    
    return (
        <form className="ui form" onSubmit={handleSubmit}>
            <div className="equal width fields">
                <div className="field">
                    <label>{player.length < 1 ? "Player" : player}</label>
                    <input type="text" placeholder="Player" value={player} onChange={handleChange} autoComplete="off"/>
                </div>
            </div>
            <button className="ui button primary" type="submit">Confirm</button>
            {renderErrorMessage()}
        </form>
    )
};

export default PlayerForm;