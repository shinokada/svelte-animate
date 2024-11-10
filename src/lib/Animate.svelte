<script lang="ts">
	import 'animate.css';
	import type { Snippet } from 'svelte';
	import type { AnimationProps } from './types.ts';

	interface Props extends AnimationProps {
		children: Snippet;
		hideAfter?: boolean;
	}

	let {
		children,
		animation = 'bounce',
		trigger = 'hover',
		duration = '1s',
		hideAfter = false
	}: Props = $props();

	let animationClass = $state('animate__animated');
	let isVisible = $state(true);

	async function startAnimation() {
		// Reset visibility if previously hidden
		isVisible = true;
		// Remove animation classes
		animationClass = '';
		// Force a browser reflow
		await new Promise((resolve) => setTimeout(resolve, 1));
		// Add animation classes back
		animationClass = `animate__animated animate__${animation}`;
	}

	function onAnimationEnd() {
		if (hideAfter) {
			isVisible = false;
		}
		animationClass = 'animate__animated';
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

<button
	type="button"
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

<!--
@component
[Go to docs](https://svelte-animate.codewithshin.com/)
## Props
@prop children
@prop animation = 'bounce'
@prop trigger = 'hover'
@prop duration = '1s'
@prop hideAfter = false
-->
