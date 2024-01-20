<script>
	import Carousel from "$lib/components/Carousel.svelte";
	import { fade } from "svelte/transition";
	import { color, fontColor } from "$stores/stores";

	export let data;
	$: ({ project } = data);
	$: ({ keyphrase } = data);

	$: color.set(project.color);
	$: fontColor.set(project.fontColor);
</script>

<Carousel {keyphrase} {project}></Carousel>
