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
						d="M18 7.5V10.5M18 10.5V13.5M18 10.5H21M18 10.5H15M12.75 6.375C12.75 8.23896 11.239 9.75 9.375 9.75C7.51104 9.75 6 8.23896 6 6.375C6 4.51104 7.51104 3 9.375 3C11.239 3 12.75 4.51104 12.75 6.375ZM3.00092 19.2343C3.00031 19.198 3 19.1615 3 19.125C3 15.6042 5.85418 12.75 9.375 12.75C12.8958 12.75 15.75 15.6042 15.75 19.125V19.1276C15.75 19.1632 15.7497 19.1988 15.7491 19.2343C13.8874 20.3552 11.7065 21 9.375 21C7.04353 21 4.86264 20.3552 3.00092 19.2343Z"
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
						d="M18 7.5V10.5M18 10.5V13.5M18 10.5H21M18 10.5H15M12.75 6.375C12.75 8.23896 11.239 9.75 9.375 9.75C7.51104 9.75 6 8.23896 6 6.375C6 4.51104 7.51104 3 9.375 3C11.239 3 12.75 4.51104 12.75 6.375ZM3.00092 19.2343C3.00031 19.198 3 19.1615 3 19.125C3 15.6042 5.85418 12.75 9.375 12.75C12.8958 12.75 15.75 15.6042 15.75 19.125V19.1276C15.75 19.1632 15.7497 19.1988 15.7491 19.2343C13.8874 20.3552 11.7065 21 9.375 21C7.04353 21 4.86264 20.3552 3.00092 19.2343Z"
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
