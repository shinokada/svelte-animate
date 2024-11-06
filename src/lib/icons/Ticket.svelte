<script lang="ts">
  import { draw } from 'svelte/transition';
   import { getContext } from 'svelte';
  import type { Props } from './types.ts'
  
  let {
    size = 24,
    role = 'img',
    color = 'currentColor',
    strokeWidth = 1.5,
    title,
    desc,
    ariaLabel =  "ticket" ,
    ...restProps 
  }: Props = $props();

  const getTransitionParams = getContext<() => { 
    params: any; 
    shouldAnimate: boolean;
    visible: boolean;
  }>('transition-params');

  const { params, shouldAnimate, visible } = $derived(getTransitionParams());
  
  let ariaDescribedby = `${title?.id || ''} ${desc?.id || ''}`;
  const hasDescription = $derived(!!(title?.id || desc?.id));

  // Set CSS variable for the placeholder size
  $effect(() => {
    document.documentElement.style.setProperty('--size', `${size}px`);
  });
</script>

{#if visible}
<svg
  xmlns="http://www.w3.org/2000/svg"
  {...restProps}
  {role}
  width={size}
  height={size}
  fill="none"
  aria-label={ariaLabel}
  aria-describedby={hasDescription ? ariaDescribedby : undefined}
  viewBox="0 0 24 24"
  stroke-width={strokeWidth}
>
  {#if title?.id && title.title}
    <title id="{title.id}">{title.title}</title>
  {/if}
  {#if desc?.id && desc.desc}
    <desc id="{desc.id}">{desc.desc}</desc>
  {/if}
    
   <path d="M16.5 6V6.75M16.5 9.75V10.5M16.5 13.5V14.25M16.5 17.25V18M7.5 12.75H12.75M7.5 15H10.5M3.375 5.25C2.75368 5.25 2.25 5.75368 2.25 6.375V9.40135C3.1467 9.92006 3.75 10.8896 3.75 12C3.75 13.1104 3.1467 14.0799 2.25 14.5987V17.625C2.25 18.2463 2.75368 18.75 3.375 18.75H20.625C21.2463 18.75 21.75 18.2463 21.75 17.625V14.5987C20.8533 14.0799 20.25 13.1104 20.25 12C20.25 10.8896 20.8533 9.92006 21.75 9.40135V6.375C21.75 5.75368 21.2463 5.25 20.625 5.25H3.375Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


