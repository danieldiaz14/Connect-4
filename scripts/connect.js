import { createCanvas, setupContext } from "./createCanvas.js";
import GameUtils from "./utils.js";

const canvas = createCanvas();

const context = canvas.getContext("2d");
const utils = new GameUtils();
setupContext(context);

const RED = "#ff1e00";
const TRAN_RED = "#ffaca1";
const YELLOW = "#fffa07";
const TRAN_YELLOW = "#fffda1";
let devMode = false;
let turn = utils.randomBool(); // if less 0.5 its red otherwise its yellow
let lastKnownHover = null;
updateActivePlayerColor(turn ? RED : YELLOW);

let gameBoard = utils.createMatrix();
let score1 = 0;
let score2 = 0;
let isWinnerState = false;

// event listeners below

canvas.addEventListener("mousemove", function (e) {
  canvas.style.cursor = "pointer";
  const spaceLeftOfCanvas = canvas.offsetLeft;
  const spaceAboveCanvas = canvas.offsetTop;
  const APPROX_RECT_WIDTH = 145.71;
  if (devMode) {
    document.getElementById("x").innerText = e.pageX - spaceLeftOfCanvas; // offset 770 because I want to keep track of within the canvas itself 770 is the 0 point in the canvas
    document.getElementById("y").innerText = e.pageY - spaceAboveCanvas;
  }

  let x = e.pageX - spaceLeftOfCanvas;

  for (let i = 0; i <= 6; i++) {
    const start = APPROX_RECT_WIDTH * i;
    const end = APPROX_RECT_WIDTH * (i + 1);
    const isWithinCurrentIteration = x >= start && x <= end;

    if (isWithinCurrentIteration) {
      hoverUpdateRow(gameBoard, i);
    }
  }

});

canvas.addEventListener("mouseout", (e) => {
  canvas.style.cursor = "initial";
  lastKnownHover = null;
  wipeHovers(gameBoard);
});

canvas.addEventListener(
  "click",
  function (event) {
    // the canvas is split into 7 rectangles of width 145.71
    // 0 coordinate is on 770; so 0 would 770-770;
    const spaceLeftOfCanvas = canvas.offsetLeft;
    const canvasXStart = spaceLeftOfCanvas;
    const APPROX_RECT_WIDTH = 145.71; // 1020 / 7 = about 145.71
    let x = event.pageX - canvasXStart;

    for (let i = 0; i <= 6; i++) {
      const start = APPROX_RECT_WIDTH * i;
      const end = APPROX_RECT_WIDTH * (i + 1);
      const isWithinRectBounds = x >= start && x <= end;

      if (isWithinRectBounds) {
        wipeHovers(gameBoard);
        updaterow(gameBoard, i);
        lastKnownHover = null;
        hoverUpdateRow(gameBoard, i);
      }
    }
  },
  false
);

// add click to play button
document.querySelector("#play").addEventListener("click", redo);

document.querySelector("#play").addEventListener("mouseover", (e) => {
  const playButtonBackgroundColor = "white";
  e.target.style.color = "black";
  e.target.style.backgroundColor = playButtonBackgroundColor;
});

document.querySelector("#play").addEventListener("mouseout", (e) => {
  const playButtonBackgroundColor = turn ? "white" : "black";
  e.target.style.color = turn ? RED : YELLOW;
  e.target.style.backgroundColor = playButtonBackgroundColor;
});

document
  .querySelector("#dev")
  .addEventListener("click", enableDevMode, { once: true });
// add click to developer butt

function updaterow(gameBoardMatrix, column) {
  const isRedTurn = turn; // if this is true it is Red's turn
  const rowMax = gameBoardMatrix.length - 1;

  for (let row = rowMax; row >= 0; row--) {
    const currentCircleValue = gameBoardMatrix[row][column];

    const isCurrentEmpty = currentCircleValue === 0;

    if (!isWinnerState) {
      if (isCurrentEmpty) {
        if (isRedTurn) {
          gameBoardMatrix[row][column] = 1;
          updateActivePlayerColor(YELLOW);
          checkForWinner();
        } else {
          gameBoardMatrix[row][column] = 2;
          updateActivePlayerColor(RED);
          checkForWinner();
        }
        if (isWinnerState) break; // should break the loop if winner found.
        turn = !turn;
        break;
      }
    }
  }
}

