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
    ariaLabel =  "newspaper" ,
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
    
   <path d="M12 7.5H13.5M12 10.5H13.5M6 13.5H13.5M6 16.5H13.5M16.5 7.5H19.875C20.4963 7.5 21 8.00368 21 8.625V18C21 19.2426 19.9926 20.25 18.75 20.25M16.5 7.5V18C16.5 19.2426 17.5074 20.25 18.75 20.25M16.5 7.5V4.875C16.5 4.25368 15.9963 3.75 15.375 3.75H4.125C3.50368 3.75 3 4.25368 3 4.875V18C3 19.2426 4.00736 20.25 5.25 20.25H18.75M6 7.5H9V10.5H6V7.5Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


