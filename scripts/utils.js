class GameUtils {
  checkWinner(gameBoard) {
    // expects the gameBoard to be passed in as an arg
    const height = gameBoard.length;
    const width = gameBoard[0].length;
    const EMPTY_SLOT = 0;
    const WINNER_VALUE = 3;
    for (let r = 0; r < height; r++) {
      for (let c = 0; c < width; c++) {
        // currentCircle refers to a circle in the board.
        // [[0]]
        const currentCircle = gameBoard[r][c];

        const IS_EMPTY = currentCircle === EMPTY_SLOT;

        if (IS_EMPTY) continue;

        // checks if we have space to the right ->
        if (c + 3 < width) {
          // checks if we have space below us (down)
          if (r + 3 < height) {
            // checks diagonal and to the down right
            if (
              currentCircle === gameBoard[r + 1][c + 1] &&
              currentCircle === gameBoard[r + 2][c + 2] &&
              currentCircle === gameBoard[r + 3][c + 3]
            ) {
              gameBoard[r][c] = WINNER_VALUE;
              gameBoard[r + 1][c + 1] = WINNER_VALUE;
              gameBoard[r + 2][c + 2] = WINNER_VALUE;
              gameBoard[r + 3][c + 3] = WINNER_VALUE;
              return currentCircle;
            }
          }

          // checks diagonal to the up right
          if (r - 3 >= 0) {
            if (
              currentCircle === gameBoard[r - 1][c + 1] &&
              currentCircle === gameBoard[r - 2][c + 2] &&
              currentCircle === gameBoard[r - 3][c + 3]
            ) {
              gameBoard[r][c] = WINNER_VALUE;
              gameBoard[r - 1][c + 1] = WINNER_VALUE;
              gameBoard[r - 2][c + 2] = WINNER_VALUE;
              gameBoard[r - 3][c + 3] = WINNER_VALUE;
              return currentCircle;
            }
          }

          // check horizontally
          if (
            currentCircle === gameBoard[r][c + 1] &&
            currentCircle === gameBoard[r][c + 2] &&
            currentCircle === gameBoard[r][c + 3]
          ) {
            gameBoard[r][c] = WINNER_VALUE;
            gameBoard[r][c + 1] = WINNER_VALUE;
            gameBoard[r][c + 2] = WINNER_VALUE;
            gameBoard[r][c + 3] = WINNER_VALUE;
            return currentCircle;
          }
        }

        // this is checking below
        if (r + 3 < height) {
          if (
            currentCircle === gameBoard[r + 1][c] &&
            currentCircle === gameBoard[r + 2][c] &&
            currentCircle === gameBoard[r + 3][c]
          ) {
            gameBoard[r][c] = WINNER_VALUE;
            gameBoard[r + 1][c] = WINNER_VALUE;
            gameBoard[r + 2][c] = WINNER_VALUE;
            gameBoard[r + 3][c] = WINNER_VALUE;
            return currentCircle;
          }
        }
      }
    }

    return -1;
  }

  createMatrix() {
    const matrix = new Array();
    for (let i = 0; i < 6; i++) {
      const row = new Array(7);
      row.fill(0);
      matrix.push(row);
    }
    return matrix;
  }

  fastLog(toLog) { // doesn't lazy print object references in console
    console.log(JSON.stringify(toLog));
  }
  // two methods below are used to create an ai
  gameOver(position) {}

  minmax(position, depth, alpha, beta, maximizingPlayer) {
    if (depth == 0 || this.gameOver(position)) {
      return static_eval(position);
    }

    if (maximizingPlayer) {
      let maxEval = -Infinity;

      position.children.forEach((child) => {
        const evaluate = this.minmax(child, depth - 1, alpha, beta, false);

        maxEval = Math.max(maxEval, evaluate);
        alpha = Math.max(alpha, evaluate);

        if (beta <= alpha) return;

        return maxEval;
      });
    } else {
      let minEval = Infinity;

      position.children.forEach((child) => {
        const evaluate = this.minmax(child, depth - 1, alpha, beta, true);

        minEval = Math.min(minEval, evaluate);

        beta = Math.min(beta, evaluate);

        if (beta <= alpha) return;
        return minEval;
      });
    }
  }

  randomBool() {
    // This returns a yes or no at 50% chance to determine who starts
    const randomFiftyFity = Math.random() < 0.5;
    return randomFiftyFity;
  }

  static_eval(position) {}
}

export default GameUtils;
