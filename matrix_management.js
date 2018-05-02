
function createNewPiece(){
/*
This function creates a new currentPiece.
Called by:
    - startStop() in updates.js
    - dropCurrentPiece() in piece_movements.js
*/

    currentPiece.yPos = 0;                          // start at the very top
    currentPiece.xPos = Math.floor(width / 2) - 1;  // start in the middle of the x-axis

    const type = Math.floor(Math.random() * 7) + 1; // choose piece type 1-7 randomly

    // The switch-statement creates the matrix for a new piece of type "tpye":
    switch (type){
        case 1:
            currentPiece.mat = [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0]
            ];
            break;
        
        case 2:
            currentPiece.mat = [
                [2, 2],
                [2, 2]
            ];
            break;
            
        case 3:
            currentPiece.mat = [
                [0, 0, 0],
                [3, 3, 3],
                [0, 3, 0]
            ];
            break;
        
        case 4:
            currentPiece.mat = [
                [0, 4, 0],
                [0, 4, 0],
                [0, 4, 4]
            ];
            break;
        
        case 5:
            currentPiece.mat = [
                [0, 5, 0],
                [0, 5, 0],
                [5, 5, 0]
            ];
            break;
        
        case 6:
            currentPiece.mat = [
                [6, 6, 0],
                [0, 6, 6],
                [0, 0, 0]
            ];
            break;
        
        case 7:
            currentPiece.mat = [
                [0, 7, 7],
                [7, 7, 0],
                [0, 0, 0]
            ];
            break;
    }
    
    // if a collision occured in the moment the new piece is created, then the game is over:
    if (didCurrentPieceCollide()){
        // game over
        startStop(false);
    }
}


function deleteRow(){
/*
This function checks if there are rows to delete. That is, it checks whether there are
rows in the game matrix which only have non-zero values.
Called by: dropCurrentPiece() in piece_movements.js
*/

    let scoreMultiplier = 1;       // initialize, assuming that we delete one row

    // define an outer loop "checkRow", which goes through all the rows, starting at the bottom of the canvas:
    checkRow: for (let y = height - 1; y > 0; y--){
        // within one row, go through all elements:
        for (let x = 0; x < width; x++){
            // If there is one free element in the row, then discard that row as potential
            // score and continue checking the next row:
            if (gameMatrix[y][x] == 0){
                continue checkRow;
            }
        }

        // the code below removes the row from the game matrix and is only excecuted if no element
        // in the gameMatrix was equal to zero in row y:       
        const deletedRow = gameMatrix.splice(y, 1)[0].fill(0);
        gameMatrix.unshift(deletedRow);
        y++;    // go one row back down, because one row has been deleted

        // calculate score:
        score += scoreMultiplier * 10;
        scoreMultiplier *= 2;   // double score with each row that is deleted within one call of the function
    }
}


function didCurrentPieceCollide(){
/*
This function returns true if a collision occured, false otherwise.
Called by:
    - createNewPiece()
    - dropCurrentPiece() in piece_movements.js
    - moveCurrentPiece() in piece_movements.js
    - rotateCurrentPiece() in piece_movements.js
*/
   
    if (currentPiece.mat != null){
        // iterate over each element in the currentPiece's matrix:
        for (let y = 0; y < currentPiece.mat.length; y++) {
            for (let x = 0; x < currentPiece.mat.length; x++) {

                let xPositionExists = (currentPiece.xPos + x < gameMatrix[0].length) && (currentPiece.xPos + x >= 0);
                let yPositionExists = (currentPiece.yPos + y < gameMatrix.length) && (currentPiece.yPos + y >= 0);

                if (currentPiece.mat[y][x] > 0){
                    if (!(xPositionExists && yPositionExists)){
                        return true;
                    }
                    else{
                        if (gameMatrix[currentPiece.yPos + y][currentPiece.xPos + x] > 0){
                            return true;
                        }
                    }
                }
            }         
        }
    }
    return false;
}


function updateGameMatrix(){
/*
This function copies all values from the currentPiece into the gameMatrix
Called by: dropCurrentPiece() in piece_movements.js (only called if there is no collision)
*/

    // iterate over each element in the currentPiece's matrix
    for (let y = 0; y < currentPiece.mat.length; y++) {
        for (let x = 0; x < currentPiece.mat.length; x++) {

            let xPositionExists = (currentPiece.xPos + x < gameMatrix[0].length) && (currentPiece.xPos + x >= 0);
            let yPositionExists = (currentPiece.yPos + y < gameMatrix.length) && (currentPiece.yPos + y >= 0);
        
            if (xPositionExists && yPositionExists){
            
                // if the game matrix was zero, then update the game matrix value to the current Piece's value
                if (gameMatrix[currentPiece.yPos + y][currentPiece.xPos + x] == 0){
                    gameMatrix[currentPiece.yPos + y][currentPiece.xPos + x] = currentPiece.mat[y][x]
                }
            }
        }
    }
}