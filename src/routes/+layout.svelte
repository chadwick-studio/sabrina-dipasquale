<script>
	import "../app.pcss";
	import "../styles/reset.css";
	import { color, bgcolor } from "$stores/stores";
</script>

<div class="site-layout" style:--bg-color={$bgcolor.hex} style:--color={$color}>
	<slot />
</div>

<style lang="postcss">
	.site-layout {
		--padding: 20px;
		--bgcolor-transition: background 0ms ease-in;
		display: grid;
		grid-template: 1fr 1fr / 1fr;
		font-family: "Helvetica";
		height: 100svh;
		color: var(--color);
		background-color: var(--bg-color);
		transition: var(--bgcolor-transition);
	}
	@media (min-width: 768px) {
		.site-layout {
			--padding: 32px;
			grid-template: 1fr / 1fr 1fr;
		}
	}
	:global(*) {
		overscroll-behavior: none;
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
