<script lang="ts">
  // import { DocPage } from 'runes-webkit';
  // import { page } from '$app/stores';
  import { HighlightCompo, H1, H2, H3 } from 'runes-webkit';
  import { P, List, Table } from 'svelte-5-ui-lib';
  import TypeList from '../../lib/types.ts?raw';

  const modules = import.meta.glob('./md/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
  });
  const tableItems = [
    { prop: 'children', type: 'Snippet', default: 'Required', description: 'The content to be animated' },
    {
      prop: 'animations',
      type: 'AnimationType[] or AnimationType',
      default: 'bounce',
      description: 'The animation effect to apply'
    },
    {
      prop: 'trigger',
      type: "'hover' | 'click' | 'both' | undefined",
      default: 'hover',
      description: 'What triggers the animation'
    },
    {
      prop: 'duration',
      type: 'string',
      default: '1s',
      description: 'Animation duration'
    },
    {
      prop: 'hideBetween',
      type: 'boolean',
      default: 'false',
      description: 'Whether to hide the element after animation'
    },
    {
      prop: 'hideEnd',
      type: 'boolean',
      default: 'false',
      description: 'Whether to hide the element after animation'
    },
    {
      prop: 'delay',
      type: 'number',
      default: '0',
      description: 'Animation delay'
    },
    {
      prop: 'repeat',
      type: "'1' | '2' | '3' | 'infinite'",
      default: '1',
      description: 'Animation repeat'
    },
    {
      prop: 'pauseDuration',
      type: 'number',
      default: '0',
      description: 'Animation pause duration'
    },
    {
      prop: 'class',
      type: 'string',
      default: '',
      description: 'Additional CSS classes'
    }
  ];
</script>

<div class="max-w-6xl mx-auto">
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-8">
      <H1>Svelte-Animate: Guide</H1>
      <P class="text-lg text-gray-700"
        >A lightweight, accessible Svelte component wrapper for Animate.css that makes adding animations to your Svelte applications simple and intuitive. Built with accessibility in mind and designed to work seamlessly with Svelte's latest features, including the ability to animate multiple effects
        in a sequence.</P
      >
    </header>

    <H2>Features</H2>
    <List class="list-none space-y-2">
      <li>🎯 Easy to use wrapper for Animate.css</li>
      <li>🎨 75+ animation effects out of the box</li>
      <li>🎨 Ability to chain multiple animations in a sequence</li>
      <li>🔄 Multiple trigger options (hover, click, or both)</li>
      <li>
        ♿ Accessibility features including:
        <ul class="ml-6 mt-2 space-y-1">
          <li>- Keyboard support (Enter/Space for click triggers)</li>
          <li>- Screen reader announcements</li>
          <li>- Respects prefers-reduced-motion</li>
          <li>- ARIA attributes and live regions</li>
        </ul>
      </li>
      <li>
        ⚙️ Extensive animation customization:
        <ul class="ml-6 mt-2 space-y-1">
          <li>- Customizable duration</li>
          <li>- Animation delay</li>
          <li>- Animation speed control</li>
          <li>- Repeat functionality</li>
        </ul>
      </li>
      <li>🎭 Optional hide-after-animation and hide-between-animations features</li>
    </List>

    <H2>Installation</H2>
    <HighlightCompo codeLang="ts" code={modules['./md/installation.md'] as string} />

    <H2>Usage</H2>
    <H3>Basic usage</H3>
    <HighlightCompo codeLang="ts" code={modules['./md/usage.md'] as string} />
    <H3>Custom usage</H3>
    <HighlightCompo codeLang="ts" code={modules['./md/custom-usage.md'] as string} />

    <H2>Props</H2>
    <Table {tableItems} />

    <H2>Accessibility Features</H2>
    <List class="list-none space-y-2">
      <li>- Full keyboard navigation support</li>
      <li>- Enter and Space keys trigger animations for click/both triggers</li>
      <li>- Proper focus management</li>
      <li>- Event prevention to avoid unexpected behavior</li>
    </List>

    <H2>Screen Reader Support</H2>
    <List class="list-none space-y-2">
      <li>- Descriptive ARIA labels for animated elements</li>
      <li>- Animation completion announcements using aria-live regions</li>
      <li>- Clear state changes communication</li>
    </List>

    <H2>Motion Preferences</H2>
    <List class="list-none space-y-2">
      <li>- Automatically detects and respects prefers-reduced-motion settings</li>
      <li>- Gracefully degrades to no animation when reduced motion is preferred</li>
      <li>- Maintains content visibility and functionality</li>
    </List>

    <H2>Examples</H2>
    <HighlightCompo codeLang="ts" code={modules['./md/examples.md'] as string} />

    <H2>Animation Types</H2>
    <HighlightCompo codeLang="ts" code={TypeList as string} />

    <footer class="mt-12 pt-8 border-t border-gray-200">
      <p class="text-center text-gray-600">
        MIT License | Powered by <a href="https://animate.style/" class="text-blue-600 hover:underline">Animate.css</a>
      </p>
    </footer>
  </div>
</div>
