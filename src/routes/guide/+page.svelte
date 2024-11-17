<script lang="ts">
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
      type: 'AnimationConfig[] | AnimationType[] | AnimationType',
      default: 'bounce',
      description: 'The animation effects to apply'
    },
    {
      prop: 'trigger',
      type: "'hover' | 'click' | 'both' | 'auto'",
      default: 'hover',
      description: 'What triggers the animation'
    },
    {
      prop: 'duration',
      type: 'number',
      default: '1000',
      description: 'Default animation duration (ms)'
    },
    {
      prop: 'hideBetween',
      type: 'boolean',
      default: 'false',
      description: 'Whether to hide element between animations'
    },
    {
      prop: 'hideEnd',
      type: 'boolean',
      default: 'false',
      description: 'Whether to hide element after animation sequence'
    },
    {
      prop: 'delay',
      type: 'number',
      default: '0',
      description: 'Default delay before animations start (ms)'
    },
    {
      prop: 'repeat',
      type: "'1' | '2' | '3' | 'infinite'",
      default: '1',
      description: 'Number of times to repeat the animation'
    },
    {
      prop: 'pauseDuration',
      type: 'number',
      default: '0',
      description: 'Default pause between animations (ms)'
    },
    {
      prop: 'class',
      type: 'string',
      default: "''",
      description: 'Additional CSS classes for the container'
    },
    {
      prop: 'debug',
      type: 'boolean',
      default: 'false',
      description: 'Enable debug mode with visible status updates'
    },
    {
      prop: 'showReplayButton',
      type: 'boolean',
      default: 'false',
      description: 'Show replay button after animation ends'
    }
  ];
</script>

<div class="max-w-6xl mx-auto">
  <div class="max-w-4xl mx-auto px-4 py-8">
    <header class="mb-8">
      <H1>Svelte-Animate: Guide</H1>
      <P class="text-lg text-gray-700">
        A lightweight, accessible Svelte component wrapper for Animate.css that makes adding animations to your Svelte applications simple and intuitive. Built with accessibility in mind and designed
        to work seamlessly with Svelte's latest features, including the ability to animate multiple effects in a sequence.
      </P>
    </header>

    <H2>Features</H2>
    <List class="list-none space-y-2">
      <li>🎯 Easy to use wrapper for Animate.css</li>
      <li>🎨 75+ animation effects out of the box</li>
      <li>🔄 Ability to chain multiple animations in a sequence</li>
      <li>🔄 Multiple trigger options (hover, click, auto, or both)</li>
      <li>⚡ Zero dependencies (except Animate.css)</li>
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
          <li>- Animation delays</li>
          <li>- Per-animation configuration</li>
          <li>- Repeat functionality</li>
        </ul>
      </li>
      <li>🎭 Optional hide-after-animation and hide-between-animations features</li>
      <li>🔄 Optional replay button for ended animations</li>
      <li>🐛 Debug mode for development</li>
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

    <H2>Animation Configuration</H2>
    <P>When using the animations prop with detailed configuration:</P>
    <HighlightCompo
      codeLang="ts"
      code={`interface AnimationConfig {
  action: AnimationType;    // The animation effect to apply
  duration?: number;        // Duration for this specific animation
  delay?: number;          // Delay before this animation starts
  pause?: number;          // Pause after this animation
}`}
    />

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
    <H3>Basic Example</H3>
    <HighlightCompo
      codeLang="svelte"
      code={`<Animate>
  <button>Hover to bounce!</button>
</Animate>`}
    />

    <H3>Click Animation with Delay</H3>
    <HighlightCompo
      codeLang="svelte"
      code={`<Animate 
  animations="rubberBand" 
  trigger="click" 
  delay={2000} 
  duration={1000}
>
  <div>Click for a delayed effect!</div>
</Animate>`}
    />

    <H3>Complex Animation Sequence</H3>
    <HighlightCompo
      codeLang="svelte"
      code={`<Animate 
  animations={[
    { action: 'fadeIn', duration: 1000 },
    { action: 'pulse', duration: 500, pause: 1000 },
    { action: 'fadeOut', duration: 1000 }
  ]} 
  trigger="both"
  repeat="3"
  showReplayButton={true}
>
  <span>Complex animation sequence!</span>
</Animate>`}
    />

    <H3>Debug Mode Example</H3>
    <HighlightCompo
      codeLang="svelte"
      code={`<Animate 
  animations="bounce" 
  trigger="click" 
  debug={true}
>
  <div>Watch the debug info in the corner!</div>
</Animate>`}
    />

    <H2>Animation Types</H2>
    <HighlightCompo codeLang="ts" code={TypeList as string} />

    <footer class="mt-12 pt-8 border-t border-gray-200">
      <p class="text-center text-gray-600">
        MIT License | Powered by <a href="https://animate.style/" class="text-blue-600 hover:underline">Animate.css</a>
      </p>
    </footer>
  </div>
</div>
