import { createClient } from "@sanity/client";

export const sanityClient = createClient({
	projectId: "sauv48hx",
	dataset: "production",
	apiVersion: "2024-01-09",
	useCdn: false,
});
