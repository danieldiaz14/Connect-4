const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

let turnColor = document.getElementById('active');
let turn = true;
let gameBoard = matrix();
let counters = [5,5,5,5,5,5,5];
let reset = [5,5,5,5,5,5,5];
let score1 = 0;
let score2 = 0;
turnColor.style.color = "#e22006";
/*
context.beginPath();
context.arc(100,75,50,0,2*Math.PI);
context.stroke();
*/
//7 column, 6 rows.

canvas.addEventListener('click', function(event) {
    let x = event.pageX - 0;
    let y = event.pageY - 0;
    let handX = 0;
    let handXOffset = handX + 100;
    let handY = 0;
    let handYOffset = handY + 1000;
    if( x >= handX && x <= handXOffset && y >= handY && y <= handYOffset) {
        update1();
    }
    if(x >= handX+170&& x <= handXOffset+170 && y >=handY && handYOffset) {
        update2();
    }
    if(x >= handX+320&& x <= handXOffset+300 && y >=handY && handYOffset) {
        update3();
    }
    
    if(x >= handX+470&& x <= handXOffset+450 && y >=handY && handYOffset) {
        update4();
    }
    if(x >= handX+620&& x <= handXOffset+600 && y >=handY && handYOffset) {
        update5();
    }
    if(x >= handX+770&& x <= handXOffset+750 && y >=handY && handYOffset) {
        update6();
    }
    if(x >= handX+920&& x <= handXOffset+920 && y >=handY && handYOffset) {
        update7();
    }
  }, false);

function update1() {
    if(gameBoard[counters[0]][0] == 0) {
        if(turn == true) {
            gameBoard[counters[0]][0] = 1;
            console.log("counter " + counters[0])
            turnColor.style.color = "#fffa07";
            counters[0]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[0]);
        } else {
            gameBoard[counters[0]][0] = 2;
            turnColor.style.color = "#e22006";
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
            turnColor.style.color = "#fffa07";
            counters[1]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[1]);
        } else {
            gameBoard[counters[1]][1] = 2;
            turnColor.style.color = "#e22006";
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
            turnColor.style.color = "#fffa07";
            counters[2]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[0]);
        } else {
            gameBoard[counters[2]][2] = 2;
            turnColor.style.color = "#e22006";
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
            turnColor.style.color = "#fffa07";
            counters[3]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[0]);
        } else {
            gameBoard[counters[3]][3] = 2;
            turnColor.style.color = "#e22006";
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
            turnColor.style.color = "#fffa07";
            counters[4]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[0]);
        } else {
            gameBoard[counters[4]][4] = 2;
            turnColor.style.color = "#e22006";
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
            turnColor.style.color = "#fffa07";
            counters[5]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[0]);
        } else {
            gameBoard[counters[5]][5] = 2;
            turnColor.style.color = "#e22006";
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
            turnColor.style.color = "#fffa07";
            counters[6]--;
            turn = false;
            console.log(gameBoard);
            console.log("counter " + counters[0]);
        } else {
            gameBoard[counters[6]][6] = 2;
            turnColor.style.color = "#e22006";
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
    let distanceY = 45;
    while( x <= 6 && y <=5 ) {
        if(input[y][x] == 0) {
            context.beginPath();
            context.arc(distanceX, distanceY, 40, 0, 2*Math.PI);
            context.stroke();
        }
        if(input[y][x] == 1) {
            context.beginPath();
            context.arc(distanceX, distanceY, 40, 0, 2*Math.PI);
            context.fillStyle = "#e22006";
            context.fill();
            context.stroke();
        }
        if(input[y][x] == 2) {
            context.beginPath();
            context.arc(distanceX, distanceY, 40, 0, 2*Math.PI);
            context.fillStyle = "#fffa07";
            context.fill()
            context.stroke();
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
    let countRed = 0;
    let countYellow = 0;
    for(let i = 0; i < 6; i++) {
        for(let j = 0; j < 7; j++) {
            if(matrix[i][j] == 1) {
                if(countRed == 4) {
                    alert('test');
                }
                countRed+=1;
            }
        }
    }
}

function updateValue(player, value1, value2) {
    document.getElementById(player).innerText = value1 + ':' + value2;
} // update value function. Allows us to change values on canvas to manipulate state of the game.
function redo() {
    if(turn == true) {
        score1++;
        gameBoard = matrix();
        counters = reset;
    } else {
        score2++;
        gameBoard = matrix();
        counters = reset;
    }
}
function draw() {
    context.fillStyle = "#3a74d1";
    context.fillRect(0, 0, canvas.width, canvas.height);
    board(gameBoard);
    //winner(gameBoard);
    updateValue('score', score1, score2);
    requestAnimationFrame(draw);
}
draw();