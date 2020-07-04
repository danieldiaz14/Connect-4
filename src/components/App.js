import React, { useReducer } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import GameBoard from "./GameBoard";
import GameStateReducer, { initialGameState } from "./GameState";
import PlayerStateReducer, { initalPlayerState } from "./PlayerState";
import PlayerSelection from "./PlayerSelection";

export const PlayerInfoContext = React.createContext();

const App = () => {
  const [boardState, updateBoardState] = useReducer(
    GameStateReducer,
    initialGameState
  );

  const [state, dispatch] = useReducer(PlayerStateReducer, initalPlayerState);
  return (
    <div className="ui container">
      <BrowserRouter>
        <div className="ui container">
          <Route
            path="/"
            exact
            render={() => (
              <PlayerInfoContext.Provider value={{ state, dispatch }}>
                <PlayerSelection />
              </PlayerInfoContext.Provider>
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
