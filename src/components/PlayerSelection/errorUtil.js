const errorMessage = ( isError = false, player ) => {
    if (!isError) return {isError, errorHeader: '', errorMessage: '' };
    if (isError === "blank") {
        const errorMessage = `${player} cannot have empty space.`;
        const errorHeader = `${player} has empty space.`
        return {
            isError: true,
            errorHeader,
            errorMessage
        };
    };
    const errorHeader = `${player} name cannot be empty`;
    const errorMessage = `Please enter a name for ${player}`;
    return {
        isError: true, 
        errorHeader,
        errorMessage
    };
};

const searchForBlankSpace = str => str.includes(" ");

const checkForEmptyStrings = str => str.length < 1;


const checkForError = ({firstPlayer, secondPlayer}) => {
    if (checkForEmptyStrings(firstPlayer)) return errorMessage("empty", "Player1");
    if (searchForBlankSpace(firstPlayer)) return errorMessage("blank", "Player1");
    if (checkForEmptyStrings(secondPlayer)) return errorMessage("empty", "Player2");
    if (searchForBlankSpace(secondPlayer)) return errorMessage("blank", "Player2");
    return errorMessage();
};

export default checkForError;