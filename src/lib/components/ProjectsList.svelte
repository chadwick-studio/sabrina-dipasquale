<script>
  import Lenis from "lenis";

  import { page } from "$app/stores";
  import { getContext, onMount } from "svelte";
  import { percentage, direction } from "$stores/stores";
  import { checkScroll } from "$utils/checkScroll";
  import Slider from "./Slider.svelte";
  import ArrowLink from "./ArrowLink.svelte";
  import { afterNavigate, beforeNavigate } from "$app/navigation";

  const projects = getContext("projects");
  let visible = false;
  onMount(() => {
    visible = true;
    const lenis = new Lenis({
      wrapper: document.querySelector(".projects"),
      content: document.querySelector(".projects-content"),
      lerp: 0.2,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
  });
  let opacity = 0;
  let timer;
  beforeNavigate(() => {
    clearInterval(timer);
    opacity = 0;
  });
  afterNavigate(() => {
    timer = setTimeout(() => {
      opacity = 1;
    }, 300);
  });
</script>

<div class="projects-list" style:--opacity={opacity}>
  <section class="title">
    <h1>
      <span class="name"> Sabrina DiPasquale_ </span>
      <ArrowLink desktop href="/about">About</ArrowLink>
    </h1>
  </section>
  <section class="projects-wrapper" class:visible>
    <div class="projects scrollbar" use:checkScroll={$percentage}>
      <div class="projects-content">
        {#each projects as project, i}
          <section>
            {#if i === 0}
              <a
                on:click={() => direction.set(1)}
                class="project-link"
                href="/{project.slug.current}"
                aria-current={$page.url.pathname ===
                  `/${project.slug.current}` || $page.url.pathname === "/"
                  ? "page"
                  : false}
              >
                <h2>
                  <span>
                    {project?.company}
                  </span><span>
                    {#if project?.title}
                      _{project.title}
                    {/if}
                  </span>
                </h2>
                <h3>
                  {#if project?.roles}
                    <ul class="project-roles">
                      {#each project?.roles as role}
                        <li>
                          {role}
                        </li>
                      {/each}
                    </ul>
                  {/if}
                </h3>
              </a>
            {:else}
              <a
                on:click={() => direction.set(1)}
                class="project-link"
                href="/{project.slug.current}"
                aria-current={$page.url.pathname === `/${project.slug.current}`
                  ? "page"
                  : false}
              >
                <h2>
                  <span>{project?.company}</span><span
                    >{#if project?.title}_{project.title}{/if}</span
                  >
                </h2>
                <h3>
                  <ul class="project-roles">
                    {#if project?.roles}
                      {#each project?.roles as role}
                        <li>
                          {role}
                        </li>
                      {/each}
                    {/if}
                  </ul>
                </h3>
              </a>
            {/if}
          </section>
        {/each}
      </div>
    </div>
  </section>
  <Slider></Slider>
</div>

<style lang="postcss">
  h1 {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    column-gap: 32px;
    line-height: 1;
    & .name {
      font-size: var(--font-size-title);
      line-height: 1.1;
      font-weight: 400;
      display: inline-block;
      transform: translateY(1em);
      opacity: 0;
      animation: 1s fadeIn;
      animation-delay: 500ms;
      animation-fill-mode: forwards;
    }
  }
  .projects-list {
    position: relative;
    padding: var(--padding);
    height: 100%;
    display: grid;
    grid-template: auto 1fr / 1fr;
    padding-bottom: 64px;
  }
  @media (min-width: 768px) {
    .projects-list {
      gap: 48px;
    }
  }
  .projects-wrapper {
    position: relative;
    overflow: hidden;
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      width: 100%;
      height: 64px;
      left: 0;
      z-index: 1000;
      pointer-events: none;
      background: transparent;
    }
    &.visible::before {
      opacity: var(--opacity);
    }
    &.visible::after {
      opacity: var(--opacity);
    }
    &::before {
      opacity: 0;
      top: 0;
      background: linear-gradient(to top, transparent, var(--bg-color));
    }
    &::after {
      opacity: var(--opacity);
      bottom: 0;
      background: linear-gradient(to bottom, transparent, var(--bg-color));
    }
    &:has(> .projects.scroll-top)::before {
      opacity: 0;
      transition: opacity 300ms ease;
    }
    &:has(> .projects.scroll-bottom)::after {
      opacity: 0;
    }
  }
  .projects {
    height: 100%;
    overflow: auto;
  }
  .projects-content {
    display: grid;
    margin-top: var(--projects-margin-top);
    column-gap: var(--padding);
    grid-auto-rows: min-content;
    grid-template-columns: 1fr;
    padding-right: var(--padding);
    position: relative;
  }
  .title {
    display: none;
  }
  @media (min-width: 768px) {
    .title {
      display: block;
    }
  }
  .project-link > h2 {
    & > span:first-child {
      font-weight: 500;
    }
    & > span:last-child {
      font-weight: 300;
    }
  }
  .project-link {
    display: block;
    position: relative;
    padding-block: 6px;
    overflow: hidden;
    & > * {
      line-height: 1;
    }
    & > h2 {
      padding-top: 12px;
      font-size: var(--font-size-body);
      font-weight: 500;
      line-height: 1;
      margin-bottom: 0.25em;
    }
    & > h3 {
      padding-bottom: 12px;
      font-size: var(--font-size-role);
    }
    &::before,
    &::after {
      content: "";
      display: block;
      position: absolute;
      height: 1px;
      background-color: var(--color);
      opacity: 0.3;
      width: 0;
      transition: width 300ms cubic-bezier(0.32, 0, 0.67, 0);
    }
    &::before {
      left: 0;
    }
    &::after {
      left: 0;
    }
    &[aria-current="page"] {
      &::before,
      &::after {
        width: 100%;
      }
      &::before {
        transition: width 400ms cubic-bezier(0.33, 1, 0.68, 1);
      }
      &::after {
        transition: width 550ms cubic-bezier(0.33, 1, 0.68, 1);
      }
      & > h2,
      & > h3 {
        color: var(--color);
        opacity: 0.6;
        font-style: italic;
      }
    }
  }
  .project-roles {
    display: flex;
    gap: 0.5em;
    padding-top: 0.25em;
    & > li {
      padding: var(--pill-padding-block) var(--pill-padding-inline);
      background-color: var(--pillColor);
      border-radius: 16px;
    }
  }
  @keyframes fadeIn {
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
</style>
