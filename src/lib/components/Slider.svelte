<script>
	// @ts-nocheck
	import { percentage, bgcolor, color } from "$lib/stores/stores";
	import { onMount } from "svelte";
	export let active = false;
	let MIN = 0;
	let MAX = 100;
	const thumbWidth = 16;
	$: fraction = ($percentage - MIN) / (MAX - MIN);
	$: left = `calc(${fraction * 100}% + ${
		(0.5 - fraction) * thumbWidth
	}px)`;
	onMount(() => {
		const mq = window.matchMedia("(min-width: 768px)");
		if (!mq.matches) {
			console.log("hi");
			percentage.set(0);
		}
	});
</script>

<div
	class="slider-wrapper"
	class:active
	style:--track-color={active ? $color || "#000" : "#5A557A"}
>
	<div class="slider">
		<div style:left class="label">
			<svg
				viewBox="0 0 6.35 7.123898"
				xmlns="http://www.w3.org/2000/svg"
			>
				<defs id="defs2" />
				<g transform="translate(-85.849782,-93.502992)">
					<path
						fill={$color}
						d="m 90.443611,98.553225 0.704452,2.073665 h 1.051719 l -2.579687,-7.123898 h -1.091407 l -2.678906,7.123898 h 0.992188 l 0.744141,-2.073665 z m -2.559844,-0.85328 1.141015,-3.135313 h 0.01985 l 1.051718,3.135313 z"
					/>
				</g>
			</svg>
		</div>
		<input
			class="slider-input"
			type="range"
			bind:value={$percentage}
			min={MIN}
			max={MAX}
			step="1"
		/>
	</div>
</div>

<style>
	.label {
		display: none;
		position: absolute;
		color: #000;
		width: 16px;
		height: 16px;
		pointer-events: none;
		z-index: 99999;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		place-items: center;
		& svg {
			aspect-ratio: 24 / 26.924969;
			height: 9px;
		}
	}
	.slider-wrapper {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		padding: var(--padding);
		padding-top: 8px;
		background-color: var(--bg-color);
		transition: var(--bgcolor-transition);
		&.active .label {
			display: grid;
			cursor: pointer;
		}
	}
	.slider {
		position: relative;
		&::before {
			content: "";
			position: absolute;
			bottom: 0;
			left: 0;
			width: 100%;
			height: 1px;
			background-color: var(--track-color);
		}
	}
	.slider-input {
		display: block;
		width: 100%;
		position: relative;
		height: 26px;
	}
	/********** Range Input Styles **********/
	/*Range Reset*/
	input[type="range"] {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		cursor: default;
	}
	.active .slider-input {
		cursor: pointer;
	}
	/* Removes default focus */
	input[type="range"]:focus {
		outline: none;
	}

	/***** Chrome, Safari, Opera and Edge Chromium styles *****/
	/* slider track */

	input[type="range"]::-webkit-slider-runnable-track {
		height: 1px;
		background: transparent;
	}

	/* slider thumb */
	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;

		/*custom styles*/
		height: 24px;
		width: 24px;
		border: none;
		box-shadow: none;
		background: transparent;
	}

	/******** Firefox styles ********/
	/* slider track */
	input[type="range"]::-moz-range-track {
		height: 1px;
		background: transparent;
	}

	/* slider thumb */
	input[type="range"]::-moz-range-thumb {
		border: none; /*Removes extra border that FF applies*/
		border-radius: 0; /*Removes default border-radius that FF applies*/

		/*custom styles*/
		background-color: transparent;
		height: 24px;
		width: 24px;
	}
</style>
