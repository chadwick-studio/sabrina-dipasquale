import { error } from '@sveltejs/kit';

// @ts-ignore
export const load = async ({ params }) => {
	const res = await fetch(`http://localhost:1337/api/projects?filters[slug][$eq]=${params.slug}&populate=*`);
	const data = await res.json();
	if (data.data.length !== 0) {
		return { project: data }
	}

	throw error(404, 'Not found');
}
