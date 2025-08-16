<script lang="ts">
	import { HighlightCompo, H1, H2, H3 } from 'runes-webkit';
	import CodeWrapper from '../utils/CodeWrapper.svelte';
	import { P, List, Table, Li, A } from 'flowbite-svelte';
	import TypeList from '../../lib/types.ts?raw';

	import * as ExampleComponents from './examples';
	const exampleModules = import.meta.glob('./examples/*.*', {
		query: '?raw',
		import: 'default',
		eager: true
	}) as Record<string, string>;

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
			<H1>Svelte-Animate: Guide</H1>
			<P space="wider" class="text-lg text-gray-700">
				Svelte Animate is a lightweight Svelte component that brings <A
					href="https://animate.style/"
					target="_blank">Animate.css</A
				> into your app with extra power and accessibility. It goes beyond standard Svelte transitions
				with sequential effects, flexible triggers, motion preferences, and fine-grained timing control—all
				while staying simple to use.
			</P>
		</header>

		<H2>Feature Details</H2>
		<List class="list-none space-y-2" ctxClass="tracking-wider">
			<Li>🎯 Simple wrapper for Animate.css – 75+ animations ready to go</Li>
			<Li>🔗 Sequence support – chain multiple effects in order</Li>
			<Li>🎛 Flexible triggers – hover, click, auto, or combined</Li>
			<Li>⚡ Lightweight – no dependencies beyond Animate.css</Li>
			<Li>♿ Accessible by design:</Li>

			<Li>Keyboard support (Enter/Space)</Li>

			<Li>Screen reader announcements</Li>

			<Li>Honors prefers-reduced-motion</Li>

			<Li>Proper ARIA roles and live regions</Li>
			<List class="mt-2 ml-6 space-y-1" ctxClass="tracking-wider">
				<Li>⚙️ Customization options: duration, delay, per-animation settings, repeats</Li>
				<Li>🎭 Extra controls – hide before/after animations, optional replay button</Li>
				<Li>🐛 Debug mode for development</Li>
			</List>
		</List>

		<H2>Installation</H2>
		<HighlightCompo
			codeLang="ts"
			code={exampleModules['./examples/installation.md'] as string}
			clipboardClass="top-2"
		/>

		<H2>Usage</H2>
		<H3>Basic usage</H3>
		<CodeWrapper>
			<ExampleComponents.Usage />
			{#snippet codeblock()}
				<HighlightCompo
					codeLang="ts"
					code={exampleModules['./examples/Usage.svelte'] as string}
					clipboardClass="top-2"
				/>
			{/snippet}
		</CodeWrapper>

		<H3>Custom usage</H3>
		<CodeWrapper innerClass="flex flex-col max-w-96 mx-auto justify-center">
			<ExampleComponents.CustomUsage />
			{#snippet codeblock()}
				<HighlightCompo
					codeLang="ts"
					code={exampleModules['./examples/CustomUsage.svelte'] as string}
					clipboardClass="top-2"
				/>
			{/snippet}
		</CodeWrapper>

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
			clipboardClass="top-2"
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
			clipboardClass="top-2"
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
			clipboardClass="top-2"
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
			clipboardClass="top-2"
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
			clipboardClass="top-2"
		/>

		<H2>Animation Types</H2>
		<HighlightCompo codeLang="ts" code={TypeList as string} clipboardClass="top-2" />
	</div>
</div>
