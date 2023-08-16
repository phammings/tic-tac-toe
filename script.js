/* eslint-disable no-use-before-define */
const game = (() => {
	const lines = document.querySelectorAll(".line");
    const cells = document.querySelectorAll(".cell");
	const hand = document.querySelector(".hand");
	const pageTurn = document.querySelector(".page-turn");
    const pvpBtn = document.querySelector("#pvp");
    const pvbBtn = document.querySelector("#pvb");
    const playerScore1 = document.querySelector(".score-1");
    const playerScore2 = document.querySelector(".score-2");
    const player1Label = document.querySelector(".player-1");
    const player2Label = document.querySelector(".player-2");
    let isCircle = true;
    let markedCellCount = 0;
    let winLocation = "";
    let score1 = 0;
    let score2 = 0;
    // from left to right, top to bottom i.e. [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // where 1 2 3 is in the first row, 4 5 6 is in the second row, and so on...
    const gameBoard = ["", "", "", "", "", "", "", "", ""];

	const addListeners = () => {
        [...cells].forEach(cell => {cell.addEventListener("click", addMarker)});
        addRadioListeners();
	};

    const addRadioListeners = () => {
        pvbBtn.addEventListener("click", () => {
            setTimeout(() => {
                newMatch(); resetScores(); pvpBtn.checked = false; 
            }, 1000);
        });
        pvpBtn.addEventListener("click", () => { 
            setTimeout(() => {
                newMatch(); resetScores(); pvpBtn.checked = true;
            }, 1000);
        });
    };

    const resetScores = () => {
        score1 = 0;
        score2 = 0;
        playerScore1.innerHTML = score1;
        playerScore2.innerHTML = score2;
    }

    const addMarker = (event) => {
        if (!event.target.hasAttribute("is-marked")) {
            if (isCircle) {
                displayController.setBotTurn(false);
                displayController.handleCircleMarker(event);
                displayController.switchBotTurn();
                player2Label.classList.add("yellow");
                player1Label.classList.remove("yellow");
            }
            else {
                displayController.handleCrossMarker(event);
                if (pvpBtn.checked) {
                    displayController.switchBotTurn();
                }
                player2Label.classList.remove("yellow");
                player1Label.classList.add("yellow");
            }
            markedCellCount += 1;
            isCircle = !isCircle;
            
        }
        checkBoard();
        if (pvbBtn.checked) {
            setTimeout(() => { botTurn(); }, 1000);
        }
    };

    const botTurn = () => {
        if(isCircle === false && remainingMoves() > 0) {
            player1Label.classList.remove("yellow");
            player2Label.classList.add("yellow");
            let index;
            index = Math.floor(Math.random() * 9);
            while (gameBoard[index] !== "") {
                index = Math.floor(Math.random() * 9);
            }
            const cellValue = `c${index+1}`;

            document.querySelector(`.${cellValue}`).click();
            setTimeout(() => {hand.classList.add("animate")}, 9500);
            displayController.switchBotTurn();
        }
    }

    const checkBoard = () => {
        if (markedCellCount >= 9) {
            [...cells].forEach(cell => {cell.removeEventListener("click", addMarker)});
            setTimeout(() => {newMatch();}, 3000);
        }
        else if (checkIfWinner("O")) {
                // eslint-disable-next-line no-unused-expressions
                isCircle ? score2+=1 : score1+=1;
                updateScores();
                [...cells].forEach(cell => {cell.removeEventListener("click", addMarker)});
                displayController.handleWinner(winLocation);
                setTimeout(() => { newMatch(); }, 3000);
            }
            else if (checkIfWinner("X")) {
                // eslint-disable-next-line no-unused-expressions
                isCircle ? score2+=1 : score1+=1;
                updateScores();
                [...cells].forEach(cell => {cell.removeEventListener("click", addMarker)}); 
                displayController.handleWinner(winLocation);
                setTimeout(() => { newMatch();}, 3000);
            }
    }

    const remainingMoves = () => {
        let emptySpaces = 0;
        for (let i = 0; i<9; i+=1) {
            if (gameBoard[i] === "") {
                emptySpaces+=1;
            }
        }
        return emptySpaces;
    }

    const updateScores = () => {
      playerScore1.innerHTML = score1;
      playerScore2.innerHTML = score2;  
    };

    const resetGameBoard = () => {
        for(let i = 0; i < gameBoard.length; i+=1){
                gameBoard[i] = "";
        }
    };

	const newMatch = () => {
        resetGameBoard();
        winLocation = "";
        markedCellCount = 0;

        pageTurn.classList.remove("animate");
        pageTurn.classList.add("animate");

        setTimeout(() => {
            [...cells].forEach(cell => {
                // eslint-disable-next-line no-param-reassign
                cell.innerHTML = "";
                cell.removeAttribute("is-marked");
                cell.classList.remove("yellow");
            });
    
            [...lines,hand].forEach(element => {
                element.classList.remove("animate")
            });
        }, 500);
        
        setTimeout(() => {
            addListeners();
            setTimeout(() => {hand.classList = "hand animate";}, 100);
            [...lines,hand].forEach(element => {
                element.classList.add("animate")
            });

            setTimeout(() => {
                if(!isCircle && pvbBtn.checked) { 
                    botTurn(); 
                }
                pageTurn.classList.remove("animate");
            }, 3000);
		}, 1000);  
	};

    const checkIfWinner = (marker) => {
        const checkRow = (index) => gameBoard[index] === marker && gameBoard[index+1] === marker && gameBoard[index+2] === marker;

        const checkCol = (index) => gameBoard[index] === marker && gameBoard[index+3] === marker && gameBoard[index+6] === marker;

        const checkDiagLtoR = () => gameBoard[0] === marker && gameBoard[4] === marker && gameBoard[8] === marker;

        const checkDiagRtoL = () => gameBoard[2] === marker && gameBoard[4] === marker && gameBoard[6] === marker;

        const calcWinLocation = () => {
            if (checkRow(0) === true) {
                winLocation = "1st-row";
            }
            else if (checkRow(3) === true) {
                winLocation = "2nd-row";
            }
            else if (checkRow(6) === true) {
                winLocation = "3rd-row";
            }
            else if (checkCol(0) === true) {
                winLocation = "1st-col";
            }
            else if (checkCol(1) === true) {
                winLocation = "2nd-col";
            }
            else if (checkCol(2) === true) {
                winLocation = "3rd-col";
            }
            else if (checkDiagLtoR() === true) {
                winLocation = "LR-diagonal";
            }
            else if (checkDiagRtoL() === true) {
                winLocation = "RL-diagonal";
            }
        }        
        calcWinLocation(marker);
        return checkRow(0) || checkRow(3) || checkRow(6) || checkCol(0) || checkCol(1) || checkCol(2) || checkDiagLtoR() || checkDiagRtoL();
    };

	return { addListeners, gameBoard }
})();

