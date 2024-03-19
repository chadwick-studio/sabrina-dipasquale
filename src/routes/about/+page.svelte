<script>
	import { checkScroll } from "$utils/checkScroll.js";
	import { generateImageUrl } from "$utils/generateImageUrl";
	import { generateFileUrl } from "$utils/generateVideoUrl.js";
	import { onMount } from "svelte";
	import EmailLightbox from "$components/EmailLightbox.svelte";
	import Slider from "$components/Slider.svelte";
	import GotoWorkButton from "./_components/GotoWorkButton.svelte";
	import Media from "$components/Media.svelte";
	export let data;
	$: ({ aboutme } = data);

	let lightboxVisibility = false;

	const toggleLightbox = () => {
		lightboxVisibility = !lightboxVisibility;
	};

	let visible = false;
	onMount(() => {
		visible = true;
	});
</script>

<div class="media-wrapper">
	<Media
		type={aboutme?.media[0]?._type}
		obj={aboutme?.media[0]}
		objectPosition="top"
	></Media>
	<GotoWorkButton mobile></GotoWorkButton>
</div>
<div
	class="aboutme-wrapper"
	style:--bg-color={aboutme?.bgcolor.hex}
	style:--color={aboutme?.color}
	style:--r={aboutme?.color === "black" ? "0" : "255"}
	style:--g={aboutme?.color === "black" ? "0" : "255"}
	style:--b={aboutme?.color === "black" ? "0" : "255"}
