import { sanityClient } from "$lib/utils/sanityClient";
import { error } from "@sveltejs/kit";

export const load = async () => {
	const data = await sanityClient.fetch(
		`*[_type == "project"]|order(orderRank)`,
	);
	if (data) {
		return {
			projects: data,
		};
	}
	error(500, { message: "Internal Server Error" });
};
