<script>
	import "../app.pcss";
	import "../styles/reset.css";
	import { color } from "$stores/stores";
</script>

<div
	class="site-layout"
	style:--red={$color?.rgb?.r}
	style:--green={$color?.rgb?.g}
	style:--blue={$color?.rgb?.b}
	style:background-color={$color?.hex}
>
	<slot />
</div>

<style lang="postcss">
	.site-layout {
		/* calculates perceived lightness using the sRGB Luma method 
  Luma = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255 */
		--r: calc(var(--red) * 0.2126);
		--g: calc(var(--green) * 0.7152);
		--b: calc(var(--blue) * 0.0722);
		--sum: calc(var(--r) + var(--g) + var(--b));
		--perceived-lightness: calc(var(--sum) / 255);
		--threshold: 0.5;

		/* shows either white or black color depending on perceived darkness */
		--color: hsl(
			0,
			0%,
			calc(
				(var(--perceived-lightness) - var(--threshold)) *
					-10000000%
			)
		);
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
