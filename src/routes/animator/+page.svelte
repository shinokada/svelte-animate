<script lang="ts">
  import type { Component } from 'svelte';
  import { Label, Radio, uiHelpers, P, A } from 'flowbite-svelte';
  import DynamicCodeBlockHighlight from '../utils/DynamicCodeBlockHighlight.svelte';
  import CodeWrapper from '../utils/CodeWrapper.svelte';
  import { isSvelteOverflow, getExampleFileName } from '../utils/helper';

  import * as ExampleComponents from './examples';
  const exampleModules = import.meta.glob('./examples/*.svelte', {
    query: '?raw',
    import: 'default',
    eager: true
  }) as Record<string, string>;

  const exampleArr = [
    { name: 'North star', component: ExampleComponents.NorthStar },
    { name: 'Svelte animate', component: ExampleComponents.SvelteAnimate },
    { name: 'Impressed', component: ExampleComponents.Impressed }
  ];
  let selectedExample: string | number = $state(exampleArr[0].name);
  let svelteCode = $derived(getExampleFileName(selectedExample, exampleArr));

  function findObject(arr: { name: string; component: Component }[], name: string) {
    const matchingObject = arr.find((obj) => obj.name === name);
    return matchingObject ? matchingObject.component : null;
  }
  const SelectedComponent = $derived(findObject(exampleArr, selectedExample));
  // end of dynamic svelte component
  let codeBlock = uiHelpers();
  let expand = $derived(codeBlock.isOpen);
  let showExpandButton = $derived(isSvelteOverflow(svelteCode, exampleModules));
  const handleExpandClick = () => {
    expand = !expand;
  };
</script>

<div class="mx-auto max-w-4xl p-4">
  <h1>Animator</h1>
  <P
    >If you want to add your animation, please add it to <A
      href="https://github.com/shinokada/svelte-animate/tree/main/src/routes/animator/examples"
      >animator.ts</A
    > and create a PR.</P
  >
  <CodeWrapper>
    <div class="mb-12 flex flex-wrap">
      <Label class="mb-4 w-full font-bold">Examples</Label>
      {#each exampleArr as style, i (i)}
        <Radio
          classes={{ label: 'w-40 my-1' }}
          onclick={() => (expand = false)}
          name="block_style"
          bind:group={selectedExample}
          value={style.name}>{style.name}</Radio
        >
      {/each}
    </div>
    <SelectedComponent />
    {#snippet codeblock()}
      <DynamicCodeBlockHighlight
        replaceLib
        {handleExpandClick}
        {expand}
        {showExpandButton}
        code={exampleModules[`./examples/${svelteCode}`] as string}
      />
    {/snippet}
  </CodeWrapper>
</div>
