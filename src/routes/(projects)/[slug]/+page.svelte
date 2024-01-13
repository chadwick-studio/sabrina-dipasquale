<script>
	import Carousel from "$lib/components/Carousel.svelte";
	import { fade } from "svelte/transition";
	import { color } from "$stores/stores";

	export let data;
	$: ({ project } = data);
	$: ({ keyphrase } = data);

	$: color.set(project.color);
	$: console.log(keyphrase);
</script>

<Carousel {keyphrase} {project}></Carousel>
