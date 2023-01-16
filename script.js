const gameBoard = (() => {
	const lines = document.querySelectorAll(".line");
    const cells = document.querySelectorAll(".cell");
	const hand = document.querySelector(".hand");
	const pageTurn = document.querySelector(".page-turn");
    let isCircle = true;
    let markedCellCount = 0;
    let gameBoard = [["", "", ""], 
                    ["", "", ""],
                    ["", "", ""]];

	const addListeners = () => {
        [...cells].forEach(cell => {cell.addEventListener("click", addMarker)});
	};

    const addMarker = (event) => {
        if (!event.target.hasAttribute("is-marked")) {
            if (isCircle) {
                displayController.handleCircleMarker(event);
            }
            else {
                displayController.handleCrossMarker(event);
            }
            markedCellCount += 1;
            isCircle = !isCircle;
        }
        if (markedCellCount >= 9) {
            setTimeout(() => {newMatch();}, 2000);
        }
    }

    const resetGameBoard = () => {
        for(let i = 0; i < gameBoard.length; i++){
            for(let j = 0; j < gameBoard[i].length; j++){
                gameBoard[i][j] = "";
            }
        }
    }

	const newMatch = () => {
        resetGameBoard();
        markedCellCount = 0;
        hand.classList = "hand animate";
		pageTurn.classList.remove("animate")
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
	};

	return { addListeners, gameBoard }
})();

const displayController = (() => {
    const hand = document.querySelector(".hand");
    let markerType = "";

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
        hand.classList = "hand animate";
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
        hand.classList = "hand animate";
    };

    const animateHandWithMarker = (event) => {
        const hand = document.querySelector(".hand");
        let cell = event.target.classList;
        hand.classList.remove("animate");
        setTimeout(() => {  
            hand.classList.add("animate");
            if (markerType === "circle") {
                if (cell.contains("c1")) {
                    hand.classList.add("circle-top-left");
                    gameBoard.gameBoard[0][0] = "O";
                }
                else if (cell.contains("c2")) {
                    hand.classList.add("circle-top-middle");
                    gameBoard.gameBoard[0][1] = "O";
                }
                else if (cell.contains("c3")) {
                    hand.classList.add("circle-top-right");
                    gameBoard.gameBoard[0][2] = "O";
                }
                else if (cell.contains("c4")) {
                    hand.classList.add("circle-middle-left");
                    gameBoard.gameBoard[1][0] = "O";
                }
                else if (cell.contains("c5")) {
                    hand.classList.add("circle-middle");
                    gameBoard.gameBoard[1][1] = "O";
                }
                else if (cell.contains("c6")) {
                    hand.classList.add("circle-middle-right");
                    gameBoard.gameBoard[1][2] = "O";
                }
                else if (cell.contains("c7")) {
                    hand.classList.add("circle-bottom-left");
                    gameBoard.gameBoard[2][0] = "O";
                }
                else if (cell.contains("c8")) {
                    hand.classList.add("circle-bottom-middle");
                    gameBoard.gameBoard[2][1] = "O";
                }
                else {
                    hand.classList.add("circle-bottom-right");
                    gameBoard.gameBoard[2][2] = "O";
                }    
            }
            else {
                if (cell.contains("c1")) {
                    hand.classList.add("cross-top-left");
                    gameBoard.gameBoard[0][0] = "X";
                }
                else if (cell.contains("c2")) {
                    hand.classList.add("cross-top-middle");
                    gameBoard.gameBoard[0][1] = "X";
                }
                else if (cell.contains("c3")) {
                    hand.classList.add("cross-top-right");
                    gameBoard.gameBoard[0][2] = "X";
                }
                else if (cell.contains("c4")) {
                    hand.classList.add("cross-middle-left");
                    gameBoard.gameBoard[1][0] = "X";
                }
                else if (cell.contains("c5")) {
                    hand.classList.add("cross-middle");
                    gameBoard.gameBoard[1][1] = "X";
                }
                else if (cell.contains("c6")) {
                    hand.classList.add("cross-middle-right");
                    gameBoard.gameBoard[1][2] = "X";
                }
                else if (cell.contains("c7")) {
                    hand.classList.add("cross-bottom-left");
                    gameBoard.gameBoard[2][0] = "X";
                }
                else if (cell.contains("c8")) {
                    hand.classList.add("cross-bottom-middle");
                    gameBoard.gameBoard[2][1] = "X";
                }
                else {
                    hand.classList.add("cross-bottom-right");
                    gameBoard.gameBoard[2][2] = "X";
                }    
            }
        }, 100);

    };

    return {handleCircleMarker, handleCrossMarker};
})();



//run on start
gameBoard.addListeners();
