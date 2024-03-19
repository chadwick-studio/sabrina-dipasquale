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
	<span>Work</span>
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
</button>

<style lang="postcss">
	.goto-work-btn {
		display: none;
		align-items: center;
		gap: 8px;
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
</style>
