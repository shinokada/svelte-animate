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
    ariaLabel =  "envelope open" ,
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
    
   <path d="M21.75 8.99997V9.90606C21.75 10.7338 21.2955 11.4947 20.5667 11.8871L14.0893 15.375M2.25 8.99997V9.90606C2.25 10.7338 2.70448 11.4947 3.43328 11.8871L9.91074 15.375M18.75 17.8846L14.0893 15.375M14.0893 15.375L13.0667 14.8244C12.4008 14.4658 11.5992 14.4658 10.9333 14.8244L9.91074 15.375M9.91074 15.375L5.25 17.8846M21.75 19.5C21.75 20.7426 20.7426 21.75 19.5 21.75H4.5C3.25736 21.75 2.25 20.7426 2.25 19.5L2.25 8.84388C2.25 8.01614 2.70448 7.25525 3.43328 6.86282L10.9333 2.82436C11.5992 2.46577 12.4008 2.46577 13.0667 2.82436L20.5667 6.86282C21.2955 7.25525 21.75 8.01615 21.75 8.84388V19.5Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


