import { error } from "@sveltejs/kit";
import { sanityClient } from "$lib/utils/sanityClient";

export const prerender = true;
// @ts-ignore
export async function load({ params }) {
	const data = await sanityClient.fetch(`*[_type == "aboutme"][0]`);
	if (data) {
		return {
			aboutme: data,
			title: "About Me | Sabrina Dipasquale",
			description: data?.biography,
		};
	}
	error(404, { message: "Not found" });
}
