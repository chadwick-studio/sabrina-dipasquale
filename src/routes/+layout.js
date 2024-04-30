import { sanityClient } from "$lib/utils/sanityClient";
import { error } from "@sveltejs/kit";

export const load = async ({ url }) => {
  const data = await sanityClient.fetch(
    `*[_type == "project"]|order(orderRank)`,
  );
  const settings = await sanityClient.fetch(`*[_type == "settings"][0]`);
  if (data) {
    return {
      projects: data,
      settings,
      url: url.pathname,
    };
  }
  error(500, { message: "Internal Server Error" });
};
