import type { MetaProps } from 'runes-meta-tags';

const title = 'Custom icons - Svelte Animate';
const description = 'How to create a custom icons with Svelte Animate';
const imgUrl = 'https://open-graph-vercel.vercel.app/api/svelte-animate';
export const load = ({ url }) => {
	const pageMetaTags: MetaProps = {
		title,
		description,
		og: {
			title,
			description,
			image: imgUrl,
			url: url.href
		},
		twitter: {
			title,
			description,
			image: imgUrl
		}
	};
	return { pageMetaTags };
};
