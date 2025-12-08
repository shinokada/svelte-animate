<script lang="ts">
  import { HighlightCompo, H1, H2, H3 } from 'runes-webkit';
  import { P, List, Table, Li } from 'flowbite-svelte';
  import TypeList from '../../../lib/types.ts?raw';

  const modules = import.meta.glob('./md/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
  });

  const tableItems = [
    {
      prop: 'children',
      type: 'Snippet',
      default: 'Required',
      description: 'The content to be animated'
    },
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

<div class="mx-auto max-w-6xl">
  <div class="mx-auto max-w-4xl px-4 py-8">
    <header class="mb-8">
      <H1>Animate Component</H1>
      <P space="wider" class="text-lg text-gray-700">
        Svelte Animate is a lightweight, accessible Svelte component that wraps Animate.css,
        simplifying animation integration in Svelte applications. It offers advanced features like:
        Sequential animation effects, Configurable trigger modes (hover, click, auto),
        Accessibility-first design, Reduced motion support, Flexible repeat and timing controls.
        Designed for Svelte's latest features, it provides more sophisticated animation capabilities
        than standard Svelte transitions.
      </P>
    </header>

    <H2>Feature Details</H2>
    <List class="list-none space-y-2" ctxClass="tracking-wider">
      <Li>🎯 Easy to use wrapper for Animate.css</Li>
      <Li>🎨 75+ animation effects out of the box</Li>
      <Li>🔄 Ability to chain multiple animations in a sequence</Li>
      <Li>🔄 Multiple trigger options (hover, click, auto, or both)</Li>
      <Li>⚡ Zero dependencies (except Animate.css)</Li>
      <Li>
        ♿ Accessibility features including:
        <List class="mt-2 ml-6 space-y-1" ctxClass="tracking-wider">
          <Li>- Keyboard support (Enter/Space for click triggers)</Li>
          <Li>- Screen reader announcements</Li>
          <Li>- Respects prefers-reduced-motion</Li>
          <Li>- ARIA attributes and live regions</Li>
        </List>
      </Li>
      <Li>
        ⚙️ Extensive animation customization:
        <List class="mt-2 ml-6 space-y-1" ctxClass="tracking-wider">
          <Li>- Customizable duration</Li>
          <Li>- Animation delays</Li>
          <Li>- Per-animation configuration</Li>
          <Li>- Repeat functionality</Li>
        </List>
      </Li>
      <Li>🎭 Optional hide-after-animation and hide-between-animations features</Li>
      <Li>🔄 Optional replay button for ended animations</Li>
      <Li>🐛 Debug mode for development</Li>
    </List>

    <H2>Installation</H2>
    <HighlightCompo codeLang="ts" code={modules['./md/installation.md'] as string} />

    <H2>Usage</H2>
    <H3>Basic usage</H3>
    <HighlightCompo codeLang="ts" code={modules['./md/usage.md'] as string} />
    <H3>Custom usage</H3>
    <HighlightCompo codeLang="ts" code={modules['./md/custom-usage.md'] as string} />

    <H2>Props</H2>
    <Table items={tableItems} hoverable />

    <H2>Animation Configuration</H2>
    <P space="wider">When using the animations prop with detailed configuration:</P>
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
    <List class="list-none space-y-2" ctxClass="tracking-wider">
      <Li>- Full keyboard navigation support</Li>
      <Li>- Enter and Space keys trigger animations for click/both triggers</Li>
      <Li>- Proper focus management</Li>
      <Li>- Event prevention to avoid unexpected behavior</Li>
    </List>

    <H2>Screen Reader Support</H2>
    <List class="list-none space-y-2" ctxClass="tracking-wider">
      <Li>- Descriptive ARIA labels for animated elements</Li>
      <Li>- Animation completion announcements using aria-live regions</Li>
      <Li>- Clear state changes communication</Li>
    </List>

    <H2>Motion Preferences</H2>
    <List class="list-none space-y-2" ctxClass="tracking-wider">
      <Li>- Automatically detects and respects prefers-reduced-motion settings</Li>
      <Li>- Gracefully degrades to no animation when reduced motion is preferred</Li>
      <Li>- Maintains content visibility and functionality</Li>
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

    <footer class="mt-12 border-t border-gray-200 pt-8">
      <p class="text-center text-gray-600">
        MIT License | Powered by <a
          href="https://animate.style/"
          class="text-blue-600 hover:underline">Animate.css</a
        >
      </p>
    </footer>
  </div>
</div>
