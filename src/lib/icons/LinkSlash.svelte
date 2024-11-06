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
						d="M13.1813 8.68025C13.6303 8.89477 14.0511 9.188 14.423 9.55994C15.9219 11.0591 16.1423 13.3528 15.084 15.0855M5.31614 12.3032L3.5592 14.0604C1.80188 15.8179 1.80188 18.6674 3.5592 20.4249C5.31653 22.1825 8.16572 22.1825 9.92304 20.4249L13.0517 17.296M18.6659 11.6811L20.4228 9.92393C22.1802 8.1664 22.1802 5.31689 20.4228 3.55936C18.6655 1.80183 15.8163 1.80183 14.059 3.55936L9.55909 8.05979C9.30075 8.31816 9.08038 8.60014 8.898 8.89877M10.8008 15.3041C10.3518 15.0895 9.93099 14.7963 9.55909 14.4244C9.0674 13.9326 8.71328 13.3554 8.49674 12.7405M15.084 15.0855L20.9908 20.993M15.084 15.0855L8.898 8.89877M2.9912 2.99128L8.898 8.89877"
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
						d="M13.1813 8.68025C13.6303 8.89477 14.0511 9.188 14.423 9.55994C15.9219 11.0591 16.1423 13.3528 15.084 15.0855M5.31614 12.3032L3.5592 14.0604C1.80188 15.8179 1.80188 18.6674 3.5592 20.4249C5.31653 22.1825 8.16572 22.1825 9.92304 20.4249L13.0517 17.296M18.6659 11.6811L20.4228 9.92393C22.1802 8.1664 22.1802 5.31689 20.4228 3.55936C18.6655 1.80183 15.8163 1.80183 14.059 3.55936L9.55909 8.05979C9.30075 8.31816 9.08038 8.60014 8.898 8.89877M10.8008 15.3041C10.3518 15.0895 9.93099 14.7963 9.55909 14.4244C9.0674 13.9326 8.71328 13.3554 8.49674 12.7405M15.084 15.0855L20.9908 20.993M15.084 15.0855L8.898 8.89877M2.9912 2.99128L8.898 8.89877"
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
