const canvas = document.getElementById("canvas");
const context = canvas.getContext('2d');

//7 column, 6 rows.
function board() {
    context.fillStyle = "#283ac1";
    context.fillRect(320,40, 640, 640);
}

function matrix() {
    
}
function draw() {
    context.fillStyle = "#000";
    context.fillRect(0, 0, canvas.width, canvas.height);
    board();
}
draw();