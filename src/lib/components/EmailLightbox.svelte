<script>
	export let media;
	import { generateFileUrl } from "$utils/generateVideoUrl";
	import { generateImageUrl } from "$utils/generateImageUrl";
	import { cubicIn, cubicOut } from "svelte/easing";

	const move = (node, { duration }) => {
		return {
			duration,
			css: (t, u) => {
				return `transform: translateY(-${u * 100}%)`;
			},
		};
	};
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

<div
	class="email-lightbox-container"
	in:move={{ duration: 600, easing: cubicOut }}
	out:move={{ duration: 300, easing: cubicIn }}
	style:--height={height + "px"}
>
	<div bind:clientHeight={height} class="email-form-container">
		<h1 class="email-form-title">Let's chat.</h1>
		<form action="https://api.web3forms.com/submit" method="POST">
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
			<input type="hidden" name="subject" value="" />
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
						viewBox="0 0 16 47"
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
					>
						<path
							d="M8.70711 0.292893C8.31658 -0.0976311 7.68342 -0.0976311 7.2929 0.292893L0.928934 6.65685C0.53841 7.04738 0.53841 7.68054 0.928934 8.07107C1.31946 8.46159 1.95262 8.46159 2.34315 8.07107L8 2.41421L13.6569 8.07107C14.0474 8.46159 14.6805 8.46159 15.0711 8.07107C15.4616 7.68054 15.4616 7.04738 15.0711 6.65685L8.70711 0.292893ZM9 47L9 1L7 1L7 47L9 47Z"
							fill="#4E4E4F"
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
		width: 100%;
		background-color: var(--bg-color);
		z-index: 1000;
		overflow: hidden;
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
				padding: 16px 36px;
				line-height: 1;
				letter-spacing: 0.05em;
				font-weight: 300;
				text-transform: uppercase;
				cursor: pointer;
			}
			&[type="button"] {
				aspect-ratio: 16 / 47;
				height: 47px;
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
		white-space: prewrap;
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
