<script>
	import { goto, afterNavigate } from "$app/navigation";
	import Slider from "$components/Slider.svelte";
	import { checkScroll } from "$utils/checkScroll.js";
	import { generateImageUrl } from "$utils/generateImageUrl";
	import { generateFileUrl } from "$utils/generateVideoUrl.js";
	import { onMount } from "svelte";
	import { cubicIn, cubicOut } from "svelte/easing";
	export let aboutme;

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
	let value;
	onMount(() => {
		visible = true;
	});
</script>

<div
	class="aboutme-layout"
	style:--bg-color={aboutme.bgcolor.hex}
	style:--color={aboutme.color}
	style:--r={aboutme.color === "black" ? "0" : "255"}
	style:--g={aboutme.color === "black" ? "0" : "255"}
	style:--b={aboutme.color === "black" ? "0" : "255"}
>
	<slot />
	<div class="aboutme-img">
		<img
			src={generateImageUrl(aboutme.img)
				.format("webp")
				.width(1000)
				.url()}
			alt={aboutme.img.alt}
		/>
		<button on:click={goBack} class="show-less-mobile"
			>Show less</button
		>
	</div>
	<div class="aboutme-container">
		<div class="aboutme-wrapper" class:visible>
			<div class="aboutme scrollbar" use:checkScroll>
				<h1 class="description-title">
					{aboutme.description.title}
				</h1>
				<div class="text-grid">
					<div class="column">
						<section class="description">
							<p>
								{aboutme
									.description
									.text}
							</p>
						</section>
					</div>
					<div class="column">
						<section class="experience">
							<h2>
								{aboutme
									.experience
									.title}
							</h2>
							<p>
								{aboutme
									.experience
									.text}
							</p>
						</section>
						<section class="awards">
							<h2>
								{aboutme.awards
									.title}
							</h2>
							<p>
								{aboutme.awards
									.text}
							</p>
						</section>
					</div>
				</div>
				<div class="contact-info-container">
					<ul>
						<li>
							<button
								on:click={openLightbox}
								><span
									>Email</span
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
								</svg></button
							>
						</li>
						{#each aboutme.social as social}
							<li>
								<a
									href={social.link}
								>
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
						on:click={goBack}
						>Show less</button
					>
				</div>
			</div>
		</div>
		<Slider></Slider>
	</div>
	{#if lightboxVisibility}
		<div
			class="email-lightbox-container"
			in:move={{ duration: 600, easing: cubicOut }}
			out:move={{ duration: 300, easing: cubicIn }}
		>
			<div class="email-form-container">
				<h1 class="email-form-title">Let's talk.</h1>
				<form
					action="https://api.web3forms.com/submit"
					method="POST"
				>
					<input
						type="hidden"
						name="access_key"
						value="YOUR_ACCESS_KEY_HERE"
					/>
					<input
						type="checkbox"
						name="botcheck"
						style="display: none;"
						value="{value} messaged you about your portfolio!"
					/>
					<input
						type="hidden"
						name="subject"
						value=""
					/>
					<section class="name">
						<label for="name"
							>Full Name</label
						>
						<input
							type="text"
							id="name"
							name="name"
							required
							bind:value
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
							required
						/>
					</section>
					<section class="subject full-width">
						<label for="subject">
							Subject
						</label>
						<input
							type="text"
							id="subject"
							name="subject"
							required
						/>
					</section>
					<section class="message full-width">
						<label for="message">
							Message
						</label>
						<input
							type="text"
							id="message"
							name="message"
							required
						/>
					</section>
					<button>Send</button>
				</form>
				<button on:click={closeLightbox}>
					<span class="sr-only">Close</span>
					<svg
						viewBox="0 0 374 741"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M186 741L186 18Z"
							fill="black"
						/>
						<path
							d="M186 741L186 18"
							stroke="#C53232"
							stroke-width="30"
							stroke-miterlimit="10"
						/>
						<path
							d="M10.5999 198.2L197.8 11.0002Z"
							fill="black"
						/>
						<path
							d="M10.5999 198.2L197.8 11.0002"
							stroke="#C53232"
							stroke-width="30"
							stroke-miterlimit="10"
						/>
						<path
							d="M363.4 198.2L176.2 11.0002Z"
							fill="black"
						/>
						<path
							d="M363.4 198.2L176.2 11.0002"
							stroke="#C53232"
							stroke-width="30"
							stroke-miterlimit="10"
						/>
					</svg>
				</button>
			</div>
			<div class="img-container">
				{#if aboutme?.lightboxVideo?.asset}
					<video
						src={generateFileUrl(
							aboutme?.lightboxVideo,
						)}
						autoplay="autoplay"
						loop="loop"
						muted
						defaultMuted
						playsinline
						oncontextmenu="return false;"
						preload="auto"
						grid
					></video>
				{/if}
			</div>
		</div>
	{/if}
</div>

<style lang="postcss">
	.aboutme-layout {
		--padding: 20px;
		display: grid;
		grid-template: 1fr 1fr / 1fr;
		height: 100svh;
		background-color: var(--bg-color);
		font-family: "Helvetica";
		color: var(--color);
		position: fixed;
		top: 0;
		left: 0;
		z-index: 100000;
	}
	@media (min-width: 768px) {
		.aboutme-layout {
			--padding: 32px;
			grid-template: 1fr / 1fr 1fr;
		}
	}
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
		overscroll-behavior: none;
		height: 100%;
		padding-right: var(--padding);
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
		grid-template-rows: auto 1fr;
		position: absolute;
		top: 0;
		left: 0;
		height: fit-content;
		width: 100%;
		background-color: #ead4dc;
		z-index: 1000;
	}

	@media (min-width: 768px) {
		.email-lightbox-container {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr;
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
			width: 40px;
			aspect-ratio: 374 / 741;
			margin-top: 12px;
		}
	}
	@media (min-width: 768px) {
		.email-form-container {
			padding: 48px;
			padding-top: 64px;
			padding-bottom: 32px;
		}
	}
	form {
		margin-top: 24px;
		& > section {
			display: grid;
		}
		& section:nth-child(n + 2) + section {
			margin-top: 32px;
		}
	}
	form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: max(2vw, 16px);
		align-items: end;
		& button {
			background-color: #c53232;
			color: white;
			margin-top: 96px;
			border-radius: 8px;
			text-align: center;
			width: fit-content;
			padding: 16px 64px;
			cursor: pointer;
		}
	}
	.email-form-title {
		font-size: 32px;
		color: #c53232;
		line-height: 1;
		font-family: "PS Fournier Std Petit";
	}
	@media (min-width: 768px) {
		.email-form-title {
			font-size: 48px;
		}
	}
	label {
		color: #c53232;
		font-size: 16px;
		line-height: 1;
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
	@media (max-width: 448px) {
		.name,
		.email {
			grid-column: 1 / -1;
		}
		.name {
			margin-top: 32px;
		}
	}
	.experience p,
	.description p,
	.awards p {
		font-family: "PS Fournier Std Petit";
	}
	.img-container {
		overflow: hidden;
	}
	video {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
	}
</style>
