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
    ariaLabel =  "squares plus" ,
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
    
   <path d="M13.5 16.875H16.875M16.875 16.875H20.25M16.875 16.875V13.5M16.875 16.875V20.25M6 10.5H8.25C9.49264 10.5 10.5 9.49264 10.5 8.25V6C10.5 4.75736 9.49264 3.75 8.25 3.75H6C4.75736 3.75 3.75 4.75736 3.75 6V8.25C3.75 9.49264 4.75736 10.5 6 10.5ZM6 20.25H8.25C9.49264 20.25 10.5 19.2426 10.5 18V15.75C10.5 14.5074 9.49264 13.5 8.25 13.5H6C4.75736 13.5 3.75 14.5074 3.75 15.75V18C3.75 19.2426 4.75736 20.25 6 20.25ZM15.75 10.5H18C19.2426 10.5 20.25 9.49264 20.25 8.25V6C20.25 4.75736 19.2426 3.75 18 3.75H15.75C14.5074 3.75 13.5 4.75736 13.5 6V8.25C13.5 9.49264 14.5074 10.5 15.75 10.5Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


