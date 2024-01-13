<script>
	import { goto, afterNavigate } from "$app/navigation";
	import Slider from "$components/Slider.svelte";
	import { color } from "$stores/stores.js";
	import { generateImageUrl } from "$utils/generateImageUrl";
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
</script>

<div class="aboutme-img">
	<img src={generateImageUrl(aboutme.img).url()} {alt} />
</div>
<div class="aboutme-container">
	<div class="aboutme">
		<h1 class="description-title">{aboutme.description.title}</h1>
		<div class="text-grid">
			<div class="column">
				<section class="description">
					<p>{aboutme.description.text}</p>
				</section>
			</div>
			<div class="column">
				<section class="experience">
					<h2>{aboutme.experience.title}</h2>
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
			<button class="show-less | link" on:click={goBack}
				>Show less</button
			>
		</div>
	</div>
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
		<div class="img-container">
			<img
				src="https://picsum.photos/id/237/536/354"
				alt=""
			/>
		</div>
	</div>
{/if}

<style lang="postcss">
	.aboutme-container {
		height: 100%;
		overflow-y: auto;
		padding: var(--padding);
	}
	.aboutme {
		overflow-y: auto;
		position: relative;
		& section + section {
			margin-top: 56px;
		}
		padding-bottom: 96px;
	}
	.show-less {
		margin-top: 32px;
	}
	.aboutme-img {
		overflow: hidden;
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
	@media (min-width: 768px) {
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
	.email-form-container {
		padding: 20px;
		display: grid;
		& > button {
			width: fit-content;
			cursor: pointer;
			justify-self: end;
			aspect-ratio: 1;
			width: 64px;
			rotate: 270deg;
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
</style>
