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
    ariaLabel =  "h3" ,
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
    
   <path d="M20.9055 14.6257C21.437 15.3646 21.75 16.2711 21.75 17.2508C21.75 17.5866 21.7132 17.9139 21.6435 18.2287C21.4894 18.9241 20.8486 19.3722 20.1393 19.4374C19.6818 19.4794 19.2184 19.5008 18.75 19.5008C17.9853 19.5008 17.2339 19.4436 16.5 19.3332M20.9055 14.6257C21.437 13.8869 21.75 12.9803 21.75 12.0007C21.75 11.6648 21.7132 11.3376 21.6435 11.0228C21.4894 10.3273 20.8486 9.87924 20.1393 9.8141C19.6818 9.77209 19.2184 9.75061 18.75 9.75061C17.9853 9.75061 17.2339 9.80784 16.5 9.91824M20.9055 14.6257H18M2.24268 4.49316V11.9939M2.24268 11.9939V19.4946M2.24268 11.9939L12.7429 11.9946M12.7429 4.49389V11.9946M12.7429 11.9946V19.4953" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


