<script>
	import Arrow from "./icons/Arrow.svelte";
	export let description;
	let visible = false;
	const toggleProjectDescription = () => {
		visible = !visible;
	};
	$: console.log(visible);
</script>

<div class:visible class="project-info-container">
	<button class="project-info-btn" on:click={toggleProjectDescription}>
		{@html visible ? "<span>Close</span>" : "<span>Info</span>"}
		<Arrow rotate="var(--_rotate)"></Arrow>
	</button>
	{#if visible}
		<p class="info">
			{description}
		</p>
	{/if}
</div>

<style lang="postcss">
	.project-info-container {
		--_rotate: 0;
		position: absolute;
		top: var(--padding);
		left: var(--padding);
		margin-right: var(--padding);
		z-index: 1000;
		cursor: default;
		background-color: rgb(255 255 255 / 0.2);
		border-radius: 16px;
		padding: var(--_pagination-padding-block) var(--_pagination-padding-inline);
		font-size: var(--font-size-ui);
		&.visible {
			--_rotate: -180deg;
			--_padding-visible-block: 1em;
			--_padding-visible-inline: 1em;
			padding: var(--_padding-visible-block)
				var(--_padding-visible-inline);
			top: calc(
				var(--padding) -
					var(--_pagination-padding-block) - 0.5em
			);
			left: calc(
				var(--padding) -
					var(--_pagination-padding-inline)
			);
			width: calc(100% - var(--padding) * 2);
		}
	}
	.project-info-btn {
		display: inline-flex;
		gap: 2px;
		white-space: nowrap;
		cursor: pointer;
		text-decoration: underline;
		& > svg {
			aspect-ratio: 21 / 20;
			width: 1em;
		}
	}
	.info {
		display: block;
		line-height: 1.3;
		margin-top: 0.5em;
		font-size: var(--font-size-description);
		letter-spacing: 0.01em;
		margin-inline: 0.25em;
		font-weight: 400;
	}
</style>
