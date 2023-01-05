const gameBoard = (() => {
	const lines = document.querySelectorAll(".line");
	const hand = document.querySelector(".hand");
	const pageTurn = document.querySelector(".page-turn");
	const btnStartGame = document.querySelector(".btn-start-game");

	const addListeners = () => {
		btnStartGame.addEventListener("click", newMatch);
	};

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



//run on start
gameBoard.addListeners();
