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
						d="M20.8929 13.3929L19.7582 12.2582C19.5872 12.0872 19.4449 11.8897 19.3367 11.6734L18.2567 9.5133C18.1304 9.26078 17.7938 9.20616 17.5942 9.4058C17.3818 9.61824 17.0708 9.69881 16.782 9.61627L15.5091 9.25259C15.0257 9.11447 14.5239 9.40424 14.402 9.892C14.3108 10.2566 14.4587 10.6392 14.7715 10.8476L15.3582 11.2388C15.9489 11.6326 16.0316 12.4684 15.5297 12.9703L15.3295 13.1705C15.1185 13.3815 15 13.6676 15 13.966V14.3768C15 14.7846 14.8892 15.1847 14.6794 15.5344L13.3647 17.7254C12.9834 18.3611 12.2964 18.75 11.5552 18.75C10.9724 18.75 10.5 18.2776 10.5 17.6948V16.5233C10.5 15.6033 9.93986 14.7759 9.08563 14.4343L8.43149 14.1726C7.44975 13.7799 6.8739 12.7566 7.04773 11.7136L7.05477 11.6714C7.10117 11.393 7.19956 11.1257 7.3448 10.8837L7.43421 10.7347C7.92343 9.91928 8.87241 9.49948 9.80483 9.68597L10.9827 9.92153C11.5574 10.0365 12.124 9.69096 12.285 9.12744L12.4935 8.39774C12.6422 7.87721 12.3991 7.32456 11.9149 7.08245L11.25 6.75L11.159 6.84099C10.7371 7.26295 10.1648 7.5 9.56802 7.5H9.38709C9.13924 7.5 8.90095 7.59905 8.7257 7.7743C8.44222 8.05778 8.00814 8.12907 7.64958 7.94979C7.16433 7.70716 6.98833 7.10278 7.26746 6.63757L8.67936 4.2844C8.82024 4.04961 8.91649 3.79207 8.96453 3.52474M20.8929 13.3929C20.9634 12.9389 21 12.4737 21 12C21 7.02944 16.9706 3 12 3C10.9348 3 9.91287 3.18504 8.96453 3.52474M20.8929 13.3929C20.2234 17.702 16.4968 21 12 21C7.02944 21 3 16.9706 3 12C3 8.09461 5.48749 4.77021 8.96453 3.52474"
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
						d="M20.8929 13.3929L19.7582 12.2582C19.5872 12.0872 19.4449 11.8897 19.3367 11.6734L18.2567 9.5133C18.1304 9.26078 17.7938 9.20616 17.5942 9.4058C17.3818 9.61824 17.0708 9.69881 16.782 9.61627L15.5091 9.25259C15.0257 9.11447 14.5239 9.40424 14.402 9.892C14.3108 10.2566 14.4587 10.6392 14.7715 10.8476L15.3582 11.2388C15.9489 11.6326 16.0316 12.4684 15.5297 12.9703L15.3295 13.1705C15.1185 13.3815 15 13.6676 15 13.966V14.3768C15 14.7846 14.8892 15.1847 14.6794 15.5344L13.3647 17.7254C12.9834 18.3611 12.2964 18.75 11.5552 18.75C10.9724 18.75 10.5 18.2776 10.5 17.6948V16.5233C10.5 15.6033 9.93986 14.7759 9.08563 14.4343L8.43149 14.1726C7.44975 13.7799 6.8739 12.7566 7.04773 11.7136L7.05477 11.6714C7.10117 11.393 7.19956 11.1257 7.3448 10.8837L7.43421 10.7347C7.92343 9.91928 8.87241 9.49948 9.80483 9.68597L10.9827 9.92153C11.5574 10.0365 12.124 9.69096 12.285 9.12744L12.4935 8.39774C12.6422 7.87721 12.3991 7.32456 11.9149 7.08245L11.25 6.75L11.159 6.84099C10.7371 7.26295 10.1648 7.5 9.56802 7.5H9.38709C9.13924 7.5 8.90095 7.59905 8.7257 7.7743C8.44222 8.05778 8.00814 8.12907 7.64958 7.94979C7.16433 7.70716 6.98833 7.10278 7.26746 6.63757L8.67936 4.2844C8.82024 4.04961 8.91649 3.79207 8.96453 3.52474M20.8929 13.3929C20.9634 12.9389 21 12.4737 21 12C21 7.02944 16.9706 3 12 3C10.9348 3 9.91287 3.18504 8.96453 3.52474M20.8929 13.3929C20.2234 17.702 16.4968 21 12 21C7.02944 21 3 16.9706 3 12C3 8.09461 5.48749 4.77021 8.96453 3.52474"
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
