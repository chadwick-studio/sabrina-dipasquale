<script>
	// @ts-nocheck
	import { page } from "$app/stores";
	import { getContext, onMount } from "svelte";
	import { bgcolor, percentage, direction } from "$stores/stores";
	import { checkScroll } from "$utils/checkScroll";
	import Slider from "./Slider.svelte";

	const projects = getContext("projects");
	let visible = false;
	onMount(() => {
		visible = true;
	});
</script>

<div class="projects-list">
	<section class="title">
		<h1>
			<span>
				Sabrina DiPasquale_<br />
				<span class="uppercase bold">Art Director</span>
				and Designer
			</span>
			<a class="about-link" href="/about">
				<span>About</span>
				<svg
					aria-hidden="true"
					width="1em"
					height="1em"
					version="1.1"
					viewBox="0 0 1200 1200"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						fill="var(--color)"
						d="m300 200h629.5l-865 864.5 71 71 864.5-865v629.5h100v-800h-800z"
					/>
				</svg>
			</a>
		</h1>
	</section>
	<section class="projects-wrapper" class:visible>
		<div class="projects scrollbar" use:checkScroll={$percentage}>
			{#each projects as project, i}
				<section>
					{#if i === 0}
						<a
							on:click={() =>
								direction.set(
									1,
								)}
							class="project-link"
							href="/{project.slug
								.current}"
							aria-current={$page.url
								.pathname ===
								`/${project.slug.current}` ||
							$page.url.pathname ===
								"/"
								? "page"
								: false}
						>
							<h2>
								<span>
									{project?.company}
								</span><span>
									{#if project?.title}
										_{project.title}
									{/if}
								</span>
							</h2>
							<h3>
								{project?.role}
							</h3>
						</a>
					{:else}
						<a
							on:click={() =>
								direction.set(
									1,
								)}
							class="project-link"
							href="/{project.slug
								.current}"
							aria-current={$page.url
								.pathname ===
							`/${project.slug.current}`
								? "page"
								: false}
						>
							<h2>
								<span
									>{project?.company}</span
								><span
									>{#if project?.title}_{project.title}{/if}</span
								>
							</h2>
							<h3>
								<!-- <ul> -->
								<!-- 	{#each project?.roles as role} -->
								<!-- 		<li -->
								<!-- 		> -->
								<!-- 			{role} -->
								<!-- 		</li> -->
								<!-- 	{/each} -->
								<!-- </ul> -->
								{project?.role}
							</h3>
						</a>
					{/if}
				</section>
			{/each}
		</div>
	</section>
	<Slider></Slider>
</div>

<style lang="postcss">
	h1 {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;
		column-gap: 32px;
	}
	h1 > span {
		font-size: var(--font-size-title);
	}
	.projects-list {
		position: relative;
		padding: var(--padding);
		height: 100%;
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
		line-height: 1.3;
		margin-top: 3px;
	}
	.projects-wrapper {
		position: relative;
		overflow: hidden;
		&::before,
		&::after {
			content: "";
			display: block;
			position: absolute;
			width: 100%;
			height: 64px;
			left: 0;
			z-index: 1000;
			pointer-events: none;
		}
		&.visible::before {
			opacity: 1;
		}
		&.visible::after {
			opacity: 1;
		}
		&::before {
			opacity: 0;
			top: 0;
			background-image: linear-gradient(
				to top,
				transparent,
				var(--bg-color)
			);
			transition: var(--bgcolor-transition);
		}
		&::after {
			opacity: 1;
			bottom: 0;
			background-image: linear-gradient(
				to bottom,
				transparent,
				var(--bg-color)
			);
			transition: var(--bgcolor-transition);
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
		padding-right: var(--padding);
		position: relative;
	}
	.title {
		display: none;
	}
	@media (min-width: 768px) {
		.title {
			display: block;
		}
	}
	.project-link > h2 {
		& > span:first-child {
			font-weight: 500;
		}
		& > span:last-child {
			font-weight: 300;
		}
	}
	.project-link {
		display: block;
		position: relative;
		padding-block: 2px;
		overflow: hidden;
		& > * {
			line-height: 1.3;
		}
		& > h2 {
			padding-top: 6px;
			font-size: var(--font-size-body);
			font-weight: 500;
		}
		& > h3 {
			padding-bottom: 6px;
			font-size: var(--font-size-role);
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
			left: 0;
		}
		&::after {
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

	.about-link {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		margin-left: auto;
		padding: 6px 10px;
		background-color: rgb(255 255 255 / 0.5);
		border-radius: 32px;
		font-size: 16px;
		text-decoration: underline;
		cursor: pointer;
		&.mobile {
			position: absolute;
			top: var(--padding);
			right: var(--padding);
			margin: 0;
		}
	}
</style>
