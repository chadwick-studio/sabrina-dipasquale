<script>
	// @ts-nocheck
	import { page } from "$app/stores";
	import { getContext } from "svelte";
	import { color } from "$stores/stores";
	import Slider from "./Slider.svelte";

	const projects = getContext("projects");
	$: console.log($color);
</script>

<div class="projects-list" style:--background-color={$color.hex}>
	<section class="title">
		<h1>
			<span class="uppercase bold">Sabrina Dipasquale</span>
			is a NYC-based Designer & Art Director.
			<a class="link" href="/about">Read more.</a>
		</h1>
	</section>
	<section class="projects">
		{#each projects as project}
			<section>
				<a
					class="project-link"
					href="/{project.slug.current}"
					aria-current={$page.url.pathname ===
					`/${project.slug.current}`
						? "page"
						: false}
				>
					<h2>
						<span class="bold"
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
</div>

<style lang="postcss">
	.projects {
		display: grid;
		overflow-y: auto;
		margin-top: var(--projects-margin-top);
		padding-top: 64px;
		column-gap: 32px;
		grid-auto-rows: min-content;
		grid-template-columns: 1fr;
		width: max(40rem, 100%);
	}
	@media (min-width: 576px) {
		.projects {
			grid-template-columns: 1fr 1fr;
			row-gap: 0px;
			& > section:nth-of-type(2n) {
				grid-column: 2 / 3;
			}
		}
	}
	.projects-list {
		position: relative;
		padding: 16px;
		height: 100%;
		background-color: var(--background-color);
		display: grid;
		grid-template: auto 1fr / 1fr;
	}
	@media (min-width: 576px) {
		.projects-list {
			grid-template: auto 1fr / 1fr;
			padding: 32px;
		}
	}
	.title {
		max-width: 30rem;
	}
	.project-link {
		display: block;
		position: relative;
		&::before,
		&::after {
			content: "";
			display: block;
			position: absolute;
			width: 0;
			height: 1px;
			background-color: #626262;
			mix-blend-mode: overlay;
		}
		&::before {
			top: calc(100% + 8px);
			left: 0;
		}
		&::after {
			bottom: calc(100% + 8px);
			left: 0;
		}
		&[aria-current="page"] {
			color: #3a3a3a;
			mix-blend-mode: overlay;
			&::before,
			&::after {
				width: 100%;
			}
		}
	}
</style>
