function menuRedirect() {
    window.location.href = "index.html";
}

function restartGame() {
    window.location.reload();
}

var playerTurn = 1;
var lineColor = ["#ACA8E9", "#E9C6A8", "#C6989E"]
var bonusTurn = false;
var boxesComplete = [[false, false, false], [false, false, false], [false, false, false]]
var boxesCompletePlayer = [[0, 0, 0], [0, 0, 0], [0, 0, 0]]
var playerScore = [0, 0, 0];

var element = document.getElementById("p1");
element.style.border = "2px solid " + lineColor[0];


class gameDot {
    constructor(left, right, top, bottom) {
        this.left = left;
        this.right = right;
        this.top = top;
        this.bottom = bottom;
    }



}


var gameGrid = [[new gameDot(0, 0, 0, 0), new gameDot(0, 0, 0, 0), new gameDot(0, 0, 0, 0), new gameDot(0, 0, 0, 0)], [new gameDot(0, 0, 0, 0), new gameDot(0, 0, 0, 0), new gameDot(0, 0, 0, 0), new gameDot(0, 0, 0, 0)], [new gameDot(0, 0, 0, 0), new gameDot(0, 0, 0, 0), new gameDot(0, 0, 0, 0), new gameDot(0, 0, 0, 0)], [new gameDot(0, 0, 0, 0), new gameDot(0, 0, 0, 0), new gameDot(0, 0, 0, 0), new gameDot(0, 0, 0, 0)]];

const canvas = document.querySelector('#canvas');

const ctx = canvas.getContext('2d');

var lastPreview = [0, 0, 0, 0]
var newPreview = [0, 0, 0, 0];

function isComplete(element, index, array) {
    return element == true;
}


canvas.addEventListener("mousedown", function (e) {

    var fxVal = Math.ceil(((Math.ceil((newPreview[0] - 100) / 37.5))) / 2);
    var fyVal = Math.ceil(((Math.ceil((newPreview[1] - 75) / 37.5))) / 2);
    var lxVal = Math.ceil(((Math.ceil((newPreview[2] - 100) / 37.5))) / 2);
    var lyVal = Math.ceil(((Math.ceil((newPreview[3] - 75) / 37.5))) / 2);

    // Check if second point is left or right or top or bottom
    if (lxVal > fxVal) {
        // second point is right
        gameGrid[fxVal][fyVal].right = playerTurn;
        gameGrid[lxVal][lyVal].left = playerTurn;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCanvas()
        
    }  else {
        // second point is below
        gameGrid[fxVal][fyVal].bottom = playerTurn;
        gameGrid[lxVal][lyVal].top = playerTurn;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCanvas()
    }


    // check for boxes complete

    checkBoxes();

    // check for game win condition

    if (playerScore[0] + playerScore[1] + playerScore[2] == 9) {

        console.log(playerScore);
       

        // Game over, get results
        var wScore = Math.max(playerScore[0], playerScore[1], playerScore[2]);
        var playersWon = 0;

        console.log(wScore);

        for (var i = 0; i < 3; i++) {
            if (playerScore[i] == wScore) {
                playersWon += 1;
            }
        }

        console.log(playersWon);

        var winMessage = "";

        if (playersWon > 1) {
            winMessage += "TIE! Players ";
        } else {
            winMessage += "Player "
        }

        for (var i = 0; i < 3; i++) {
            if (playerScore[i] == wScore) {
                if (i != 0 && playersWon > 1) {
                    winMessage += " and ";
                }
                winMessage += (i+1);
            }
        }

        if (playersWon > 1) {
            winMessage += " have won the game!";
        } else {
            winMessage += " has won the game!";
        }

        // finial draw
        drawCanvas()

        alert(winMessage);
        window.location.reload();

    }


    if (!bonusTurn) {
        if (playerTurn == 1) {
            playerTurn = 2;
            var element = document.getElementById("p1");
            element.style.border = "2px solid mintcream";
            var element = document.getElementById("p2");
            element.style.border = "2px solid " + lineColor[1];

        } else if (playerTurn == 2) {
            playerTurn = 3;
            var element = document.getElementById("p2");
            element.style.border = "2px solid mintcream";
            var element = document.getElementById("p3");
            element.style.border = "2px solid " + lineColor[2];

        } else if (playerTurn == 3) {
            playerTurn = 1;
            var element = document.getElementById("p3");
            element.style.border = "2px solid mintcream";
            var element = document.getElementById("p1");
            element.style.border = "2px solid " + lineColor[0];

        }

    } else {
        bonusTurn = false;
    }



});




