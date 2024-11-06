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
						d="M3.375 19.5H20.625M3.375 19.5C2.75368 19.5 2.25 18.9963 2.25 18.375M3.375 19.5H10.875C11.4963 19.5 12 18.9963 12 18.375M2.25 18.375V5.625M2.25 18.375V16.875C2.25 16.2537 2.75368 15.75 3.375 15.75M21.75 18.375V5.625M21.75 18.375C21.75 18.9963 21.2463 19.5 20.625 19.5M21.75 18.375V16.875C21.75 16.2537 21.2463 15.75 20.625 15.75M20.625 19.5H13.125C12.5037 19.5 12 18.9963 12 18.375M21.75 5.625C21.75 5.00368 21.2463 4.5 20.625 4.5H3.375C2.75368 4.5 2.25 5.00368 2.25 5.625M21.75 5.625V7.125C21.75 7.74632 21.2463 8.25 20.625 8.25M2.25 5.625V7.125C2.25 7.74632 2.75368 8.25 3.375 8.25M3.375 8.25H20.625M3.375 8.25H10.875C11.4963 8.25 12 8.75368 12 9.375M3.375 8.25C2.75368 8.25 2.25 8.75368 2.25 9.375V10.875C2.25 11.4963 2.75368 12 3.375 12M20.625 8.25H13.125C12.5037 8.25 12 8.75368 12 9.375M20.625 8.25C21.2463 8.25 21.75 8.75368 21.75 9.375V10.875C21.75 11.4963 21.2463 12 20.625 12M3.375 12H10.875M3.375 12C2.75368 12 2.25 12.5037 2.25 13.125V14.625C2.25 15.2463 2.75368 15.75 3.375 15.75M12 10.875V9.375M12 10.875C12 11.4963 11.4963 12 10.875 12M12 10.875C12 11.4963 12.5037 12 13.125 12M10.875 12C11.4963 12 12 12.5037 12 13.125M13.125 12H20.625M13.125 12C12.5037 12 12 12.5037 12 13.125M20.625 12C21.2463 12 21.75 12.5037 21.75 13.125V14.625C21.75 15.2463 21.2463 15.75 20.625 15.75M3.375 15.75H10.875M12 14.625V13.125M12 14.625C12 15.2463 11.4963 15.75 10.875 15.75M12 14.625C12 15.2463 12.5037 15.75 13.125 15.75M10.875 15.75C11.4963 15.75 12 16.2537 12 16.875M12 18.375V16.875M12 16.875C12 16.2537 12.5037 15.75 13.125 15.75M13.125 15.75H20.625"
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
						d="M3.375 19.5H20.625M3.375 19.5C2.75368 19.5 2.25 18.9963 2.25 18.375M3.375 19.5H10.875C11.4963 19.5 12 18.9963 12 18.375M2.25 18.375V5.625M2.25 18.375V16.875C2.25 16.2537 2.75368 15.75 3.375 15.75M21.75 18.375V5.625M21.75 18.375C21.75 18.9963 21.2463 19.5 20.625 19.5M21.75 18.375V16.875C21.75 16.2537 21.2463 15.75 20.625 15.75M20.625 19.5H13.125C12.5037 19.5 12 18.9963 12 18.375M21.75 5.625C21.75 5.00368 21.2463 4.5 20.625 4.5H3.375C2.75368 4.5 2.25 5.00368 2.25 5.625M21.75 5.625V7.125C21.75 7.74632 21.2463 8.25 20.625 8.25M2.25 5.625V7.125C2.25 7.74632 2.75368 8.25 3.375 8.25M3.375 8.25H20.625M3.375 8.25H10.875C11.4963 8.25 12 8.75368 12 9.375M3.375 8.25C2.75368 8.25 2.25 8.75368 2.25 9.375V10.875C2.25 11.4963 2.75368 12 3.375 12M20.625 8.25H13.125C12.5037 8.25 12 8.75368 12 9.375M20.625 8.25C21.2463 8.25 21.75 8.75368 21.75 9.375V10.875C21.75 11.4963 21.2463 12 20.625 12M3.375 12H10.875M3.375 12C2.75368 12 2.25 12.5037 2.25 13.125V14.625C2.25 15.2463 2.75368 15.75 3.375 15.75M12 10.875V9.375M12 10.875C12 11.4963 11.4963 12 10.875 12M12 10.875C12 11.4963 12.5037 12 13.125 12M10.875 12C11.4963 12 12 12.5037 12 13.125M13.125 12H20.625M13.125 12C12.5037 12 12 12.5037 12 13.125M20.625 12C21.2463 12 21.75 12.5037 21.75 13.125V14.625C21.75 15.2463 21.2463 15.75 20.625 15.75M3.375 15.75H10.875M12 14.625V13.125M12 14.625C12 15.2463 11.4963 15.75 10.875 15.75M12 14.625C12 15.2463 12.5037 15.75 13.125 15.75M10.875 15.75C11.4963 15.75 12 16.2537 12 16.875M12 18.375V16.875M12 16.875C12 16.2537 12.5037 15.75 13.125 15.75M13.125 15.75H20.625"
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
