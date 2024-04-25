<script>
  import { onMount } from "svelte";
  import Arrow from "./icons/Arrow.svelte";

  export let description;

  let visible = false;
  let projectInfo;
  let noTransition = false;
  let clientWidth;
  const toggleProjectDescription = () => {
    visible = !visible;
    noTransition = true;
    let pxWidth = clientWidth + "px";
    if (visible) {
      projectInfo.style.width = "calc(100% - var(--padding) * 2)";
    } else {
      projectInfo.style.width = `calc(${pxWidth} + var(--pill-padding-inline) / 2`;
    }
  };
  const handleTransition = () => {
    noTransition = false;
  };
  onMount(() => {
    if (clientWidth !== undefined && clientWidth > 0 && projectInfo) {
      projectInfo.style.width = `calc(${clientWidth + "px"} + var(--pill-padding-inline) * 2`;
    }
  });
</script>

<div bind:this={projectInfo} class:visible class="project-info-container">
  <button
    class="project-info-btn"
    on:click={toggleProjectDescription}
    on:mouseleave={handleTransition}
    on:blur={handleTransition}
    class:no-transition={noTransition}
    bind:clientWidth
  >
    {@html visible ? "<span>Close</span>" : "<span>Info</span>"}
    <div class="arrow-wrapper">
      <Arrow rotate="var(--_rotate)"></Arrow>
    </div>
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
    --_translate-y: 2px;
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
    transition:
      width 300ms ease,
      padding 300ms ease,
      inset 300ms ease;
    max-height: 33.33vh;
    overflow: hidden;
    &.visible {
      --_rotate: -135deg;
      --_padding-visible-block: 1em;
      --_padding-visible-inline: 1em;
      --_translate-y: -2px;
      padding: var(--_padding-visible-block) var(--_padding-visible-inline);
      top: calc(var(--padding) - var(--pill-padding-block) - 0.4em);
      left: calc(var(--padding) - var(--pill-padding-inline) + 0.2em);
      transition:
        width 500ms ease,
        padding 500ms ease,
        inset 500ms ease;
    }
  }

  .project-info-btn {
    display: flex;
    align-items: center;
    gap: 4px;
    white-space: nowrap;
    cursor: pointer;
    line-height: 1;
    &.no-transition .arrow-wrapper {
      transition: none !important;
    }
    & .arrow-wrapper {
      transition: transform 200ms ease;
    }
    &:is(:hover, :focus-visible) {
      .arrow-wrapper {
        transform: translate(2px, var(--_translate-y));
        transition: transform 500ms ease;
      }
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
