export default function scrollIntoView(node, { index, speed }) {
	const media = node.querySelectorAll("li");
	return {
		update({ index, speed }) {
			media[index].scrollIntoView({
				behavior: speed === "instant" ? "instant" : "smooth",
			});
		},
	};
}
