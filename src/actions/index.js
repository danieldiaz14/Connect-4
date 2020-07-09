import types from "./types";

import { COLOR_CHOICES as colors } from "../components/PlayerSelection/constants";

const {
  UPDATE_PLAYER_ONE_NAME,
  UPDATE_PLAYER_ONE_COLOR,
  UPDATE_PLAYER_TWO_NAME,
  UPDATE_PLAYER_TWO_COLOR
} = types;

export const updatePlayerOneName = (context, playerValue) => {
  context.dispatch({
    type: UPDATE_PLAYER_ONE_NAME,
    payload: playerValue
  });
};

export const updatePlayerOneColor = (context, color) => {
  context.dispatch({
    type: UPDATE_PLAYER_ONE_COLOR,
    payload: color
  });
};

export const undoPlayerOne = context => {
  updatePlayerOneName(context, "");
  updatePlayerOneColor(context, [...colors]);
};

export const updatePlayerTwoName = (context, playerValue) => {
  context.dispatch({
    type: UPDATE_PLAYER_TWO_NAME,
    payload: playerValue
  });
};

export const updatePlayerTwoColor = (context, playerValue) => {
  context.dispatch({
    type: UPDATE_PLAYER_TWO_COLOR,
    payload: playerValue
  });
};

export const undoPlayerTwo = context => {
  updatePlayerTwoName(context, "");
  updatePlayerTwoColor(context, [...colors]);
};
