<script lang="ts">
  import 'animate.css';
  
  import type { AnimationProps as Props } from './types.ts';

  let prefersReducedMotion = $state();
  let isAnimating = $state(false); // Add animation lock state

  $effect(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      animationClass = '';
    }
  });

  let { children, animation = 'bounce', trigger, duration = '1s', hideAfter = false, delay, repeat }: Props = $props();

  let animationClass = $state('animate__animated');
  let isVisible = $state(true);

  function getAnimationClasses() {
    const classes = [`animate__animated`, `animate__${animation}`];

    if (delay) {
      classes.push(`animate__delay-${delay}`);
    }

    if (repeat) {
      switch (repeat) {
        case '1':
          classes.push('animate__repeat-1');
          break;
        case '2':
          classes.push('animate__repeat-2');
          break;
        case '3':
          classes.push('animate__repeat-3');
          break;
        case 'infinite':
          classes.push('animate__infinite');
          break;
      }
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

  $effect(() => {
    $inspect('animationClass', animationClass);
  });
</script>

{#if prefersReducedMotion}
  {@render children()}
{:else if trigger}
  <button
    type="button"
    aria-label={`Animate child element with ${animation} effect`}
    aria-live="polite"
    class={animationClass}
    style="display: {isVisible ? 'inline-block' : 'none'}; animation-duration: {duration}; background: none; border: none; padding: 0; cursor: pointer;"
    onclick={handleClick}
    onmouseenter={handleMouseEnter}
    onkeydown={handleKeyDown}
    onanimationend={onAnimationEnd}
  >
    {@render children()}
  </button>
{:else}
  <span aria-label={`Animate child element with ${animation} effect`} aria-live="polite" class={getAnimationClasses()} style="display: {isVisible ? 'inline-block' : 'none'}; animation-duration: {duration};">
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
