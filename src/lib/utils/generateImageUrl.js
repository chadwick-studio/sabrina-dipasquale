import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "./sanityClient";

const builder = imageUrlBuilder(sanityClient);

export const generateImageUrl = (source) => {
	if (source) {
		return builder.image(source);
	}
};
