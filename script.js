const gameBoard = (() => {
	const lines = document.querySelectorAll(".line");
    const cells = document.querySelectorAll(".cell");
	const hand = document.querySelector(".hand");
	const pageTurn = document.querySelector(".page-turn");
    const pvpBtn = document.querySelector("#pvp");
    const pvbBtn = document.querySelector("#pvb");
    const botLevels = document.querySelector(".bot-levels");
    const playerScore1 = document.querySelector(".score-1");
    const playerScore2 = document.querySelector(".score-2");
    const normalLevel = document.querySelector("#normal");
    const impossibleLevel = document.querySelector("#impossible");
    let isCircle = true;
    let markedCellCount = 0;
    let winLocation = "";
    let score1 = 0;
    let score2 = 0;
    let botLevel = "";
    // from left to right, top to bottom i.e. [1, 2, 3, 4, 5, 6, 7, 8, 9]
    // where 1 2 3 is in the first row, 4 5 6 is in the second row, and so on...
    let gameBoard = ["", "", "", "", "", "", "", "", ""];

	const addListeners = () => {
        [...cells].forEach(cell => {cell.addEventListener("click", addMarker)});
        addRadioListeners();
	};

    const addRadioListeners = () => {
        if (pvbBtn.checked) {
            botLevels.classList.remove("hidden");
            if(normalLevel.checked) {
                botLevel = "Normal";
            }
            else {
                botLevel = "Impossible";
            }
        }
        pvbBtn.addEventListener("click", () => {
            botLevels.classList.remove("hidden");
            setTimeout(() => {newMatch(); resetScores();}, 2000);
        });
        pvpBtn.addEventListener("click", () => { 
            botLevels.classList.add("hidden");
            setTimeout(() => {newMatch(); resetScores();}, 2000);
            
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
                displayController.handleCircleMarker(event);
                displayController.switchBotTurn();
            }
            else {
                displayController.handleCrossMarker(event);
            }
            markedCellCount += 1;
            isCircle = !isCircle;
            
        }
        checkBoard();
        botTurn();
        
    };

    const botTurn = () => {
        if(isCircle === false && remainingMoves() > 0) {
            if (normalLevel.checked) {
                let randomIndex = Math.floor(Math.random() * 9);

                while (gameBoard[randomIndex] !== "") {
                    randomIndex = Math.floor(Math.random() * 9);
                }
                let cellValue = "c" + (randomIndex+1);
                
                document.querySelector("." + cellValue).click();
                displayController.switchBotTurn();
                
            }
            else {}
        }
    }

    const checkBoard = () => {
        //setTimeout(() => {
            if (markedCellCount >= 9) {
                [...cells].forEach(cell => {cell.removeEventListener("click", addMarker)});
                setTimeout(() => {newMatch();}, 2000);
            }
            else {
                if (checkIfWinner("O")) {
                    console.log("O is Winner!");
                    isCircle ? score2++ : score1++;
                    updateScores();
                    [...cells].forEach(cell => {cell.removeEventListener("click", addMarker)});
                    displayController.handleWinner(winLocation);
                    setTimeout(() => {newMatch();}, 2000);
                }
                else if (checkIfWinner("X")) {
                    console.log("X is Winner!");
                    isCircle ? score2++ : score1++;
                    updateScores();
                    [...cells].forEach(cell => {cell.removeEventListener("click", addMarker)}); 
                    displayController.handleWinner(winLocation);
                    setTimeout(() => {newMatch();}, 2000);
                }
            }
        //}, 100);
    }

    const remainingMoves = () => {
        let emptySpaces = 0;
        for (let i = 0; i<9; i++) {
            if (gameBoard[i] === "") {
                emptySpaces++;
            }
        }
        return emptySpaces;
    }

    const updateScores = () => {
      playerScore1.innerHTML = score1;
      playerScore2.innerHTML = score2;  
    };

    const resetGameBoard = () => {
        for(let i = 0; i < gameBoard.length; i++){
                gameBoard[i] = "";
        }
    };

	const newMatch = () => {
        resetGameBoard();
        winLocation = "";
        markedCellCount = 0;
        hand.classList = "hand animate";
		pageTurn.classList.remove("animate");
		setTimeout(() => { pageTurn.classList.add("animate") }, 100);

		setTimeout(() => {
			[...lines,hand].forEach(line => {
				line.classList.remove("animate")
			});

            setTimeout(() => {
                [...cells].forEach(cell => {
                    cell.innerHTML = ""
                    cell.removeAttribute("is-marked");
                });
            }, 100);

			setTimeout(() => {
				[...lines,hand].forEach(line => {
					line.classList.add("animate")
				});
			}, 100);
		}, 300);
        setTimeout(() => {
            addListeners();
            if(!isCircle && pvbBtn.checked && normalLevel.checked) {
                displayController.switchBotTurn();
                botTurn();
            }
        }, 3000);
        
	};

    const checkIfWinner = (marker) => {
        const checkRow = (index) => {
            return gameBoard[index] == marker && gameBoard[index+1] == marker && gameBoard[index+2] == marker;
        };

        const checkCol = (index) => {
            return gameBoard[index] == marker && gameBoard[index+3] == marker && gameBoard[index+6] == marker;
        };

        const checkDiagLtoR = () => {
            return gameBoard[0] == marker && gameBoard[4] == marker && gameBoard[8] == marker;
        };

        const checkDiagRtoL = () => {
            return gameBoard[2] == marker && gameBoard[4] == marker && gameBoard[6] == marker;
        };

        const calcWinLocation = () => {
            if (checkRow(0) == true) {
                winLocation = "1st-row";
            }
            else if (checkRow(3) == true) {
                winLocation = "2nd-row";
            }
            else if (checkRow(6) == true) {
                winLocation = "3rd-row";
            }
            else if (checkCol(0) == true) {
                winLocation = "1st-col";
            }
            else if (checkCol(1) == true) {
                winLocation = "2nd-col";
            }
            else if (checkCol(2) == true) {
                winLocation = "3rd-col";
            }
            else if (checkDiagLtoR() == true) {
                winLocation = "LR-diagonal";
            }
            else if (checkDiagRtoL() == true) {
                winLocation = "RL-diagonal";
            }
        }

        const minimax = (state, player) => {
            const maxPlayer = "";
            isCircle ? maxPlayer = "O" : maxPlayer = "X";
            const otherPlayer = player === "X" ? "O" : "X";
        
            if (state.currentWinner === otherPlayer) {
                const score = (otherPlayer === maxPlayer ? 1 : -1) * (state.numEmptySquares() + 1);
                return { position: null, score: score };
            } else if (!state.emptySquares()) {
                return { position: null, score: 0 };
            }
        
            let best;
            if (player === maxPlayer) {
                best = { position: null, score: -Infinity };
            } else {
                best = { position: null, score: Infinity };
            }
        
            for (const possibleMove of state.availableMoves()) {
                state.makeMove(possibleMove, player);
                const simScore = minimax(state, otherPlayer);
        
                // Undo move
                state.board[possibleMove] = ' ';
                state.currentWinner = null;
                simScore.position = possibleMove;
        
                if (player === maxPlayer) {
                    if (simScore.score > best.score) {
                        best = simScore;
                    }
                } else {
                    if (simScore.score < best.score) {
                        best = simScore;
                    }
                }
            }
        
            return best;
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

    const display = () => {
        console.log(isBotTurn);
    }

    const handleCircleMarker = (event) => {
        thisEvent = event;
        let img = document.createElement("img");

		img.src = "resources/images/pencil-stroke-circle.png"; 
        img.classList.add("circle");

        img.setAttribute("is-marked", "true");
        img.classList.add("animate");
        event.target.appendChild(img); 
        img.parentElement.setAttribute("is-marked", "true");
         
        markerType = "circle";

        animateHandWithMarker(event);
        if (isBotTurn) {
            if (!pvpBtn.checked) {
                hand.classList = "hand animate";
            }
            
        }
        
	};

    const handleCrossMarker = (event) => {
        let img = document.createElement("img");
        let img2 = document.createElement("img");

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
        const hand = document.querySelector(".hand");
        let cell = event.target.classList;

        hand.classList = ("hand");

        hand.classList.remove("animate");

        
        
            if (markerType === "circle") {
                if (cell.contains("c1")) {
                    hand.classList.add("circle-top-left");
                    gameBoard.gameBoard[0]= "O"
                }
                else if (cell.contains("c2")) {
                    hand.classList.add("circle-top-middle");
                    gameBoard.gameBoard[1] = "O";
                }
                else if (cell.contains("c3")) {
                    hand.classList.add("circle-top-right");
                    gameBoard.gameBoard[2] = "O";
                }
                else if (cell.contains("c4")) {
                    hand.classList.add("circle-middle-left");
                    gameBoard.gameBoard[3] = "O";
                }
                else if (cell.contains("c5")) {
                    hand.classList.add("circle-middle");
                    gameBoard.gameBoard[4] = "O";
                }
                else if (cell.contains("c6")) {
                    hand.classList.add("circle-middle-right");
                    gameBoard.gameBoard[5] = "O";
                }
                else if (cell.contains("c7")) {
                    hand.classList.add("circle-bottom-left");
                    gameBoard.gameBoard[6] = "O";
                }
                else if (cell.contains("c8")) {
                    hand.classList.add("circle-bottom-middle");
                    gameBoard.gameBoard[7] = "O";
                }
                else {
                    hand.classList.add("circle-bottom-right");
                    gameBoard.gameBoard[8] = "O";
                }    
            }
            else {
                if (cell.contains("c1")) {
                    hand.classList.add("cross-top-left");
                    gameBoard.gameBoard[0] = "X";
                }
                else if (cell.contains("c2")) {
                    hand.classList.add("cross-top-middle");
                    gameBoard.gameBoard[1] = "X";
                }
                else if (cell.contains("c3")) {
                    hand.classList.add("cross-top-right");
                    gameBoard.gameBoard[2] = "X";
                }
                else if (cell.contains("c4")) {
                    hand.classList.add("cross-middle-left");
                    gameBoard.gameBoard[3] = "X";
                }
                else if (cell.contains("c5")) {
                    hand.classList.add("cross-middle");
                    gameBoard.gameBoard[4] = "X";
                }
                else if (cell.contains("c6")) {
                    hand.classList.add("cross-middle-right");
                    gameBoard.gameBoard[5] = "X";
                }
                else if (cell.contains("c7")) {
                    hand.classList.add("cross-bottom-left");
                    gameBoard.gameBoard[6] = "X";
                }
                else if (cell.contains("c8")) {
                    hand.classList.add("cross-bottom-middle");
                    gameBoard.gameBoard[7] = "X";
                }
                else {
                    hand.classList.add("cross-bottom-right");
                    gameBoard.gameBoard[8] = "X";
                }  
            }  

            if (isBotTurn === true && !pvpBtn.checked) {
                hand.classList.add("animate");
            }

        }
    


    const handleWinner = (winLocation) => {
        const hand = document.querySelector(".hand");
        let line = null;

        setTimeout(() => {
            hand.classList = "hand";
        }, 2000);
        
        setTimeout(() => {
            if (winLocation == "1st-row") {
                hand.classList.add("row-one");
                line = document.querySelector(".l5");
            }
            else if (winLocation == "2nd-row") {
                hand.classList.add("row-two");
                line = document.querySelector(".l6");
            }
            else if (winLocation == "3rd-row") {
                hand.classList.add("row-three");
                line = document.querySelector(".l7");
            }
            else if (winLocation == "1st-col") {
                hand.classList.add("col-one");
                line = document.querySelector(".l8");
            }
            else if (winLocation == "2nd-col") {
                hand.classList.add("col-two");
                line = document.querySelector(".l9");
            }
            else if (winLocation == "3rd-col") {
                hand.classList.add("col-three");
                line = document.querySelector(".l10");
            }
            else if (winLocation == "LR-diagonal") {
                hand.classList.add("LR-diagonal");
                line = document.querySelector(".l11");
            }
            else if (winLocation == "RL-diagonal") {
                hand.classList.add("RL-diagonal");
                line = document.querySelector(".l12");
            }
            
            if (line != null) {
                line.classList.add("animate");
            }
        }, 2100);
        setTimeout(() => {hand.classList.add("animate");}, 2550);
        setTimeout(() => {
            hand.classList.remove("animate");
            line.classList.remove("animate");
        }, 5000);
        
    };

    return {switchBotTurn, handleCircleMarker, handleCrossMarker, handleWinner, display};
})();



//run on start
gameBoard.addListeners();
