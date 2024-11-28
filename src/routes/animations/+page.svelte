<script lang="ts">
  import { Animate, predefined, type AnimationConfig } from '$lib';
  import CodeWrapper from '../utils/CodeWrapper.svelte';
  import HighlightCompo from '../utils/HighlightCompo.svelte';
  import { A, P } from 'svelte-5-ui-lib';

  let selectedCategory: keyof typeof predefined = $state('hesitantConfidence');
  let selectedAnimations: AnimationConfig[] = $derived(predefined[selectedCategory]);

  function handleCategoryChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    selectedCategory = target.value as keyof typeof predefined;
  }

  let generatedCode = $derived(
    (() => {
      const animationsProp = `animations={predefined['${selectedCategory}']}`;
      const props = [animationsProp, `trigger="hover"`];

      const propsString = props.map((prop) => `  ${prop}`).join('\n');

      return `<Animate\n${propsString}\n>\n Hover to animate\n </Animate>`;
    })()
  );
</script>

<div class="container mx-auto p-6 max-w-2xl">
  <h1 class="text-3xl font-bold mb-6 text-center">Animation Combinations</h1>
  <P space="wide">If you want to add your animation, please add it to <A href="https://github.com/shinokada/svelte-animate/blob/main/src/lib/predefined.ts">predefined.ts</A> and create a PR.</P>
  <div class="mb-6">
    <label for="animation-category" class="block mb-2 font-semibold"> Select Animation Category </label>
    <select id="animation-category" class="w-full p-2 border rounded" onchange={handleCategoryChange} value={selectedCategory}>
      {#each Object.keys(predefined) as category}
        <option value={category}>
          {category.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
        </option>
      {/each}
    </select>
  </div>

  <div class="flex items-center justify-center text-center mb-6 h-64">
    <Animate animations={selectedAnimations} trigger="hover">
      <div class="bg-blue-500 text-white p-6 rounded-lg shadow-lg">Hover to animate</div>
    </Animate>
  </div>

  <div class="bg-gray-100 dark:bg-gray-800 p-4 rounded">
    <h2 class="text-2xl font-semibold m-2 dark:text-white">Current Sequence:</h2>
    <P space="wider" class="italic m-2">
      {selectedAnimations.map((anim) => anim.action).join(' → ')}
    </P>
  </div>

  <CodeWrapper class="mt-4">
    {#snippet codeblock()}
      <HighlightCompo code={generatedCode} class="mt-0" />
    {/snippet}
  </CodeWrapper>
</div>
