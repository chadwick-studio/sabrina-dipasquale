<script>
	import { afterNavigate, goto } from "$app/navigation";
	import { setContext, getContext, onMount } from "svelte";
	import { writable } from "svelte/store";
	import { color } from "$stores/stores";
	import { direction, pageIndex } from "$stores/stores";
	import { generateImageUrl } from "$utils/generateImageUrl";
	import { scroller } from "$utils/scroller";

	export let project;
	export let keyphrase;
	console.log(keyphrase);
	import Cursor from "./Cursor.svelte";
	import { browser } from "$app/environment";

	const projects = getContext("projects");
	let carouselWidth;
	let scrollerNode;

	// Change project
	let src;
	let isHovering = false;
	// Change project

	$: projectIndex = projects.findIndex((el) => el._id === project._id);

	$: hidden = project.hidden;

	// const scrollElementIntoView = (index) => {
	// 	if (scrollerNode && index) {
	// 		[...scrollerNode.children][index].scrollIntoView();
	// 	}
	// };

	const scrollIntoView = (index) => {
		[...scrollerNode.children][index].scrollIntoView();
	};
	const gotoNextPage = () => {
		if ($direction !== 1) direction.set(1);

		if (
			$pageIndex === project.media.length - 1 ||
			scrollerNode.children.length === 1
		) {
			projectIndex = (projectIndex + 1) % projects.length;
			goto(`/${projects[projectIndex].slug.current}`);
		} else {
			pageIndex.update((n) => n + 1);
			scrollIntoView($pageIndex);
		}
	};

	const gotoPrevPage = () => {
		if ($direction !== -1) direction.set(-1);

		if ($pageIndex === 0 || scrollerNode.children.length === 1) {
			projectIndex =
				(projectIndex - 1 + projects.length) %
				projects.length;
			goto(`/${projects[projectIndex].slug.current}`);
		} else {
			pageIndex.update((n) => n - 1);
			scrollIntoView($pageIndex);
		}
	};

	// Mouse
	const mouse = { x: 0, y: 0 };

	const handleMouseMove = (e) => {
		isHovering = true;
		mouse.x = e.clientX;
		mouse.y = e.clientY;
		if (mouse.x > carouselWidth / 2) {
			direction.set(1);
		} else {
			direction.set(-1);
		}
	};

	const handleMouseLeave = () => {
		isHovering = false;
	};

	let keyphraseInput;
	let viewProjectButton;
	const handleClick = (e) => {
		if (
			e.target === keyphraseInput ||
			e.target === viewProjectButton
		)
			return;
		if ($direction === 1) {
			gotoNextPage();
		} else {
			gotoPrevPage();
		}
	};

	let projectInfoLightbox = false;
	const toggleProjectInfo = () => {
		projectInfoLightbox = !projectInfoLightbox;
	};
	let clicked = false;

	afterNavigate(() => {
		pageIndex.set($direction === 1 ? 0 : project.media.length - 1);
		scrollerNode.scrollTo({
			left: $direction === 1 ? 0 : scrollerNode.scrollWidth,
			behavior: "instant",
		});
	});
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="carousel"
	bind:clientWidth={carouselWidth}
	style:--bg-color={$color.hex}
