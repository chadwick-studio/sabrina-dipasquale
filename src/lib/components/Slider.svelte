<script>
	// @ts-nocheck
	import { percentage } from "$lib/stores/stores";
	export let active = false;
	let MIN = 0;
	let MAX = 100;
	const thumbWidth = 16; // 30px for example
	$: fraction = ($percentage - MIN) / (MAX - MIN);
	$: left = `calc(${fraction * 100}% + ${
		(0.5 - fraction) * thumbWidth
	}px)`;
</script>

<div class="slider-wrapper">
	<div class="slider">
		<span style:left class="label" class:active></span>
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
		background: red;
		color: #000;
		width: 16px;
		height: 16px;
		pointer-events: none;
		z-index: 100;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		&.active {
			display: block;
		}
	}
	.slider-wrapper {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		padding-inline: 32px;
	}
	.slider {
		position: relative;
	}
	.slider-input {
		display: block;
		width: 100%;
		position: relative;
		height: 40px;
	}
	/********** Range Input Styles **********/
	/*Range Reset*/
	input[type="range"] {
		-webkit-appearance: none;
		appearance: none;
		background: transparent;
		cursor: pointer;
	}

	/* Removes default focus */
	input[type="range"]:focus {
		outline: none;
	}

	/***** Chrome, Safari, Opera and Edge Chromium styles *****/
	/* slider track */
	input[type="range"]::-webkit-slider-runnable-track {
		background-color: black;
		height: 1px;
	}

	/* slider thumb */
	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		margin-top: -12px; /* Centers thumb on the track */

		/*custom styles*/
		height: 16px;
		width: 16px;
	}

	/******** Firefox styles ********/
	/* slider track */
	input[type="range"]::-moz-range-track {
		background-color: black;
		height: 1px;
	}

	/* slider thumb */
	input[type="range"]::-moz-range-thumb {
		border: none; /*Removes extra border that FF applies*/
		border-radius: 0; /*Removes default border-radius that FF applies*/

		/*custom styles*/
		background-color: transparent;
		height: 16px;
		width: 16px;
	}
</style>

