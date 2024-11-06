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
    ariaLabel =  "map" ,
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
    
   <path d="M9 6.75002V15M15 9.00002V17.25M15.5031 20.7485L20.3781 18.311C20.7592 18.1204 21 17.7309 21 17.3047V4.82031C21 3.98401 20.1199 3.44007 19.3719 3.81408L15.5031 5.74847C15.1864 5.90683 14.8136 5.90683 14.4969 5.74847L9.50312 3.25158C9.1864 3.09322 8.8136 3.09322 8.49688 3.25158L3.62188 5.68908C3.24075 5.87965 3 6.26919 3 6.69531V19.1797C3 20.016 3.8801 20.56 4.62811 20.186L8.49688 18.2516C8.8136 18.0932 9.1864 18.0932 9.50312 18.2516L14.4969 20.7485C14.8136 20.9068 15.1864 20.9068 15.5031 20.7485Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


