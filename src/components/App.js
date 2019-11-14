import React from 'react';

import GameBoard from './Connect4Board';
import PlayerOverlay from './PlayerOverlay';

const App = props => {
    return (
        <div className="ui container">
            <PlayerOverlay player1="Daniel" player2="Jessica" score1={0} score2={0}/>
            <GameBoard/>
        </div>
    )
};

export default App;