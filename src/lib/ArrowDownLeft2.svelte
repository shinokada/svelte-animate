<script lang="ts">
	import type { Props } from './types.ts';
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
		params2,
		...restProps
	}: Props = $props();

	let ariaDescribedby = `${title?.id || ''} ${desc?.id || ''}`;
	const hasDescription = $derived(!!(title?.id || desc?.id));
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
>
	{#if title?.id && title.title}
		<title id={title.id}>{title.title}</title>
	{/if}
	{#if desc?.id && desc.desc}
		<desc id={desc.id}>{desc.desc}</desc>
	{/if}

	<path d="M17 7 7 17" transition:draw={params} />
	<path d="M17 17H7V7" transition:draw={params2} />
</svg>
