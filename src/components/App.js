import React, { useReducer } from "react";
import { BrowserRouter, Route } from "react-router-dom";

//import GameBoard from "./GameBoard";
import GameStateReducer, { initialGameState } from "../reducers/gameReducer";
import PlayerStateReducer, {
  initalPlayerState
} from "../reducers/playerReducer";
import PlayerVsScreen from "./PlayerSelection";

export const PlayerInfoContext = React.createContext();

const App = () => {
  const [boardState, updateBoardState] = useReducer(
    GameStateReducer,
    initialGameState
  );

  const [playerState, dispatch] = useReducer(
    PlayerStateReducer,
    initalPlayerState
  );
  return (
    <div className="ui container">
      <BrowserRouter>
        <div className="ui container">
          <Route
            path="/"
            exact
            render={() => (
              <PlayerInfoContext.Provider value={{ playerState, dispatch }}>
                <PlayerVsScreen />
              </PlayerInfoContext.Provider>
            )}
          />
          {/* <Route
            path="/GameBoard"
            exact
            render={() => (
              <GameBoard
                gameBoard={boardState}
                updateBoard={updateBoardState}
              />
            )}
          /> */}
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
