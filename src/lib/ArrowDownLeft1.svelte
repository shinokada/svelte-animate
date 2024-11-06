<script lang="ts">
  import type { Props } from './types.js';
  import { draw } from 'svelte/transition';

  let {
    size = '24',
    role = 'img',
    color = 'currentColor',
    strokeWidth = '1.5',
    title,
    desc,
    ariaLabel = 'arrow down left',
    params,
    ...restProps
  }: Props = $props();

  let ariaDescribedby = `${title?.id || ''} ${desc?.id || ''}`;
  const hasDescription = $derived(!!(title?.id || desc?.id));

</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  {...restProps}
  {role}
  width={size }
  height={size}
  fill="none"
  aria-label={ariaLabel}
  aria-describedby={hasDescription ? ariaDescribedby : undefined}
  viewBox="0 0 24 24"
  stroke-width={strokeWidth}
>
  {#if title?.id && title.title}
    <title id={title.id}>{title.title}</title>
  {/if}
  {#if desc?.id && desc.desc}
    <desc id={desc.id}>{desc.desc}</desc>
  {/if}
  
  <path
    d="M19.5 4.5L4.5 19.5M4.5 19.5L15.75 19.5M4.5 19.5L4.5 8.25"
    stroke={color}
    stroke-width={strokeWidth}
    stroke-linecap="round"
    stroke-linejoin="round"
    transition:draw={params}
  />
</svg>
