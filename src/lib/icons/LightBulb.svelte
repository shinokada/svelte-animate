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
						d="M12 18V12.75M12 12.75C12.5179 12.75 13.0206 12.6844 13.5 12.561M12 12.75C11.4821 12.75 10.9794 12.6844 10.5 12.561M14.25 20.0394C13.5212 20.1777 12.769 20.25 12 20.25C11.231 20.25 10.4788 20.1777 9.75 20.0394M13.5 22.422C13.007 22.4736 12.5066 22.5 12 22.5C11.4934 22.5 10.993 22.4736 10.5 22.422M14.25 18V17.8083C14.25 16.8254 14.9083 15.985 15.7585 15.4917C17.9955 14.1938 19.5 11.7726 19.5 9C19.5 4.85786 16.1421 1.5 12 1.5C7.85786 1.5 4.5 4.85786 4.5 9C4.5 11.7726 6.00446 14.1938 8.24155 15.4917C9.09173 15.985 9.75 16.8254 9.75 17.8083V18"
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
						d="M12 18V12.75M12 12.75C12.5179 12.75 13.0206 12.6844 13.5 12.561M12 12.75C11.4821 12.75 10.9794 12.6844 10.5 12.561M14.25 20.0394C13.5212 20.1777 12.769 20.25 12 20.25C11.231 20.25 10.4788 20.1777 9.75 20.0394M13.5 22.422C13.007 22.4736 12.5066 22.5 12 22.5C11.4934 22.5 10.993 22.4736 10.5 22.422M14.25 18V17.8083C14.25 16.8254 14.9083 15.985 15.7585 15.4917C17.9955 14.1938 19.5 11.7726 19.5 9C19.5 4.85786 16.1421 1.5 12 1.5C7.85786 1.5 4.5 4.85786 4.5 9C4.5 11.7726 6.00446 14.1938 8.24155 15.4917C9.09173 15.985 9.75 16.8254 9.75 17.8083V18"
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
