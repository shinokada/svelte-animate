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
    ariaLabel =  "backspace" ,
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
    
   <path d="M12 9.75L14.25 12M14.25 12L16.5 14.25M14.25 12L16.5 9.75M14.25 12L12 14.25M9.42051 19.1705L3.04551 12.7955C2.60617 12.3562 2.60617 11.6438 3.04551 11.2045L9.42051 4.82951C9.63149 4.61853 9.91764 4.5 10.216 4.5L19.5 4.5C20.7427 4.5 21.75 5.50736 21.75 6.75V17.25C21.75 18.4926 20.7427 19.5 19.5 19.5H10.216C9.91764 19.5 9.63149 19.3815 9.42051 19.1705Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


