<script lang="ts">
  import type { Snippet } from "svelte";
  import type { HTMLButtonAttributes } from "svelte/elements";
  interface Props extends HTMLButtonAttributes {
    children: Snippet;
    pauseDuration?: number;
    event?: 'onmouseenter' | 'onclick';
  }

  let {
    children,
    pauseDuration = 500,
    event = 'onmouseenter',
    ...restProps
  }: Props = $props();

  let visible = $state(true);
  let shouldAnimate = $state(true);

  const handleEvent = () => {
    shouldAnimate = false;  // Disable animation for hiding
    visible = false;
    
    setTimeout(() => {
      shouldAnimate = true;  // Re-enable animation for showing
      visible = true;
    }, pauseDuration); 
  }

  $effect(() => {
    visible = true;
    shouldAnimate = true;
  });
  
</script>

{#if event === 'onmouseenter'}
<button {...restProps} onmouseenter={handleEvent}>
  {#if visible}
    {@render children()}
  {/if}
</button>
{:else}
<button {...restProps} onclick={handleEvent}>
  {#if visible}
    {@render children()}
  {/if}
</button>
{/if}

<style>
  button {
    background: none;
    border: none;
    padding: 0;
    font: inherit;
    cursor: pointer;
    outline: inherit;
  }
</style>