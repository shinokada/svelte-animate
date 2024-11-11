<script lang="ts">
  import { DocPage } from 'runes-webkit';
  // import { page } from '$app/stores';
  import { HighlightCompo, H1, H2, H3 } from 'runes-webkit';
  import { P, List, Table } from 'svelte-5-ui-lib';

  // let currentUrl = $state($page.url.pathname);
  // function isIncluded(url: string, allowedUrls: string[]): boolean {
  //   return allowedUrls.some((allowedUrl) => {
  //     // For home page '/', do exact matching
  //     if (allowedUrl === '/') {
  //       return url === '/' || url === '';
  //     }
  //     // For other URLs, continue using startsWith
  //     return url.startsWith(allowedUrl);
  //   });
  // }
  // let urlsToIncludeSwitcher = ['/guide'];
  // let include = $derived(isIncluded(currentUrl, urlsToIncludeSwitcher));

  const modules = import.meta.glob('./md/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
  });
  const tableItems = [
    { prop: 'children', type: 'Snippet', default: 'Required', description: 'The content to be animated' },
    {
      prop: 'animation',
      type: 'AnimationType',
      default: 'bounce',
      description: 'The animation effect to apply'
    },
    {
      prop: 'trigger',
      type: "'hover' | 'click' | 'both'",
      default: 'hover',
      description: 'What triggers the animation'
    },
    {
      prop: 'duration',
      type: 'string',
      default: '1s',
      description: 'Animation duration (CSS time value)'
    },
    {
      prop: 'hideAfter',
      type: 'boolean',
      default: 'false',
      description: 'Whether to hide the element after animation'
    }
  ];
</script>

<DocPage mainClass="mx-auto" div2Class="w-full">
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-8">
      <H1 class="text-4xl font-bold mb-4">Svelte-Animate</H1>
      <P class="text-lg text-gray-700">A lightweight, accessible Svelte component wrapper for Animate.css that makes adding animations to your Svelte applications simple and intuitive.</P>
    </header>

    <H2 class="text-2xl font-bold mb-4">Features</H2>
    <List class="list-none space-y-2">
      <li>🎯 Easy to use wrapper for Animate.css</li>
      <li>🎨 75+ animation effects out of the box</li>
      <li>🔄 Multiple trigger options (hover, click, or both)</li>
      <li>⚡ Zero dependencies (except Animate.css)</li>
      <li>
        ♿ Accessibility features including:
        <ul class="ml-6 mt-2 space-y-1">
          <li>- Keyboard support (Enter/Space for click triggers)</li>
          <li>- Screen reader announcements</li>
          <li>- Respects prefers-reduced-motion</li>
          <li>- ARIA attributes</li>
        </ul>
      </li>
      <li>⚙️ Customizable animation duration</li>
      <li>🎭 Optional hide-after-animation feature</li>
    </List>

    <H2 class="text-2xl font-bold mb-4">Installation</H2>
    <HighlightCompo codeLang="ts" code={modules['./md/installation.md'] as string} />

    <H2 class="text-2xl font-bold mb-4">Usage</H2>
    <H3>Basic usage</H3>
    <HighlightCompo codeLang="ts" code={modules['./md/usage.md'] as string} />
    <H3>Custom usage</H3>
    <HighlightCompo codeLang="ts" code={modules['./md/custom-usage.md'] as string} />

    <H2 class="text-2xl font-bold mb-4">Props</H2>
    <Table {tableItems} />

    <H2 class="text-2xl font-bold mb-4">Animation Types</H2>
    <HighlightCompo codeLang="ts" code={modules['./md/types.md'] as string} />

    <footer class="mt-12 pt-8 border-t border-gray-200">
      <p class="text-center text-gray-600">
        MIT License | Powered by <a href="https://animate.style/" class="text-blue-600 hover:underline">Animate.css</a>
      </p>
    </footer>
  </div>
</DocPage>