>
	{#if !hidden}
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
					{$pageIndex + 1} / {project.media
						.length}
				</li>
				<li class="no-select">
					<button
						class="next-btn"
						on:click|stopPropagation={gotoNextPage}
						>Next</button
					>
				</li>
			</ul>
		</div>
	{/if}
	<a href="/about">About</a>
	{#if projectInfoLightbox}
		<div class="project-info-lightbox">
			<button on:click={toggleProjectInfo}>Close</button>
			<p class="project-info-lightbox_description">
				{project.description}
			</p>
		</div>
	{/if}
	<div
		class="images-container"
		on:mouseleave={handleMouseLeave}
		on:mousemove={handleMouseMove}
		on:mousedown={() => (clicked = true)}
		on:mousemove={() => (clicked = false)}
		on:mouseup={(e) => {
			if (clicked) {
				handleClick(e);
			} else {
				clicked = false;
			}
		}}
	>
		<ul
			class="images-scroller"
			bind:this={scrollerNode}
			use:scroller={$pageIndex}
			on:indexChange={(e) => {
				pageIndex.set(e.detail);
			}}
		>
			{#if !hidden}
				{#each project.media as img, i}
					<li data-index={i}>
						<img
							src={generateImageUrl(
								img,
							).url()}
							alt=""
							draggable="false"
						/>
					</li>
				{/each}
			{:else}
				<li></li>
			{/if}
		</ul>
		{#if hidden}
			<form class="form">
				<section>
					<label for="keyphrase"
						>Enter Password:</label
					>
					<input
						on:click|stopPropagation
						type="text"
						id="keyphrase"
						name="keyphrase"
						bind:this={keyphraseInput}
					/>
				</section>
				<button
					bind:this={viewProjectButton}
					on:click|stopPropagation={() => {
						hidden = false;
						pageIndex.set(1);
						scrollerNode.scrollTo({
							left:
								$direction === 1
									? 0
									: scrollerNode.scrollWidth,
							behavior: "instant",
						});
					}}
				>
					View Project
				</button>
			</form>
		{/if}
	</div>
</div>

<Cursor x={mouse.x} y={mouse.y} {isHovering}>
	{#if $direction === 1}
		<svg
			width="100%"
			height="100%"
			version="1.1"
			viewBox="0 0 1200 1200"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g stroke-miterlimit="10" stroke-width="2.5">
				<path
					transform="scale(12)"
					d="m24.5 49.9h50.4"
				/>
				<path
					transform="scale(12)"
					d="m59.9 35.3 15.6 15.6"
				/>
				<path
					transform="scale(12)"
					d="m59.9 64.7 15.6-15.6"
				/>
			</g>
		</svg>
	{:else}
		<svg
			width="100%"
			height="100%"
			version="1.1"
			viewBox="0 0 1200 1200"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g stroke-miterlimit="10" stroke-width="2.5">
				<path
					transform="scale(12)"
					d="m75.5 50.1h-50.4"
				/>
				<path
					transform="scale(12)"
					d="m40.1 64.7-15.6-15.6"
				/>
				<path
					transform="scale(12)"
					d="m40.1 35.3-15.6 15.6"
				/>
			</g>
		</svg>
	{/if}
</Cursor>

<style lang="postcss">
	.carousel {
		container: carousel / size;
		height: 100%;
	}
	.images-container {
		position: relative;
		height: 100cqh;
	}
	.images-scroller {
		display: grid;
		grid-auto-flow: column;
		grid-auto-columns: 100%;
		height: 100cqh;
		overflow-x: auto;
		scroll-behavior: smooth;
		overscroll-behavior-inline: contain;
		scroll-snap-type: inline mandatory;
		-ms-overflow-style: none; /* for Internet Explorer, Edge */
		scrollbar-width: none; /* for Firefox */
	}
	.images-scroller::-webkit-scrollbar {
		display: none; /* for Chrome, Safari, and Opera */
	}

	.images-scroller > li {
		height: 100cqh;
		scroll-snap-align: start;
	}
	.images-scroller > li > img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		user-select: none;
	}
	.form {
		display: flex;
		gap: 32px;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		padding: var(--padding);
		justify-content: space-between;
		align-items: start;
		input {
			border-bottom: 1px solid var(--color);
			margin-top: 4px;
		}
		white-space: nowrap;
		& > section {
			display: grid;
		}
		z-index: 10000;
		background-color: var(--bg-color);
		height: 100%;
	}
	.media {
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
		z-index: 1001;
		cursor: pointer;
	}
	@media (min-width: 768px) {
		a[href="/about"] {
			display: none;
		}
	}
	a,
	button {
		cursor: pointer;
	}
	.project-info-lightbox {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		z-index: 1000;
		background-color: var(--bg-color);
		padding: var(--padding);
		& > p {
			margin-top: 1em;
		}
	}
	.description {
		display: none;
	}
	@media (min-width: 1080px) {
		.description {
			display: block;
		}
		.project-info-btn {
			display: none;
		}
	}
	svg > g {
		stroke: var(--color);
	}
</style>
