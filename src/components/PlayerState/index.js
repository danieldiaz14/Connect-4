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
