<script>
	import "../app.pcss";
	import "../styles/reset.css";
	import { color, fontColor } from "$stores/stores";
</script>

<div
	class="site-layout"
	style:background-color={$color?.hex}
	style:color={$fontColor}
>
	<slot />
</div>

<style lang="postcss">
	:global(body) {
		overscroll-behavior: none;
	}
	.site-layout {
		--padding: 20px;
		display: grid;
		grid-template: 1fr 1fr / 1fr;
		font-family: "Helvetica";
		height: 100svh;
		color: var(--color);
	}
	@media (min-width: 768px) {
		.site-layout {
			--padding: 32px;
			grid-template: 1fr / 1fr 1fr;
		}
	}
	:global(.italic) {
		font-style: italic;
	}
	:global(.uppercase) {
		text-transform: uppercase;
	}
	:global(.bold) {
		font-weight: bold;
	}
	:global(.link) {
		text-decoration: underline;
	}
	:global(.no-select) {
		user-select: none;
	}
	:global(.sr-only) {
		clip: rect(0 0 0 0);
		clip-path: inset(50%);
		height: 1px;
		overflow: hidden;
		position: absolute;
		white-space: nowrap;
		width: 1px;
	}
</style>
