<script lang="ts">
	import { getContext } from 'svelte';
	import type { BaseProps, Props } from './types.ts';
	import { tweened } from 'svelte/motion';
	import { cubicOut } from 'svelte/easing';

	const ctx: BaseProps = getContext('iconCtx') ?? {};

	let {
		size = ctx.size || '24',
		role = ctx.role || 'img',
		color = ctx.color || 'currentColor',
		strokeWidth = ctx.strokeWidth || '2',
		title,
		desc,
		duration = 500,
		ariaLabel = 'badge check',
		rotationDegrees = 360, // New prop with default value (5 rotations)
		...restProps
	}: Props = $props();

	let ariaDescribedby = `${title?.id || ''} ${desc?.id || ''}`;
	const hasDescription = $derived(!!(title?.id || desc?.id));

	const rotation = tweened(0, {
		duration,
		easing: cubicOut
	});

	let isAnimating = $state(false);

	const handleClick = async () => {
		if (isAnimating) return;

		isAnimating = true;

		// Forward rotation
		await rotation.set(rotationDegrees);

		// Backward rotation
		await rotation.set(-rotationDegrees);

		// Reset position
		// rotation.set(0);
		isAnimating = false;
	};
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
	onclick={handleClick}
	style="transform: rotate({$rotation}deg); transform-origin: center;"
>
	{#if title?.id && title.title}
		<title id={title.id}>{title.title}</title>
	{/if}
	{#if desc?.id && desc.desc}
		<desc id={desc.id}>{desc.desc}</desc>
	{/if}
	<path
		d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
	/>
	<path d="m9 12 2 2 4-4" />
</svg>