canvas.addEventListener("mousemove", function (e) {
    var cRect = canvas.getBoundingClientRect();        // Gets CSS pos, and width/height
    var x = Math.round(e.clientX - cRect.left);  // Subtract the 'left' of the canvas 
    var y = Math.round(e.clientY - cRect.top);   // from the X/Y positions to make

    newPreview = [0, 0, 0, 0];

    var xVal = (Math.ceil((x-100) / 37.5)) + 1
    var yVal = (Math.ceil((y - 75) / 37.5)) + 1

    // If mouse is over the left or right / top or bottom of grid 
    if (xVal > 8) {
        xVal = 8;
    } else if (xVal < 1) {
        xVal = 1;
    }
    if (yVal > 7) {
        yVal = 7;
    } else if (yVal < 1) {
        yVal = 1;
    }




    // Calculate which dot is as 0 - 3 values for grid matrix
    var xValDot = Math.ceil(xVal / 2) - 1
    var yValDot = Math.ceil(yVal / 2) - 1

    var xValDotEdge = Math.floor(xVal / 2) - 1
    var yValDotEdge = Math.floor(yVal / 2) - 1

    if (xValDotEdge < 0) {
        xValDotEdge = 0;
    } 
    if (yValDotEdge < 0) {
        yValDotEdge = 0;
    }


    var tempPreview = newPreview;

    // Chjeck if on edges
    if (xVal == 1) {
        newPreview = [100, 75 + (yValDotEdge * 75), 100, 75 + (yValDotEdge * 75) + 75];
    } else if (xVal == 8) {
        newPreview = [325, 75 + (yValDotEdge * 75), 325, 75 + (yValDotEdge * 75) + 75];
    } else if (yVal == 1) {
        newPreview = [100 + (xValDotEdge * 75), 75, 100 + (xValDotEdge * 75) + 75, 75];
    } else if (yVal == 7) {
        newPreview = [100 + (xValDotEdge * 75), 300, 100 + (xValDotEdge * 75) + 75, 300];
    } else {

        // Check which inner quadrant it is in
        if (xVal % 2 != 0 && yVal % 2 != 0) {
            // BOTTOM RIGHT

            if (x - ((xValDot - 1) * 75) - 137.5 < y - ((yValDot - 1) * 75) - 75 - 37.5) {
                // draw horizontal line

                newPreview = [100 + ((xValDot - 1) * 75), 75 + (yValDot * 75), 100 + (xValDot * 75), 75 + (yValDot * 75)];


            } else {
                // draw vertical line
           
                newPreview = [100 + ((xValDot) * 75), 75 + ((yValDot - 1) * 75), 100 + ((xValDot) * 75), 75 + (yValDot * 75)];

            }

        } else if (xVal % 2 != 0 && yVal % 2 == 0) {
            // TOP RIGHT

            if (x - ((xValDot - 1) * 75) - 137.5 > y - ((yValDot) * 75) - 75) {
                // draw horizontal line

                newPreview = [100 + ((xValDot - 1) * 75), 75 + (yValDot * 75), 100 + (xValDot * 75), 75 + (yValDot * 75)];


            } else {
                // draw vertical line

                newPreview = [100 + ((xValDot) * 75), 75 + (yValDot * 75), 100 + (xValDot * 75), 75 + (yValDot * 75) + 75];

            }


        } else if (xVal % 2 == 0 && yVal % 2 != 0) {
            // BOTTOM LEFT
            if ((x - (xValDot * 75) - 100) < (y - ((yValDot - 1) * 75) - 75 - 37.5)) {
                // draw horizontal line
                newPreview = [100 + (xValDot * 75), 75 + (yValDot * 75), 100 + (xValDot * 75) + 75, 75 + (yValDot * 75)];


            } else {
                // draw vertical line
                newPreview = [100 + (xValDot * 75), 75 + ((yValDot-1) * 75), 100 + (xValDot * 75), 75 + (yValDot * 75)];

            }



        } else {
            // TOP LEFT

            if (x - (xValDot * 75) - 100 > y - (yValDot * 75) - 75) {
                // draw horizontal line

                newPreview = [100 + (xValDot * 75), 75 + (yValDot * 75), 100 + (xValDot * 75) + 75, 75 + (yValDot * 75)];


            } else {
                // draw vertical line

                newPreview = [100 + (xValDot * 75), 75 + (yValDot * 75), 100 + (xValDot * 75), 75 + (yValDot * 75) + 75];

            }

        }

    }






    // Validate and draw preview or revert

    if (validatePreview(newPreview)) {

        ctx.beginPath();
        ctx.moveTo(newPreview[0], newPreview[1]);
        ctx.lineTo(newPreview[2], newPreview[3]);
        ctx.strokeStyle = "#B9B9B9";
        ctx.lineWidth = 3;
        ctx.stroke();

        let ypos = 75;

        for (let i = 0; i < 4; i++) {
            let xpos = 100;
            for (let j = 0; j < 4; j++) {
                ctx.beginPath();
                ctx.arc(xpos, ypos, 4, 0, 2 * Math.PI, true);
                ctx.fillStyle = "black";
                ctx.fill();

                xpos += 75;
            }
            ypos += 75;
        }


    } else {
        newPreview = tempPreview;
    }

    // Check for new preview
    if (JSON.stringify(newPreview) != JSON.stringify(lastPreview)) {

        lastPreview = newPreview;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        drawCanvas()

    }


});



