<script lang="ts">
	import { getContext } from 'svelte';
	import { draw } from 'svelte/transition';
	import type { BaseProps, Props } from './types.ts';

	const ctx: BaseProps = getContext('iconCtx') ?? {};

	let {
		size = ctx.size || '24',
		role = ctx.role || 'img',
		color = ctx.color || 'currentColor',
		strokeWidth = ctx.strokeWidth || '2',
		title,
		desc,
		ariaLabel = 'at sign',
		duration = 500,
		pauseDuration = 100,
		...restProps
	}: Props = $props();

	let ariaDescribedby = `${title?.id || ''} ${desc?.id || ''}`;
	const hasDescription = $derived(!!(title?.id || desc?.id));

	let visible = $state(true);
	let shouldAnimate = $state(true);

	const handleClick = () => {
		shouldAnimate = false; // Disable animation for hiding
		visible = false;

		setTimeout(() => {
			shouldAnimate = true; // Re-enable animation for showing
			visible = true;
		}, pauseDuration);
	};

	$effect(() => {
		visible = true;
		shouldAnimate = true;
	});
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
>
	{#if title?.id && title.title}
		<title id={title.id}>{title.title}</title>
	{/if}
	{#if desc?.id && desc.desc}
		<desc id={desc.id}>{desc.desc}</desc>
	{/if}

	{#if visible}
		<circle
			cx="12"
			cy="12"
			r="4"
			transition:draw={{
				duration: shouldAnimate ? duration : 0,
				delay: shouldAnimate ? 300 : 0
			}}
		/>
		<path
			d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-4 8"
			transition:draw={{
				duration: shouldAnimate ? duration : 0,
				delay: shouldAnimate ? duration * 0.2 : 0
			}}
		/>
	{/if}
</svg>
