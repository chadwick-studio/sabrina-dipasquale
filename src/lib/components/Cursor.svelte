<script>
	import { getContext } from "svelte";

	// @ts-nocheck
	export let x;
	export let y;
	const isHovering = getContext("isHovering");
</script>

<div
	class="cursor"
	style:display={$isHovering ? "block" : "none"}
	style:--x={x + "px"}
	style:--y={y + "px"}
>
	<slot />
</div>

<style lang="postcss">
	.cursor {
		display: none;
		width: 128px;
		height: 128px;
		transform: translate(-50%, -50%);
		top: var(--y);
		left: var(--x);
		position: absolute;
		pointer-events: none;
		cursor: none;
		z-index: 99999;
	}
</style>
