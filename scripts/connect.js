const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

let turn = document.getElementById('active');
let gameBoard = matrix();
/*
context.beginPath();
context.arc(100,75,50,0,2*Math.PI);
context.stroke();
*/
//7 column, 6 rows.
function board(input) {
    let x = 0;
    let y = 0;
    let distanceX = 55;
    let distanceY = 75;
    while( x < 6 && y < 5) {
        if(input[x][y] == 0) {
            context.beginPath();
            context.arc(distanceX, distanceY, 50, 0, 2*Math.PI);
            context.stroke();
        }
        if(input[x][y] == 1) {
            context.beginPath();
            context.arc(distanceX, distanceY, 50, 0, 2*Math.PI);
            context.stroke();
            context.fillStyle = "#e22006";
        }
        if(input[x][y] == 2) {
            context.beginPath();
            context.arc(distanceX, distanceY, 50, 0, 2*Math.PI);
            context.stroke();
            context.fillStyle = "#fffa07";
        }
        if( x >=5) {
            y += 1;
            x = 0;
            distanceX = 55;
            distanceY += 150;
        }
        x+=1;
        distanceX +=150;
        console.log(x);
        console.log(y);
    }
}

function matrix() {
    let column = [];
    let board = []; 
    for(let i = 0; i < 7; i+=1) {
        column.push(0);
    }
    for(let x = 0; x < 6; x+=1) {
        board.push(column);
    }
    return board;
}

function draw() {
    context.fillStyle = "#3a74d1";
    context.fillRect(0, 0, canvas.width, canvas.height);
    board(gameBoard);
}
draw();
console.log(gameBoard);