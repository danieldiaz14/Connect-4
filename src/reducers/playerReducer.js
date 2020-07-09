import {
  UPDATE_PLAYER_ONE_NAME,
  UPDATE_PLAYER_ONE_COLOR,
  UPDATE_PLAYER_TWO_NAME,
  UPDATE_PLAYER_TWO_COLOR
} from "../actions/types";

import {
  getPlayerOneName,
  getPlayerOneColor,
  getPlayerTwoName,
  getPlayerTwoColor
} from "../selectors/playerSelectors";

import { COLOR_CHOICES as colors } from "../components/PlayerSelection/constants";

export const initalPlayerState = {
  firstPlayer: {
    playerName: "",
    colorPicked: [...colors]
  },
  secondPlayer: {
    playerName: "",
    colorPicked: [...colors]
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
    case UPDATE_PLAYER_ONE_COLOR:
      return {
        ...state,
        firstPlayer: {
          playerName: getPlayerOneName(state),
          colorPicked: payload
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
    case UPDATE_PLAYER_TWO_COLOR:
      return {
        ...state,
        secondPlayer: {
          playerName: getPlayerTwoName(state),
          colorPicked: payload
        }
      };
    default:
      return state;
  }
};
