<script lang="ts">
	import type { Snippet } from 'svelte';
	import type {
		FadeParams,
		BlurParams,
		FlyParams,
		SlideParams,
		ScaleParams,
		DrawParams
	} from 'svelte/transition';
	import { setContext } from 'svelte';
	import type { HTMLButtonAttributes } from 'svelte/elements';

	type ParamsType = FadeParams | BlurParams | FlyParams | SlideParams | ScaleParams | DrawParams;

	interface Props extends HTMLButtonAttributes {
		children: Snippet;
		pauseDuration?: number;
		event?: 'onmouseenter' | 'onclick';
		params?: ParamsType;
	}

	let {
		children,
		pauseDuration = 300,
		event = 'onmouseenter',
		params = {
			duration: 800,
			delay: 0
		},
		...restProps
	}: Props = $props();

	const getDuration = (params?: ParamsType): number => {
		if (!params?.duration) return 0;
		if (typeof params.duration === 'function') {
			return params.duration(0);
		}
		return params.duration;
	};

	let visible = $state(true);
	let shouldAnimate = $state(true);
	let totalDuration = $state(getDuration(params) + pauseDuration);

	// Create a derived store for the context
	const contextValue = $derived({
		params,
		shouldAnimate,
		visible
	});

	// Set the context with a getter function
	setContext('transition-params', () => contextValue);

	const handleEvent = () => {
		if (!visible) return; // Prevent multiple triggers
		console.log('Hiding SVG');
		// Step 1: Instantly hide the SVG (using fade with duration: 0)
		visible = false;
		// Step 2: Wait for pauseDuration
		setTimeout(() => {
			console.log('Showing SVG with animation');
			// Step 3: Enable draw animation for the reappearance
			shouldAnimate = true;
			// Step 4: Show SVG, which will trigger the draw animation
			visible = true;
		}, totalDuration);
	};

	$effect(() => {
		visible = true;
		shouldAnimate = true;
	});
</script>

{#if event === 'onmouseenter'}
	<button {...restProps} onmouseenter={handleEvent}>
		<div class="placeholder">
			{@render children()}
		</div>
	</button>
{:else}
	<button {...restProps} onclick={handleEvent}>
		<div class="placeholder">
			{@render children()}
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
		display: inline-block; /* or grid based on your layout needs */
		min-width: var(--size, 24px);
		min-height: var(--size, 24px);
	}
</style>
