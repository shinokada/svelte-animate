import type { MetaProps } from 'runes-meta-tags';

const title = 'Getting Started - Svelte Animate v1';
const description = 'How to get started with Svelte Animate v1';
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
