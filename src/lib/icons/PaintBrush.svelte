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
						d="M9.53086 16.1224C9.08517 15.0243 8.00801 14.25 6.75 14.25C5.09315 14.25 3.75 15.5931 3.75 17.25C3.75 18.4926 2.74262 19.5 1.49998 19.5C1.44928 19.5 1.39898 19.4983 1.34912 19.495C2.12648 20.8428 3.58229 21.75 5.24998 21.75C7.72821 21.75 9.73854 19.7467 9.74993 17.2711C9.74998 17.2641 9.75 17.2571 9.75 17.25C9.75 16.8512 9.67217 16.4705 9.53086 16.1224ZM9.53086 16.1224C10.7252 15.7153 11.8612 15.1705 12.9175 14.5028M7.875 14.4769C8.2823 13.2797 8.8281 12.1411 9.49724 11.0825M12.9175 14.5028C14.798 13.3141 16.4259 11.7362 17.6806 9.85406L21.5566 4.04006C21.6827 3.85093 21.75 3.6287 21.75 3.40139C21.75 2.76549 21.2345 2.25 20.5986 2.25C20.3713 2.25 20.1491 2.31729 19.9599 2.44338L14.1459 6.31937C12.2638 7.57413 10.6859 9.20204 9.49724 11.0825M12.9175 14.5028C12.2396 12.9833 11.0167 11.7604 9.49724 11.0825"
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
						d="M9.53086 16.1224C9.08517 15.0243 8.00801 14.25 6.75 14.25C5.09315 14.25 3.75 15.5931 3.75 17.25C3.75 18.4926 2.74262 19.5 1.49998 19.5C1.44928 19.5 1.39898 19.4983 1.34912 19.495C2.12648 20.8428 3.58229 21.75 5.24998 21.75C7.72821 21.75 9.73854 19.7467 9.74993 17.2711C9.74998 17.2641 9.75 17.2571 9.75 17.25C9.75 16.8512 9.67217 16.4705 9.53086 16.1224ZM9.53086 16.1224C10.7252 15.7153 11.8612 15.1705 12.9175 14.5028M7.875 14.4769C8.2823 13.2797 8.8281 12.1411 9.49724 11.0825M12.9175 14.5028C14.798 13.3141 16.4259 11.7362 17.6806 9.85406L21.5566 4.04006C21.6827 3.85093 21.75 3.6287 21.75 3.40139C21.75 2.76549 21.2345 2.25 20.5986 2.25C20.3713 2.25 20.1491 2.31729 19.9599 2.44338L14.1459 6.31937C12.2638 7.57413 10.6859 9.20204 9.49724 11.0825M12.9175 14.5028C12.2396 12.9833 11.0167 11.7604 9.49724 11.0825"
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
