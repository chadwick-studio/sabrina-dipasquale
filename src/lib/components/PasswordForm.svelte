<script>
	export let bgcolor;
	export let fieldColor;
	export let img;
	export let value;
	import { generateImageUrl } from "$utils/generateImageUrl";
</script>

<div class="password-form" style:background-color={bgcolor}>
	<form class="form" on:submit>
		<section>
			<label for="password" class="sr-only">Password</label>
			<img
				src={generateImageUrl(img)?.height(176)?.url()}
				alt=""
			/>
			<input
				style:border={`1px solid ${fieldColor}`}
				class="password-input"
				type="password"
				bind:value
			/>
		</section>
		<button class="submit-btn">view project</button>
	</form>
</div>

<style lang="postcss">
	.password-form {
		color: black;
		display: grid;
		place-items: center;
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100cqh;
		z-index: 1000;
		cursor: initial;
		font-family:
			"Helvetica",
			system-ui,
			-apple-system,
			BlinkMacSystemFont,
			"Segoe UI",
			Roboto,
			Oxygen,
			Ubuntu,
			Cantarell,
			"Open Sans",
			"Helvetica Neue",
			sans-serif;
	}
	.form,
	.password-input {
		text-align: center;
	}
	.form {
		display: grid;
	}
	.password-input {
		border-radius: 8px;
		padding: 4px 16px;
		margin-top: 32px;
	}
	.submit-btn {
		font-size: 16px;
		font-weight: 300;
		margin-top: 8px;
		cursor: pointer;
	}
	img {
		margin-inline: auto;
	}
	@media (max-width: 575px) {
		.password-input {
			margin-top: 24px;
		}
		img {
			height: 112px;
		}
	}
</style>
