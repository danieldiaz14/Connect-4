import React, { useReducer } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import GameBoard from "./GameBoard";
import GameStateReducer, { initialGameState } from "./GameState";
import PlayerSelection from "./PlayerSelection";
import PlayerOverlay from "./PlayerOverlay";

const PlayerInfoReducer = (state, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

const App = (props) => {
  const [boardState, updateBoardState] = useReducer(
    GameStateReducer,
    initialGameState
  );
  const [playerInformation, updatePlayerInformation] = useReducer(
    PlayerInfoReducer,
    {}
  );

  return (
    <div className="ui container">
      <BrowserRouter>
        <div className="ui container">
          <Route
            path="/"
            exact
            render={() => (
              <PlayerSelection
                playerInformation={playerInformation}
                updatePlayerInfo={updatePlayerInformation}
              />
            )}
          />
          <Route
            path="/GameBoard"
            exact
            render={() => (
              <GameBoard
                gameBoard={boardState}
                updateBoard={updateBoardState}
              />
            )}
          />
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
