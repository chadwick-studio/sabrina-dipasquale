<div class="layout">
	<div class="picture" />
	<div class="text">
		<section class="title">
			<h1>
				<span class="uppercase bold"
					>SABRINA DIPASQUALE</span
				>
				is a NYC-based Designer & Art Director.
				<a href="/about">Read more.</a>
			</h1>
		</section>
		<section class="projects">
			<section>
				<h2>Corona This is Living</h2>
				<p>OOH Advertising + Experiential Design</p>
			</section>
			<section>
				<h2>Expedia Onekey Rewards Launch</h2>
				<p>OOH Advertising Design</p>
			</section>
		</section>
		<section class="slider">
			<div class="slider" />
		</section>
	</div>
</div>

<style lang="postcss">
	.uppercase {
		text-transform: uppercase;
	}

	.uppercase {
		font-weight: bold;
	}
	:global(*) {
		padding: 0;
		margin: 0;
		box-sizing: border-box;
	}
	.layout {
		display: grid;
		height: 100vh;
		grid-template-columns: 1fr 1fr;
	}
	.picture {
		background-color: red;
	}
	.text {
		margin: 32px 32px;
	}
	.projects {
		display: grid;
		margin-top: 4rem;
		grid-template-columns: 1fr 1fr;
		grid-auto-rows: 4rem;
	}
</style>
