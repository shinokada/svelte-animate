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
    ariaLabel =  "qr code" ,
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
    
   <path d="M3.75 4.875C3.75 4.25368 4.25368 3.75 4.875 3.75H9.375C9.99632 3.75 10.5 4.25368 10.5 4.875V9.375C10.5 9.99632 9.99632 10.5 9.375 10.5H4.875C4.25368 10.5 3.75 9.99632 3.75 9.375V4.875Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/> <path d="M3.75 14.625C3.75 14.0037 4.25368 13.5 4.875 13.5H9.375C9.99632 13.5 10.5 14.0037 10.5 14.625V19.125C10.5 19.7463 9.99632 20.25 9.375 20.25H4.875C4.25368 20.25 3.75 19.7463 3.75 19.125V14.625Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/> <path d="M13.5 4.875C13.5 4.25368 14.0037 3.75 14.625 3.75H19.125C19.7463 3.75 20.25 4.25368 20.25 4.875V9.375C20.25 9.99632 19.7463 10.5 19.125 10.5H14.625C14.0037 10.5 13.5 9.99632 13.5 9.375V4.875Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/> <path d="M6.75 6.75H7.5V7.5H6.75V6.75Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/> <path d="M6.75 16.5H7.5V17.25H6.75V16.5Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/> <path d="M16.5 6.75H17.25V7.5H16.5V6.75Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/> <path d="M13.5 13.5H14.25V14.25H13.5V13.5Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/> <path d="M13.5 19.5H14.25V20.25H13.5V19.5Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/> <path d="M19.5 13.5H20.25V14.25H19.5V13.5Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/> <path d="M19.5 19.5H20.25V20.25H19.5V19.5Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/> <path d="M16.5 16.5H17.25V17.25H16.5V16.5Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


