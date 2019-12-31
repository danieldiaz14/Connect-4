const errorMessage = ( isError = false, player ) => {
    if (!isError) return {isError, errorHeader: '', errorMessage: '' };
    if (isError === "blank") {
        const errorMessage = `This player cannot have an empty space.`;
        const errorHeader = `This player has an empty space.`
        return {
            isError: true,
            errorHeader,
            errorMessage
        };
    };
    const errorHeader = `This player's name cannot be empty.`;
    const errorMessage = `Please enter a name for this player.`;
    return {
        isError: true, 
        errorHeader,
        errorMessage
    };
};

const searchForBlankSpace = str => str.includes(" ");

const checkForEmptyStrings = str => str.length < 1;


const isValidPlayerName = (player) => {
    if (checkForEmptyStrings(player)) return errorMessage("empty", "Player1");
    if (searchForBlankSpace(player)) return errorMessage("blank", "Player1");
    return errorMessage();
};

export default isValidPlayerName;