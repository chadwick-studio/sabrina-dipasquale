<script>
  import Lenis from "lenis";
  import gsap from "gsap";
  import { checkScroll } from "$utils/checkScroll.js";
  import { color, bgcolor, pillColor } from "$stores/stores";
  import { goto, afterNavigate } from "$app/navigation";
  import { onMount } from "svelte";

  import EmailLightbox from "$components/EmailLightbox.svelte";
  import Slider from "$components/Slider.svelte";
  import Media from "$components/Media.svelte";
  import ArrowLink from "$components/ArrowLink.svelte";
  import { browser } from "$app/environment";
  import { getContext } from "svelte";
  export let data;

  $: ({ aboutme } = data);
  $: color.set(aboutme?.color);
  $: bgcolor.set(aboutme?.bgcolor);
  $: pillColor.set(aboutme?.pillColor);

  let lightboxVisibility = false;
  let visible = false;
  let previousPage = "/";
  let hasScrollbar = false;
  const toggleLightbox = () => {
    lightboxVisibility = !lightboxVisibility;
  };
  const gotoPreviousPage = () => {
    goto(previousPage);
  };
  const debounce = (callback, wait = 100) => {
    let timeoutId = null;
    return (...args) => {
      window.clearTimeout(timeoutId);
      timeoutId = window.setTimeout(() => {
        callback.apply(null, args);
      }, wait);
    };
  };
  afterNavigate(({ from }) => {
    previousPage = from?.url.pathname || previousPage;
  });
  onMount(() => {
    visible = true;

    const aboutmeScroll = document.querySelector(".aboutme");
    hasScrollbar = aboutmeScroll.scrollHeight > aboutmeScroll.clientHeight;
    console.log(hasScrollbar);
    const handleResize = () => {
      debounce(() => {
        hasScrollbar = aboutmeScroll.scrollHeight > aboutmeScroll.clientHeight;
      })();
    };
    window.addEventListener("resize", handleResize);
    const lenis = new Lenis({
      wrapper: document.querySelector(".aboutme"),
      content: document.querySelector(".aboutme-content"),
      lerp: 0.2,
    });
    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  });
  const ended = getContext("ended");
  $: console.log($ended);
  $: {
    if (browser && $ended) {
      const tl = gsap.timeline();
      tl.to(".biography > p", {
        opacity: 1,
        duration: 0.8,
      }).delay(0.6);
      tl.to(".experience", {
        opacity: 1,
        duration: 0.8,
      }).delay(0.5);
      tl.to(".clients", {
        opacity: 1,
        duration: 0.6,
      });
      tl.to(".awards", {
        opacity: 1,
        duration: 0.6,
      });
      tl.to(".skills", {
        opacity: 1,
        duration: 0.6,
      });
      tl.to(".contact-info ul > li:first-child", {
        opacity: 1,
        duration: 0.4,
      });
      tl.to(".contact-info ul > li:nth-child(2)", {
        opacity: 1,
        duration: 0.3,
      });
      tl.to(".contact-info ul > li:last-child", {
        opacity: 1,
        duration: 0.3,
      });
    }
  }
  onMount(() => {});
</script>

<div class="media-wrapper">
  <Media
    type={aboutme?.media[0]?._type}
    obj={aboutme?.media[0]}
    objectPosition="top"
  ></Media>
  <ArrowLink button mobile on:click={gotoPreviousPage}>Work</ArrowLink>
