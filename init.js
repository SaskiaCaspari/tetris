/*
This script initializes the tetris game and is executed when the page loads.
The functions are defined in separate js-files and all objects in this init.js script
are globally accessible.

The player can interact in the following ways: Move a piece left or right ("moveCurrentPiece"),
move a piece down faster ("dropCurrentPiece") or rotate a it ("rotateCurrentPiece").
*/


// access the canvas, where the graphics of the game will be displayed:
const canvas = document.getElementById('tetris');   // HTML: <canvas id="tetris" width="200" height="400"></canvas>
const scale = 20;

// define properties:
const context = canvas.getContext('2d');
context.scale(scale, scale);
context.fillStyle = '#000';
context.fillRect(0, 0, canvas.width, canvas.height);

// create game matrix:
const width = Math.floor(canvas.width / scale);    // number of columns
const height = Math.floor(canvas.height / scale);  // number of rows
let gameMatrix = [];  
for (let i = 0; i < height; i++){
    gameMatrix.push(new Array(width).fill(0));
}

// initialize the current piece we are playing with:
let currentPiece = {
    mat: null,      // matrix
    xPos: 0,        // position on the horizontal axis
    yPos: 0,        // position on the vertical axis
}

// define colors for the different pieces:
const colors = ['teal', 'slateblue', 'yellow', 'tomato', 'green', 'orange', 'yellowgreen'];

// keyboard controls:
document.addEventListener('keydown', event => {
    // If the player presses A, then move to left:
    if (event.keyCode == 65){
        moveCurrentPiece(-1);
    }
    // If the player presses D, then move to right:
    else if (event.keyCode == 68){
        moveCurrentPiece(1);
    }
    // If the player presses S, then drop piece regardless of the time since last drop:
    else if (event.keyCode == 83){
        dropCurrentPiece();
    }
    // if the player presses W, then rotate the piece clockwise:
    else if (event.keyCode == 87){
        rotateCurrentPiece(1);
    }
});

// initialize timers for updates:
let lastTime = 0;
let timeSinceLastDrop = 0;

let dropRate = 1000;        // initially have a drop rate of 1 second

// initialize score:
let score = 0;
document.getElementById('score').innerText = score; // HTML: <div id="score"></div>


drawAll(); // draw the canvas (without any pieces)

