class GameUtils {
  constructor() {
    this.EMPTY_SLOT = 0;
    this.WINNER_VALUE = 3;
  }

  bot(gameBoard, updateRow, wipeHovers) {
    // dumb bot
    const botValue = 2; // for now bot is yellow
    const rowMax = gameBoard.length - 1;
    const colMax = gameBoard[0].length;
    let isBoardEmpty = true;

    // iterate the board backwards vertically!

    // check if the firstRow is empty
    for (let circle of gameBoard[rowMax]) {
      if (+circle !== 0) {
        isBoardEmpty = false;
        break;
      }
    }
    // if bot is going first and the board is empty pick a random starting point.
    if (isBoardEmpty) {
      const randomColumn = this.randomIntFromInterval(0, 6);
      updateRow(gameBoard, randomColumn);
      return;
    }
    wipeHovers(gameBoard);
    for (let row = rowMax; row >= 0; row--) {
      for (let col = 0; col < colMax; col++) {
        const currentCircle = gameBoard[row][col];
        const IS_BOT_VALUE = currentCircle === botValue;
        if (!IS_BOT_VALUE) continue;

        const hasHorizontalSpaceAhead = col + 3 <= colMax;
        const hasHorizontalSpaceBehind = col - 3 >= 0;
        const hasVerticalSpaceAbove = row - 3 >= 0;

        if (hasHorizontalSpaceAhead) {
          for (let j = col + 1; j < colMax; j++) {
            const nextCircle = gameBoard[row][j];
            if (nextCircle === this.EMPTY_SLOT) {
              updateRow(gameBoard, j);
              return;
            }
          }
        }

        if (hasHorizontalSpaceBehind) {
          for (let j = col - 1; j >= 0; j--) {
            const nextCircle = gameBoard[row][j];
            if (nextCircle === this.EMPTY_SLOT) {
              updateRow(gameBoard, j);
              return;
            }
          }
        }

        if (hasVerticalSpaceAbove) {
          for (let j = row - 1; j >= 0; j--) {
            const nextCircle = gameBoard[j][col];
            if (nextCircle === this.EMPTY_SLOT) {
              updateRow(gameBoard, col);
              return;
            }
          }
        }
      }
    }
  }

  checkWinner(gameBoard) {
    // expects the gameBoard to be passed in as an arg
    const { EMPTY_SLOT, WINNER_VALUE } = this;
    const height = gameBoard.length;
    const width = gameBoard[0].length;
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

  fastLog(toLog) {
    // doesn't lazy print object references in console
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

  randomIntFromInterval(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  static_eval(position) {}
}

export default GameUtils;
