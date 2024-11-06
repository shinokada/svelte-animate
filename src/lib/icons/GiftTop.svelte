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
    ariaLabel =  "gift top" ,
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
    
   <path d="M12 3.75V20.25M2.25 12H21.75M6.375 17.25C9.06739 17.25 11.25 15.0674 11.25 12.375V12M17.625 17.25C14.9326 17.25 12.75 15.0674 12.75 12.375V12M3.75 20.25H20.25C21.0784 20.25 21.75 19.5784 21.75 18.75V5.25C21.75 4.42157 21.0784 3.75 20.25 3.75H3.75C2.92157 3.75 2.25 4.42157 2.25 5.25V18.75C2.25 19.5784 2.92157 20.25 3.75 20.25ZM16.3713 10.8107C14.9623 12.2197 12.1286 11.8714 12.1286 11.8714C12.1286 11.8714 11.7803 9.03772 13.1893 7.62871C14.068 6.75003 15.4926 6.75003 16.3713 7.62871C17.2499 8.50739 17.2499 9.93201 16.3713 10.8107ZM10.773 7.62874C12.182 9.03775 11.8336 11.8714 11.8336 11.8714C11.8336 11.8714 9 12.2197 7.59099 10.8107C6.71231 9.93204 6.71231 8.50742 7.59099 7.62874C8.46967 6.75006 9.89429 6.75006 10.773 7.62874Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


