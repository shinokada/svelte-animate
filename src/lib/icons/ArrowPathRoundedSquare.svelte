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
    ariaLabel =  "arrow path rounded square" ,
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
    
   <path d="M19.5 12C19.5 10.7681 19.4536 9.54699 19.3624 8.3384C19.2128 6.35425 17.6458 4.78724 15.6616 4.63757C14.453 4.54641 13.2319 4.5 12 4.5C10.7681 4.5 9.54699 4.54641 8.3384 4.63757C6.35425 4.78724 4.78724 6.35425 4.63757 8.3384C4.62097 8.55852 4.60585 8.77906 4.59222 9M19.5 12L22.5 9M19.5 12L16.5 9M4.5 12C4.5 13.2319 4.54641 14.453 4.63757 15.6616C4.78724 17.6458 6.35425 19.2128 8.3384 19.3624C9.54699 19.4536 10.7681 19.5 12 19.5C13.2319 19.5 14.453 19.4536 15.6616 19.3624C17.6458 19.2128 19.2128 17.6458 19.3624 15.6616C19.379 15.4415 19.3941 15.2209 19.4078 15M4.5 12L7.5 15M4.5 12L1.5 15" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


