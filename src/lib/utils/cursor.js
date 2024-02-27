const throttle = (interval, fn) => {
	let lastTime = performance.now() - interval;
	return (...args) => {
		const time = performance.now();
		if (time - lastTime < interval) return;
		lastTime = time;
		fn(...args);
	};
};

export default function createCursor(node) {
	const cursorElement = document.createElement("div");
	cursorElement.classList.add("cursor");
	cursorElement.style.setProperty("--x", 0);
	cursorElement.style.setProperty("--y", 0);
	cursorElement.style.display = "none";
	node.appendChild(cursorElement);

	const changeCursorSvg = (direction) => {
		if (direction === -1) {
			cursorElement.classList.remove("right");
			cursorElement.classList.add("left");
		} else {
			cursorElement.classList.remove("left");
			cursorElement.classList.add("right");
		}
	};

	const changeCursor = (e) => {
		if (
			e.target === node.querySelector(".scroller-controls > .prev-page-btn")
		) {
			changeCursorSvg(-1);
		} else if (
			e.target === node.querySelector(".scroller-controls > .next-page-btn")
		) {
			changeCursorSvg(1);
		}
	};

	const showCursor = (e) => {
		cursorElement.style.display = "block";
		changeCursor(e);
	};

	const handleCursor = (e) => {
		cursorElement.style.setProperty("--x", e.clientX);
		cursorElement.style.setProperty("--y", e.clientY);
		changeCursor(e);
	};

	const hideCursor = () => {
		cursorElement.style.display = "none";
		cursorElement.classList.remove("right");
		cursorElement.classList.remove("left");
	};

	node.addEventListener("mousemove", handleCursor);
	node.addEventListener("mouseover", showCursor);
	node.addEventListener("mouseleave", hideCursor);

	return {
		destroy() {
			node.removeEventListener("mousemove", handleCursor);
			node.removeEventListener("mouseover", showCursor);
			node.removeEventListener("mouseleave", hideCursor);
			cursorElement.remove();
		},
	};
}
