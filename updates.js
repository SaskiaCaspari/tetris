
function drawAll(){
/*
This functions fills the empty canvas and then draws the game matrix
and the current piece's matrix on it.
Called by: update()
*/

    context.fillStyle = '#262626';
    context.fillRect(0, 0, canvas.width, canvas.height);
    
    drawMatrix(gameMatrix, xPos = 0, yPos = 0);
    if (currentPiece.mat != null){
        drawMatrix(currentPiece.mat, currentPiece.xPos, currentPiece.yPos);
    }
    
}


function drawMatrix(matrix, xPos, yPos){
/*
This function draws matrix "matrix" to the canvas. The inputs are the matrix (which can
be either the gameMatrix or the currentMatrix), the x-position and y-position of the
matrices upper left corner.
Called by:
    - drawAll()
    - init.js
*/
    
    matrix.forEach((row, y) => {
        row.forEach((pieceType, x) => {
            if (pieceType > 0){
                context.fillStyle = colors[pieceType - 1];
                context.fillRect(x + xPos, y + yPos, 1, 1);
            }
        });
    });
}


function startStop(playing){
/* This function starts or stops the game. If "playing" is false, then only the current 
piece is deleted and the game-loop timers are reset. If "playing" is true, then 
we also start a new game.
Called by:
    - "Start New Game" Button on HTML canvas (onclick event) with playing==true
    - createNewPiece() from matrix_management.js with playing==false
*/

    // Delete currentPiece:
    let currentPiece = {
        mat: null,      // matrix
        xPos: 0,        // position on the horizontal axis
        yPos: 0,        // position on the vertical axis
    }

    // Reset Timers:
    let lastTime = 0;
    let timeSinceLastDrop = 0;


    if (playing){      
        gameMatrix.forEach(row => row.fill(0)); // set gameMatrix back to zero
        score = 0;                              // reset score
        document.getElementById('score').innerText = score;
        createNewPiece();
        update(0);                              // current time is set to 0
    }
    else{
        cancelAnimationFrame(frameID);
    }
    
}


function update(currentTime){
/*
This is the game loop. The input was initially zero as called from "main" and changes with every iteration.
"lastTime" is initially zero as well as defined in the main file.
Called by: startStop()
*/

    // "timePassed" is calculated as the time that has passed since the "update" function was called:
    const timePassed = currentTime - lastTime;
    lastTime = currentTime;     // new "lastTime" for the following loop iteration
    
    timeSinceLastDrop += timePassed;
    if (timeSinceLastDrop > dropRate){
        dropCurrentPiece();
    }
    drawAll();
    frameID = requestAnimationFrame(update);

}