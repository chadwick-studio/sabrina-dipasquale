<script>
	export let media;
	import { generateFileUrl } from "$utils/generateVideoUrl";
	import { generateImageUrl } from "$utils/generateImageUrl";
	import { cubicIn, cubicOut } from "svelte/easing";

	let value;

	import { createEventDispatcher } from "svelte";
	import Media from "./Media.svelte";

	const dispatch = createEventDispatcher();

	function closeLightbox() {
		dispatch("closeLightbox", {
			lightboxVisibility: false,
		});
	}
	let height;
</script>

<div class="email-lightbox-container" style:--height={height + "px"}>
	<div bind:clientHeight={height} class="email-form-container">
		<h1 class="email-form-title">Let's chat.</h1>
		<form
			name="contact"
			netlify-honeypot="bot-field"
			netlify
		>
			<input name="bot-field" style="display: none;" />
			<section class="name">
				<label for="name">Full Name</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					bind:value
				/>
			</section>
			<section class="email">
				<label for="email"> Email Address </label>
				<input
					type="text"
					id="email"
					name="email"
					required
				/>
			</section>
			<section class="subject full-width">
				<label for="subject"> Subject </label>
				<input
					type="text"
					id="subject"
					name="subject"
					required
				/>
			</section>
			<section class="message full-width">
				<label for="message"> Message </label>
				<textarea
					id="message"
					name="message"
					required
					columns="20"
					rows="6"
				/>
			</section>
			<div class="buttons">
				<button type="submit">Send</button>
				<button type="button" on:click={closeLightbox}>
					<span class="sr-only">Close</span>
					<svg
						viewBox="0 0 37 36"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M6.53785 15.7919L17.295 5.03478L17.2865 34.5892L19.713 34.5892L19.7045 5.03478L30.4616 15.7919L32.1705 14.0831L18.4997 0.412368L4.82901 14.0831L6.53785 15.7919Z"
							fill="var(--primary-color)"
						/>
					</svg>
				</button>
			</div>
		</form>
	</div>
	<div class="media-wrapper">
		{#if media}
			<Media type={media[0]._type} obj={media[0]}></Media>
		{/if}
	</div>
</div>

<style lang="postcss">
	.email-lightbox-container {
		display: grid;
		grid-template-rows: auto 1fr;
		position: absolute;
		top: 0;
		left: 0;
		height: 100vh;
		height: 100svh;
		width: 100%;
		background-color: var(--bg-color);
		z-index: 1000;
		overflow: hidden;
		transform: translateY(var(--translateY));
		transition: transform 500ms ease;
	}

	@media (min-width: 768px) {
		.email-lightbox-container {
			grid-template-columns: 1fr 1fr;
			grid-template-rows: 1fr;
			height: var(--height);
		}
	}
	.email-form-container {
		padding: var(--padding);
		height: fit-content;
	}
	@media (min-width: 768px) {
		.email-form-container {
			padding: 42px;
			padding-bottom: 32px;
		}
	}
	form {
		display: grid;
		grid-template-columns: 1fr 1fr;
		column-gap: max(2vw, 16px);
		align-items: end;
		& > section {
			display: grid;
		}
		margin-top: 24px;
	}
	@media (min-width: 768px) {
		form {
			margin-top: 32px;
		}
	}
	.buttons {
		grid-column: 1 / -1;
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		margin-top: 32px;
		& button {
			cursor: pointer;
			&[type="submit"] {
				background-color: var(--primary-color);
				color: white;
				border-radius: 8px;
				text-align: center;
				width: fit-content;
				font-size: 20px;
				padding: 16px 40px;
				line-height: 1;
				letter-spacing: 0.05em;
				font-weight: 300;
				text-transform: uppercase;
				cursor: pointer;
			}
			&[type="button"] {
				aspect-ratio: 37 / 36;
				height: 36px;
			}
		}
	}
	@media (min-width: 768px) {
		.buttons {
			margin-top: 36px;
		}
	}
	.email-form-title {
		font-size: 32px;
		color: var(--primary-color);
		line-height: 1;
		font-style: italic;
		font-weight: 600;
	}
	@media (min-width: 768px) {
		.email-form-title {
			font-size: 48px;
		}
	}
	label {
		color: var(--primary-color);
		font-size: 20px;
		line-height: 1;
		font-weight: 300;
	}
	input,
	textarea {
		font-size: 14px;
	}
	input {
		padding-block: 4px;
		border-bottom: 1px solid var(--primary-color);
	}
	textarea {
		margin-top: 24px;
		padding: 8px;
		border: 1px solid var(--primary-color);
		border-radius: 4px;
		white-space: pre-wrap;
		word-break: break-word;
	}
	.full-width {
		grid-column: 1 / -1;
	}
	.email,
	.subject,
	.message {
		margin-top: 24px;
	}
	.name,
	.email {
		grid-column: 1 / -1;
	}
	@media (min-width: 448px) {
		.name {
			grid-column: 1 / 2;
		}
		.email {
			margin-top: 0;
			grid-column: 2 / 3;
		}
	}
	@media (min-width: 768px) {
		.subject,
		.message {
			margin-top: 32px;
		}
		textarea {
			margin-top: 32px;
		}
	}
	.media-wrapper {
		overflow: hidden;
	}
</style>
