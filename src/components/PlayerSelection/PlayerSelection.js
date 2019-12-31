import React from 'react';

import PlayerForm from './PlayerForm';
import PlayerColor from './PlayerColor';

const PlayerSelection = (props) => {
    const colors = ["red", "blue", "yellow", "teal", "green"];

    const handleFormSubmission = formSubmission => {
        console.log(formSubmission);
    };

    const handleColorPick = colorPicked => {
        console.log(colorPicked)
    }

    return (
        <div className="ui segment">
            <div className="ui two column very relaxed grid">
                <div className="column">
                    <PlayerForm onSubmit={handleFormSubmission}/>
                    <PlayerColor colors={colors} handleClick={handleColorPick}/>
                </div>
                <div className="column">
                    <PlayerForm onSubmit={handleFormSubmission}/>
                    <PlayerColor colors={colors} handleClick={handleColorPick}/>
                </div>
               
            </div>
            <div className="ui vertical divider">Vs.</div>
        </div>
    )
};

export default PlayerSelection;