import type { MetaProps } from 'runes-meta-tags';

const title = 'Custom icons - Svelte Animate';
const description = 'A flexible wrapper that can animate any child element using animate.css animations.';
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
