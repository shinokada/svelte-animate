<script lang="ts">
	import 'animate.css';
	import type { Snippet } from 'svelte';
	import type { AnimationProps } from './types.ts';

	let prefersReducedMotion = $state();
	let isAnimating = $state(false); // Add animation lock state

	$effect(() => {
		prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReducedMotion) {
			animationClass = '';
		}
	});

	interface Props extends AnimationProps {
		children: Snippet;
		hideAfter?: boolean;
		delay?: '1s' | '2s' | '3s' | '4s' | '5s';
		speed?: 'slower' | 'slow' | 'fast' | 'faster';
		repeat?: number;
	}

	let {
		children,
		animation = 'bounce',
		trigger,
		duration = '1s',
		hideAfter = false,
		delay,
		speed,
		repeat
	}: Props = $props();

	let animationClass = $state('animate__animated');
	let isVisible = $state(true);

	function getAnimationClasses() {
		const classes = [`animate__animated`, `animate__${animation}`];

		if (delay) {
			classes.push(`animate__delay-${delay}`);
		}

		if (speed) {
			classes.push(`animate__${speed}`);
		}

		if (repeat && repeat > 0) {
			classes.push(`animate__repeat-${repeat}`);
		}

		return classes.join(' ');
	}

	async function startAnimation() {
		// Don't start if animation is already in progress
		if (isAnimating) return;
		// Reset visibility if previously hidden
		isVisible = true;
		// Set animation lock
		isAnimating = true;
		// Remove animation classes
		animationClass = '';
		// Force a browser reflow
		await new Promise((resolve) => setTimeout(resolve, 1));
		// Add animation classes back
		animationClass = getAnimationClasses();
	}

	function onAnimationEnd() {
		if (hideAfter) {
			isVisible = false;
		}
		animationClass = 'animate__animated';
		// Release animation lock
		isAnimating = false;
		
		// Add screen reader announcements for animation completion
		const announcement = document.createElement('div');
		announcement.setAttribute('aria-live', 'polite');
		announcement.textContent = `${animation} animation complete`;
		document.body.appendChild(announcement);
		setTimeout(() => announcement.remove(), 1000);
	}

	function handleClick() {
		if (trigger === 'click' || trigger === 'both') {
			startAnimation();
		}
	}

	function handleMouseEnter() {
		if (trigger === 'hover' || trigger === 'both') {
			startAnimation();
		}
	}

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === 'Enter' || event.key === ' ') {
			event.preventDefault();
			if (trigger === 'click' || trigger === 'both') {
				startAnimation();
			}
		}
	}
</script>

{#if prefersReducedMotion}
	{@render children()}
{:else if trigger}
	<button
		type="button"
		aria-label={`Animate child element with ${animation} effect`}
		aria-live="polite"
		class={animationClass}
		style="display: {isVisible
			? 'inline-block'
			: 'none'}; animation-duration: {duration}; background: none; border: none; padding: 0; cursor: pointer;"
		onclick={handleClick}
		onmouseenter={handleMouseEnter}
		onkeydown={handleKeyDown}
		onanimationend={onAnimationEnd}
	>
		{@render children()}
	</button>
{:else}
	<span
		aria-label={`Animate child element with ${animation} effect`}
		aria-live="polite"
		class={getAnimationClasses()}
		style="display: {isVisible ? 'inline-block' : 'none'}; animation-duration: {duration};"
	>
		{@render children()}
	</span>
{/if}

<!--
@component
[Go to docs](https://svelte-animate.codewithshin.com/)
## Props
@prop children
@prop animation = 'bounce'
@prop trigger
@prop duration = '1s'
@prop hideAfter = false
-->
