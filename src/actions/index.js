import types from "./types";

const { UPDATE_PLAYER_ONE_NAME, UPDATE_PLAYER_TWO_NAME } = types;

export const updatePlayerOne = (context, playerValue) => {
  context.dispatch({
    type: UPDATE_PLAYER_ONE_NAME,
    payload: playerValue
  });
};

export const updatePlayerTwo = (context, playerValue) => {
  context.dispatch({
    type: UPDATE_PLAYER_TWO_NAME,
    payload: playerValue
  });
};

export const undoPlayerOne = context => {
  updatePlayerOne(context, "");
};
export const undoPlayerTwo = context => {
  updatePlayerTwo(context, "");
};
