const throttle = (fn, interval) => {
	let lastTime = performance.now() - interval;
	return (...args) => {
		const time = performance.now();
		if (time - lastTime < interval) return;
		lastTime = time;
		fn(...args);
	};
};
export const checkScroll = (node) => {
	const handleScroll = () => {
		if (node.scrollTop === 0) {
			node.classList.add("scroll-top");
		} else if (node.scrollTop + node.offsetHeight >= node.scrollHeight) {
			node.classList.add("scroll-bottom");
		} else {
			node.classList.remove("scroll-top");
			node.classList.remove("scroll-bottom");
		}
	};
	handleScroll();
	node.addEventListener("scroll", handleScroll);
	return {
		destroy() {
			node.removeEventListener("scroll", handleScroll);
		},
	};
};
