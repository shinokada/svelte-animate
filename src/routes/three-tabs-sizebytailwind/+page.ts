import type { MetaProps } from 'runes-meta-tags';

export const load = () => {
  const pageMetaTags: MetaProps = {
    title: 'Three Tabs example sized by Tailwind - Runes Webkit',
    description: 'Three Tabs example sized by Tailwind',
    og: {
      title: 'Three Tabs example sized by Tailwind - Runes Webkit',
      description: 'Three Tabs example sized by Tailwind'
    },
    twitter: {
      title: 'Three Tabs example sized by Tailwind - Runes Webkit',
      description: 'Three Tabs example sized by Tailwind'
    }
  };
  return { pageMetaTags };
};
