import React from 'react';

import GameBoard from './Connect4Board';

const App = props => {
    return (
        <div className="ui container">
            <GameBoard/>
        </div>
    )
};

export default App;