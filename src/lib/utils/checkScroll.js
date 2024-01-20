const throttle = (fn, interval) => {
	let lastTime = performance.now() - interval;
	return (...args) => {
		const time = performance.now();
		if (time - lastTime < interval) return;
		lastTime = time;
		fn(...args);
	};
};
export const checkScroll = (node, fontSize) => {
	const handleScroll = () => {
		console.log(node.scrollTop);
		if (node.scrollTop === 0) {
			node.classList.add("scroll-top");
		} else if (node.scrollTop + node.offsetHeight === node.scrollHeight) {
			node.classList.add("scroll-bottom");
		} else {
			node.classList.remove("scroll-top");
			node.classList.remove("scroll-bottom");
		}
	};
const isScrollable = () => {
  return node.scrollHeight > node.clientHeight;
};
	handleScroll();
	node.addEventListener("scroll", handleScroll);
	window.addEventListener("resize", handleScroll);
	return {
		update(fontSize) {
if (isScrollable()) {
handleScroll();
}
		},
		destroy() {
			node.removeEventListener("scroll", handleScroll);
	window.removeEventListener("resize", handleScroll);
		},
	};
};
