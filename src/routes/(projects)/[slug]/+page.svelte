<script>
	import Carousel from "$lib/components/Carousel.svelte";
	import { fade } from "svelte/transition";
	import { color } from "$stores/stores";

	export let data;
	$: ({ project } = data);

	$: color.set(project.color);
</script>

<Carousel {project}></Carousel>