const displayController = (() => {
    const pvpBtn = document.querySelector("#pvp");
    const hand = document.querySelector(".hand");
    let markerType = "";
    let isBotTurn = false;

    const switchBotTurn = () => {
        isBotTurn = !isBotTurn;
    }

    const setBotTurn = (botTurn) => {
        isBotTurn = botTurn;
    }

    const handleCircleMarker = (event) => {
        const img = document.createElement("img");

		img.src = "resources/images/pencil-stroke-circle.png"; 
        img.classList.add("circle");

        img.setAttribute("is-marked", "true");
        img.classList.add("animate");
        event.target.appendChild(img); 
        img.parentElement.setAttribute("is-marked", "true");
         
        markerType = "circle";

        animateHandWithMarker(event);
	};

    const handleCrossMarker = (event) => {
        const img = document.createElement("img");
        const img2 = document.createElement("img");

        img.src = "resources/images/pencil-stroke-short.png";
        img.classList.add("cross");

        img.setAttribute("is-marked", "true");
        img.classList.add("animate");
        event.target.appendChild(img); 
        img.parentElement.setAttribute("is-marked", "true");
        
        img2.src = "resources/images/pencil-stroke-short.png";
        img2.classList.add("cross2");
        img2.classList.add("animate");
        event.target.appendChild(img2);
        img2.setAttribute("is-marked", "true");

        markerType = "cross";

        animateHandWithMarker(event);
    };


    const animateHandWithMarker = (event) => {
        const cell = event.target.classList;

        hand.classList = ("hand");
        hand.classList.remove("animate");

        if (markerType === "circle") {
            if (cell.contains("c1")) {
                // hand.classList.add("circle-top-left");
                game.gameBoard[0]= "O"
            }
            else if (cell.contains("c2")) {
                // hand.classList.add("circle-top-middle");
                game.gameBoard[1] = "O";
            }
            else if (cell.contains("c3")) {
                // hand.classList.add("circle-top-right");
                game.gameBoard[2] = "O";
            }
            else if (cell.contains("c4")) {
                // hand.classList.add("circle-middle-left");
                game.gameBoard[3] = "O";
            }
            else if (cell.contains("c5")) {
                // hand.classList.add("circle-middle");
                game.gameBoard[4] = "O";
            }
            else if (cell.contains("c6")) {
                // hand.classList.add("circle-middle-right");
                game.gameBoard[5] = "O";
            }
            else if (cell.contains("c7")) {
                // hand.classList.add("circle-bottom-left");
                game.gameBoard[6] = "O";
            }
            else if (cell.contains("c8")) {
                // hand.classList.add("circle-bottom-middle");
                game.gameBoard[7] = "O";
            }
            else {
                // hand.classList.add("circle-bottom-right");
                game.gameBoard[8] = "O";
            }    
        }
        else if (cell.contains("c1")) {
                hand.classList.add("cross-top-left");
                game.gameBoard[0] = "X";
            }
            else if (cell.contains("c2")) {
                hand.classList.add("cross-top-middle");
                game.gameBoard[1] = "X";
            }
            else if (cell.contains("c3")) {
                hand.classList.add("cross-top-right");
                game.gameBoard[2] = "X";
            }
            else if (cell.contains("c4")) {
                hand.classList.add("cross-middle-left");
                game.gameBoard[3] = "X";
            }
            else if (cell.contains("c5")) {
                hand.classList.add("cross-middle");
                game.gameBoard[4] = "X";
            }
            else if (cell.contains("c6")) {
                hand.classList.add("cross-middle-right");
                game.gameBoard[5] = "X";
            }
            else if (cell.contains("c7")) {
                hand.classList.add("cross-bottom-left");
                game.gameBoard[6] = "X";
            }
            else if (cell.contains("c8")) {
                hand.classList.add("cross-bottom-middle");
                game.gameBoard[7] = "X";
            }
            else {
                hand.classList.add("cross-bottom-right");
                game.gameBoard[8] = "X";
            }  
         

        if (isBotTurn === true && !pvpBtn.checked) {
            hand.classList.add("animate");
        }
    }

    const handleWinner = (winLocation) => {
        let c1;
        let c2;
        let c3;
        
        if (winLocation === "1st-row") {
            c1 = document.querySelector(".c1");
            c2 = document.querySelector(".c2");
            c3 = document.querySelector(".c3");
            
        }
        else if (winLocation === "2nd-row") {
            c1 = document.querySelector(".c4");
            c2 = document.querySelector(".c5");
            c3 = document.querySelector(".c6");
        }
        else if (winLocation === "3rd-row") {
            c1 = document.querySelector(".c7");
            c2 = document.querySelector(".c8");
            c3 = document.querySelector(".c9");
        }
        else if (winLocation === "1st-col") {
            c1 = document.querySelector(".c1");
            c2 = document.querySelector(".c4");
            c3 = document.querySelector(".c7");
        }
        else if (winLocation === "2nd-col") {
            c1 = document.querySelector(".c2");
            c2 = document.querySelector(".c5");
            c3 = document.querySelector(".c8");
        }
        else if (winLocation === "3rd-col") {
            c1 = document.querySelector(".c3");
            c2 = document.querySelector(".c6");
            c3 = document.querySelector(".c9");
        }
        else if (winLocation === "LR-diagonal") {
            c1 = document.querySelector(".c9");
            c2 = document.querySelector(".c5");
            c3 = document.querySelector(".c1");
        }
        else if (winLocation === "RL-diagonal") {
            c1 = document.querySelector(".c7");
            c2 = document.querySelector(".c5");
            c3 = document.querySelector(".c3");
        }
            
        c1.classList.add("yellow");
        c2.classList.add("yellow");
        c3.classList.add("yellow");
    };

    return {switchBotTurn, handleCircleMarker, handleCrossMarker, handleWinner, setBotTurn};
})();

//  run on start
game.addListeners();