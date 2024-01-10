<script>
	// @ts-nocheck
	import { goto } from "$app/navigation";
	import { sanityClient } from "$lib/utils/sanityClient";
	import imageUrlBuilder from "@sanity/image-url";
	import { page } from "$app/stores";
	import { changeFontColor } from "$lib/utils/changeFontColor";
	import { buildFileUrl, parseAssetId } from "@sanity/asset-utils";
	import Slider from "$lib/components/Slider.svelte";

	export let data;
	console.log(data);

	// variables
	let values;
	$: fontSize = 0.1 * values + 12 + "px";
	let w;
	let hover = false;
	$: projectIndex = data.projects.findIndex(
		(el) => data.project._id === el._id,
	);
	$: pageIndex = 0;
	let direction = 0;
	let fontColor = "#fff";
	let m = { x: 0, y: 0 };
	const builder = imageUrlBuilder(sanityClient);
	let expression;

	$: leading = -0.002 * values + 1.3;

	$: console.log(
		"page index: ",
		pageIndex,
		", projectIndex: ",
		projectIndex,
	);
	// functions
	const gotoNextPage = async () => {
		pageIndex++;
		if (
			pageIndex >
			data.projects[projectIndex].media.length - 1
			// if person clicks beyond max number of pages
		) {
			projectIndex++;
			if (projectIndex > data.projects.length - 1) {
				projectIndex = 0;
			}
			pageIndex = 0;
			goto(`/${data.projects[projectIndex].slug.current}`);
		}
	};
	const gotoPrevPage = async () => {
		pageIndex--;
		if (
			pageIndex < 0
			// if person clicks below first page
		) {
			projectIndex--;
			// if project index is less than 0, loop back to last project
			if (projectIndex < 0) {
				projectIndex = data.projects.length - 1;
			}
			pageIndex =
				data.projects[projectIndex].media.length - 1;

			goto(`/${data.projects[projectIndex].slug.current}`);
		}
	};

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
			gotoNextPage();
		} else {
			gotoPrevPage();
		}
	};

	const generateImageUrl = (source) => {
		if (source) {
			return builder.image(source);
		}
	};

	// const generateFileUrl = (source) => {
	// 	const parsedAssetId = parseAssetId(source.asset._ref);
	// 	return buildFileUrl(parsedAssetId, sanityClient);
	// };
	console.log(data.project);
</script>

<div
	class="site-layout"
	style:--red={data.projects[projectIndex].color.rgb.r || 255}
	style:--green={data.projects[projectIndex].color.rgb.g || 255}
	style:--blue={data.projects[projectIndex].color.rgb.b || 255}
	style:--font-size={fontSize}
>
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div
		class="media-container"
		bind:clientWidth={w}
		on:mousemove={handleMouseMove}
		on:mouseover={handleMouseMove}
		on:mouseleave={handleMouseLeave}
		on:click={handleClick}
	>
		<img
			src={generateImageUrl(
				data.projects[projectIndex].media[pageIndex],
			)
				.width(1000)
				.url()}
			alt=""
		/>
		<svelte:component this={expression} />
		<div
			class="cursor"
			style:display={hover ? "block" : "none"}
			style:--x={m.x + "px"}
			style:--y={m.y + "px"}
			style:background-color={direction === 1
				? "green"
				: "blue"}
		>
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
		</div>
		<div class="media">
			<p class="description">
				{data.projects[projectIndex].description}
			</p>
			<ul class="pagination">
				<li>
					{pageIndex + 1} / {data.projects[
						projectIndex
					].media.length}
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
				{#each data.projects as project}
					<section style:--leading={leading}>
						<a
							href="/{project.slug
								.current}"
							aria-current={$page.url
								.pathname ===
							project.slug.current
								? "page"
								: false}
						>
							<h2>
								<span
									class="bold"
									>{project.company}</span
								>, {project.title}
							</h2>
							<h3 class="italic">
								{project.role}
							</h3>
						</a>
					</section>
				{/each}
			</section>
			<Slider bind:value={values}></Slider>
		</div>
	</div>
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
	}
	.media-container {
		position: relative;
		cursor: none;
		> :global(img) {
			width: 100%;
			height: 100%;
		}
		background-color: rgb(var(--red), var(--green), var(--blue));
		overflow: hidden;
		color: var(--color);
	}
	.media-container svg {
		fill: var(--color);
	}
	.projects > section {
		line-height: var(--leading);
	}
	.cursor {
		display: none;
		width: 128px;
		height: 128px;
		border-radius: 1000px;
		transform: translate(-50%, -50%);
		top: var(--y);
		left: var(--x);
		position: absolute;
		background-color: red;
		pointer-events: none;
		svg {
			stroke: black;
		}
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
	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}
</style>
