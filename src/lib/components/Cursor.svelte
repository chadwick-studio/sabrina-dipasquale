<script>
	// @ts-nocheck

	export let x;
	export let y;
	export let isHovering;
</script>

<div
	style:display={isHovering ? "block" : "none"}
	class="cursor"
	style:--x={x + "px"}
	style:--y={y + "px"}
>
	<slot />
</div>

<style lang="postcss">
	@media (hover: hover) {
		.cursor {
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
	}
</style>
