import { sanityClient } from "$lib/utils/sanityClient";
import { error } from "@sveltejs/kit";

export const load = async () => {
	const data = await sanityClient.fetch(
		`*[_type == "project"]|order(orderRank)`,
	);
	const password = await sanityClient.fetch(`*[_type == "settings"][0]`);
	if (data) {
		return {
			projects: data,
			password,
		};
	}
	error(500, { message: "Internal Server Error" });
};
