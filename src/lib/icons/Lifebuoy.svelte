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
						d="M16.7124 4.3299C17.2999 4.69153 17.8548 5.12691 18.364 5.63604C18.8731 6.14517 19.3085 6.70012 19.6701 7.28763M16.7124 4.3299L13.2636 8.46838M16.7124 4.3299C13.8316 2.5567 10.1684 2.5567 7.28763 4.3299M19.6701 7.28763L15.5316 10.7364M19.6701 7.28763C21.4433 10.1684 21.4433 13.8316 19.6701 16.7124M15.5316 10.7364C15.3507 10.2297 15.0574 9.75408 14.6517 9.34835C14.2459 8.94262 13.7703 8.6493 13.2636 8.46838M15.5316 10.7364C15.8228 11.5519 15.8228 12.4481 15.5316 13.2636M13.2636 8.46838C12.4481 8.17721 11.5519 8.17721 10.7364 8.46838M15.5316 13.2636C15.3507 13.7703 15.0574 14.2459 14.6517 14.6517C14.2459 15.0574 13.7703 15.3507 13.2636 15.5316M15.5316 13.2636L19.6701 16.7124M19.6701 16.7124C19.3085 17.2999 18.8731 17.8548 18.364 18.364C17.8548 18.8731 17.2999 19.3085 16.7124 19.6701M16.7124 19.6701L13.2636 15.5316M16.7124 19.6701C13.8316 21.4433 10.1684 21.4433 7.28763 19.6701M13.2636 15.5316C12.4481 15.8228 11.5519 15.8228 10.7364 15.5316M10.7364 15.5316C10.2297 15.3507 9.75408 15.0574 9.34835 14.6517C8.94262 14.2459 8.6493 13.7703 8.46838 13.2636M10.7364 15.5316L7.28763 19.6701M7.28763 19.6701C6.70012 19.3085 6.14517 18.8731 5.63604 18.364C5.12691 17.8548 4.69153 17.2999 4.3299 16.7124M4.3299 16.7124L8.46838 13.2636M4.3299 16.7124C2.5567 13.8316 2.5567 10.1684 4.3299 7.28763M8.46838 13.2636C8.17721 12.4481 8.17721 11.5519 8.46838 10.7364M8.46838 10.7364C8.6493 10.2297 8.94262 9.75408 9.34835 9.34835C9.75408 8.94262 10.2297 8.6493 10.7364 8.46838M8.46838 10.7364L4.3299 7.28763M10.7364 8.46838L7.28763 4.3299M7.28763 4.3299C6.70012 4.69153 6.14517 5.12691 5.63604 5.63604C5.12691 6.14517 4.69153 6.70013 4.3299 7.28763"
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
						d="M16.7124 4.3299C17.2999 4.69153 17.8548 5.12691 18.364 5.63604C18.8731 6.14517 19.3085 6.70012 19.6701 7.28763M16.7124 4.3299L13.2636 8.46838M16.7124 4.3299C13.8316 2.5567 10.1684 2.5567 7.28763 4.3299M19.6701 7.28763L15.5316 10.7364M19.6701 7.28763C21.4433 10.1684 21.4433 13.8316 19.6701 16.7124M15.5316 10.7364C15.3507 10.2297 15.0574 9.75408 14.6517 9.34835C14.2459 8.94262 13.7703 8.6493 13.2636 8.46838M15.5316 10.7364C15.8228 11.5519 15.8228 12.4481 15.5316 13.2636M13.2636 8.46838C12.4481 8.17721 11.5519 8.17721 10.7364 8.46838M15.5316 13.2636C15.3507 13.7703 15.0574 14.2459 14.6517 14.6517C14.2459 15.0574 13.7703 15.3507 13.2636 15.5316M15.5316 13.2636L19.6701 16.7124M19.6701 16.7124C19.3085 17.2999 18.8731 17.8548 18.364 18.364C17.8548 18.8731 17.2999 19.3085 16.7124 19.6701M16.7124 19.6701L13.2636 15.5316M16.7124 19.6701C13.8316 21.4433 10.1684 21.4433 7.28763 19.6701M13.2636 15.5316C12.4481 15.8228 11.5519 15.8228 10.7364 15.5316M10.7364 15.5316C10.2297 15.3507 9.75408 15.0574 9.34835 14.6517C8.94262 14.2459 8.6493 13.7703 8.46838 13.2636M10.7364 15.5316L7.28763 19.6701M7.28763 19.6701C6.70012 19.3085 6.14517 18.8731 5.63604 18.364C5.12691 17.8548 4.69153 17.2999 4.3299 16.7124M4.3299 16.7124L8.46838 13.2636M4.3299 16.7124C2.5567 13.8316 2.5567 10.1684 4.3299 7.28763M8.46838 13.2636C8.17721 12.4481 8.17721 11.5519 8.46838 10.7364M8.46838 10.7364C8.6493 10.2297 8.94262 9.75408 9.34835 9.34835C9.75408 8.94262 10.2297 8.6493 10.7364 8.46838M8.46838 10.7364L4.3299 7.28763M10.7364 8.46838L7.28763 4.3299M7.28763 4.3299C6.70012 4.69153 6.14517 5.12691 5.63604 5.63604C5.12691 6.14517 4.69153 6.70013 4.3299 7.28763"
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
