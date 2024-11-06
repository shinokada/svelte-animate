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
    ariaLabel =  "fire" ,
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
    
   <path d="M15.3622 5.21361C18.2427 6.50069 20.25 9.39075 20.25 12.7497C20.25 17.306 16.5563 20.9997 12 20.9997C7.44365 20.9997 3.75 17.306 3.75 12.7497C3.75 10.5376 4.62058 8.52889 6.03781 7.04746C6.8043 8.11787 7.82048 8.99731 9.00121 9.60064C9.04632 6.82497 10.348 4.35478 12.3621 2.73413C13.1255 3.75788 14.1379 4.61821 15.3622 5.21361Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/> <path d="M12 18C14.0711 18 15.75 16.3211 15.75 14.25C15.75 12.3467 14.3321 10.7746 12.4949 10.5324C11.4866 11.437 10.7862 12.6779 10.5703 14.0787C9.78769 13.8874 9.06529 13.5425 8.43682 13.0779C8.31559 13.4467 8.25 13.8407 8.25 14.25C8.25 16.3211 9.92893 18 12 18Z" stroke={color} stroke-width={strokeWidth} 
     transition:draw={shouldAnimate ? params : undefined} stroke-linecap="round" stroke-linejoin="round"/>  
  
</svg>
{/if}


