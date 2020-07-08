export const getPlayerOneName = state => state.firstPlayer.playerName;
export const getPlayerOneColor = state => state.firstPlayer.colorPicked;

export const getPlayerTwoName = state => state.secondPlayer.playerName;
export const getPlayerTwoColor = state => state.secondPlayer.colorPicked;

export default {
  getPlayerOneColor
};
