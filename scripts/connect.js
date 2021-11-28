const canvas = createCanvas();

const context = canvas.getContext('2d');
const utils = new GameUtils();
setupContext(context);

let turnColor = document.querySelector('.activePlayer');
let turn = utils.randomBool(); // if less 0.5 its r
let gameBoard = utils.createMatrix();
let counters = [5,5,5,5,5,5,5];
let score1 = 0;
let score2 = 0;
turnColor.style.color = "#e22006";

canvas.addEventListener('mouseenter', function(event) {
    console.log('HELLO THERE PERSON!');
}, true);

canvas.addEventListener('mousemove', function(e) {
    document.getElementById('x').innerText = e.pageX;
    document.getElementById('y').innerText = e.pageY;
})

canvas.addEventListener('click', function(event) {
    
    // width is about 1020
    let x = event.pageX - 0;
    let y = event.pageY - 0;
    let handX = 770; // the start of the canvas
    let handXOffset = handX + 145.71; // total canvas width is 1024 but there are 7 columns. so 1024 / 7 is about 145.71
    let handY = 340; // total height is 

    if ( x >= handX && x <= handXOffset && y >= handY ) {
        updaterow(gameBoard, 0);
    }
    if (x >= handX+170 && x <= handXOffset+170 && y >= handY ) {
        updaterow(gameBoard, 1);
    }
    if (x >= handX+320 && x <= handXOffset+300 && y >= handY) {
        updaterow(gameBoard, 2);
    }
    
    if(x >= handX+470 && x <= handXOffset+450 && y >= handY) {
        updaterow(gameBoard, 3);
    }
    if(x >= handX+620 && x <= handXOffset+600 && y >= handY) {
        updaterow(gameBoard, 4);
    }
    if(x >= handX+770 && x <= handXOffset+750 && y >= handY) {
        updaterow(gameBoard, 5);
    }
    if(x >= handX+920 && x <= handXOffset+920 && y >= handY) {
        updaterow(gameBoard, 6);
    }
  }, false);


function updaterow(data, column) {
    const isYellowTurn = turn;

    if (data[counters[column]][column] == 0) {
       
        if (isYellowTurn) {
            data[counters[column]][column] = 1;
            turnColor.style.color = "#fffa07";
            counters[column]--;
            const checkForWinner = winner();
            if (!checkForWinner) turn = false;
        } else {
            data[counters[column]][column] = 2;
            turnColor.style.color = "#e22006";
            counters[column]--;
            const checkForWinner = winner();
            if (!checkForWinner) turn = true;
        }
    }
    console.log(data);
}

// should probably decide which type of data.
const winner = () => {
    const playerValue = utils.checkWinner(gameBoard);
    if (playerValue > -1) {
        const playerWon = playerValue === 1 ? "Player Red" : "Player Yellow";
        document.querySelector('.activePlayer').innerText = `${playerWon} has won!`;
        turnColor.style.color = playerWon === "Player Red" ? "#e22006" : "#fffa07";
        return playerWon;
    }
    return false;
}


function drawCircle(x, y, color) { // x and y are the center point of the circle.
    const { PI } = Math;
    const RADIUS = 40;
    const STARTANGLE = 0;
    const ENDANGLE = (2 * PI);
    context.beginPath();
    context.arc(x, y, RADIUS, STARTANGLE, ENDANGLE); // x - arc's center, y - arc's center , radius, startAngle(in radians), end angle in radius 0-360 is a full circle.
    if (color == 0) {
        context.stroke();
        return;
    }
    context.fillStyle = color;
    context.fill();
    context.stroke();
}

function drawRect(x, y, width, height, color=null) {
    context.beginPath();
    context.strokeStyle = color === null ? 'black' : color; // color be legit.
    context.strokeRect(x, y, width, height);
}

function updateBoard(gameMatrix) {
    let x = 0;
    let y = 0;
    let distanceX = 55;
    let distanceY = 45;
    const isEmpty = gameMatrix[y][x] == 0;
    const isRed = gameMatrix[y][x] == 1;
    const isYellow = gameMatrix[y][x] == 2;

    for (let i = 0; i <= 6; i++) {
        const width = 145.71;
        const height = 640;
        const startPos = 0 + (145.71 * i);
        drawRect(startPos, 0, width, height);
    }

    for (let i = 0; i <= 5; i++) {
        const height = 106.66;
        const width = 1020;
        const startPos = 0 + (106.66 * i);
        drawRect(0, startPos, width, height, 'green');
    }

    while( x <= 7 && y <= 6 ) {
        if (isEmpty) {
            drawCircle(distanceX, distanceY, 0);
        }

        if (isRed) {
            drawCircle(distanceX, distanceY, "#e22006");
        }

        if (isYellow) {
            drawCircle(distanceX, distanceY, "#fffa07");
        }

        if ( x == 6 && y<= 6) {
            y += 1;
            x = 0;
            distanceX = 55;
            distanceY += 110;
        } else {
            x+=1;
            distanceX +=150;
        }
    }
}

// Why does this exist ?9
function reset() {
    return [5,5,5,5,5,5,5];
}

function updateValue(player, value1, value2) {
    document.getElementById(player).innerText = `${value1}:${value2}`;
} // update value function. Allows us to change values on canvas to manipulate state of the game.

function redo() {
    let textWinner;
    const isYellowTurn = turn;
    console.log(isYellowTurn);
    if (isYellowTurn) {
        score1++;
        gameBoard = utils.createMatrix();
        counters = reset();
        textWinner = "It's your turn red";
    } else {
        score2++;
        gameBoard = utils.createMatrix();
        counters = reset();
        textWinner = "It's your turn yellow";
    }

    console.log('this block was hit...');
    document.getElementsByClassName('.activePlayer').innerText = textWinner;
}

let drawOnce = false;
function draw() {
    updateBoard(gameBoard); // updates board state...
    updateValue('score', score1, score2);
    requestAnimationFrame(draw);
}


draw();