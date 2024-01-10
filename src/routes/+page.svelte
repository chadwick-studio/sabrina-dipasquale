<script>
	// @ts-nocheck
	import { sanityClient } from "$lib/utils/sanityClient";
	import imageUrlBuilder from "@sanity/image-url";
	import { page } from "$app/stores";
	import Slider from "$lib/components/Slider.svelte";

	export let data;
	console.log(data);

	// variables
	let values;
	$: fontSize = 0.1 * values + 12 + "px";
</script>

<div
	class="site-layout"
	style:background-color="green"
	style:--font-size={fontSize}
>
	<!-- svelte-ignore a11y-mouse-events-have-key-events -->
	<!-- svelte-ignore a11y-no-static-element-interactions -->
	<div class="media-container">
		<img src="https://picsum.photos/id/237/536/354" alt="" />
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
					<section>
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
	.media-container {
		position: relative;
		cursor: none;
		> :global(img) {
			width: 100%;
			height: 100%;
		}
		background-color: rgb(var(--red), var(--green), var(--blue));
		overflow: hidden;
		/* calculates perceived lightness using the sRGB Luma method 
  Luma = (red * 0.2126 + green * 0.7152 + blue * 0.0722) / 255 */
		--r: calc(var(--red) * 0.2126);
		--g: calc(var(--green) * 0.7152);
		--b: calc(var(--blue) * 0.0722);
		--sum: calc(var(--r) + var(--g) + var(--b));
		--perceived-lightness: calc(var(--sum) / 255);
		--threshold: 0.5;

		/* shows either white or black color depending on perceived darkness */
		color: hsl(
			0,
			0%,
			calc(
				(var(--perceived-lightness) - var(--threshold)) *
					-10000000%
			)
		);
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

