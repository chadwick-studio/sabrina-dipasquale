export default function observe(node) {
	const options = {
		root: node.parentElement,
		rootMargin: "0px",
		threshold: 0.15,
	};
	const intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const eventName = entry.isIntersecting ? "enterScreen" : "exitScreen";
			entry.target.dispatchEvent(new CustomEvent(eventName));
		});
	}, options);

	intersectionObserver.observe(node);

	return {
		destroy() {
			if (intersectionObserver) {
				intersectionObserver.unobserve(node);
				intersectionObserver.disconnect();
			}
		},
	};
}
