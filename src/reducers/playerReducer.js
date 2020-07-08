import {
  UPDATE_PLAYER_ONE_NAME,
  UPDATE_PLAYER_TWO_NAME
} from "../actions/types";

import {
  getPlayerOneColor,
  getPlayerTwoColor
} from "../selectors/playerSelectors";

export const initalPlayerState = {
  firstPlayer: {
    playerName: "",
    colorPicked: ""
  },
  secondPlayer: {
    playerName: "",
    colorPicked: ""
  }
};

export default (state, action) => {
  const payload = action.payload;
  switch (action.type) {
    case UPDATE_PLAYER_ONE_NAME:
      return {
        ...state,
        firstPlayer: {
          playerName: payload,
          colorPicked: getPlayerOneColor(state)
        }
      };
    case UPDATE_PLAYER_TWO_NAME:
      return {
        ...state,
        secondPlayer: {
          playerName: payload,
          colorPicked: getPlayerTwoColor(state)
        }
      };
    default:
      return state;
  }
};
