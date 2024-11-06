import type { MetaProps } from 'runes-meta-tags';

const title = 'Props - Svelte Animate v2';
const description = 'How to use Svelte Animate v2 props';
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
