<script lang="ts">
  import { Animate, predefined, type AnimationConfig } from '$lib';
  import CodeWrapper from '../utils/CodeWrapper.svelte';
  // import HighlightCompo from '../utils/HighlightCompo.svelte';
  import { A, P } from 'flowbite-svelte';
  import { HighlightCompo } from 'svelte-rune-highlight';

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

<div class="container mx-auto max-w-2xl p-6">
  <h1 class="mb-6 text-center text-3xl font-bold">Predefined Animation</h1>
  <P space="wide"
    >If you want to add your animation, please add it to <A
      href="https://github.com/shinokada/svelte-animate/blob/main/src/lib/predefined.ts"
      >predefined.ts</A
    > and create a PR.</P
  >
  <div class="mb-6">
    <label for="animation-category" class="mb-2 block font-semibold dark:text-white">
      Select Animation Category
    </label>
    <select
      id="animation-category"
      class="w-full rounded border p-2 dark:bg-white"
      onchange={handleCategoryChange}
      value={selectedCategory}
    >
      {#each Object.keys(predefined) as category, i (i)}
        <option value={category}>
          {category.replace(/([A-Z])/g, ' $1').replace(/^./, (str) => str.toUpperCase())}
        </option>
      {/each}
    </select>
  </div>

  <div class="mb-6 flex h-64 items-center justify-center text-center">
    <Animate animations={selectedAnimations} trigger="hover">
      <div class="rounded-lg bg-blue-500 p-6 text-white shadow-lg">Hover to animate</div>
    </Animate>
  </div>

  <div class="rounded bg-gray-100 p-4 dark:bg-gray-800">
    <h2 class="m-2 text-2xl font-semibold dark:text-white">Current Sequence:</h2>
    <P space="wider" class="m-2 italic">
      {selectedAnimations.map((anim) => anim.action).join(' → ')}
    </P>
  </div>

  <CodeWrapper class="mt-4">
    {#snippet codeblock()}
      <HighlightCompo code={generatedCode} class="mt-0" />
    {/snippet}
  </CodeWrapper>
</div>
