<script>
	import { setContext } from "svelte";
	import Slider from "$lib/components/Slider.svelte";
	import Cursor from "$lib/components/Cursor.svelte";
	import Carousel from "$lib/components/Carousel.svelte";
	import ProjectsList from "$lib/components/ProjectsList.svelte";
	import { percentage } from "$stores/stores";

	export let data;

	// Projects variable
	setContext("projects", data.projects);
	let minFontSize = 12;
	let maxFontSize = 22;
	let minLeading = 1.1;
	let maxLeading = 1.3;
	$: fontSize = 0.1 * $percentage + minFontSize + "px";
</script>

<div class="carousel-container" style:--font-size={fontSize}>
	<slot />
</div>
<div class="projects-list-container" style:--font-size={fontSize}>
	<ProjectsList></ProjectsList>
	<Slider active></Slider>
</div>

<style lang="postcss">
	.carousel-container,
	.projects-list-container {
		overflow: hidden;
		font-size: var(--font-size);
	}
	.carousel-container {
		cursor: none;
	}
	.projects-list-container {
		position: relative;
	}
</style>
