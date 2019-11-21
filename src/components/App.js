import React, { useReducer } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import GameBoard from './GameBoard';
import GameStateReducer, { initialGameState } from './GameState';
import PlayerSelection from './PlayerSelection';
import PlayerOverlay from './PlayerOverlay';

const App = props => {
    
    const [boardState, updateBoardState ] = useReducer(GameStateReducer, initialGameState);

    return (
        <div className="ui container">
            <BrowserRouter>
                <div className="ui container">
                    <Route path="/" exact component={PlayerSelection} />
                    <Route path="/GameBoard" render={() => <GameBoard gameBoard={boardState} updateBoard={updateBoardState} />} />
                </div>
            </BrowserRouter>
        </div>
    )
};

export default App;