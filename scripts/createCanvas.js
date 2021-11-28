function createCanvas() {
    const canvas = document.getElementById('canvas');
    canvas.width = 1020;
    canvas.height = 640;
    canvas.style = "position: absolute; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto;"
    return canvas;
}


function setupContext(context) {
    context.fillStyle = "#3a74d1";
    context.fillRect(0, 0, canvas.width, canvas.height);
}