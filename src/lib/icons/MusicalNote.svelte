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
    ariaLabel =  "musical note" ,
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
    
   <path d="M9 9L19.5 6M19.5 12.5528V16.3028C19.5 17.3074 18.834 18.1903 17.8681 18.4663L16.5481 18.8434C15.3964 19.1724 14.25 18.3077 14.25 17.1099C14.25 16.305 14.7836 15.5975 15.5576 15.3764L17.8681 14.7163C18.834 14.4403 19.5 13.5574 19.5 12.5528ZM19.5 12.5528V2.25L9 5.25V15.5528M9 15.5528V19.3028C9 20.3074 8.33405 21.1903 7.36812 21.4663L6.04814 21.8434C4.89645 22.1724 3.75 21.3077 3.75 20.1099C3.75 19.305 4.2836 18.5975 5.05757 18.3764L7.36812 17.7163C8.33405 17.4403 9 16.5574 9 15.5528Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


