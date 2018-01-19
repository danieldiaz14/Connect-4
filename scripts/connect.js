const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

let turnColor = document.getElementById('active');
let turn = true;
let gameBoard = matrix();
let counters = [5,5,5,5,5,5,5];
turnColor.style.color = "red";
/*
context.beginPath();
context.arc(100,75,50,0,2*Math.PI);
context.stroke();
*/
//7 column, 6 rows.

function update1() {
    if(gameBoard[counters[0]][0] == 0) {
        if(turn == true) {
            gameBoard[counters[0]][0] = 1;
            console.log("counter " + counters[0])
            turnColor.style.color = "#e22006";
            counters[0]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[0]);
        } else {
            gameBoard[counters[0]][0] = 2;
            turnColor.style.color = "#fffa07";
            counters[0]--;
            turn = true;
            console.log(gameBoard);
        }
    }
}

function update2() {
    if(gameBoard[counters[1]][1] == 0) {
        if(turn == true) {
            gameBoard[counters[1]][1] = 1;
            console.log("counter " + counters[1])
            turnColor.style.color = "#e22006";
            counters[1]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[1]);
        } else {
            gameBoard[counters[1]][1] = 2;
            turnColor.style.color = "#fffa07";
            counters[1]--;
            turn = true;
            console.log(gameBoard);
        }
    }
}
function update3() {
    if(gameBoard[counters[2]][2] == 0) {
        if(turn == true) {
            gameBoard[counters[2]][2] = 1;
            console.log("counter " + counters[0])
            turnColor.style.color = "#e22006";
            counters[2]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[0]);
        } else {
            gameBoard[counters[2]][2] = 2;
            turnColor.style.color = "#fffa07";
            counters[2]--;
            turn = true;
            console.log(gameBoard);
        }
    }
}
function update4() {
    if(gameBoard[counters[3]][3] == 0) {
        if(turn == true) {
            gameBoard[counters[3]][3] = 1;
            console.log("counter " + counters[3])
            turnColor.style.color = "#e22006";
            counters[3]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[0]);
        } else {
            gameBoard[counters[3]][3] = 2;
            turnColor.style.color = "#fffa07";
            counters[3]--;
            turn = true;
            console.log(gameBoard);
        }
    }
}
function update5() {
    if(gameBoard[counters[4]][4] == 0) {
        if(turn == true) {
            gameBoard[counters[4]][4] = 1;
            console.log("counter " + counters[0])
            turnColor.style.color = "#e22006";
            counters[4]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[0]);
        } else {
            gameBoard[counters[4]][4] = 2;
            turnColor.style.color = "#fffa07";
            counters[4]--;
            turn = true;
            console.log(gameBoard);
        }
    }
}
function update6() {
    if(gameBoard[counters[5]][5] == 0) {
        if(turn == true) {
            gameBoard[counters[5]][5] = 1;
            console.log("counter " + counters[0])
            turnColor.style.color = "#e22006";
            counters[5]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[0]);
        } else {
            gameBoard[counters[5]][5] = 2;
            turnColor.style.color = "#fffa07";
            counters[5]--;
            turn = true;
            console.log(gameBoard);
        }
    }
}
function update7() {
    if(gameBoard[counters[6]][6] == 0) {
        if(turn == true) {
            gameBoard[counters[6]][6] = 1;
            console.log("counter " + counters[0])
            turnColor.style.color = "#e22006";
            counters[6]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[0]);
        } else {
            gameBoard[counters[6]][6] = 2;
            turnColor.style.color = "#fffa07";
            counters[6]--;
            turn = true;
            console.log(gameBoard);
        }
    }
}

function board(input) {
    let x = 0;
    let y = 0;
    let distanceX = 55;
    let distanceY = 75;
    while( x <= 6 && y <=5 ) {
        if(input[y][x] == 0) {
            context.beginPath();
            context.arc(distanceX, distanceY, 50, 0, 2*Math.PI);
            context.stroke();
        }
        if(input[y][x] == 1) {
            context.beginPath();
            context.arc(distanceX, distanceY, 50, 0, 2*Math.PI);
            context.fillStyle = "#e22006";
            context.fill();
            context.stroke();
        }
        if(input[y][x] == 2) {
            context.beginPath();
            context.arc(distanceX, distanceY, 50, 0, 2*Math.PI);
            context.fillStyle = "#fffa07";
            context.fill()
            context.stroke();
        }
        if( x == 6 && y<=6) {
            y += 1;
            x = 0;
            distanceX = 55;
            distanceY += 150;
        } else {
            x+=1;
            distanceX +=150;
        }
    }
}

function drop(matrix, turn) {
    if(turn == true) {
    }
}

function matrix() {
    let board = []; 
    for(let x = 0; x < 6; x+=1) {
        board.push([0,0,0,0,0,0,0]);
    }
    return board;
}

function winner(matrix) {
    for(let i = 0; i < matrix.length; i++) {
        for(let j = 0; j < matrix[0].length; j++) {
            if(matrix[i][0] && matrix[i+1][0] && matrix[i+2][0] && matrix[i+3][0] == 1|| matrix[i][0] && matrix[i+1][0] && matrix[i+2][0] && matrix[i+3][0] == 2) {
                if(turn == true) {
                    turnColor.innerHTML('Red Wins!');
                }
            }
        }
    }
}

function draw() {
    context.fillStyle = "#3a74d1";
    context.fillRect(0, 0, canvas.width, canvas.height);
    board(gameBoard);
    requestAnimationFrame(draw);
}
draw();