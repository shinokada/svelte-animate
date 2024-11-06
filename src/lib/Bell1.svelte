<script lang="ts">
  import { getContext } from 'svelte';
  import type { BaseProps, Props } from './types.js';

  const ctx: BaseProps = getContext('iconCtx') ?? {};

  // export let swingCount = 1; // Prop to control the number of swings
  let {
    size = ctx.size || '24',
    role = ctx.role || 'img',
    color = ctx.color || 'currentColor',
    strokeWidth = ctx.strokeWidth || '2',
    title,
    desc,
    ariaLabel = 'bell',
    swingCount = 1,
    ...restProps
  }: Props = $props();

  let ariaDescribedby = `${title?.id || ''} ${desc?.id || ''}`;
  const hasDescription = $derived(!!(title?.id || desc?.id));

  let ringing = $state(false);

  const handleClick = () => {
    ringing = true;
    setTimeout(() => {
      ringing = false;
    }, 300 * swingCount); // Adjust total duration based on swing count
  }
</script>

<style>
  .ringing {
    animation: swing 0.3s ease-in-out;
    animation-iteration-count: var(--swing-count, 1); /* Use custom property for dynamic count */
  }

  @keyframes swing {
    0% { transform: rotate(0deg); }
    25% { transform: rotate(15deg); }
    50% { transform: rotate(-15deg); }
    75% { transform: rotate(10deg); }
    100% { transform: rotate(0deg); }
  }
</style>

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
  class:ringing={ringing}
  style="--swing-count: {swingCount};"
  onclick={handleClick}
>
  {#if title?.id && title.title}
    <title id={title.id}>{title.title}</title>
  {/if}
  {#if desc?.id && desc.desc}
    <desc id={desc.id}>{desc.desc}</desc>
  {/if}
  <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" /> 
  <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
</svg>
