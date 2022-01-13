export function createCanvas() {
  const canvas = document.getElementById("canvas");
  canvas.width = 1020;
  canvas.height = 640;
  canvas.style =
    "position: relative; top: 0px; left: 0px; right: 0px; bottom: 0px; margin: auto;";
  return canvas;
}

export function setupContext(context) {
  context.beginPath();
  context.fillStyle = "#3a74d1";
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.closePath();
}
