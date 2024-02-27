<script>
	import Carousel from "$lib/components/Carousel.svelte";
	import { fade } from "svelte/transition";
	import { color, bgcolor } from "$stores/stores";
	export let data;
	$: ({ project } = data);
	$: ({ password } = data);

	$: bgcolor.set(project.bgcolor);
	$: color.set(project.color);
</script>

<svelte:head>
	<meta name="theme-color" content={$bgcolor} />
</svelte:head>
<Carousel {password} {project}></Carousel>
