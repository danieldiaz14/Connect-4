import React from 'react';

import PlayerForm from './PlayerForm';
//import Circle from '../svgs/circleSVG';

const PlayerSelection = () => {

    const handleFormSubmission = formSubmission => {
        console.log(formSubmission);
    }
    return (
        <div className="ui container">
            <PlayerForm onSubmit={handleFormSubmission}/>
        </div>
    )
};

export default PlayerSelection;