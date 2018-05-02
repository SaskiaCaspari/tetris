
function dropCurrentPiece(){
/*
This function drops the currentPiece by one in the game matrix.
Called by:
    - event() from EventListener in inis.js
    - update() in updates.js
*/

    currentPiece.yPos++;    // drop position by one

    if (didCurrentPieceCollide()){
        currentPiece.yPos--;                // move current piece one up again, because drop was not valid
        updateGameMatrix();                 // put current piece into game matrix
        createNewPiece();                   // create new piece
        deleteRow();                        // check if the player scored
        document.getElementById('score').innerText = score;
    }
    timeSinceLastDrop = 0;      // reset timer
}


function moveCurrentPiece(direction){
/*
This function moves the currentPiece to the left or right. Input is 1 for right and -1 for left.
Called by: event() from EventListener in init.js
*/

    currentPiece.xPos += direction;     // change x-position by +1 or -1

    if (didCurrentPieceCollide()){
        currentPiece.xPos -= direction; // change x-position back in case of collision
    }
}


function rotateCurrentPiece(direction){
/*
This function rotates the current piece and checks whether the rotation was valid.
If the rotation was not valid, then the piece is rotated back.
Called by: event() from EventListener in init.js
*/

    rotation(direction);

    // if the piece collides with the game matrix (or wall), then rotate back:
    if (didCurrentPieceCollide()){
        rotation(-direction);
    }
}


function rotation(direction){
/*
This function executes the rotation of the currentPiece. A direction of -1 indicates counter-clockwise rotation
and a direction of +1 is clockwise rotation.
Called by: rotateCurrentPiece()
*/

    // reverse rows, depending on direction of rotation:
    if (direction > 0){
        currentPiece.mat.reverse();
    }
    else {
        currentPiece.mat.map(row => row.reverse());
    }

    // swap symmetric elements
    for (let j = 0; j < currentPiece.mat.length; j++){
        for (let i = 0; i < j; i++){
            const tempVar = currentPiece.mat[i][j];
            currentPiece.mat[i][j] = currentPiece.mat[j][i];
            currentPiece.mat[j][i] = tempVar;
        }
    }
}