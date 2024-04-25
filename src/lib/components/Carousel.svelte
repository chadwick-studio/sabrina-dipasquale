<script>
  //svelte imports
  import { afterNavigate, goto } from "$app/navigation";
  import { getContext, onMount } from "svelte";
  import { tick } from "svelte";
  import { fade } from "svelte/transition";
  import { bgcolor, direction } from "$stores/stores";
  import PasswordForm from "./PasswordForm.svelte";

  //js imports
  import { generateImageUrl } from "$utils/generateImageUrl";
  import { generateFileUrl } from "$utils/generateVideoUrl";
  import detectTouchScreen from "$utils/detectTouchScreen";

  //actions
  import scrollIntoView from "$utils/scrollIntoView";
  import cursor from "$utils/cursor";
  import observe from "$utils/intersectionObserver";
  import Pagination from "./Pagination.svelte";
  import ProjectInfo from "./ProjectInfo.svelte";
  import ArrowLink from "./ArrowLink.svelte";

  export let password = "";
  export let project = {};

  const projects = getContext("projects");

  let index = 0;
  $: projectIndex = projects.findIndex((el) => el?._id === project?._id);
  let hasTouchScreen = false;
  let passwordValue;

  let projectInfoLightbox = false;

  const toggleProjectInfo = () => {
    projectInfoLightbox = !projectInfoLightbox;
  };

  const changePage = async () => {
    if ($direction === 1) {
      if (index === project?.media.length - 1 || project?.media.length === 1) {
        projectIndex = (projectIndex + (1 % projects.length)) % projects.length;
        await tick();
        goto(`/${projects[projectIndex].slug.current}`);
      } else {
        index++;
      }
    } else {
      if (index === 0 || project?.media.length === 1) {
        projectIndex = (projectIndex - 1 + projects.length) % projects.length;
        await tick();
        goto(`/${projects[projectIndex].slug.current}`);
      } else {
        index--;
      }
    }
  };

  const gotoPrevPage = () => {
    direction.set(-1);
    changePage();
  };
  const gotoNextPage = () => {
    direction.set(1);
    changePage();
  };

  let speed = "smooth";

  afterNavigate(() => {
    speed = "instant";
    index = $direction === 1 ? 0 : project?.media.length - 1;
    setTimeout(() => {
      speed = "smooth";
    }, 100);
  });
  onMount(() => {
    hasTouchScreen = detectTouchScreen();
  });
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- svelte-ignore a11y-click-events-have-key-events -->
{#key project}
  <div
    class="carousel"
    in:fade={{ duration: 300, delay: 300 }}
    out:fade={{ duration: 300 }}
    use:cursor
  >
    {#if !project?.hidden}
      <ProjectInfo
        description={project?.description}
        on:click={toggleProjectInfo}
      ></ProjectInfo>
      <Pagination
        {index}
        mediaLength={project?.media.length}
        on:click={gotoNextPage}
      ></Pagination>
    {/if}
    <ArrowLink mobile href="/about">About</ArrowLink>
    <div class="scroller-container">
      <div class="scroller-controls" class:active={!hasTouchScreen}>
        <button
          on:click={() => {
            if (!hasTouchScreen) gotoPrevPage();
          }}
          class="scroller-control prev-page-btn"
        ></button>
        <button
          on:click={() => {
            if (!hasTouchScreen) gotoNextPage();
          }}
          class="scroller-control next-page-btn"
        ></button>
      </div>
      <ul
        class="scroller no-scrollbar"
        class:no-scroll={project?.hidden}
        use:scrollIntoView={{ index, speed }}
      >
        {#if project?.media}
          {#each project?.media as el, i}
            <li
              style:background-color={el?.mediaBgColor
                ? el.mediaBgColor.hex
                : $bgcolor.hex}
              on:enterScreen={() => {
                if (el?.addbgcolor) {
                  bgcolor.set(el?.bgcolor);
                } else {
                  bgcolor.set(project?.bgcolor);
                }
                if (hasTouchScreen) {
                  index = i;
                }
              }}
              use:observe
            >
              {#if el?._type === "img"}
                <img
                  data-layout={el?.layout || 0}
                  src={generateImageUrl(el).format("webp").width(1500).url()}
                  alt=""
                  draggable="false"
                />
              {:else}
                <video
                  data-layout={el?.layout}
                  src={generateFileUrl(el)}
                  autoplay="autoplay"
                  loop="loop"
                  muted
                  defaultMuted
                  playsinline
                  oncontextmenu="return false;"
                  preload="auto"
                  grid
                ></video>
              {/if}
            </li>
          {/each}
        {/if}
        {#if project?.hidden}
          <PasswordForm
            bind:value={passwordValue}
            on:submit={() => {
              if (passwordValue === password?.password) project.hidden = false;
            }}
            img={project?.passwordImg}
            fieldColor={project?.passwordFieldColor.hex}
            bgcolor={project?.passwordBgColor?.hex}
          ></PasswordForm>
        {/if}
      </ul>
    </div>
  </div>
{/key}

<style lang="postcss">
  .carousel {
    container: carousel / size;
    height: 100%;
    isolation: isolate;
  }
  .scroller-container {
    position: relative;
    height: 100cqh;
  }
  .scroller-controls {
    display: none;
    grid-template-columns: 1fr 1fr;
    position: absolute;
    top: 0;
    left: 0;
    height: 100cqh;
    width: 100%;
    z-index: 10;
  }
  .scroller-controls.active {
    display: grid;
  }
  .scroller {
    display: grid;
    grid-auto-flow: column;
    grid-auto-columns: 100%;
    height: 100cqh;
    overflow-x: auto;
    overflow-y: hidden;
    scroll-behavior: smooth;
    overscroll-behavior-inline: contain;
    scroll-snap-type: inline mandatory;
    position: relative;
    &.no-scroll {
      overflow-x: hidden;
    }
  }
  .no-scrollbar {
    -ms-overflow-style: none; /* for Internet Explorer, Edge */
    scrollbar-width: none; /* for Firefox */
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none; /* for Chrome, Safari, and Opera */
  }

  .scroller > li {
    height: 100cqh;
    scroll-snap-align: start;
    display: grid;
    place-items: center;
    transition: background-color 300ms ease;
  }
  [data-layout="0"] {
    display: none;
  }
  [data-layout="1"] {
    width: 100%;
    height: 100cqh;
    object-fit: contain;
    object-position: center;
  }
  [data-layout="2"] {
    width: 100%;
    height: 100cqh;
    object-fit: cover;
    object-position: center;
  }
  [data-layout="3"] {
    width: min(80cqw, 600px);
    height: min(auto, 100cqh);
    max-height: 90%;
    object-fit: cover;
    object-position: center;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }
  .hidden-form {
    display: grid;
    place-items: center;
    width: 100%;
    height: 100cqh;
    position: absolute;
    top: 0;
    left: 0;
    padding: var(--padding);
    font-family: "PSFournier Std Petit";
    --_color: #0f5cb7;
    color: var(--_color);
  }
  .scroller-control {
    cursor: none;
  }

  a,
  button:not(.scroller-control) {
    cursor: pointer;
  }
  @media (hover: hover) {
    :global(.cursor) {
      width: 128px;
      height: 128px;
      transform: translate(-50%, -50%);
      top: var(--y);
      left: var(--x);
      position: absolute;
      pointer-events: none;
      cursor: none;
      z-index: 99999;
    }
  }
</style>