function hoverUpdateRow(gameBoardMatrix, column) {
  const isRedTurn = turn; // if turn is true it is red's turn
  const rowMax = gameBoardMatrix.length - 1;

  for (let row = rowMax; row >= 0; row--) {
    const currentCircleValue = gameBoardMatrix[row][column];
    const isCurrentEmpty = currentCircleValue === 0;
    if (!isWinnerState) {
      if (isCurrentEmpty) {
        if (lastKnownHover === null) {
          lastKnownHover = column;
        } else {
          if (lastKnownHover === column) {
            break;
          } else {
            wipeHovers(gameBoardMatrix);
          }
        }
        gameBoardMatrix[row][column] = isRedTurn ? 4 : 5;
        lastKnownHover = column;
      }
    }
  }
}

function wipeHovers(gameBoardMatrix) {

  gameBoardMatrix.forEach((row, i) => {
    gameBoardMatrix[i] = row.map(colVal => {
      const isHoverValue = colVal === 4 || colVal === 5;
      if (isHoverValue) return 0;
      return colVal;
    })
  })
}

function updateActivePlayerText(text) {
  document.querySelector(".activePlayer").innerText = text;
}

function updateNotification(text, visible = false) {
  const notificationRef = document.querySelector("#notification");
  notificationRef.innerText = text;
  notificationRef.style.visibility = visible ? "visible" : "hidden";
}

function updateActivePlayerColor(color) {
  const activePlayerRef = ".activePlayer";
  const navButtonRefs = document.getElementsByClassName("navButton");

  for (let domNode of navButtonRefs) {
    domNode.style.backgroundColor = color === RED ? "white" : "black";
    domNode.style.color = color;
  }

  document.querySelector(activePlayerRef).style.color = color;
  document.querySelector(activePlayerRef).style.backgroundColor =
    color === RED ? "white" : "black";
}

function updateScore(winnerCellValue) {
  const scoreRef = "#score";
  const isRed = winnerCellValue === 1;

  if (isRed) {
    score1++;
  } else {
    score2++;
  }

  document.querySelector(scoreRef).innerText = `${score1}:${score2}`;
}

function updateWinnerState(specificState = null) {
  // toggles the checkForWinner state
  if (specificState === null) {
    isWinnerState = !isWinnerState;
  } else {
    isWinnerState = specificState;
  }
}

// should probably decide which type of data.
const checkForWinner = () => {
  if (!isWinnerState) {
    // not current has a winner...
    const playerValue = utils.checkWinner(gameBoard);
    const winnerFound = playerValue !== -1;

    if (winnerFound) {
      const playerWon = playerValue === 1 ? "Player Red" : "Player Yellow";
      const winnerColor = playerWon === "Player Red" ? RED : YELLOW;
      updateWinnerState();
      updateActivePlayerText(`${playerWon} has won!`);
      updateActivePlayerColor(winnerColor);
      updateScore(playerValue);
      updateNotification(`${playerWon} has won!`, true);
      const winnerSound = new Audio("../sounds/winner_found.wav"); // better to create new instance in the rare case a game wins immediately after the previous
      winnerSound.play();
    }
  }
};

function drawCircle(x, y, color = null, noFill = false) { 
  // x and y are the center point of the circle.
  const { PI } = Math;
  const RADIUS = 40;
  const STARTANGLE = 0;
  const ENDANGLE = 2 * PI;
  const isEmpty = color === null;
  context.beginPath();
  context.arc(x, y, RADIUS, STARTANGLE, ENDANGLE); // x - arc's center, y - arc's center , radius, startAngle(in radians), end angle in radius 0-360 is a full circle.
  context.lineWidth = 6;

  if (isEmpty) {
    context.fillStyle = "white";
  } else {
    context.fillStyle = color;
  }
  // if this area is being hit it means the current circle being drawn is not empty and therefore should be styled red or yellow
  if (!noFill) {
    context.fill();
    context.strokeStyle = "black";
    context.stroke();
  } else {
    context.strokeStyle = color;
    context.stroke();
  }

  context.closePath();
}

