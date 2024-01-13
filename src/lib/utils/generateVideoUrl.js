import { buildFileUrl, parseAssetId } from "@sanity/asset-utils";
import { sanityClient } from "./sanityClient";

export const generateFileUrl = (source) => {
	const parsedAssetId = parseAssetId(source.asset._ref);
	return buildFileUrl(parsedAssetId, {
		projectId: "sauv48hx",
		dataset: "production",
	});
};
