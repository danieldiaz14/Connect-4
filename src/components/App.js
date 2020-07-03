import React, { useReducer } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import GameBoard from "./GameBoard";
import GameStateReducer, { initialGameState } from "./GameState";
import PlayerSelection from "./PlayerSelection";
import PlayerOverlay from "./PlayerOverlay";

export const PlayerInfoContext = React.createContext();

const App = props => {
  const [boardState, updateBoardState] = useReducer(
    GameStateReducer,
    initialGameState
  );

  const [state, dispatch] = useReducer(PlayerInfoReducer, defaultPlayerState);
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

const defaultPlayerState = {
  firstPlayer: {
    playerName: "",
    colorPicked: ""
  },
  secondPlayer: {
    playerName: "",
    colorPicked: ""
  }
};

const PlayerInfoReducer = (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case "updatePlayerOne":
      return {
        ...state,
        firstPlayer: {
          playerName: payload
        }
      };
    case "updatePlayerTwo":
      return {
        ...state,
        secondPlayer: {
          playerName: payload
        }
      };
    default:
      return state;
  }
};

export default App;
