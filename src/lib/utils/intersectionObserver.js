let intersectionObserver;

function ensureIntersectionObserver(node, options) {
	if (intersectionObserver) return;
	intersectionObserver = new IntersectionObserver((entries) => {
		entries.forEach((entry) => {
			const eventName = entry.isIntersecting ? "enterScreen" : "exitScreen";
			entry.target.dispatchEvent(new CustomEvent(eventName));
		});
	}, options);
}

export default function observe(node) {
	const options = {
		root: node.parentElement,
		rootMargin: "0px",
		threshold: 0.75,
	};
	ensureIntersectionObserver(node, options);
	intersectionObserver.observe(node);
	return {
		destroy() {
			intersectionObserver.unobserve(node);
		},
	};
}
