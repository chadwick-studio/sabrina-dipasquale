<script>
	import Arrow from "./icons/Arrow.svelte";
	export let description;
	let visible = false;
	const toggleProjectDescription = () => {
		visible = !visible;
	};
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
		--_rotate: -45deg;
		position: absolute;
		top: var(--padding);
		left: var(--padding);
		margin-right: var(--padding);
		z-index: 1000;
		cursor: default;
		background-color: var(--pillColor);
		border-radius: 16px;
		padding: var(--pill-padding-block) var(--pill-padding-inline);
		font-size: var(--font-size-ui);
		&.visible {
			--_rotate: -135deg;
			--_padding-visible-block: 1em;
			--_padding-visible-inline: 1em;
			padding: var(--_padding-visible-block)
				var(--_padding-visible-inline);
			top: calc(
				var(--padding) - var(--pill-padding-block) -
					0.4em
			);
			left: calc(
				var(--padding) - var(--pill-padding-inline) +
					0.2em
			);
			width: calc(100% - var(--padding) * 2);
		}
	}
	.project-info-btn {
		display: flex;
		align-items: center;
		gap: 4px;
		white-space: nowrap;
		cursor: pointer;
		line-height: 1;
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
