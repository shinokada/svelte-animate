<script lang="ts">
  import type { Component } from 'svelte';
  import { type AnimationType, Animator } from '$lib';
  import { Input, Select, Label, Checkbox, Radio, uiHelpers } from 'svelte-5-ui-lib';
  import DynamicCodeBlockHighlight from '../utils/DynamicCodeBlockHighlight.svelte';
  import { isGeneratedCodeOverflow } from '../utils/helper.ts';
  import CodeWrapper from '../utils/CodeWrapper.svelte';
  import HighlightCompo from '../utils/HighlightCompo.svelte';
  import { isSvelteOverflow, getExampleFileName } from "../utils/helper";

  import * as ExampleComponents from "./examples";
  const exampleModules = import.meta.glob("./examples/*.svelte", {
    query: "?raw",
    import: "default",
    eager: true
  }) as Record<string, string>;

  const exampleArr = [
    { name: "North", component: ExampleComponents.North },
    { name: "Example1", component: ExampleComponents.Example1 },
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
  let expand = $state(false);
  let showExpandButton = $derived(isSvelteOverflow(svelteCode, exampleModules));
  const handleExpandClick = () => {
    expand = !expand;
  };
  $effect(() => {
    expand = codeBlock.isOpen;
  });

</script>

<div class="max-w-4xl mx-auto p-4">
  <h1>Animator</h1>

  <h2>Examples</h2>

<CodeWrapper>
  <div class="mb-12 flex flex-wrap">
    <Label class="mb-4 w-full font-bold">Example</Label>
    {#each exampleArr as style}
      <Radio labelClass="w-24 my-1" onclick={() => (expand = false)} name="block_style" bind:group={selectedExample} value={style.name}>{style.name}</Radio>
    {/each}
  </div>
  <SelectedComponent />
  {#snippet codeblock()}
    <DynamicCodeBlockHighlight replaceLib {handleExpandClick} {expand} {showExpandButton} code={exampleModules[`./examples/${svelteCode}`] as string} />
  {/snippet}
</CodeWrapper>
  
</div>