</div>
<div class="aboutme-wrapper">
  <h1 class="description-title sr-only">About Me</h1>
  <ArrowLink button desktop on:click={gotoPreviousPage}>Work</ArrowLink>
  <div class="scroll-wrapper" class:visible>
    <div class="aboutme scrollbar" class:hasScrollbar use:checkScroll>
      <div class="aboutme-content">
        <div class="aboutme-info-grid">
          <section class="biography">
            <p>
              {aboutme?.biography}
            </p>
          </section>
          <section class="contact-info">
            <ul>
              <li>
                <ArrowLink button on:click={toggleLightbox}>
                  <span>Email</span>
                </ArrowLink>
              </li>
              {#if aboutme?.socialMedia}
                {#each aboutme.socialMedia as social}
                  <li>
                    <ArrowLink href={social?.link}>
                      {social?.title}
                    </ArrowLink>
                  </li>
                {/each}
              {/if}
            </ul>
          </section>
          <section class="more-info">
            <section class="experience | info">
              <h2>
                {aboutme?.experience?.title}
              </h2>
              <ul class="companies-list">
                {#if aboutme?.experience?.companiesList}
                  {#each aboutme.experience?.companiesList as company}
                    <li>
                      <span>{company?.date}</span>
                      <span>{company?.name}</span>
                    </li>
                  {/each}
                {/if}
              </ul>
            </section>
            <section class="clients | info">
              <h2>
                {aboutme?.clients?.title}
              </h2>
              <p>
                {aboutme?.clients?.text}
              </p>
            </section>
            <section class="awards | info">
              <h2>
                {aboutme?.awards?.title}
              </h2>
              <p>
                {aboutme?.awards?.text}
              </p>
            </section>
            <section class="skills | info">
              <h2>
                {aboutme?.skills?.title}
              </h2>
              <p>
                {aboutme?.skills?.text}
              </p>
            </section>
          </section>
        </div>
      </div>
    </div>
  </div>
  <Slider></Slider>
</div>
<EmailLightbox
  --bg-color={aboutme?.lightboxBgColor?.hex}
  --primary-color={aboutme?.lightboxPrimaryColor?.hex}
  --translateY={lightboxVisibility ? "0" : "-100%"}
  on:closeLightbox={toggleLightbox}
  media={aboutme?.lightboxMedia}
></EmailLightbox>
<!-- For data fetching only -->
<slot />

<style lang="postcss">
  .biography > p,
  .contact-info ul > li,
  .experience,
  .clients,
  .awards,
  .skills {
    opacity: 0;
  }
  .aboutme-wrapper {
    overflow: hidden;
    display: grid;
    grid-template-columns: 1fr;
    padding: var(--padding);
    padding-bottom: 64px;
    line-height: 1.4;
    position: relative;
    container: aboutme-wrapper / inline-size;
  }
  .aboutme-wrapper,
  .media-wrapper {
    color: var(--color);
    background-color: var(--bg-color);
  }
  @media (min-width: 768px) {
    .aboutme-wrapper {
      padding-bottom: 96px;
    }
  }

  .scroll-wrapper {
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
      opacity: 0;
      transition: opacity 200ms ease;
    }
    &.visible::before {
      opacity: 1;
      transition: opacity 200ms ease;
    }
    &.visible::after {
      opacity: 1;
      transition: opacity 200ms ease;
    }
    &::before {
      top: 0;
      background-image: linear-gradient(to top, transparent, var(--bg-color));
    }
    &::after {
      bottom: 0;
      background-image: linear-gradient(
        to bottom,
        transparent,
        var(--bg-color)
      );
    }
    &:has(.aboutme.scroll-top)::before {
      opacity: 0;
      transition: opacity 200ms ease;
    }
    &:has(.aboutme.scroll-bottom)::after {
      opacity: 0;
      transition: opacity 200ms ease;
    }
  }

  .aboutme {
    overflow-y: auto;
    position: relative;
    overscroll-behavior: none;
    height: 100%;
    &.hasScrollbar {
      padding-right: var(--padding);
    }
  }

  .media-wrapper {
    overflow: hidden;
    position: relative;
  }

  .aboutme-info-grid {
    display: flex;
    flex-direction: column;
    row-gap: 48px;
  }
  @media (min-width: 768px) {
    .scroll-wrapper {
      margin-top: 68px;
    }
  }
  @container aboutme-wrapper (min-width: 564px) {
    .aboutme-info-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: var(--padding);
    }
    .more-info {
      grid-column: 2 / 3;
      grid-row: 1 / 3;
    }
    .biography {
      grid-column: 1 / 2;
      grid-row: 1 / 2;
    }
    .contact-info {
      grid-column: 1 / 2;
      grid-row: 2 / 3;
    }
  }
  .contact-info {
    font-size: 16px;
    & > ul {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
      line-height: 1;
    }
  }
  /* Information */
  .biography {
    font-size: 17px;
    line-height: 1.2;
  }
  @container aboutme-wrapper (min-width: 672px) {
    .biography {
      font-size: 22px;
    }
  }
  .companies-list {
    border-top: 1px solid var(--color);
    border-bottom: 1px solid var(--color);
    & > li:not(:last-child) {
      border-bottom: 1px solid var(--color);
    }
    & > li {
      display: flex;
      justify-content: space-between;
      padding-inline: 2px;
      line-height: 2;
    }
    & > li:first-child > span:last-child {
      font-weight: 600;
    }
  }
  .info {
    line-height: 1.5;
    letter-spacing: 0.03em;
    & h2 {
      font-size: 16px;
      font-weight: 500;
    }
    & > p,
    ul {
      font-size: 14px;
      font-weight: 400;
    }
    & h2 + p {
      margin-top: 6px;
    }
    & h2 + ul {
      margin-top: 12px;
    }
  }
  .more-info {
    & > section + section {
      margin-top: 24px;
    }
  }
  .biography {
    order: 1;
  }
  .more-info {
    order: 2;
  }
  .contact-info {
    order: 3;
  }
</style>
