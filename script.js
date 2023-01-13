const gameBoard = (() => {
	const lines = document.querySelectorAll(".line");
    const cells = document.querySelectorAll(".cell");
	const hand = document.querySelector(".hand");
	const pageTurn = document.querySelector(".page-turn");
	const btnStartGame = document.querySelector(".btn-start-game");
    let isCircle = true;

	const addListeners = () => {
		btnStartGame.addEventListener("click", newMatch);
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
            isCircle = !isCircle;
        }
    }

	const newMatch = () => {
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

	return { addListeners }
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
                }
                else if (cell.contains("c2")) {
                    hand.classList.add("circle-top-middle");
                }
                else if (cell.contains("c3")) {
                    hand.classList.add("circle-top-right");
                }
                else if (cell.contains("c4")) {
                    hand.classList.add("circle-middle-left");
                }
                else if (cell.contains("c5")) {
                    hand.classList.add("circle-middle");
                }
                else if (cell.contains("c6")) {
                    hand.classList.add("circle-middle-right");
                }
                else if (cell.contains("c7")) {
                    hand.classList.add("circle-bottom-left");
                }
                else if (cell.contains("c8")) {
                    hand.classList.add("circle-bottom-middle");
                }
                else {
                    hand.classList.add("circle-bottom-right");
                }    
            }
            else {
                if (cell.contains("c1")) {
                    hand.classList.add("cross-top-left");
                }
                else if (cell.contains("c2")) {
                    hand.classList.add("cross-top-middle");
                }
                else if (cell.contains("c3")) {
                    hand.classList.add("cross-top-right");
                }
                else if (cell.contains("c4")) {
                    hand.classList.add("cross-middle-left");
                }
                else if (cell.contains("c5")) {
                    hand.classList.add("cross-middle");
                }
                else if (cell.contains("c6")) {
                    hand.classList.add("cross-middle-right");
                }
                else if (cell.contains("c7")) {
                    hand.classList.add("cross-bottom-left");
                }
                else if (cell.contains("c8")) {
                    hand.classList.add("cross-bottom-middle");
                }
                else {
                    hand.classList.add("cross-bottom-right");
                }    
            }
        }, 100);

    };

    return {handleCircleMarker, handleCrossMarker};
})();



//run on start
gameBoard.addListeners();
