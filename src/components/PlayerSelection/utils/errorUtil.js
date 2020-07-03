const errorMessage = (isError = false) => {
  if (!isError) return { isError, errorHeader: "", errorMessage: "" };
  const errorHeader = `This player's name cannot be empty.`;
  const errorMessage = `Please enter a name for this player.`;
  return {
    isError: true,
    errorHeader,
    errorMessage
  };
};

const checkForEmptyStrings = str => str.length < 1;

const isValidPlayerName = player => {
  if (checkForEmptyStrings(player)) return errorMessage("empty");
  return errorMessage();
};

export default isValidPlayerName;
