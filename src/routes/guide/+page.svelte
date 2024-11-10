<script lang="ts">
	import { DocPage } from 'runes-webkit';
	import { HighlightCompo, CodeWrapper, Code, H1, H2, H3 } from 'runes-webkit';
	import { P, List, Li } from 'svelte-5-ui-lib';
</script>
<DocPage mainClass="mx-auto" div2Class="w-full">
<div class="max-w-4xl mx-auto px-4 py-8">
	<header class="mb-8">
		<H1 class="text-4xl font-bold mb-4">Svelte-Animate</H1>
		<P class="text-lg text-gray-700"
			>A lightweight, accessible Svelte component wrapper for Animate.css that makes adding
			animations to your Svelte applications simple and intuitive.</P
		>
	</header>

	<section class="mb-8">
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
	</section>

	<section class="mb-8">
		<H2 class="text-2xl font-bold mb-4">Installation</H2>
		<pre class="bg-gray-800 text-white rounded-lg p-4"><code>pnpm i -D svelte-animate</code></pre>
	</section>

	<section class="mb-8">
		<H2 class="text-2xl font-bold mb-4">Usage</H2>
		<ol class="list-decimal ml-6 space-y-4">
			<li>
				<p class="mb-2">Import the component:</p>
				<pre class="bg-gray-800 text-white rounded-lg p-4"><code
						>import Animate from 'svelte-animate';</code
					></pre>
			</li>
			<li>
				<p class="mb-2">Basic usage:</p>
				<pre class="bg-gray-800 text-white rounded-lg p-4"><code
						>&lt;Animate&gt;
&lt;div&gt;This will bounce on hover!&lt;/div&gt;
&lt;/Animate&gt;</code
					></pre>
			</li>
			<li>
				<p class="mb-2">Customized usage:</p>
				<pre class="bg-gray-800 text-white rounded-lg p-4"><code
						>&lt;Animate
animation="fadeIn"
trigger="click"
duration="2s"
hideAfter={true}
&gt;
&lt;div&gt;Click me to fade in, then I'll disappear!&lt;/div&gt;
&lt;/Animate&gt;</code
					></pre>
			</li>
		</ol>
	</section>

	<section class="mb-8">
		<H2 class="text-2xl font-bold mb-4">Props</H2>
		<div class="overflow-x-auto">
			<table class="min-w-full bg-white rounded-lg">
				<thead class="bg-gray-100">
					<tr>
						<th class="px-4 py-2 text-left">Prop</th>
						<th class="px-4 py-2 text-left">Type</th>
						<th class="px-4 py-2 text-left">Default</th>
						<th class="px-4 py-2 text-left">Description</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td class="border px-4 py-2"><code>children</code></td>
						<td class="border px-4 py-2"><code>Snippet</code></td>
						<td class="border px-4 py-2"><em>Required</em></td>
						<td class="border px-4 py-2">The content to be animated</td>
					</tr>
					<tr>
						<td class="border px-4 py-2"><code>animation</code></td>
						<td class="border px-4 py-2"><code>AnimationType</code></td>
						<td class="border px-4 py-2"><code>'bounce'</code></td>
						<td class="border px-4 py-2">The animation effect to apply</td>
					</tr>
					<tr>
						<td class="border px-4 py-2"><code>trigger</code></td>
						<td class="border px-4 py-2"><code>'hover' | 'click' | 'both'</code></td>
						<td class="border px-4 py-2"><code>'hover'</code></td>
						<td class="border px-4 py-2">What triggers the animation</td>
					</tr>
					<tr>
						<td class="border px-4 py-2"><code>duration</code></td>
						<td class="border px-4 py-2"><code>string</code></td>
						<td class="border px-4 py-2"><code>'1s'</code></td>
						<td class="border px-4 py-2">Animation duration (CSS time value)</td>
					</tr>
					<tr>
						<td class="border px-4 py-2"><code>hideAfter</code></td>
						<td class="border px-4 py-2"><code>boolean</code></td>
						<td class="border px-4 py-2"><code>false</code></td>
						<td class="border px-4 py-2">Whether to hide the element after animation</td>
					</tr>
				</tbody>
			</table>
		</div>
	</section>

	<section class="mb-8">
		<H2 class="text-2xl font-bold mb-4">Animation Types</H2>
		<div class="grid md:grid-cols-2 gap-8">
			<div>
				<H3 class="text-xl font-bold mb-2">Attention Seekers</H3>
				<ul class="list-disc ml-6">
					<li>bounce</li>
					<li>flash</li>
					<li>pulse</li>
					<li>rubberBand</li>
					<li>shakeX/Y</li>
					<li>swing</li>
					<li>tada</li>
					<li>wobble</li>
				</ul>
			</div>
			<div>
				<H3 class="text-xl font-bold mb-2">Entrances</H3>
				<ul class="list-disc ml-6">
					<li>bounceIn</li>
					<li>fadeIn</li>
					<li>flipInX/Y</li>
					<li>lightSpeedInRight/Left</li>
					<li>rotateIn</li>
					<li>zoomIn</li>
					<li>slideIn</li>
				</ul>
			</div>
		</div>
	</section>

	<section class="mb-8">
		<H2 class="text-2xl font-bold mb-4">Examples</H2>
		<div class="space-y-4">
			<div>
				<H3 class="text-xl font-bold mb-2">Basic Hover Animation</H3>
				<pre class="bg-gray-800 text-white rounded-lg p-4"><code
						>&lt;Animate&gt;
&lt;button&gt;Hover to bounce!&lt;/button&gt;
&lt;/Animate&gt;</code
					></pre>
			</div>
			<div>
				<H3 class="text-xl font-bold mb-2">Click-Triggered Animation</H3>
				<pre class="bg-gray-800 text-white rounded-lg p-4"><code
						>&lt;Animate animation="rubberBand" trigger="click"&gt;
&lt;div&gt;Click me!&lt;/div&gt;
&lt;/Animate&gt;</code
					></pre>
			</div>
		</div>
	</section>

	<footer class="mt-12 pt-8 border-t border-gray-200">
		<p class="text-center text-gray-600">
			MIT License | Powered by <a
				href="https://animate.style/"
				class="text-blue-600 hover:underline">Animate.css</a
			>
		</p>
	</footer>
</div>
</DocPage>