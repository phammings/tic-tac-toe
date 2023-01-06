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
            let img = document.createElement("img");
            if (isCircle) {
                img.src = "resources/images/pencil-stroke-circle.png"; 
                img.classList.add("circle");
                hand.classList.remove("animate");
		        setTimeout(() => { hand.classList.add("animate"); hand.classList.add("circle-middle-left"); }, 100);
                
            }
            else {
                img.src = "resources/images/pencil-stroke-short.png";
                img.classList.add("cross");
                let img2 = document.createElement("img");
                img2.src = "resources/images/pencil-stroke-short.png";
                img2.classList.add("cross2")
                img2.classList.add("animate");;
                img2.setAttribute("is-marked", "true");
                event.target.appendChild(img2);
                hand.classList.remove("animate");
		        setTimeout(() => { hand.classList.add("animate"); hand.classList.add("cross-top-right"); }, 100);
                
                
            }
            img.setAttribute("is-marked", "true");
            img.classList.add("animate");
            event.target.appendChild(img);  
            img.parentElement.setAttribute("is-marked", "true");
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



//run on start
gameBoard.addListeners();
