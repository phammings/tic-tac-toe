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
            console.log("Marked!");
            let img = document.createElement("img");
            isCircle ? img.src = "resources/images/pencil-stroke-circle.png":img.src = "resources/images/pencil-stroke-short.png";
            isCircle = !isCircle;
            img.setAttribute("is-marked", "true");
            event.target.appendChild(img);  
            img.parentElement.setAttribute("is-marked", "true");
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
				[...lines,hand].forEach(line => {
					line.classList.add("animate")
				});
			}, 100);
		}, 300);
	};

	return { addListeners }
})();

// const displayController = (() => {})();



//run on start
gameBoard.addListeners();
