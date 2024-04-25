<script>
  import Arrow from "./icons/Arrow.svelte";
  export let button;
  export let href;
  export let mobile;
  export let desktop;
</script>

{#if button}
  <button class:button class:mobile class:desktop class="pill-button" on:click>
    <span><slot /></span>
    <span class="arrow-wrapper">
      <Arrow rotate="-135deg"></Arrow>
    </span>
  </button>
{:else}
  <a class:mobile class:desktop class="pill-button" {href}>
    <span><slot /></span>
    <span class="arrow-wrapper">
      <Arrow rotate="-135deg"></Arrow>
    </span>
  </a>
{/if}

<style lang="postcss">
  .pill-button {
    display: flex;
    align-items: center;
    gap: 4px;
    margin-left: auto;
    padding: var(--pill-padding-block) var(--pill-padding-inline);
    background-color: var(--pillColor);
    border-radius: 16px;
    font-size: var(--font-size-ui);
    cursor: pointer;
    margin-left: auto;
    line-height: 1;
    align-self: flex-start;
    &.desktop {
      display: none;
    }
    &.mobile {
      display: flex;
      position: absolute;
      bottom: var(--padding);
      left: var(--padding);
      margin: 0;
      z-index: 1000;
    }
    & .arrow-wrapper {
      transition: transform 200ms ease;
    }
    &:is(:hover, :focus-visible) {
      .arrow-wrapper {
        transform: translate(2px, -2px);
        transition: transform 500ms ease;
      }
    }
  }
  @media (min-width: 768px) {
    .pill-button.mobile {
      display: none;
    }
    .pill-button.desktop {
      display: flex;
    }
  }
</style>
