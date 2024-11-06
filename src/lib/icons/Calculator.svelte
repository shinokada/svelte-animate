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
    ariaLabel =  "calculator" ,
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
    
   <path d="M15.75 15.75V18M8.25 11.25H8.2575V11.2575H8.25V11.25ZM8.25 13.5H8.2575V13.5075H8.25V13.5ZM8.25 15.75H8.2575V15.7575H8.25V15.75ZM8.25 18H8.2575V18.0075H8.25V18ZM10.7476 11.25H10.7551V11.2575H10.7476V11.25ZM10.7476 13.5H10.7551V13.5075H10.7476V13.5ZM10.7476 15.75H10.7551V15.7575H10.7476V15.75ZM10.7476 18H10.7551V18.0075H10.7476V18ZM13.2524 11.25H13.2599V11.2575H13.2524V11.25ZM13.2524 13.5H13.2599V13.5075H13.2524V13.5ZM13.2524 15.75H13.2599V15.7575H13.2524V15.75ZM13.2524 18H13.2599V18.0075H13.2524V18ZM15.75 11.25H15.7575V11.2575H15.75V11.25ZM15.75 13.5H15.7575V13.5075H15.75V13.5ZM8.25 6H15.75V8.25H8.25V6ZM12 2.25C10.108 2.25 8.24156 2.35947 6.40668 2.57241C5.30608 2.70014 4.5 3.649 4.5 4.75699V19.5C4.5 20.7426 5.50736 21.75 6.75 21.75H17.25C18.4926 21.75 19.5 20.7426 19.5 19.5V4.75699C19.5 3.649 18.6939 2.70014 17.5933 2.57241C15.7584 2.35947 13.892 2.25 12 2.25Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


