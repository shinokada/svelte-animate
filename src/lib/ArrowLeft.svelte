<script lang="ts">
  import { getContext } from 'svelte';
  import { tweened } from 'svelte/motion';
  import { cubicOut } from 'svelte/easing';
  import type { BaseProps, Props } from './types.ts';

  const ctx: BaseProps = getContext('iconCtx') ?? {};
  let {
    size = ctx.size || '24',
    role = ctx.role || 'img',
    color = ctx.color || 'currentColor',
    strokeWidth = ctx.strokeWidth || '2',
    title,
    desc,
    ariaLabel = 'arrow left',
    ...restProps
  }: Props = $props();

  let ariaDescribedby = `${title?.id || ''} ${desc?.id || ''}`;
  const hasDescription = $derived(!!(title?.id || desc?.id));

  // Initialize tweened stores with default values
  const pathD1 = tweened('M12 19L5 12L12 5', {
    duration: 2000,
    easing: cubicOut
  });
  
  const pathD2 = tweened('M19 12H5', {
    duration: 2000,
    easing: cubicOut
  });

  function handleMouseEnter() {
    pathD1.set('M14 19L7 12L14 5');
    pathD2.set('M19 12H10');
  }

  function handleMouseLeave() {
    pathD1.set('M12 19L5 12L12 5');
    pathD2.set('M19 12H5');
  }
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  {...restProps}
  {role}
  width={size}
  height={size}
  fill="none"
  stroke={color}
  stroke-width={strokeWidth}
  stroke-linecap="round"
  stroke-linejoin="round"
  aria-label={ariaLabel}
  aria-describedby={hasDescription ? ariaDescribedby : undefined}
  viewBox="0 0 24 24"
  onmouseenter={handleMouseEnter}
  onmouseleave={handleMouseLeave}
>
  {#if title?.id && title.title}
    <title id={title.id}>{title.title}</title>
  {/if}
  {#if desc?.id && desc.desc}
    <desc id={desc.id}>{desc.desc}</desc>
  {/if}

  <path d={$pathD1} />
  <path d={$pathD2} />
</svg>