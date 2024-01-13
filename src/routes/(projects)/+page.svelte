<script>
	import { generateImageUrl } from "$utils/generateImageUrl.js";
	import { color } from "$stores/stores";
	export let data;
	$: ({ home } = data);
	$: color.set(home.color);
</script>

<div class="front-page-carousel">
	<img src={generateImageUrl(home.media[0]).url()} alt="" />
</div>

<style lang="postcss">
	.front-page-carousel {
		height: 100%;
	}
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
</style>
