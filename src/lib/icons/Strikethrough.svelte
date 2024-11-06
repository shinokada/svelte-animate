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
    ariaLabel =  "strikethrough" ,
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
    
   <path d="M11.9997 12.0002C11.894 11.976 11.7882 11.9497 11.6822 11.9213C10.097 11.4966 8.77773 10.6741 7.92138 9.68475C7.04857 8.67637 6.65666 7.49462 6.95428 6.38385C7.54391 4.18325 10.6167 3.09459 13.8174 3.95226C14.8398 4.22622 15.7516 4.66562 16.4999 5.20855M6.42133 17.8115C7.27768 18.8009 8.59697 19.6233 10.1821 20.0481C13.3829 20.9058 16.4557 19.8171 17.0453 17.6165C17.2777 16.7489 17.0895 15.838 16.5801 15.0003M3.75 12.0003H20.2499" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


