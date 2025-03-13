


let img = new Image();
img.src =
    'https://opengameart.org/sites/default/files/Green-Cap-Character-16x18.png';

img.onload = function () {
    init();
};

let canvas = document.querySelector('canvas#characterCanvas');
let ctx = canvas.getContext('2d');

// 0. just draw the image
// function step() {
//     // ctx.clearRect(0, 0, canvas.width, canvas.height);
//     // ctx.drawImage(img, 0, 0);
//     ctx.drawImage(img, 0, 0, 16, 18, 0, 0, 16, 18);
//     window.requestAnimationFrame(step);
// }

// 1. draw scaled image with few frames
const scale = 4;
const width = 16;
const height = 18;
const scaledWidth = scale * width;
const scaledHeight = scale * height;
let row = 0; // for future


// wrapper function to draw a frame
function drawFrame(frameX, frameY, canvasX, canvasY) {
    ctx.drawImage(
        img,
        frameX * width,
        frameY * height,
        width,
        height,
        canvasX,
        canvasY,
        scaledWidth,
        scaledHeight
    );
}

const cycleLoop = [0, 1, 0, 2];
let currentLoopIndex = 0;
let frameCount = 0;
let animationId;
let isMoving = false;

function step() {
    // slow down the animation
    frameCount++;

    // if available to stop
    if(animationId && !isMoving) {
        window.cancelAnimationFrame(animationId);
        return;
    }

    if (frameCount < 15 ) {
        window.requestAnimationFrame(step);
        return;
    }

    // step for animation
    frameCount = 0;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // drawFrame(cycleLoop[currentLoopIndex], row, 0, 0);
    drawFrame(cycleLoop[currentLoopIndex], row, canvas.width/2 - scaledWidth /2, canvas.height/2 - scaledHeight /2); // center the image
    currentLoopIndex++;
    if (currentLoopIndex >= cycleLoop.length) {
        currentLoopIndex = 0;
    }
    animationId = window.requestAnimationFrame(step);
}

function init() {
    // show firts frames
    ctx.drawImage(img, 0, 0, width, height, 0, 0, scaledWidth, scaledHeight);
    ctx.drawImage(img, width, 0, width, height, scaledWidth, 0, scaledWidth, scaledHeight);
    ctx.drawImage(img, 0, 0, width, height, scaledWidth * 2, 0, scaledWidth, scaledHeight);
    ctx.drawImage(img, width * 2, 0, width, height, scaledWidth * 3, 0, scaledWidth, scaledHeight);

    window.requestAnimationFrame(step);
}


window.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        row = 3;
    } else if (e.key === 'ArrowLeft') {
        row = 2;
    } else if (e.key === 'ArrowUp') {
        row = 1;
    } else if (e.key === 'ArrowDown') {
        row = 0;
    } else if (e.key === ' ') {
        isMoving = !isMoving;
        if (isMoving) {
            window.requestAnimationFrame(step);
        } else {
            window.cancelAnimationFrame(animationId);
        }
    }
});