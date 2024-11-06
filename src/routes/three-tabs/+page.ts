import type { MetaProps } from 'runes-meta-tags';

export const load = () => {
	const pageMetaTags: MetaProps = {
		title: 'Three Tabs example - Runes Webkit',
		description: 'Three Tabs example',
		og: {
			title: 'Three Tabs example - Runes Webkit',
			description: 'Three Tabs example'
		},
		twitter: {
			title: 'Three Tabs example - Runes Webkit',
			description: 'Three Tabs example'
		}
	};
	return { pageMetaTags };
};
