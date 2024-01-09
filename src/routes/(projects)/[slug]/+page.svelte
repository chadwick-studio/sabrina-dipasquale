<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	import { onMount } from "svelte";
	import { changeFontColor } from "$lib/utils/changeFontColor";
	export let data;

	$: numOfProjects = data.body.data.length;
	$: ({ project } = data);
	$: mediaPagination = project.data[0].attributes.media.data.length;

	let min = 12;
	let max = 22;
	let w;
	let hover = false;
	let value = (min + max) / 2;
	$: projectIndex = project.data[0].id;
	let pageIndex = 1;

	$: currentImage = `http://localhost:1337${
		project.data[0].attributes.media.data[pageIndex - 1].attributes
			.url
	}`;
	const gotoNextPage = async () => {
		pageIndex++;
		if (
			pageIndex > mediaPagination
			// if person clicks beyond max number of pages
		) {
			pageIndex = 1;
			projectIndex++;
			if ((projectIndex + 1) % numOfProjects === 0) {
				projectIndex = 1;
			}
			const res = await fetch(
				`http://localhost:1337/api/projects/${projectIndex}`,
			);
			const nextProjectData = await res.json();
			goto(`/${nextProjectData.data.attributes.slug}`);
		}
	};
	const debounce = (callback, wait) => {
		let timeout;
		return (...args) => {
			const context = this;
			clearTimeout(timeout);
			timeout = setTimeout(
				() => callback.apply(context, args),
				wait,
			);
		};
	};

	let m = { x: 0, y: 0 };
	let direction;
	let fontColor = "#fff";
	const handleMouseMove = (e) => {
		hover = true;
		m = { x: e.clientX, y: e.clientY };
		if (m.x > w / 2) {
			direction = 1;
		} else {
			direction = -1;
		}
	};
	const handleMouseLeave = () => {
		hover = false;
	};
	const handleClick = async () => {
		if (direction === 1) {
			pageIndex++;
			if (pageIndex > mediaPagination) {
				pageIndex = 1;
				projectIndex++;
				if ((projectIndex + 1) % numOfProjects === 0) {
					projectIndex = 1;
				}
				const res = await fetch(
					`http://localhost:1337/api/projects/${projectIndex}`,
				);
				const nextProjectData = await res.json();
				goto(
					`/${nextProjectData.data.attributes.slug}`,
				);
			}
		} else {
			pageIndex--;
			if (pageIndex === 0) {
				projectIndex--;
				if (projectIndex === 0) {
					projectIndex = numOfProjects;
				}
				pageIndex = mediaPagination;
				const res = await fetch(
					`http://localhost:1337/api/projects/${projectIndex}`,
				);
				const prevProjectData = await res.json();
				goto(
					`/${prevProjectData.data.attributes.slug}`,
				);
			}
		}
	};
	$: imgSrc = `http://localhost:1337${
		project.data[0].attributes.media.data[pageIndex - 1].attributes
			.url
	}`;
</script>

<div
	class="site-layout"
	style:background-color={project.data[0].attributes.color || "#fff"}
	style:--font-size={value + "px"}
>
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="media-container"
		style:--font-size={value + "px"}
		bind:clientWidth={w}
		on:mousemove={handleMouseMove}
		on:click={handleClick}
		style:color={fontColor}
		style:background-image="url({imgSrc})"
	>
		<!-- <img -->
		<!-- 	src={imgSrc} -->
		<!-- 	alt="" -->
		<!-- 	use:changeFontColor={imgSrc} -->
		<!-- 	on:changeBrightness={(e) => { -->
		<!-- 		fontColor = e.detail; -->
		<!-- 	}} -->
		<!-- /> -->
		<div
			class="cursor"
			style:display={hover ? "block" : "none"}
			style:--x={m.x + "px"}
			style:--y={m.y + "px"}
			style:background-color={direction === 1
				? "green"
				: "blue"}
		></div>

		<div class="media">
			<p class="description">
				{project.data[0].attributes.description}
			</p>
			<ul class="pagination">
				<li>
					{pageIndex} / {mediaPagination}
				</li>
				<li>
					<button
						class="next-btn"
						on:click|stopPropagation={gotoNextPage}
						>Next</button
					>
				</li>
			</ul>
		</div>
	</div>
	<div class="info-container">
		<div class="info">
			<section class="title">
				<h1>
					<span class="uppercase bold"
						>Sabrina Dipasquale</span
					>
					is a NYC-based Designer & Art Director.
					<a class="link" href="/about"
						>Read more.</a
					>
				</h1>
			</section>
			<section class="projects">
				{#each data.body.data as project}
					<section>
						<a
							href="/{project
								.attributes
								.slug}"
							aria-current={$page.url
								.pathname ===
							project.attributes.slug
								? "page"
								: false}
						>
							<h2>
								<span
									class="bold"
									>{project
										.attributes
										.company}</span
								>, {project
									.attributes
									.title}
							</h2>
							<h3 class="italic">
								{project
									.attributes
									.role}
							</h3>
						</a>
					</section>
				{/each}
			</section>
			<div class="slider-wrapper">
				<input
					type="range"
					{min}
					{max}
					bind:value
					class="slider"
				/>
			</div>
		</div>
	</div>
</div>

<style lang="postcss">
	.media-container {
		position: relative;
		cursor: none;
		background-size: cover;
		background-position: center;
	}
	.cursor {
		display: none;
		width: 12px;
		height: 12px;
		border-radius: 1000px;
		transform: translate(-50%, -50%);
		top: var(--y);
		left: var(--x);
		position: absolute;
		background-color: red;
		pointer-events: none;
	}
	.site-layout {
		display: grid;
		grid-template: 1fr / 1fr 1fr;
		height: 100svh;
		font-size: var(--font-size);
	}
	@media (max-width: 991px) {
		.site-layout {
			grid-template: 1fr 1fr / 1fr;
		}
	}
	.italic {
		font-style: italic;
	}
	.uppercase {
		text-transform: uppercase;
	}
	.bold {
		font-weight: bold;
	}
	.link {
		text-decoration: underline;
	}
	.info {
		position: relative;
		height: 100%;
	}
	.slider-wrapper {
		width: 100%;
		position: absolute;
		bottom: 0;
		left: 0;
	}
	.slider {
		width: 100%;
		cursor: pointer;
	}
	.projects {
		display: grid;
		margin-top: 80px;
		grid-template: "a b" auto / 1fr 1fr;
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
	a[aria-current="page"] {
		color: blue;
	}
	.info-container {
		padding: 32px;
	}
	.media-container {
		position: relative;
	}
	img {
		width: 100%;
		height: 50svh;
		object-fit: cover;
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
</style>
