<script>
	import Arrow from "./icons/Arrow.svelte";
	export let carousel;
	export let about;
	export let button;
</script>

{#if button}
	<button class:button class:about class="about-link" on:click>
		<span><slot /></span>
		<Arrow rotate="-135deg"></Arrow>
	</button>
{:else}
	<a class:carousel class="about-link" href="/about">
		<span><slot /></span>
		<Arrow rotate="-135deg"></Arrow>
	</a>
{/if}

<style lang="postcss">
	.about-link {
		display: none;
		align-items: center;
		gap: 4px;
		margin-left: auto;
		padding: var(--pill-padding-block) var(--pill-padding-inline);
		background-color: var(--pillColor);
		border-radius: 16px;
		font-size: var(--font-size-ui);
		text-decoration: underline;
		cursor: pointer;
		margin-left: auto;
		line-height: 1;
		&.carousel,
		&.about {
			display: flex;
			position: absolute;
			bottom: var(--padding);
			left: var(--padding);
			margin: 0;
			z-index: 1000;
		}
	}
	@media (min-width: 768px) {
		.about-link {
			display: flex;
		}
		.about-link.carousel,
		.about-link.about {
			display: none;
		}
	}
</style>
