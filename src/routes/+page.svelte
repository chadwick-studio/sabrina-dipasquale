<script>
	import "../app.pcss";
	import "../styles/reset.css";
	import { page } from "$app/stores";

	export let data;
	let min = 12;
	let max = 22;
	let value = (min + max) / 2;
	let backgroundImg =
		"https://images.unsplash.com/photo-1540979129101-fef4ab23dbd6?q=80&w=1746&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
</script>

<div
	class="media-container"
	style:background-image="url({backgroundImg})"
	style:--font-size={value + "px"}
></div>
<div class="info-container" style:--font-size={value + "px"}>
	<div class="info">
		<section class="title">
			<h1>
				<span class="uppercase bold"
					>Sabrina Dipasquale</span
				>
				is a NYC-based Designer & Art Director.
				<a class="link" href="/about">Read more.</a>
			</h1>
		</section>
		<section class="projects">
			{#each data.body.data as project}
				<section>
					<a
						href="/{project.attributes
							.slug}"
						aria-current={$page.url
							.pathname ===
						project.attributes.slug
							? "page"
							: false}
					>
						<h2>
							<span class="bold"
								>{project
									.attributes
									.company}</span
							>
							{project.attributes
								.title}
						</h2>
						<h3 class="italic">
							{project.attributes
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

<style lang="postcss">
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
	.italic {
		font-style: italic;
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
	a[aria-current="page"] {
		color: blue;
	}
	.info-container {
		padding: 32px;
	}
	.media-container {
		background-size: cover;
		background-position: center;
	}
</style>
