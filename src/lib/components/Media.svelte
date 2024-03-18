<script>
	import { generateImageUrl } from "$utils/generateImageUrl";
	import { generateFileUrl } from "$utils/generateVideoUrl";

	export let type;
	export let obj;
	export let width = 1500;
	export let objectPosition = "center";
</script>

{#if type === "img"}
	<img
		src={generateImageUrl(obj).format("webp").width(width).url()}
		alt=""
		draggable="false"
		style:object-position={objectPosition}
	/>
{:else}
	<video
		src={generateFileUrl(obj)}
		autoplay="autoplay"
		loop="loop"
		muted
		defaultMuted
		playsinline
		oncontextmenu="return false;"
		preload="auto"
		grid
		style:object-position={objectPosition}
	></video>
{/if}

<style lang="postcss">
	img,
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
