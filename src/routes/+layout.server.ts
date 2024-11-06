import type { MetaProps } from 'runes-meta-tags';
import { ANALYTICS_ID_APP_TWO } from '$env/static/private';

const title = 'Svelte Animate';
const description = 'A flexible wrapper that can animate any child element using animate.css animations, with support for multiple triggers like hover and click. Users can customize the animation type, duration, and visibility control, allowing the child elements to be shown temporarily or hidden after the animation completes.';
const imgUrl = 'https://open-graph-vercel.vercel.app/api/svelte-animate';
const keywords = 'svelte, sveltekit, animate.css, draw';

export const load = ({ url }) => {
	const layoutMetaTags: MetaProps = {
		title,
		description,
		keywords,
		twitter: {
			card: 'summary_large_image',
			site: '@shinokada',
			handle: '@shinokada',
			title,
			description,
			image: imgUrl,
			imageAlt: title
		},
		og: {
			type: 'website',
			title,
			description,
			url: url.href,
			image: imgUrl,
			imageAlt: title,
			siteName: title,
			imageWidth: '1200',
			imageHeight: '630'
		}
	};
	return {
		layoutMetaTags,
		ANALYTICS_ID_APP_TWO
	};
};
