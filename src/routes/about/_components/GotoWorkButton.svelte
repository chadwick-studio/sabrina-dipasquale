<script>
	import { goto, afterNavigate } from "$app/navigation";

	export let mobile = false;

	let previousPage = "/";

	afterNavigate(({ from }) => {
		previousPage = from?.url.pathname || previousPage;
	});

	const gotoWork = () => {
		goto(previousPage);
	};
</script>

<button class:mobile class="goto-work-btn" on:click={gotoWork}>
	<span>work</span>
	<svg
		aria-hidden="true"
		viewBox="0 0 39 8"
		fill="none"
		xmlns="http://www.w3.org/2000/svg"
	>
		<path
			d="M38.3536 4.35356C38.5488 4.15829 38.5488 3.84171 38.3536 3.64645L35.1716 0.464469C34.9763 0.269207 34.6597 0.269207 34.4645 0.464469C34.2692 0.659731 34.2692 0.976314 34.4645 1.17158L37.2929 4L34.4645 6.82843C34.2692 7.02369 34.2692 7.34027 34.4645 7.53554C34.6597 7.7308 34.9763 7.7308 35.1716 7.53554L38.3536 4.35356ZM-4.37114e-08 4.5L38 4.5L38 3.5L4.37114e-08 3.5L-4.37114e-08 4.5Z"
			fill="black"
		/>
	</svg>
</button>

<style lang="postcss">
	.goto-work-btn {
		display: none;
		align-items: center;
		gap: 4px;
		margin-left: auto;
		padding: 6px 10px;
		background-color: #fff;
		border-radius: 32px;
		font-size: 18px;
		text-decoration: underline;
		cursor: pointer;
		&.mobile {
			position: absolute;
			top: var(--padding);
			right: var(--padding);
			margin: 0;
		}
	}
	@media (min-width: 768px) {
		.goto-work-btn {
			display: flex;
			&.mobile {
				display: none;
			}
		}
	}
	svg {
		aspect-ratio: 39/8;
		width: 42px;
	}
</style>
