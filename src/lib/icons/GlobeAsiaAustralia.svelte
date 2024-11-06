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
						d="M12.75 3.03081V3.59808C12.75 3.93196 12.8983 4.24858 13.1548 4.46233L14.2234 5.35284C14.6651 5.7209 14.7582 6.36275 14.4393 6.84112L13.9282 7.60766C13.6507 8.02398 13.2423 8.3359 12.7676 8.49413L12.6254 8.54154C11.9327 8.77243 11.6492 9.59877 12.0542 10.2063C12.4237 10.7605 12.2238 11.5131 11.6281 11.811L9 13.125L9.42339 14.1835C9.608 14.645 9.40803 15.171 8.96343 15.3933C8.5503 15.5999 8.04855 15.4814 7.77142 15.1119L7.09217 14.2062C6.59039 13.5372 5.55995 13.6301 5.18594 14.3781L4.5 15.75L3.88804 15.903M12.75 3.03081C12.5027 3.0104 12.2526 3 12 3C7.02944 3 3 7.02944 3 12C3 13.3984 3.31894 14.7223 3.88804 15.903M12.75 3.03081C17.3696 3.41192 21 7.282 21 12C21 13.8792 20.4241 15.6239 19.4391 17.0672M19.4391 17.0672L19.2628 16.5385C18.9566 15.6197 18.0968 15 17.1283 15H16.5L16.1756 14.6756C15.9031 14.4031 15.5335 14.25 15.1481 14.25C14.5977 14.25 14.0945 14.561 13.8484 15.0533L13.8119 15.1263C13.6131 15.5237 13.2567 15.8195 12.8295 15.9416L11.8408 16.2241C11.2906 16.3813 10.9461 16.9263 11.0401 17.4907L11.1131 17.9285C11.1921 18.4026 11.6022 18.75 12.0828 18.75C12.9291 18.75 13.6805 19.2916 13.9482 20.0945L14.1628 20.7384M19.4391 17.0672C18.2095 18.8688 16.3425 20.2007 14.1628 20.7384M14.1628 20.7384C13.47 20.9093 12.7456 21 12 21C8.42785 21 5.34177 18.9189 3.88804 15.903M15.7498 9C15.7498 9.89602 15.3569 10.7003 14.7341 11.25"
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
						d="M12.75 3.03081V3.59808C12.75 3.93196 12.8983 4.24858 13.1548 4.46233L14.2234 5.35284C14.6651 5.7209 14.7582 6.36275 14.4393 6.84112L13.9282 7.60766C13.6507 8.02398 13.2423 8.3359 12.7676 8.49413L12.6254 8.54154C11.9327 8.77243 11.6492 9.59877 12.0542 10.2063C12.4237 10.7605 12.2238 11.5131 11.6281 11.811L9 13.125L9.42339 14.1835C9.608 14.645 9.40803 15.171 8.96343 15.3933C8.5503 15.5999 8.04855 15.4814 7.77142 15.1119L7.09217 14.2062C6.59039 13.5372 5.55995 13.6301 5.18594 14.3781L4.5 15.75L3.88804 15.903M12.75 3.03081C12.5027 3.0104 12.2526 3 12 3C7.02944 3 3 7.02944 3 12C3 13.3984 3.31894 14.7223 3.88804 15.903M12.75 3.03081C17.3696 3.41192 21 7.282 21 12C21 13.8792 20.4241 15.6239 19.4391 17.0672M19.4391 17.0672L19.2628 16.5385C18.9566 15.6197 18.0968 15 17.1283 15H16.5L16.1756 14.6756C15.9031 14.4031 15.5335 14.25 15.1481 14.25C14.5977 14.25 14.0945 14.561 13.8484 15.0533L13.8119 15.1263C13.6131 15.5237 13.2567 15.8195 12.8295 15.9416L11.8408 16.2241C11.2906 16.3813 10.9461 16.9263 11.0401 17.4907L11.1131 17.9285C11.1921 18.4026 11.6022 18.75 12.0828 18.75C12.9291 18.75 13.6805 19.2916 13.9482 20.0945L14.1628 20.7384M19.4391 17.0672C18.2095 18.8688 16.3425 20.2007 14.1628 20.7384M14.1628 20.7384C13.47 20.9093 12.7456 21 12 21C8.42785 21 5.34177 18.9189 3.88804 15.903M15.7498 9C15.7498 9.89602 15.3569 10.7003 14.7341 11.25"
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
