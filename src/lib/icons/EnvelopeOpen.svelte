<script lang="ts">
	import { draw } from 'svelte/transition';
	import type { DrawParams } from 'svelte/transition';
	import type { SVGAttributes } from 'svelte/elements';

	type TitleType = {
		id?: string;
		title?: string;
	};
	type DescType = {
		id?: string;
		desc?: string;
	};

	interface Props extends SVGAttributes<SVGElement> {
		pauseDuration?: number;
		event?: 'onmouseenter' | 'onclick';
		transitionParams?: DrawParams;
		title?: TitleType;
		desc?: DescType;
		ariaLabel?: string;
		size?: number;
		role?: string;
		color?: string;
		strokeWidth?: number;
	}

	let {
		pauseDuration = 300,
		event = 'onmouseenter',
		transitionParams = {
			duration: 800,
			delay: 0
		},
		size = 24,
		role = 'img',
		color = 'currentColor',
		strokeWidth = 1.5,
		title,
		desc,
		ariaLabel = 'archive box',
		...restProps
	}: Props = $props();

	const getDuration = (params?: DrawParams): number => {
		if (!params?.duration) return 0;
		if (typeof params.duration === 'function') {
			return params.duration(0);
		}
		return params.duration;
	};

	let visible = $state(true);
	let shouldAnimate = $state(true);
	let totalDuration = $state(getDuration(transitionParams) + pauseDuration);

	let ariaDescribedby = `${title?.id || ''} ${desc?.id || ''}`;
	const hasDescription = $derived(!!(title?.id || desc?.id));

	const handleEvent = () => {
		if (!visible) return;
		console.log('Hiding SVG');
		visible = false;
		setTimeout(() => {
			console.log('Showing SVG with animation');
			shouldAnimate = true;
			visible = true;
		}, totalDuration);
	};

	$effect(() => {
		visible = true;
		shouldAnimate = true;
	});

	// Set CSS variable for the placeholder size
	$effect(() => {
		document.documentElement.style.setProperty('--size', `${size}px`);
	});
</script>

{#if event === 'onmouseenter'}
	<button onmouseenter={handleEvent}>
		<div class="placeholder">
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
						<title id={title.id}>{title.title}</title>
					{/if}
					{#if desc?.id && desc.desc}
						<desc id={desc.id}>{desc.desc}</desc>
					{/if}

					<path
						d="M21.75 8.99997V9.90606C21.75 10.7338 21.2955 11.4947 20.5667 11.8871L14.0893 15.375M2.25 8.99997V9.90606C2.25 10.7338 2.70448 11.4947 3.43328 11.8871L9.91074 15.375M18.75 17.8846L14.0893 15.375M14.0893 15.375L13.0667 14.8244C12.4008 14.4658 11.5992 14.4658 10.9333 14.8244L9.91074 15.375M9.91074 15.375L5.25 17.8846M21.75 19.5C21.75 20.7426 20.7426 21.75 19.5 21.75H4.5C3.25736 21.75 2.25 20.7426 2.25 19.5L2.25 8.84388C2.25 8.01614 2.70448 7.25525 3.43328 6.86282L10.9333 2.82436C11.5992 2.46577 12.4008 2.46577 13.0667 2.82436L20.5667 6.86282C21.2955 7.25525 21.75 8.01615 21.75 8.84388V19.5Z"
						stroke={color}
						stroke-width={strokeWidth}
						transition:draw={shouldAnimate ? transitionParams : undefined}
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			{/if}
		</div>
	</button>
{:else}
	<button onclick={handleEvent}>
		<div class="placeholder">
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
						<title id={title.id}>{title.title}</title>
					{/if}
					{#if desc?.id && desc.desc}
						<desc id={desc.id}>{desc.desc}</desc>
					{/if}

					<path
						d="M21.75 8.99997V9.90606C21.75 10.7338 21.2955 11.4947 20.5667 11.8871L14.0893 15.375M2.25 8.99997V9.90606C2.25 10.7338 2.70448 11.4947 3.43328 11.8871L9.91074 15.375M18.75 17.8846L14.0893 15.375M14.0893 15.375L13.0667 14.8244C12.4008 14.4658 11.5992 14.4658 10.9333 14.8244L9.91074 15.375M9.91074 15.375L5.25 17.8846M21.75 19.5C21.75 20.7426 20.7426 21.75 19.5 21.75H4.5C3.25736 21.75 2.25 20.7426 2.25 19.5L2.25 8.84388C2.25 8.01614 2.70448 7.25525 3.43328 6.86282L10.9333 2.82436C11.5992 2.46577 12.4008 2.46577 13.0667 2.82436L20.5667 6.86282C21.2955 7.25525 21.75 8.01615 21.75 8.84388V19.5Z"
						stroke={color}
						stroke-width={strokeWidth}
						transition:draw={shouldAnimate ? transitionParams : undefined}
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			{/if}
		</div>
	</button>
{/if}

<style>
	button {
		background: none;
		border: none;
		padding: 0;
		font: inherit;
		cursor: pointer;
		outline: inherit;
	}
	.placeholder {
		display: inline-block;
		min-width: var(--size, 24px);
		min-height: var(--size, 24px);
	}
</style>
