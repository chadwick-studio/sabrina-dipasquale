import { error } from "@sveltejs/kit";
import { sanityClient } from "$lib/utils/sanityClient";

export async function load({ params }) {
	const data = await sanityClient.fetch(
		`*[_type == "project" && slug.current == "${params.slug}"][0]`,
	);
	if (data) {
		return {
			project: data,
			title: data?.company + "_" + data?.title + " | Sabrina Dipasquale",
			description: data?.description,
		};
	}
	error(404, { message: "Not found" });
}
