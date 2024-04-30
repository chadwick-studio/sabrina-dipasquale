<script>
  import { page } from "$app/stores";
  import { bgcolor, color, project, pillColor } from "$stores/stores";

  import ProjectsList from "$components/ProjectsList.svelte";
  import Slider from "$components/Slider.svelte";
  import Carousel from "$components/Carousel.svelte";

  export let data;

  $: project.set($page.data.project);
  $: bgcolor.set($page.data.project?.bgcolor);
  $: color.set($page.data.project?.color);
  $: pillColor.set($page.data.project?.pillColor);
</script>

<div class="carousel-container">
  <Carousel password={data?.settings?.password} project={$project} />
  <slot />
</div>
<div class="projects-list-container">
  <ProjectsList />
  <Slider active />
</div>

<style lang="postcss">
  .carousel-container,
  .projects-list-container {
    overflow: hidden;
    font-size: var(--font-size);
  }
  .carousel-container {
    cursor: none;
  }
  .projects-list-container {
    position: relative;
  }
</style>
