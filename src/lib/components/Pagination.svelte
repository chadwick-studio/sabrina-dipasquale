<script>
	export let index;
	export let mediaLength;
</script>

<div class="pagination-wrapper">
	<ul class="pagination">
		<li>
			{index + 1} / {mediaLength}
		</li>
		<li>
			<button class="next-page-btn" on:click>Next</button>
		</li>
	</ul>
</div>

<style lang="postcss">
	.pagination-wrapper {
		position: absolute;
		top: var(--padding);
		right: calc(var(--padding) + 1em);
		z-index: 1001;
		font-size: var(--font-size-ui);
		cursor: default;
	}
	.pagination {
		display: inline-flex;
		gap: 1em;
		padding: 0.25em 0.5em;
		& > * {
			width: max-content;
		}
	}
	.next-page-btn {
		cursor: pointer;
	}
</style>
