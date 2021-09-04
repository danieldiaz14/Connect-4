const canvas = document.getElementById("canvas");

const context = canvas.getContext('2d');

context.fillStyle = "#3a74d1";
context.fillRect(0, 0, canvas.width, canvas.height);
let turnColor = document.getElementById('active');
let turn = true;
let gameBoard = matrix();
let counters = [5,5,5,5,5,5,5];
let score1 = 0;
let score2 = 0;
turnColor.style.color = "#e22006";

canvas.addEventListener('click', function(event) {
    
    let x = event.pageX - 0;
    let y = event.pageY - 0;
    let handX = 0;
    let handXOffset = handX + 100;
    let handY = 0;
    let handYOffset = handY + 1000;
    if( x >= handX && x <= handXOffset && y >= handY && y <= handYOffset) {
        updaterow(gameBoard, 0);
    }
    if(x >= handX+170&& x <= handXOffset+170 && y >=handY && handYOffset) {
        updaterow(gameBoard, 1);
    }
    if(x >= handX+320&& x <= handXOffset+300 && y >=handY && handYOffset) {
        updaterow(gameBoard, 2);
    }
    
    if(x >= handX+470&& x <= handXOffset+450 && y >=handY && handYOffset) {
        updaterow(gameBoard, 3);
    }
    if(x >= handX+620&& x <= handXOffset+600 && y >=handY && handYOffset) {
        updaterow(gameBoard, 4);
    }
    if(x >= handX+770&& x <= handXOffset+750 && y >=handY && handYOffset) {
        updaterow(gameBoard, 5);
    }
    if(x >= handX+920&& x <= handXOffset+920 && y >=handY && handYOffset) {
        updaterow(gameBoard, 6);
    }
  }, false);


function updaterow(data, column) {
    if(data[counters[column]][column] == 0) {
       
        if (turn === true) {
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
}

const validateWinner = data => {
    const height = data.length;
    const width = data[0].length;
    const empty_slot = 0;
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            const player = data[r][c];
            if (player === empty_slot) continue;
            if (c + 3 < width) {
                if (r + 3 < height) {
                    // checks diagonal down right
                    if (
                        player === data[r+1][c+1] &&
                        player === data[r+2][c+2] &&
                        player === data[r+3][c+3] 
                    ) return player;
                }
                if (r - 3 >= 0) {
                    if (
                        player === data[r-1][c+1] &&
                        player === data[r-2][c+2] &&
                        player === data[r-3][c+3]
                    ) return player;
                }
                if (
                    player === data[r][c+1] &&
                    player === data[r][c+2] &&
                    player === data[r][c+3] 
                ) return player;
            }
            if (r + 3 < height) {
                if (
                    player === data[r+1][c] &&
                    player === data[r+2][c] &&
                    player === data[r+3][c] 
                ) return player;
            }
        }
    }
    return -1
}

// should probably decide which type of data.
const winner = () => {
    const playerValue = validateWinner(gameBoard);
    if (playerValue > -1) {
        const playerWon = playerValue === 1 ? "Player Red" : "Player Yellow";
        document.getElementById('active').innerText = `${playerWon} has won!`;
        turnColor.style.color = playerWon === "Player Red" ? "#e22006" : "#fffa07";
        return playerWon;
    }
    return false;
}

function drawCircle(x, y, color) {
    context.beginPath();
    context.arc(x, y, 40, 0, 2*Math.PI);
    if (color == 0) {
        context.stroke();
        return;
    }
    context.fillStyle = color;
    context.fill();
    context.stroke();
}
function board(input) {
    let x = 0;
    let y = 0;
    let distanceX = 55;
    let distanceY = 45;
    while( x <= 6 && y <=5 ) {
        if(input[y][x] == 0) {
            drawCircle(distanceX, distanceY, 0);
        }
        if(input[y][x] == 1) {
            drawCircle(distanceX, distanceY, "#e22006");
        }
        if(input[y][x] == 2) {
            drawCircle(distanceX, distanceY, "#fffa07");
        }
        if( x == 6 && y<=6) {
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

function matrix() {
    let board = []; 
    for(let x = 0; x < 6; x+=1) {
        board.push([0,0,0,0,0,0,0]);
    }
    return board;
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
    if (turn == true) {
        score1++;
        gameBoard = matrix();
        counters = reset();
        console.log(gameBoard, counters);
        textWinner = "It's your turn red";
    } else {
        score2++;
        gameBoard = matrix();
        counters = reset();
        textWinner = "It's your turn yellow";
    }

    document.getElementById('active').innerText = textWinner;
}

function draw() {
    
    board(gameBoard);
    updateValue('score', score1, score2);
    requestAnimationFrame(draw);
}

draw();