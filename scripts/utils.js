class GameUtils {

    checkWinner(gameBoard) {
        // expects the gameBoard to be passed in as an arg
        const height = gameBoard.length;
        const width = gameBoard[0].length;
        const EMPTY_SLOT = 0;
        for (let r = 0; r < height; r++) {

            for (let c = 0 ; c < width; c++) {

                // currentCircle refers to a circle in the board.
                // [[0]]
                const currentCircle = gameBoard[r][c];

                if (currentCircle === EMPTY_SLOT) continue;

                // checks if we have space to the right ->
                if (c + 3 < width) {
                    // checks if we have space below us (down)
                    if (r + 3 < height) {
                        // checks diagonal and to the down right
                        if (
                            currentCircle === gameBoard[r+1][c+1] &&
                            currentCircle === gameBoard[r+2][c+2] &&
                            currentCircle === gameBoard[r+3][c+3]
                        ) return currentCircle;
                    }

                    // checks diagonal to the up right
                    if (r - 3 >= 0) {
                        if (
                            currentCircle === gameBoard[r-1][c+1] &&
                            currentCircle === gameBoard[r-2][c+2] &&
                            currentCircle === gameBoard[r-3][c+3] 
                        ) return currentCircle;
                    }
                }
                // this is checking below
                if (r + 3 < height) {
                    if (
                        currentCircle === gameBoard[r+1][c] &&
                        currentCircle === gameBoard[r+2][c] &&
                        currentCircle === gameBoard[r+3][c]
                    ) return currentCircle
                }
            }
        }
        return -1;
    }

    createMatrix() {
        const matrix = new Array();
        for (let i = 0; i < 6; i++) {
            matrix.push(
                [
                    0,0,0,0,0,0,0
                ]
            )
        }
        return matrix;
    }

    randomBool() {
        // This returns a yes or no at 50% chance to determine who starts
        const randomFiftyFity = Math.random() < 0.5;
        return randomFiftyFity;
    }
}
