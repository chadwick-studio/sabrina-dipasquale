<script>
	//svelte imports
	import { afterNavigate, goto } from "$app/navigation";
	import { getContext, onMount } from "svelte";
	import { tick } from "svelte";
	import { fade } from "svelte/transition";
	import { bgcolor, direction } from "$stores/stores";
	import PasswordForm from "./PasswordForm.svelte";

	//js imports
	import { generateImageUrl } from "$utils/generateImageUrl";
	import { generateFileUrl } from "$utils/generateVideoUrl";
	import detectTouchScreen from "$utils/detectTouchScreen";

	//actions
	import scrollIntoView from "$utils/scrollIntoView";
	import cursor from "$utils/cursor";
	import observe from "$utils/intersectionObserver";

	export let project;
	export let password;

	const projects = getContext("projects");

	let index = 0;
	$: projectIndex = projects.findIndex((el) => el._id === project._id);
	let hasTouchScreen = false;
	let passwordValue;

	let projectInfoLightbox = false;

	const toggleProjectInfo = () => {
		projectInfoLightbox = !projectInfoLightbox;
	};

	const changePage = async () => {
		if ($direction === 1) {
			if (
				index === project.media.length - 1 ||
				project.media.length === 1
			) {
				projectIndex =
					(projectIndex + (1 % projects.length)) %
					projects.length;
				await tick();
				goto(`/${projects[projectIndex].slug.current}`);
			} else {
				index++;
			}
		} else {
			if (index === 0 || project.media.length === 1) {
				projectIndex =
					(projectIndex - 1 + projects.length) %
					projects.length;
				await tick();
				goto(`/${projects[projectIndex].slug.current}`);
			} else {
				index--;
			}
		}
	};

	const gotoPrevPage = () => {
		direction.set(-1);
		changePage();
	};
	const gotoNextPage = () => {
		direction.set(1);
		changePage();
	};

	let speed = "smooth";

	afterNavigate(() => {
		speed = "instant";
		index = $direction === 1 ? 0 : project.media.length - 1;
		setTimeout(() => {
			speed = "smooth";
		}, 100);
	});

	onMount(() => {
		hasTouchScreen = detectTouchScreen();
	});
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#key project}
	<div
		class="carousel"
		in:fade={{ duration: 200, delay: 200 + 100 }}
		out:fade={{ duration: 200 }}
		use:cursor
	>
		<div class="media">
			<p class="description">
				{project.description}
			</p>
			<button
				class="project-info-btn"
				on:click={toggleProjectInfo}
				>Project Info</button
			>
			<ul class="pagination | no-select">
				<li class="no-select">
					{index + 1} / {project.media.length}
				</li>
				<li class="no-select">
					<button
						class="next-page-btn"
						on:click={gotoNextPage}
						>Next</button
					>
				</li>
			</ul>
		</div>
		<a href="/about">About</a>
		{#if projectInfoLightbox}
			<div class="project-info-lightbox">
				<button on:click={toggleProjectInfo}
					>Close</button
				>
				<p class="project-info-lightbox__description">
					{project.description}
				</p>
			</div>
		{/if}
		<div class="scroller-container">
			<div
				class="scroller-controls"
				class:active={!hasTouchScreen}
			>
				<button
					on:click={() => {
						if (!hasTouchScreen)
							gotoPrevPage();
					}}
					class="scroller-control prev-page-btn"
				></button>
				<button
					on:click={() => {
						if (!hasTouchScreen)
							gotoNextPage();
					}}
					class="scroller-control next-page-btn"
				></button>
			</div>
			<ul
				class="scroller no-scrollbar"
				class:no-scroll={project?.hidden}
				use:scrollIntoView={{ index, speed }}
			>
				{#each project.media as el, i}
					<li
						on:enterScreen={() => {
							if (el?.addbgcolor) {
								bgcolor.set(
									el.bgcolor,
								);
							} else {
								bgcolor.set(
									project?.bgcolor,
								);
							}
							if (hasTouchScreen) {
								index = i;
							}
						}}
						use:observe
					>
						{#if el._type === "img"}
							<img
								data-layout={el.layout ||
									0}
								src={generateImageUrl(
									el,
								)
									.format(
										"webp",
									)
									.width(
										1500,
									)
									.url()}
								alt=""
								draggable="false"
							/>
						{:else}
							<video
								data-layout={el.layout}
								src={generateFileUrl(
									el,
								)}
								autoplay="autoplay"
								loop="loop"
								muted
								defaultMuted
								playsinline
								oncontextmenu="return false;"
								preload="auto"
								grid
							></video>
						{/if}
					</li>
				{/each}
				{#if project?.hidden}
					<PasswordForm
						bind:value={passwordValue}
						on:submit={() => {
							if (
								passwordValue ===
								password?.password
							)
								project.hidden = false;
						}}
						img={project?.passwordImg}
						fieldColor={project
							?.passwordFieldColor
							.hex}
						bgcolor={project
							?.passwordBgColor?.hex}
					></PasswordForm>
				{/if}
			</ul>
		</div>
	</div>
{/key}

<style lang="postcss">
	.carousel {
		container: carousel / size;
		height: 100%;
		isolation: isolate;
	}
	.scroller-container {
		position: relative;
		height: 100cqh;
	}
	.scroller-controls {
		display: none;
		grid-template-columns: 1fr 1fr;
		position: absolute;
		top: 0;
		left: 0;
		height: 100cqh;
		width: 100%;
		z-index: 10;
	}
	.scroller-controls.active {
		display: grid;
	}
	.scroller {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 100%;
		height: 100cqh;
		overflow-x: auto;
		overflow-y: hidden;
		scroll-behavior: smooth;
		overscroll-behavior-inline: contain;
		scroll-snap-type: inline mandatory;
		position: relative;
		&.no-scroll {
overflow-x: hidden;
		}
	}
	.no-scrollbar {
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
	}
	.no-scrollbar::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}

	.scroller > li {
		height: 100cqh;
		scroll-snap-align: start;
		display: grid;
		place-items: center;
	}
	[data-layout="0"] {
		display: none;
	}
	[data-layout="1"] {
		width: 100%;
		height: 100cqh;
		object-fit: contain;
		object-position: center;
	}
	[data-layout="2"] {
		width: 100%;
		height: 100cqh;
		object-fit: cover;
		object-position: center;
	}
	[data-layout="3"] {
		width: min(80cqw, 600px);
		height: min(auto, 100cqh);
		max-height: 90%;
		object-fit: cover;
		object-position: center;
		box-shadow:
			rgba(0, 0, 0, 0.16) 0px 3px 6px,
			rgba(0, 0, 0, 0.23) 0px 3px 6px;
	}
	.hidden-form {
		display: grid;
		place-items: center;
		width: 100%;
		height: 100cqh;
		position: absolute;
		top: 0;
		left: 0;
		padding: var(--padding);
		font-family: "PSFournier Std Petit";
		--_color: #0f5cb7;
		color: var(--_color);
	}
	.form {
		display: grid;
		width: min(100%, 400px);
		:global(svg) {
			margin-inline: auto;
		}
		label {
			display: block;
			line-height: 1;
			text-align: center;
			font-size: 60px;
			font-weight: bold;
		}
		input {
			font-size: 24px;
			border: 2px solid var(--_color);
			border-radius: 10px;
			padding: 8px 64px;
			width: 100%;
			text-align: center;
		}
		z-index: 999;
		button {
			text-align: center;
			align-self: center;
			justify-self: center;
		}
	}
	.media {
		cursor: default;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		padding: var(--padding);
		justify-content: space-between;
		z-index: 888;
		gap: 16px;
	}
	.pagination {
		display: inline-flex;
		gap: 1em;
		& > * {
			width: max-content;
		}
	}
	a[href="/about"] {
		position: absolute;
		bottom: 20px;
		left: 20px;
		z-index: 1000;
		cursor: pointer;
	}
	@media (min-width: 768px) {
		a[href="/about"] {
			display: none;
		}
	}
	.scroller-control {
		cursor: none;
	}
	a,
	button:not(.scroller-control) {
		cursor: pointer;
	}
	.project-info-lightbox {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 990;
		background-color: var(--bg-color);
		padding: var(--padding);
		& > p {
			margin-top: 1em;
			line-height: 1.3;
		}
		cursor: default;
	}
	.project-info-btn {
		white-space: nowrap;
	}
	.description {
		display: none;
		max-width: 70ch;
		line-height: 1.3;
	}
	@media (min-width: 1080px) {
		.description {
			display: block;
		}
		.project-info-btn {
			display: none;
		}
	}

	@media (hover: hover) {
		:global(.cursor) {
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
