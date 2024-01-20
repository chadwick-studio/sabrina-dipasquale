<script>
	import { goto, afterNavigate } from "$app/navigation";
	import Slider from "$components/Slider.svelte";
	import { color } from "$stores/stores.js";
	import { checkScroll } from "$utils/checkScroll.js";
	import { generateImageUrl } from "$utils/generateImageUrl";
	import { onMount } from "svelte";
	export let data;
	export let alt = "";

	$: ({ aboutme } = data);

	$: color.set(aboutme.color);

	let lightboxVisibility = false;
	const openLightbox = () => {
		lightboxVisibility = true;
	};
	const closeLightbox = () => {
		lightboxVisibility = false;
	};

	const move = (node, { duration }) => {
		return {
			duration,
			css: (t, u) => {
				return `transform: translateY(-${u * 100}%)`;
			},
		};
	};

	let previousPage = "/";

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const goBack = () => {
		goto(previousPage);
	};
	let visible = false;
	onMount(() => {
		visible = true;
	});
</script>

<div class="aboutme-img">
	<img src={generateImageUrl(aboutme.img).url()} alt={aboutme.img.alt} />
	<button on:click={goBack} class="show-less-mobile">Show less</button>
</div>
<div class="aboutme-container" class:visible style:--bg-color={$color.hex}>
	<div class="aboutme-wrapper">
		<div class="aboutme" use:checkScroll>
			<h1 class="description-title">
				{aboutme.description.title}
			</h1>
			<div class="text-grid">
				<div class="column">
					<section class="description">
						<p>
							{aboutme.description
								.text}
						</p>
					</section>
				</div>
				<div class="column">
					<section class="experience">
						<h2>
							{aboutme.experience
								.title}
						</h2>
						<p>{aboutme.experience.text}</p>
					</section>
					<section class="awards">
						<h2>{aboutme.awards.title}</h2>
						<p>{aboutme.awards.text}</p>
					</section>
				</div>
			</div>
			<div class="contact-info-container">
				<ul>
					<li>
						<button on:click={openLightbox}
							><span>Email</span>
							<svg
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
					{#each aboutme.social as social}
						<li>
							<a href={social.link}>
								<span
									>{social.title}</span
								>
								<svg
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
				</ul>
				<button
					class="show-less | link"
					on:click={goBack}>Show less</button
				>
			</div>
		</div>
	</div>
	<Slider></Slider>
</div>

{#if lightboxVisibility}
	<div class="email-lightbox-container" transition:move>
		<div class="email-form-container">
			<h1 class="email-form-title">Let's talk.</h1>
			<form action="">
				<section class="name">
					<label for="name">Full Name</label>
					<input
						type="text"
						id="name"
						name="name"
					/>
				</section>
				<section class="email">
					<label for="email">
						Email Address
					</label>
					<input
						type="text"
						id="email"
						name="email"
					/>
				</section>
				<section class="subject full-width">
					<label for="subject"> Subject </label>
					<input
						type="text"
						id="subject"
						name="subject"
					/>
				</section>
				<section class="message full-width">
					<label for="message"> Message </label>
					<input
						type="text"
						id="message"
						name="message"
					/>
				</section>
				<button>Send</button>
			</form>
			<button on:click={closeLightbox}>
				<span class="sr-only">Close</span>
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
						stroke="#c53232"
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
			</button>
		</div>
		<div
			class="img-container"
			style:background-image="url({generateImageUrl(
				aboutme.lightboxImg,
			).url()})"
		></div>
	</div>
{/if}

<style lang="postcss">
	* {
		color: black;
	}
	.aboutme-container {
		height: 100%;
		overflow: hidden;
		display: grid;
		grid-template-columns: 1fr;
		padding: var(--padding);
		padding-bottom: 64px;
		line-height: 1.4;
		position: relative;
	}
	@media (min-width: 768px) {
		.aboutme-container {
			padding-top: 96px;
			padding-bottom: 32px;
		}
	}
	.aboutme-wrapper {
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
		overscroll-behavior: contain;
		height: 100%;
		& section + section {
			margin-top: 56px;
		}
		padding-bottom: 96px;
	}
	.show-less {
		margin-top: 32px;
		display: none;
	}
	@media (min-width: 768px) {
		.show-less {
			display: block;
		}
	}
	.aboutme-img {
		overflow: hidden;
		position: relative;
	}
	img {
		object-fit: cover;
		width: 100%;
		height: 100%;
	}
	.text-grid {
		display: grid;
		row-gap: 48px;
		margin-top: 48px;
	}
	.show-less-mobile {
		position: absolute;
		z-index: 90;
		bottom: var(--padding);
		left: var(--padding);
	}
	@media (min-width: 768px) {
		.show-less-mobile {
			display: none;
		}
		.text-grid {
			grid-template-columns: 1fr 1fr;
			gap: var(--padding);
		}
	}
	/* .awards { */
	/* 	grid-column: 2 / 3; */
	/* } */
	.contact-info-container {
		margin-top: 64px;
	}
	.column > section {
		white-space: pre-wrap;
	}
	.email-lightbox-container {
		display: grid;
		grid-template-rows: 1fr 1fr;
		position: absolute;
		top: 0;
		left: 0;
		height: 100svh;
		width: 100%;
		background-color: #ead4dc;
		z-index: 1000;
	}

	@media (min-width: 768px) {
		.email-lightbox-container {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr;
			height: fit-content;
		}
	}
	.email-form-container {
		padding: 20px;
		display: grid;
		height: fit-content;
		& > button {
			width: fit-content;
			cursor: pointer;
			justify-self: end;
			aspect-ratio: 1;
			width: 96px;
			rotate: 270deg;
			transform: translateY(32px);
		}
	}
	@media (min-width: 768px) {
		.email-form-container {
			padding: 48px;
			padding-top: 64px;
			padding-bottom: 12px;
		}
	}
	form {
		margin-top: 24px;
		& > section {
			display: grid;
			& + section {
				margin-top: 32px;
			}
		}
	}
	form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: max(5vw, 1rem);
		align-items: end;
		& button {
			background-color: #c53232;
			color: white;
			margin-top: 96px;
			text-align: center;
			width: fit-content;
			padding: 1rem 3rem;
			cursor: pointer;
		}
	}
	.email-form-title {
		font-size: 24px;
		color: #c53232;
		line-height: 1;
		font-family: "PS Fournier Std Petit";
	}
	@media (min-width: 768px) {
		.email-form-title {
			font-size: 36px;
		}
	}
	label {
		color: #c53232;
		font-size: 12px;
	}
	input {
		border-bottom: 1px solid #c53232;
		font-size: 12px;
		padding-block: 4px;
	}
	a,
	button {
		cursor: pointer;
	}
	ul > li > * {
		display: inline-flex;
		align-items: center;
		gap: 0.25em;
	}
	ul {
		display: flex;
		flex-direction: column;
		gap: 2px;
	}

	.full-width {
		grid-column: 1 / -1;
	}
	.experience p,
	.description p,
	.awards p {
		font-family: "PS Fournier Std Petit";
	}
	.img-container {
		overflow: hidden;
		background-repeat: no-repeat;
		background-size: cover;
		background-position: top;
	}
</style>
