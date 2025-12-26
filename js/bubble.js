!(function () {
	if (window.location.pathname !== "/" || window.location.search !== "") {
		return;
	}

	const bubbleContainer = document.createElement("div");
	bubbleContainer.style.height = "500px";
	bubbleContainer.id = "bubbles";

	const homePage = document.querySelector(".full-bg-img");
	homePage.appendChild(bubbleContainer);
	circleMagic();

        // function circleMagic(options)....
})();