function checkBoxes() {


    // GO LEFT TO RIGHT FOR EVERY BOX IN ROW
    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {

            if (!boxesComplete[x][y]) {

                if (gameGrid[x][y].right != 0 && gameGrid[x + 1][y].bottom != 0 && gameGrid[x][y].bottom != 0 && gameGrid[x][y + 1].right != 0) {

                    boxesComplete[x][y] = true;
                    boxesCompletePlayer[x][y] = playerTurn;
                    bonusTurn = true;
                    playerScore[playerTurn - 1] += 1;
                    var element = document.getElementById("p" + playerTurn);
                    element.textContent = "P" + playerTurn + " [" + playerScore[playerTurn - 1] + "]";



                }


            }

        }
    }


}

function validatePreview(checkPreview) {

    var fxVal = Math.ceil(((Math.ceil((checkPreview[0] - 100) / 37.5))) / 2);
    var fyVal = Math.ceil(((Math.ceil((checkPreview[1] - 75) / 37.5))) / 2);
    var lxVal = Math.ceil(((Math.ceil((checkPreview[2] - 100) / 37.5))) / 2);
    var lyVal = Math.ceil(((Math.ceil((checkPreview[3] - 75) / 37.5))) / 2);


    if (lxVal > fxVal) {

        if (gameGrid[fxVal][fyVal].right == 0 && gameGrid[lxVal][lyVal].left == 0) {
            return true;
        } else {
            return false;
        }

    } else {

        if (gameGrid[fxVal][fyVal].bottom == 0 && gameGrid[lxVal][lyVal].top == 0) {
            return true;
        } else {
            return false;
        }

    }

}



function drawCanvas() {



    if (!canvas.getContext) {
        return;
    }




    // DRAW LINES BASED OFF GAME GRID

    // GO LEFT TO RIGHT FOR EVERY ROW
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {

            var p = gameGrid[j][i].right;


            if (gameGrid[j][i].right == gameGrid[j+1][i].left && p != 0) {
                ctx.beginPath();
                ctx.moveTo(100 + (j*75), 75 + (i*75));
                ctx.lineTo(100 + (j * 75) + 75, 75 + (i * 75));
                ctx.strokeStyle = lineColor[p - 1];
                ctx.lineWidth = 3;
                ctx.stroke();
            }

        }
    }


    // GO TOP TO BOTTOM FOR EVERY ROW
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 3; j++) {

            var p = gameGrid[i][j].bottom;


            if (gameGrid[i][j].bottom == gameGrid[i][j+1].top && p != 0) {
                ctx.beginPath();
                ctx.moveTo(100 + (i * 75), 75 + (j * 75));
                ctx.lineTo(100 + (i * 75), 75 + (j * 75) + 75);
                ctx.strokeStyle = lineColor[p - 1];
                ctx.lineWidth = 3;
                ctx.stroke();
            }

        }
    }

    // DRAW DOTS
    let ypos = 75;

    for (let i = 0; i < 4; i++) {
        let xpos = 100;
        for (let j = 0; j < 4; j++) {
            ctx.beginPath();
            ctx.arc(xpos, ypos, 4, 0, 2 * Math.PI, true);
            ctx.fillStyle = "black";
            ctx.fill();

            xpos += 75;
        }
        ypos += 75;
    }

    // color completed boxes

    for (let y = 0; y < 3; y++) {
        for (let x = 0; x < 3; x++) {

            if (boxesCompletePlayer[x][y] != 0) {
                ctx.beginPath();
                ctx.fillStyle = lineColor[(boxesCompletePlayer[x][y]-1)];
                ctx.rect(100 + (x * 75), 75 + (y * 75), 75, 75);
                ctx.fill();
            }

        }
    }




    //printGrid();



}





function printGrid() {

    var t = true;
    var mid = false;

    for (let y = 0; y < 4; y++) {

        console.log("  " + gameGrid[0][y].top + "    " + gameGrid[1][y].top + "    " + gameGrid[2][y].top + "    " + gameGrid[3][y].top);
        console.log(" " + gameGrid[0][y].left + " " + gameGrid[0][y].right + "  " + gameGrid[1][y].left + " " + gameGrid[1][y].right + "  " + gameGrid[2][y].left + " " + gameGrid[2][y].right + "  " + gameGrid[3][y].left + " " + gameGrid[3][y].right + "  ")
        console.log("  " + gameGrid[0][y].bottom + "    " + gameGrid[1][y].bottom + "    " + gameGrid[2][y].bottom + "    " + gameGrid[3][y].bottom);        
        console.log("                                              ");



    }

    console.log("--------------------------------------------------");


}

