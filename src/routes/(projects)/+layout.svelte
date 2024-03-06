<script>
	import Carousel from "$components/Carousel.svelte";
	import { bgcolor, color, project } from "$stores/stores";
	import { page } from "$app/stores";
	import { beforeNavigate } from "$app/navigation";
	import { getContext } from "svelte";
	export let data;
	// sets initial variable;
	const projects = getContext("projects");
	let currentProject = projects[0];
	$: project.set($page.data.project || currentProject);
	$: bgcolor.set($page.data.project?.bgcolor || currentProject);
	$: color.set($page.data.project?.color || currentProject);
	// beforeNavigate(() => {
	// 	sessionStorage.setItem("project", JSON.stringify($project));
	// 	currentProject = JSON.parse(sessionStorage.getItem("project"));
	// });
</script>

<Carousel password={data.password} project={$project} />
