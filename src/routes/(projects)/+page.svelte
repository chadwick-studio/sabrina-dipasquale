<script>
	import { generateImageUrl } from "$utils/generateImageUrl.js";
	import { bgcolor } from "$stores/stores";
	export let data;
	$: ({ home } = data);
	$: bgcolor.set(home?.bgcolor);
	$: console.log($bgcolor);
</script>

<div class="front-page-carousel">
	<a href="/about">About</a>
	<img
		src={generateImageUrl(home.media[0])
			.format("webp")
			.width(1000)
			.url()}
		alt=""
	/>
</div>

<style lang="postcss">
	.front-page-carousel {
		height: 100%;
		position: relative;
	}
	img {
		height: 100%;
		width: 100%;
		object-fit: cover;
	}
	a[href="/about"] {
		position: absolute;
		bottom: 20px;
		left: 20px;
		z-index: 1000;
		cursor: pointer;
	}
	@media (min-width: 768px) {
		a[href="/about"] {
			display: none;
		}
	}
</style>