>
	<div class="scroll-wrapper" class:visible>
		<div class="aboutme scrollbar" use:checkScroll>
			<h1 class="description-title sr-only">About Me</h1>
			<GotoWorkButton></GotoWorkButton>
			<div class="aboutme-info-grid">
				<section class="biography">
					<p>
						{aboutme?.biography}
					</p>
				</section>
				<section class="contact-info">
					<ul>
						<li>
							<button
								on:click={toggleLightbox}
								><span
									>Email</span
								>
								<svg
									aria-hidden="true"
									width="1em"
									height="1em"
									version="1.1"
									viewBox="0 0 1200 1200"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="m300 200h629.5l-865 864.5 71 71 864.5-865v629.5h100v-800h-800z"
									/>
								</svg></button
							>
						</li>
						{#if aboutme?.socialMedia}
							{#each aboutme.socialMedia as social}
								<li>
									<a
										href={social?.link}
									>
										<span
											>{social?.title}</span
										>
										<svg
											aria-hidden="true"
											width="1em"
											height="1em"
											version="1.1"
											viewBox="0 0 1200 1200"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="m300 200h629.5l-865 864.5 71 71 864.5-865v629.5h100v-800h-800z"
											/>
										</svg>
									</a>
								</li>
							{/each}
						{/if}
					</ul>
				</section>
				<section class="more-info">
					<section class="experience | info">
						<h2>
							{aboutme?.experience
								?.title}
						</h2>
						<ul class="companies-list">
							{#if aboutme?.experience?.companiesList}
								{#each aboutme.experience?.companiesList as company}
									<li>
										<span
											>{company?.date}</span
										>
										<span
											>{company?.name}</span
										>
									</li>
								{/each}
							{/if}
						</ul>
					</section>
					<section class="clients | info">
						<h2>
							{aboutme?.clients
								?.title}
						</h2>
						<p>
							{aboutme?.clients?.text}
						</p>
					</section>
					<section class="awards | info">
						<h2>
							{aboutme?.awards?.title}
						</h2>
						<p>
							{aboutme?.awards?.text}
						</p>
					</section>
					<section class="skills | info">
						<h2>
							{aboutme?.skills?.title}
						</h2>
						<p>
							{aboutme?.skills?.text}
						</p>
					</section>
				</section>
			</div>
		</div>
	</div>
	<Slider></Slider>
</div>
{#if lightboxVisibility}
	<EmailLightbox
		--bg-color={aboutme?.lightboxBgColor?.hex}
		--primary-color={aboutme?.lightboxPrimaryColor?.hex}
		on:closeLightbox={toggleLightbox}
		media={aboutme?.lightboxMedia}
	></EmailLightbox>
{/if}
<!-- For data fetching only -->
<slot />

<style lang="postcss">
	.aboutme-wrapper {
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		padding: var(--padding);
		padding-bottom: 64px;
		line-height: 1.4;
		position: relative;
		container: aboutme-wrapper / inline-size;
		background-color: var(--bg-color);
		color: var(--color);
	}
	@media (min-width: 768px) {
		.aboutme-wrapper {
			padding-top: 42px;
			padding-bottom: 96px;
		}
	}

	.scroll-wrapper {
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
			opacity: 0;
		}
		&.visible::before {
			opacity: 1;
		}
		&.visible::after {
			opacity: 1;
		}
		&::before {
			top: 0;
			background-image: linear-gradient(
				to top,
				transparent,
				var(--bg-color)
			);
		}
		&::after {
			bottom: 0;
			background-image: linear-gradient(
				to bottom,
				transparent,
				var(--bg-color)
			);
		}
		&:has(.aboutme.scroll-top)::before {
			opacity: 0;
		}
		&:has(.aboutme.scroll-bottom)::after {
			opacity: 0;
		}
	}

	.aboutme {
		overflow-y: auto;
		position: relative;
		overscroll-behavior: none;
		height: 100%;
		padding-right: var(--padding);
	}

	.media-wrapper {
		overflow: hidden;
		position: relative;
	}

	.aboutme-info-grid {
		display: flex;
		flex-direction: column;
		row-gap: 48px;
	}
	@media (min-width: 768px) {
		.aboutme-info-grid {
			margin-top: 68px;
		}
	}
	@container aboutme-wrapper (min-width: 564px) {
		.aboutme-info-grid {
			display: grid;
			grid-template-columns: 1fr 1fr;
			column-gap: var(--padding);
		}
	}
	.contact-info {
		font-size: 16px;
		& > ul {
			display: flex;
			flex-direction: column;
			gap: 10px;
			line-height: 1;
		}
		& ul > li > :is(button, a) {
			display: inline-flex;
			align-items: center;
			gap: 0.25em;
			cursor: pointer;
		}
	}
	/* Information */
	.biography {
		font-family: "PSFournier Std Petit";
		font-size: 18px;
		line-height: 1.3;
	}
	@container aboutme-wrapper (min-width: 672px) {
		.biography {
			font-size: 22px;
		}
	}
	.companies-list {
		border-top: 1px solid var(--color);
		border-bottom: 1px solid var(--color);
		& > li:not(:last-child) {
			border-bottom: 1px solid var(--color);
		}
		& > li {
			display: flex;
			justify-content: space-between;
			padding-inline: 2px;
			line-height: 2;
		}
		& > li:first-child > span:last-child {
			font-weight: 600;
		}
	}
	.info {
		line-height: 1.5;
		letter-spacing: 0.03em;
		& h2 {
			font-size: 16px;
			font-weight: 500;
		}
		& > p,
		ul {
			font-size: 14px;
			font-weight: 300;
		}
		& h2 + p {
			margin-top: 6px;
		}
		& h2 + ul {
			margin-top: 12px;
		}
	}
	.more-info {
		& > section + section {
			margin-top: 24px;
		}
	}
	.biography {
		order: 1;
	}
	.more-info {
		order: 2;
	}
	.contact-info {
		order: 3;
	}
	@container aboutme-wrapper (min-width: 672px) {
		.more-info {
			grid-column: 2 / 3;
			grid-row: 1 / 3;
		}
		.biography {
			grid-column: 1 / 2;
			grid-row: 1 / 2;
		}
		.contact-info {
			grid-column: 1 / 2;
			grid-row: 2 / 3;
		}
	}
</style>
