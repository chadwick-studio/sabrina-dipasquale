<script>
	import { goto } from "$app/navigation";
	import { setContext, getContext } from "svelte";
	import { writable } from "svelte/store";
	import { pageDirection } from "$stores/stores";
	import { generateImageUrl } from "$utils/generateImageUrl";

	import Cursor from "./Cursor.svelte";

	export let project;
	const projects = getContext("projects");
	let carouselWidth;
	// Change project
	let currentProjectId;
	let pageIndex;
	let src;
	// Change project
	$: if (project && currentProjectId !== project._id) {
		currentProjectId = project._id;
		pageIndex = $pageDirection === 1 ? 0 : project.media.length - 1;
	}
	$: if (currentProjectId === project._id) {
		src = generateImageUrl(project.media[pageIndex]).url();
	}
	$: projectIndex = projects.findIndex((el) => el._id === project._id);

	$: hidden = project.hidden;
	const gotoNextPage = () => {
		if ($pageDirection !== 1) pageDirection.set(1);
		if (pageIndex === project.media.length - 1) {
			projectIndex = (projectIndex + 1) % projects.length;

			goto(`/${projects[projectIndex].slug.current}`);
		} else {
			pageIndex++;
		}
	};

	const gotoPrevPage = () => {
		if ($pageDirection !== -1) pageDirection.set(-1);

		if (pageIndex === 0) {
			projectIndex =
				(projectIndex - 1 + projects.length) %
				projects.length;
			goto(`/${projects[projectIndex].slug.current}`);
		} else {
			pageIndex--;
		}
	};

	// Mouse
	const mouse = { x: 0, y: 0 };
	let direction = 0;
	const isHovering = writable(false);
	setContext("isHovering", isHovering);

	const handleMouseMove = (e) => {
		isHovering.set(true);
		mouse.x = e.clientX;
		mouse.y = e.clientY;
		if (mouse.x > carouselWidth / 2) {
			direction = 1;
		} else {
			direction = -1;
		}
	};

	const handleMouseLeave = () => {
		isHovering.set(false);
	};

	const handleClick = async () => {
		if (direction === 1) {
			gotoNextPage();
		} else {
			gotoPrevPage();
		}
	};
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
<div
	class="carousel"
	bind:clientWidth={carouselWidth}
	on:mousemove={handleMouseMove}
	on:mouseover={handleMouseMove}
	on:mouseleave={handleMouseLeave}
	on:click|preventDefault|stopPropagation={handleClick}
>
	{#if !project.hidden}
		<div class="media">
			<p class="description">
				{project.description}
			</p>
			<ul class="pagination | no-select">
				<li class="no-select">
					{pageIndex + 1} / {project.media.length}
				</li>
				<li class="no-select">
					<button class="next-btn">Next</button>
				</li>
			</ul>
		</div>

		<img {src} alt="" />
	{:else}
		<form class="form">
			<section>
				<label for="password">Enter Password:</label>
				<input
					on:click|stopPropagation
					type="password"
					id="password"
					name="password"
				/>
			</section>
			<button on:click|stopPropagation> View Project </button>
		</form>
	{/if}
</div>
<Cursor x={mouse.x} y={mouse.y}>
	{#if direction === 1}
		<svg
			width="100%"
			height="100%"
			version="1.1"
			viewBox="0 0 1200 1200"
			xmlns="http://www.w3.org/2000/svg"
		>
			<g
				stroke-miterlimit="10"
				stroke-width="2.5"
				stroke="black"
			>
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
			<g
				stroke-miterlimit="10"
				stroke-width="2.5"
				stroke="black"
			>
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
		height: 100%;
	}
	.form {
		display: flex;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		padding: 32px;
		justify-content: space-between;
	}
	.media {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		padding: 32px;
		justify-content: space-between;
		gap: 8rem;
	}
	.pagination {
		display: inline-flex;
		gap: 1em;
		& > * {
			width: max-content;
		}
	}
	.next-btn {
		cursor: pointer;
	}
	.media {
		text-shadow: 0px 0px 1px rgb(0 0 0 / 0.5);
	}
	.title {
		max-width: 30rem;
	}
	img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.projects {
		display: grid;
		margin-top: 80px;
		grid-template: "a b" auto / 1fr 1fr;
		overflow-y: auto;
	}
	@media (max-width: 575px) {
		.projects {
			grid-template:
				"a" auto
				"b" auto / 1fr;
		}
	}
	.projects > section:nth-of-type(2n) {
		grid-area: b;
	}
	.info-container {
		padding: 32px;
	}
	.media-container {
		position: relative;
	}

	.media {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		display: flex;
		padding: 32px;
		justify-content: space-between;
		gap: 8rem;
	}
	.pagination {
		display: inline-flex;
		gap: 1em;
		& > * {
			width: max-content;
		}
	}
	.media {
		text-shadow: 0px 0px 1px rgb(0 0 0 / 0.5);
	}
	.title {
		max-width: 30rem;
	}
	button {
		cursor: pointer;
	}
	form > section {
		display: grid;
	}
	input {
		border-bottom: 1px solid var(--color);
		margin-top: 0.25em;
	}
</style>
