<script>
  import "../app.pcss";
  import "../styles/reset.css";

  import { getContext, onMount, setContext } from "svelte";
  import { color, bgcolor, percentage, pillColor } from "$stores/stores";
  import { page } from "$app/stores";

  import titlePageVideo from "$lib/assets/title_page_video.webm";
  import { browser } from "$app/environment";
  import { fade } from "svelte/transition";
  import { writable } from "svelte/store";

  export let data;

  // Projects variable
  setContext("projects", data.projects);

  let minFontSizeUI = 16;
  let maxFontSizeUI = 20;
  let minFontSizeDescription = 18;
  let maxFontSizeDescription = 22;
  let minFontSizeTitle = 28;
  let maxFontSizeTitle = 33;
  let minFontSizeBody = 18;
  let maxFontSizeBody = 26;
  let minFontSizeRole = 12;
  let maxFontSizeRole = 16;
  $: fontSizeTitle = getFontSize(
    minFontSizeTitle,
    maxFontSizeTitle,
    $percentage,
  );
  $: fontSizeBody = getFontSize(minFontSizeBody, maxFontSizeBody, $percentage);
  $: fontSizeRole = getFontSize(minFontSizeRole, maxFontSizeRole, $percentage);
  $: fontSizeUI = getFontSize(minFontSizeUI, maxFontSizeUI, $percentage);
  $: fontSizeDescription = getFontSize(
    minFontSizeDescription,
    maxFontSizeDescription,
    $percentage,
  );
  const getFontSize = (min, max, percentage) => {
    return (((max - min) / 100) * percentage + min).toFixed(2) + "px";
  };
  let video;
  let ended;
  let visible = false;
  $: {
    if (browser) {
      document.body.style.backgroundColor = $bgcolor.hex;
    }
  }
  onMount(() => {
    video.play();
    visible = true;
  });
</script>

<svelte:head>
  <meta name="theme-color" content={$bgcolor} />
  <title>{$page.data.title}</title>
  <meta name="description" content={$page.data.description} />
</svelte:head>
{#if !ended}
  <video
    autoplay
    muted
    playsinline
    bind:this={video}
    src={titlePageVideo}
    bind:ended
  ></video>
{/if}
{#if data.url === "/about"}
  <div class="transition-wrapper" in:fade={{ duration: 300, delay: 300 }}>
    <div
      class="site-layout"
      class:visible
      class:about-page={$page.url.pathname === "/about"}
      style:--bg-color={$bgcolor?.hex}
      style:--color={$color}
      style:--pillColor={$pillColor === "black"
        ? "rgb(0 0 0 /.1)"
        : "rgb(255 255 255 / .35)"}
      style:--r={$color === "black" ? "0" : "255"}
      style:--g={$color === "black" ? "0" : "255"}
      style:--b={$color === "black" ? "0" : "255"}
      style:--inverse-r={$color === "black" ? "255" : "0"}
      style:--inverse-g={$color === "black" ? "255" : "0"}
      style:--inverse-b={$color === "black" ? "255" : "0"}
      style:--font-size-title={fontSizeTitle}
      style:--font-size-body={fontSizeBody}
      style:--font-size-role={fontSizeRole}
      style:--font-size-ui={fontSizeUI}
      style:--font-size-description={fontSizeDescription}
    >
      <slot />
    </div>
  </div>
{:else}
  <div class="transition-wrapper" in:fade={{ duration: 300, delay: 300 }}>
    <div
      class="site-layout"
      class:visible
      class:about-page={$page.url.pathname === "/about"}
      style:--bg-color={$bgcolor?.hex}
      style:--color={$color}
      style:--pillColor={$pillColor === "black"
        ? "rgb(0 0 0 /.1)"
        : "rgb(255 255 255 / .35)"}
      style:--r={$color === "black" ? "0" : "255"}
      style:--g={$color === "black" ? "0" : "255"}
      style:--b={$color === "black" ? "0" : "255"}
      style:--inverse-r={$color === "black" ? "255" : "0"}
      style:--inverse-g={$color === "black" ? "255" : "0"}
      style:--inverse-b={$color === "black" ? "255" : "0"}
      style:--font-size-title={fontSizeTitle}
      style:--font-size-body={fontSizeBody}
      style:--font-size-role={fontSizeRole}
      style:--font-size-ui={fontSizeUI}
      style:--font-size-description={fontSizeDescription}
    >
      <slot />
    </div>
  </div>
{/if}

<style lang="postcss">
  video::-webkit-media-controls {
    display: none;
  }
  video {
    width: 100vw;
    height: 100vh;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100000;
    object-fit: cover;
  }
  :global(:root) {
    --pill-padding-block: 0.3em;
    --pill-padding-inline: 0.6em;
  }
  .transition-wrapper {
    height: 100svh;
  }
  .site-layout {
    --padding: clamp(20px, 12.3478px + 2.3913vi, 42px);
    display: none;
    grid-template: 1fr 1fr / 1fr;
    font-family:
      "Gilroy",
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
    height: 100svh;
    color: var(--color);
    background-color: var(--bg-color);
    transition: background-color 300ms ease;
    &.visible {
      display: grid;
    }
  }
  @media (min-width: 1016px) {
    .site-layout {
      grid-template: 1fr / 1fr 508px;
      &.about-page {
        grid-template: 1fr / 1fr 1fr;
      }
    }
  }
  :global(*) {
    overscroll-behavior: none;
  }
  :global(.italic) {
    font-style: italic;
  }
  :global(.uppercase) {
    text-transform: uppercase;
  }
  :global(.bold) {
    font-weight: bold;
  }
  :global(.link) {
    text-decoration: underline;
  }
  :global(.no-select) {
    user-select: none;
  }
  :global(.sr-only) {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    height: 1px;
    overflow: hidden;
    position: absolute;
    white-space: nowrap;
    width: 1px;
  }
  @-moz-document url-prefix() {
    :global(.scrollbar) {
      scrollbar-width: thin;
      scrollbar-color: rgb(var(--r) var(--g) var(--b) / 0.3) transparent;
    }
  }
  :global(.scrollbar::-webkit-scrollbar) {
    width: 1px;
    background-color: transparent;
  }
  :global(.scrollbar::-webkit-scrollbar-track) {
    background-color: transparent;
  }
  :global(.scrollbar::-webkit-scrollbar-thumb) {
    background-color: rgb(var(--r) var(--g) var(--b) / 0.3);
  }
  /*
	:global(.scrollbar::-webkit-scrollbar-thumb) {
		background-color: rgb(var(--r) var(--g) var(--b) / 0.3);
		border: none;
		border: 2px solid #555555;
	}
	*/
</style>
