import { error } from "@sveltejs/kit";
import { sanityClient } from "$lib/utils/sanityClient";

// @ts-ignore
export async function load() {
	const data = await sanityClient.fetch(`*[_type == "homePage"][0]`);
	if (data) {
		return {
			home: data,
		};
	}
	error(404, { message: "Not found" });
}
