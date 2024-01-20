<script>
	// @ts-nocheck
	import { page } from "$app/stores";
	import { getContext, onMount } from "svelte";
	import { color, fontColor } from "$stores/stores";
	import { checkScroll } from "$utils/checkScroll";
	import Slider from "./Slider.svelte";

	const projects = getContext("projects");
	let opacity = 0;
	onMount(() => {
		opacity = 1;
	});
</script>

<div
	class="projects-list"
	style:--background-color={$color.hex}
	style:--color={$fontColor || "black"}
>
	<section class="title">
		<h1>
			<span class="uppercase bold">Sabrina Dipasquale</span>
			is a NYC-based Designer & Art Director.
			<a class="link" href="/about">Read more.</a>
		</h1>
	</section>
	<section class="projects-wrapper" style:opacity>
		<div class="projects" use:checkScroll>
			{#each projects as project}
				<section>
					<a
						class="project-link"
						href="/{project.slug.current}"
						aria-current={$page.url
							.pathname ===
						`/${project.slug.current}`
							? "page"
							: false}
					>
						<h2>
							<span class="bold"
								>{project.company}</span
							>{#if project.title}, {project.title}{/if}
						</h2>
						<h3 class="italic">
							{project.role}
						</h3>
					</a>
				</section>
			{/each}
		</div>
	</section>
	<Slider></Slider>
</div>

<style lang="postcss">
	.projects-list {
		position: relative;
		padding: var(--padding);
		height: 100%;
		background-color: var(--background-color);
		display: grid;
		grid-template: auto 1fr / 1fr;
		padding-bottom: 64px;
	}
	@media (min-width: 768px) {
		.projects-list {
			gap: 64px;
		}
	}
	.title {
		line-height: 1.1;
	}
	.projects-wrapper {
		position: relative;
		overflow: hidden;
		&::before,
		&::after {
			content: "";
			display: block;
			opacity: var(--opacity);
			position: absolute;
			width: 100%;
			height: 64px;
			left: 0;
			z-index: 1000;
			pointer-events: none;
			opacity: 0;
		}
		&::before {
			top: 0;
			background-image: linear-gradient(
				to top,
				transparent,
				var(--background-color)
			);
		}
		&::after {
			bottom: 0;
			background-image: linear-gradient(
				to bottom,
				transparent,
				var(--background-color)
			);
		}
		&:has(> .projects.scroll-top)::before {
			opacity: 0;
		}
		&:has(> .projects.scroll-bottom)::after {
			opacity: 0;
		}
	}
	.projects {
		display: grid;
		overflow: auto;
		height: 100%;
		margin-top: var(--projects-margin-top);
		column-gap: var(--padding);
		grid-auto-rows: min-content;
		grid-template-columns: 1fr;
		padding-block: 1px;
		overscroll-behavior: contain;
		position: relative;
	}
	@media (min-width: 1080px) {
		.projects {
			grid-template-columns: 1fr 1fr;
			& > section:nth-of-type(2n) {
				grid-column: 2 / 3;
			}
		}
	}
	.title {
		display: none;
	}
	@media (min-width: 768px) {
		.title {
			display: block;
		}
	}
	.project-link {
		display: block;
		position: relative;
		padding-block: 12px;
		font-family: "PSFournier Std Petit";
		overflow: hidden;
		& > * {
			line-height: 1.3;
		}
		&::before,
		&::after {
			content: "";
			display: block;
			position: absolute;
			width: 0;
			height: 1px;
			background-color: var(--color);
			opacity: 0.3;
		}
		&::before {
			top: 5px;
			left: 0;
		}
		&::after {
			bottom: 4px;
			left: 0;
		}
		&[aria-current="page"] {
			&::before,
			&::after {
				width: 100%;
			}
			& > h2,
			& > h3 {
				color: var(--color);
				opacity: 0.6;
			}
		}
	}
</style>
