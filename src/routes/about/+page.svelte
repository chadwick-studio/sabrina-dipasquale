<script>
	import { goto } from "$app/navigation";
	import { page } from "$app/stores";
	export let data;

	$: numOfProjects = data.body.data.length;
	$: ({ project } = data);
	$: mediaPagination = project.data[0].attributes.media.data.length;

	let min = 12;
	let max = 22;
	let value = (min + max) / 2;
	$: projectIndex = project.data[0].id;
	let pageIndex = 1;
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
</script>

<div
	class="site-layout"
	style:background-color={project.data[0].attributes.color || "#fff"}
>
	<div
		class="media-container"
		style:background-image="url(https://assets.petco.com/petco/image/upload/f_auto,q_auto/21-477776_Parakeet_WhiteBG_1080x720)"
		style:--font-size={value + "px"}
	>
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
						on:click={gotoNextPage}
						>Next</button
					>
				</li>
			</ul>
		</div>
	</div>
	<div class="info-container" style:--font-size={value + "px"}>
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
	.site-layout {
		display: grid;
		grid-template-columns: 1fr 1fr;
		min-height: 100vh;
		font-size: var(--font-size);
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
		background-size: cover;
		background-position: center;
	}
	.media {
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
		color: white;
		text-shadow: 0px 0px 1px rgb(0 0 0 / 0.5);
	}
</style>

