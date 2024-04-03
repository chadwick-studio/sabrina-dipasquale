import { error } from "@sveltejs/kit";
import { sanityClient } from "$lib/utils/sanityClient";

export async function load({}) {
	const data = await sanityClient.fetch(
		`*[_type == "project"]|order(orderRank)[0]`,
	);
	if (data) {
		return {
			project: data,
			title: "Sabrina DiPasquale: Art Director and Designer",
			
		};
	}
	error(404, { message: "Not found" });
}
