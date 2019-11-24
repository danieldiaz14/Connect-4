import React, { useState } from 'react';
import FormError from './FormError';

const PlayerForm = props => {
    const [firstPlayer, updateFirstPlayer ] = useState("");
    const [secondPlayer, updateSecondPlayer ] = useState("");

    const handleChange = e => {
        const updateWith = e.target.name === "firstPlayer" ? updateFirstPlayer : updateSecondPlayer;
        updateWith(e.target.value);
    };

    const handleSubmit = e => {
        e.preventDefault();
    }

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
            <button className="ui button primary" type="submit"> Confirm </button>
        </form>
    )
};

export default PlayerForm;