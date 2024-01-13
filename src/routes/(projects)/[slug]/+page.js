import { error } from "@sveltejs/kit";
import { sanityClient } from "$lib/utils/sanityClient";

// @ts-ignore
export async function load({ params }) {
	const data = await sanityClient.fetch(
		`*[_type == "project" && slug.current == "${params.slug}"][0]`,
	);
	const keyphrase = await sanityClient.fetch(
		`*[_type == "settings"][0]`,
	);
	if (data) {
		return {
			project: data,
			keyphrase
		};
	}
	error(404, { message: "Not found" });
}

