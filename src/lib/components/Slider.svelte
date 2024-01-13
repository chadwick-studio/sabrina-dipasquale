<script>
	// @ts-nocheck
	import { percentage, color } from "$lib/stores/stores";
	export let active = false;
	let MIN = 0;
	let MAX = 100;
	const thumbWidth = 18;
	$: fraction = ($percentage - MIN) / (MAX - MIN);
	$: left = `calc(${fraction * 100}% + ${
		(0.5 - fraction) * thumbWidth
	}px)`;
</script>

<div class="slider-wrapper" style:--currentColor={$color.hex}>
	<div class="slider">
		<span style:left class="label" class:active>A</span>
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
		font-size: 18px;
		position: absolute;
		color: #000;
		width: 18px;
		height: 18px;
		pointer-events: none;
		z-index: 100;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		text-align: center;
		&.active {
			display: block;
			cursor: none;
		}
	}
	.slider-wrapper {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
		padding: 20px;
		background-color: var(--currentColor);
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
			background-color: black;
		}
	}
	.slider-input {
		display: block;
		width: 100%;
		position: relative;
		height: 32px;
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

		background: transparent;
	}

	/* slider thumb */
	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		margin-top: -12px; /* Centers thumb on the track */

		/*custom styles*/
		height: 16px;
		width: 16px;
		border: none;
		box-shadow: none;
	}

	/******** Firefox styles ********/
	/* slider track */
	input[type="range"]::-moz-range-track {
		background-color: black;
		height: 1px;
		background: transparent;
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