function drawRect(x, y, width, height, color = null) {
  context.beginPath();
  context.strokeStyle = color === null ? "black" : color; // color be legit. make the lines thinner and a blue
  context.strokeRect(x, y, width, height);
  context.closePath();
}

function enableDevMode() {
  // draws rectangles to make development easier
  devMode = true;
  const dev_node = document.querySelector("#dev");

  if (dev_node) dev_node.remove();

  const divRef = document.querySelector(".devMode");

  let x_node = document.createElement("h2");
  x_node.innerText = "x";
  x_node.setAttribute("id", "x");
  divRef.append(x_node);

  let y_node = document.createElement("h2");
  y_node.innerText = "y";
  y_node.setAttribute("id", "y");
  divRef.append(y_node);
}

function setupBoard() {}

// main function!
function updateBoard(gameMatrix) {
  // 42 sub rectangles in canvas
  // each rectangle within the canvas has the following properties
  // width = 145.71 (1020 / 7) 7 being the columns
  // height = 106.66 (640 / 6) 6 being the rows.

  const CANVASHEIGHT = 640;
  const CANVASWIDTH = 1020;
  const APPROX_RECT_WIDTH = 145.71;
  const APPROX_RECT_HEIGHT = 106.66;
  const gameBoardLength = gameMatrix.length;
  const gameBoardRow = gameMatrix[0];
  const gameBoardWidth = gameBoardRow.length;

  if (devMode) {
    for (let column in gameBoardRow) {
      const startingX = 0 + APPROX_RECT_WIDTH * +column;
      drawRect(startingX, 0, APPROX_RECT_WIDTH, CANVASHEIGHT, 'black');
    }

    for (let row in gameMatrix) {
      const startingX = 0 + APPROX_RECT_HEIGHT * +row;
      drawRect(0, startingX, CANVASWIDTH, APPROX_RECT_HEIGHT, 'black');
    }
  }

  for (let i = 0; i < gameBoardLength; i++) {
    // iterate over the rows
    const y1 = APPROX_RECT_HEIGHT * i; // the height of th rectangle the circle is in is 106.66 multiple that by the index
    const y2 = APPROX_RECT_HEIGHT * (i + 1);
    for (let j = 0; j < gameBoardWidth; j++) {
      const x1 = APPROX_RECT_WIDTH * j;
      const x2 = APPROX_RECT_WIDTH * (j + 1);
      const xCenter = (x1 + x2) / 2; // calculates the center of the rect by summing x1 and x2 and dividing by 2
      const yCenter = (y1 + y2) / 2; // calculates the center of the rect by summing y1 and y2 and dividing by 2
      const currentPos = gameMatrix[i][j]; // where we are in the matrix while drawing
      const isEmpty = currentPos == 0;
      const isRed = currentPos === 1;
      const isRedHover = currentPos === 4;
      const isYellow = currentPos === 2;
      const isYellowHover = currentPos === 5;
      const isWinnerCircle = currentPos === 3;
      // TODO Look below and check isWinnerCircle. This aims to be an indicator on where the win occurred
      if (isEmpty) drawCircle(xCenter, yCenter); // consider separating this into its own function
      if (isRed) drawCircle(xCenter, yCenter, RED);
      if (isRedHover) drawCircle(xCenter, yCenter, TRAN_RED);
      if (isYellow) drawCircle(xCenter, yCenter, YELLOW);
      if (isYellowHover) drawCircle(xCenter, yCenter, TRAN_YELLOW);
      if (isWinnerCircle) {
        const winnerCircleFillColor = turn ? RED : YELLOW;
        const winnerOuterColor = '#00ff00';
        drawCircle(xCenter, yCenter, winnerCircleFillColor);
        drawCircle(xCenter, yCenter, winnerOuterColor, true);
      } 
    }
  }
}

function updateColorScheme() {}

function redo() {
  const isRedTurn = turn;

  if (isRedTurn) {
    updateActivePlayerColor(YELLOW);
  } else {
    updateActivePlayerColor(RED);
  }

  gameBoard = utils.createMatrix();
  turn = !turn;
  updateActivePlayerText("It is your turn!");
  updateNotification("");
  updateWinnerState(false);
}

function draw() {
  requestAnimationFrame(draw);
  updateBoard(gameBoard); // updates board state...
}

draw();
