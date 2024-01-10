<script>
	// @ts-nocheck
	export let value = 50;
	let min = 0;
	let max = 100;
	$: transform = `translateX(${-value + "%"})`;
</script>

<div class="slider-wrapper">
	<span style:left={value + "%"} style:transform class="label"></span>
	<input class="slider" type="range" bind:value {min} {max} step="1" />
</div>

<style>
	.label {
		display: block;
		position: absolute;
		background: red;
		color: #000;
		width: 16px;
		height: 16px;
		pointer-events: none;
		z-index: 100;
	}
	.slider-wrapper {
		width: 100%;
		height: fit-content;
		position: absolute;
		bottom: 0;
		left: 0;
		outline: 1px solid red;
	}
	.slider {
		width: 100%;
		position: relative;
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
		background-color: #053a5f;
		border-radius: 0.5rem;
		height: 0.5rem;
	}

	/* slider thumb */
	input[type="range"]::-webkit-slider-thumb {
		-webkit-appearance: none; /* Override default look */
		appearance: none;
		margin-top: -12px; /* Centers thumb on the track */

		/*custom styles*/
		height: 1rem;
		width: 1rem;
		content: "5";
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
		background-color: #5cd5eb;
		height: 1rem;
		width: 1rem;
		content: "5";
	}
</style>
