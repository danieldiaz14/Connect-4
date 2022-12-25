class Bot {
  easyBot(gameBoard) {}

  hardBot(gameBoard) {}

  miniMax(depth, nodeIndex, isMax, scores, h) {
    if (depth == h) return scores[nodeIndex]; // terminating condition. leaf node is reached.

    if (isMax)
      return Math.max(
        this.miniMax(depth + 1, nodeIndex * 2, false, scores, h),
        this.miniMax(depth + 1, nodeIndex * 2 + 1, false, scores, h)
      );
    else
      return Math.min(
        this.miniMax(depth + 1, nodeIndex * 2, true, scores, h),
        this.miniMax(depth + 1, nodeIndex * 2 + 1, true, scores, h)
      );
  }

  log2(n) {
    return n === 1 ? 0 : 1 + this.log2(n / 2);
  }
}

/*

let scores = [3,5,2,9,12,5,23,23];
let n = scores.length;
let h = log2(n);
let res = minimax(0,0, true, scores, h);
*/

export default Bot;
