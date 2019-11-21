import React, { useReducer } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';

import GameBoard from './GameBoard';
import PlayerSelection from './PlayerSelection';
import PlayerOverlay from './PlayerOverlay';

const App = props => {
    return (
        <div className="ui container">
            <BrowserRouter>
                <div className="ui container">
                    <Route path="/" exact component={PlayerSelection} />
                    <Route path="/GameBoard" component={GameBoard} />
                </div>
            </BrowserRouter>
        </div>
    )
};

export default App;