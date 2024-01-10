<script>
	import "../app.pcss";
	import "../styles/reset.css";
	export let data;
</script>

<slot />

<style>
	@import url("https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,400;0,700;1,400&display=swap");
	:global(body) {
		font-family: "Open Sans";
	}
</style>
