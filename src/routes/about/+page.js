import { error } from "@sveltejs/kit";
import { sanityClient } from "$lib/utils/sanityClient";

// @ts-ignore
export async function load({ params }) {
	const data = await sanityClient.fetch(`*[_type == "aboutme"][0]`);
	if (data) {
		return {
			aboutme: data,
		};
	}
	error(404, { message: "Not found" });
}
