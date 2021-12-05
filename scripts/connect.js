const canvas = createCanvas();

const context = canvas.getContext('2d');
const utils = new GameUtils();
setupContext(context);

const RED = "#e22006";
const YELLOW = "#fffa07";
let turnColor = document.querySelector('.activePlayer');
let devMode = false;
let turn = utils.randomBool(); // if less 0.5 its red otherwise its yellow
turnColor.style.color = turn ? RED : YELLOW;
let gameBoard = utils.createMatrix();
let score1 = 0;
let score2 = 0;
let drawOnce = false;

canvas.addEventListener('mousemove', function(e) {
    document.getElementById('x').innerText = e.pageX - 770; // offset 770 because I want to keep track of within the canvas itself 770 is the 0 point in the canvas
    document.getElementById('y').innerText = e.pageY - 309;
});

canvas.addEventListener('click', function(event) {
    
    // the canvas is split into 7 rectangles of width 145.71
    // 0 coordinate is on 770; so 0 would 770-770;
    const canvasXStart = 770;
    const APPROX_RECT_WIDTH = 145.71; // 1020 / 7 = about 145.71
    let x = event.pageX - canvasXStart;

    for (let i = 0; i <= 6; i++) {
        const start = (APPROX_RECT_WIDTH * i);
        const end = (APPROX_RECT_WIDTH * (i+1));
        const isWithinRectBounds = x >= start && x <= end; 
        
        if (isWithinRectBounds) {
            updaterow(gameBoard, i);
        }
    }
  }, false);


function updaterow(gameBoardMatrix, column) {

    const isYellowTurn = turn; // if this is true its yellow's turn...
    const rowMax = gameBoardMatrix.length - 1;

    for (let row = rowMax; row >= 0; row--) {
        const currentCircleValue = gameBoardMatrix[row][column];

        const isCurrentEmpty = currentCircleValue === 0;

        if (isCurrentEmpty) {
            
            if (isYellowTurn) {
                gameBoardMatrix[row][column] = 1;
                turnColor.style.color = RED;
                const checkForWinner = winner();
            } else {
                gameBoardMatrix[row][column] = 2;
                turnColor.style.color = YELLOW;
                const checkForWinner = winner();
            }
            turn = !turn;
            break;
        }
    }
}

// should probably decide which type of data.
const winner = () => {
    const playerValue = utils.checkWinner(gameBoard);
    const winnerFound = playerValue !== -1;

    if (winnerFound) {
        const playerWon = playerValue === 1 ? "Player Red" : "Player Yellow";
        document.querySelector('.activePlayer').innerText = `${playerWon} has won!`;
        turnColor.style.color = playerWon === "Player Red" ? RED : YELLOW;
        return playerWon;
    }

    return false;
}


function drawCircle(x, y, color = 0) { // x and y are the center point of the circle.
    const { PI } = Math;
    const RADIUS = 40;
    const STARTANGLE = 0;
    const ENDANGLE = (2 * PI);
    const isEmpty = color === 0;
    context.beginPath();
    context.arc(x, y, RADIUS, STARTANGLE, ENDANGLE); // x - arc's center, y - arc's center , radius, startAngle(in radians), end angle in radius 0-360 is a full circle.
    context.lineWidth = 4;

    if (isEmpty) {
        context.fillStyle = 'white';
    } else {
        context.fillStyle = color;
    }
    // if this area is being hit it means the current circle being drawn is not empty and therefore should be styled red or yellow
    
    context.fill();
    context.stroke();
    context.strokeStyle = 'black';
    context.closePath();
}

function drawRect(x, y, width, height, color=null) {
    context.beginPath();
    context.strokeStyle = color === null ? 'black' : color; // color be legit.
    context.strokeRect(x, y, width, height);
    context.closePath();
}

function enableDevMode() { // draws rectangles to make development easier
    devMode = true
    document.getElementById("dev").innerText = "Developer Mode Enabled!";
}

function setupBoard() {

}

// main function!
function updateBoard(gameMatrix) { // 42 sub rectangles in canvas
    // each rectangle within the canvas has the following properties 
    // width = 145.71 (1020 / 7) 7 being the columns
    // height = 106.66 (640 / 6) 6 being the rows.

    const CANVASHEIGHT = 640;
    const CANVASWIDTH = 1020;
    const APPROX_RECT_WIDTH = 145.71;
    const APPROX_RECT_HEIGHT = 106.66;
    const gameBoardLength = gameMatrix.length;
    const gameBoardWidth = gameMatrix[0].length;

    if (devMode) {
        for (let i = 0; i <= 6; i++) { // used for development
            const width = 145.71;
            const height = CANVASHEIGHT;
            const startPos = 0 + (APPROX_RECT_WIDTH * i);
            drawRect(startPos, 0, width, height);
        }
    
        for (let i = 0; i <= 5; i++) { // used for development
            const height = APPROX_RECT_HEIGHT;
            const width = CANVASWIDTH;
            const startPos = 0 + (APPROX_RECT_HEIGHT * i);
            drawRect(0, startPos, width, height, 'green');
        }
    }

    for (let i = 0; i < gameBoardLength; i++) { // iterate over the rows
        const y1 = 106.66 * i; // the height of th rectangle the circle is in is 106.66 multiple that by the index
        const y2 = 106.66 * (i+1);
        for (let j = 0; j < gameBoardWidth; j++) {
            const x1 = 145.71 * j;
            const x2 = 145.71 * (j+1);
            const xCenter = (x1 + x2) / 2; // calculates the center of the rect by summing x1 and x2 and dividing by 2
            const yCenter = (y1 + y2) / 2; // calculates the center of the rect by summing y1 and y2 and dividing by 2
            const currentPos = gameMatrix[i][j]; // where we are in the matrix while drawing
            const isEmpty = currentPos == 0;
            const isRed = currentPos == 1;
            const isYellow = currentPos == 2;
            if (isEmpty) drawCircle(xCenter, yCenter); // consider separating this into its own function
            if (isRed) drawCircle(xCenter, yCenter, RED);
            if (isYellow) drawCircle(xCenter, yCenter, YELLOW);
        }
    }
}

function updateValue(player, value1, value2) {
    document.getElementById(player).innerText = `${value1}:${value2}`;
} // update value function. Allows us to change values on canvas to manipulate state of the game.

function redo() {
    let textWinner;
    const isYellowTurn = turn;

    if (isYellowTurn) {
        score1++;
        gameBoard = utils.createMatrix();
        textWinner = "It is your turn red";
    } else {
        score2++;
        gameBoard = utils.createMatrix();
        textWinner = "It is your turn yellow";
    }

    document.querySelector('.activePlayer').innerText = textWinner;
}

function draw() {
    updateBoard(gameBoard); // updates board state...
    updateValue('score', score1, score2);
    requestAnimationFrame(draw);
}

draw();