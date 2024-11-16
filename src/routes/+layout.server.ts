import type { MetaProps } from 'runes-meta-tags';
import { ANALYTICS_ID_APP_TWO } from '$env/static/private';

const title = 'Svelte Animate';
const description =
  'A lightweight Svelte component that adds beautiful CSS animations to any element using Animate.css library. Features include click/hover triggers, customizable duration, reduced motion support, and accessibility features. Perfect for creating engaging user interfaces with smooth animations in Svelte applications.';
const imgUrl = 'https://open-graph-vercel.vercel.app/api/svelte-animate';
const keywords =
  'svelte, animation, animate.css, web animation, UI components, front-end development, svelte animations, CSS animations, user interface, accessibility, reduced motion, UI/UX, motion effects, transition effects, animation library, svelte transitions';

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
