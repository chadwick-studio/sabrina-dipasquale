<script>
	import "../app.pcss";
	import "../styles/reset.css";

	import { setContext } from "svelte";
	import { color, bgcolor, percentage } from "$stores/stores";
	import { page } from "$app/stores";

	import Slider from "$components/Slider.svelte";
	import ProjectsList from "$components/ProjectsList.svelte";
	import AboutDropdown from "$components/AboutDropdown.svelte";

	export let data;

	// Projects variable
	setContext("projects", data.projects);

	let minFontSizeTitle = 24;
	let maxFontSizeTitle = 36;
	let minFontSizeBody = 18;
	let maxFontSizeBody = 26;
	let minFontSizeRole = 12;
	let maxFontSizeRole = 16;
	$: fontSizeTitle = getFontSize(
		minFontSizeTitle,
		maxFontSizeTitle,
		$percentage,
	);
	$: fontSizeBody = getFontSize(
		minFontSizeBody,
		maxFontSizeBody,
		$percentage,
	);
	$: fontSizeRole = getFontSize(
		minFontSizeRole,
		maxFontSizeRole,
		$percentage,
	);
	const getFontSize = (min, max, percentage) => {
		return (
			(((max - min) / 100) * percentage + min).toFixed(2) +
			"px"
		);
	};
</script>

<svelte:head>
	<meta name="theme-color" content={$bgcolor} />
	<style>
		@import url("https://fonts.googleapis.com/css2?family=Jost:ital,wght@0,100..900;1,100..900&display=block");
	</style>
</svelte:head>
<div
	class="site-layout"
	style:--bg-color={$bgcolor?.hex}
	style:--color={$color}
	style:--r={$color === "black" ? "0" : "255"}
	style:--g={$color === "black" ? "0" : "255"}
	style:--b={$color === "black" ? "0" : "255"}
	style:--inverse-r={$color === "black" ? "255" : "0"}
	style:--inverse-g={$color === "black" ? "255" : "0"}
	style:--inverse-b={$color === "black" ? "255" : "0"}
	style:--font-size-title={fontSizeTitle}
	style:--font-size-body={fontSizeBody}
	style:--font-size-role={fontSizeRole}
>
	<slot />
</div>

<style lang="postcss">
	.site-layout {
		--padding: 20px;
		display: grid;
		grid-template: 1fr 1fr / 1fr;
		font-family: "Jost";
		height: 100svh;
		color: var(--color);
		background-color: var(--bg-color);
	}
	@media (min-width: 1016px) {
		.site-layout {
			--padding: 32px;
			grid-template: 1fr / 1fr 508px;
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
	@-moz-document url-prefix() {
		:global(.scrollbar) {
			scrollbar-width: thin;
			scrollbar-color: rgb(var(--r) var(--g) var(--b) / 0.3)
				transparent;
		}
	}
	:global(.scrollbar::-webkit-scrollbar) {
		width: 1px;
		background-color: transparent;
	}
	:global(.scrollbar::-webkit-scrollbar-track) {
		background-color: transparent;
	}
	:global(.scrollbar::-webkit-scrollbar-thumb) {
		background-color: rgb(var(--r) var(--g) var(--b) / 0.3);
	}
	/*
	:global(.scrollbar::-webkit-scrollbar-thumb) {
		background-color: rgb(var(--r) var(--g) var(--b) / 0.3);
		border: none;
		border: 2px solid #555555;
	}
	*/
</style>
