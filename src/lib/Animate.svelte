<script lang="ts">
  import 'animate.css';
  import type { AnimationProps as Props, AnimationType, AnimationConfig } from './types.ts';

  // Derived state for reduced motion preference (SSR-safe)
  let prefersReducedMotion = $derived(
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  let isAnimating = $state(false);
  let currentAnimationIndex = $state(0);
  let repeatCount = $state(0);
  let hasCompletedAllRepeats = $state(false);
  let animationLabel = $state('');
  let ariaAnnouncement = $state('');
  let shouldShowReplayButton = $state(false);
  let hasAutoTriggered = $state(false);
  let abortController: AbortController | undefined;

  let {
    children,
    animations = 'bounce',
    trigger = 'hover',
    duration = 1000,
    hideEnd = false,
    showReplayButton = false,
    delay = 0,
    repeat = '1',
    pauseDuration = 0,
    class: className = '',
    debug = false
  }: Props = $props();

  let animationClass = $state('animate__animated');
  let isVisible = $state(true);
  let totalRepeats = $derived(parseInt(repeat) || 1);

  // Convert animations to normalized array of AnimationConfig
  let animationsArray = $derived.by((): AnimationConfig[] => {
    if (typeof animations === 'string') {
      return [{ action: animations as AnimationType }];
    }
    if (Array.isArray(animations)) {
      return animations.map((anim) => {
        if (typeof anim === 'string') {
          return { action: anim as AnimationType };
        }
        return anim as AnimationConfig;
      });
    }
    return [{ action: 'bounce' }];
  });

  // Derived current animation config
  let currentConfig = $derived.by(() => {
    const config = animationsArray[currentAnimationIndex];
    return {
      duration: config.duration || duration,
      delay: currentAnimationIndex === 0 ? (config.delay ?? delay) : (config.delay ?? 0),
      pause: config.pause ?? pauseDuration
    };
  });

  function getAnimationClasses(animation: AnimationConfig | AnimationType): string {
    if (typeof animation === 'string') {
      return [`animate__animated`, `animate__${animation}`].join(' ');
    }
    return [`animate__animated`, `animate__${animation.action}`].join(' ');
  }

  function canStartNewAnimation() {
    if (isAnimating) return false;
    if (!shouldShowReplayButton && hasCompletedAllRepeats) return false;
    if (repeat === 'infinite') return true;
    return repeatCount < totalRepeats;
  }

  function resetAnimation() {
    repeatCount = 0;
    hasCompletedAllRepeats = false;
    isVisible = true;
    shouldShowReplayButton = false;
    startAnimation();
  }

  async function startAnimation(startFromIndex = 0) {
    if (!canStartNewAnimation() || prefersReducedMotion) return;

    // Abort any existing animation sequence
    abortController?.abort();
    abortController = new AbortController();
    const signal = abortController.signal;

    isAnimating = true;
    isVisible = true;
    currentAnimationIndex = startFromIndex;

    animationLabel = `${animationsArray[currentAnimationIndex].action} animation in progress`;

    try {
      for (let i = startFromIndex; i < animationsArray.length; i++) {
        if (!isAnimating || signal.aborted) break;

        currentAnimationIndex = i;

        // Handle delay using current config
        if (currentConfig.delay > 0) {
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(resolve, currentConfig.delay);
            signal.addEventListener(
              'abort',
              () => {
                clearTimeout(timeout);
                reject(new DOMException('Animation aborted', 'AbortError'));
              },
              { once: true }
            );
          });
        }

        if (signal.aborted) break;

        // Reset and start animation
        animationClass = '';
        await new Promise((resolve) => requestAnimationFrame(resolve));
        animationClass = getAnimationClasses(animationsArray[i]);

        // Wait for animation to complete
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, currentConfig.duration);
          signal.addEventListener(
            'abort',
            () => {
              clearTimeout(timeout);
              reject(new DOMException('Animation aborted', 'AbortError'));
            },
            { once: true }
          );
        });

        if (signal.aborted) break;

        // Handle pause between animations
        if (i < animationsArray.length - 1 && currentConfig.pause > 0) {
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(resolve, currentConfig.pause);
            signal.addEventListener(
              'abort',
              () => {
                clearTimeout(timeout);
                reject(new DOMException('Animation aborted', 'AbortError'));
              },
              { once: true }
            );
          });
        }
      }

      if (!signal.aborted) {
        await completeAnimationSequence();
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // Animation was aborted, clean up
        isAnimating = false;
        animationClass = 'animate__animated';
      } else {
        console.error('Animation error:', error);
        isAnimating = false;
      }
    }
  }

  async function completeAnimationSequence() {
    if (abortController?.signal.aborted) return;

    repeatCount++;
    animationClass = 'animate__animated';
    isAnimating = false;
    currentAnimationIndex = 0;

    if (repeat !== 'infinite' && repeatCount >= totalRepeats) {
      hasCompletedAllRepeats = true;
      isVisible = !hideEnd;
      shouldShowReplayButton = hideEnd && showReplayButton;
    } else {
      if (repeatCount !== totalRepeats) {
        isVisible = false;
      } else {
        isVisible = !hideEnd;
      }
    }

    animationLabel = '';

    await new Promise((resolve) => setTimeout(resolve, 100));
    ariaAnnouncement = hasCompletedAllRepeats
      ? 'All animations complete'
      : 'Animation sequence complete';

    // Start next repetition if needed
    if (canStartNewAnimation()) {
      await new Promise((resolve) => setTimeout(resolve, 10));
      startAnimation(0);
    }
  }

  function handleClick() {
    if (trigger === 'click' || trigger === 'both') {
      if (!isAnimating) {
        repeatCount = 0;
        hasCompletedAllRepeats = false;
        shouldShowReplayButton = false;
        startAnimation();
      }
    }
  }

  function handleMouseEnter() {
    if (trigger === 'hover' || trigger === 'both') {
      if (!isAnimating) {
        repeatCount = 0;
        hasCompletedAllRepeats = false;
        shouldShowReplayButton = false;
        startAnimation();
      }
    }
  }

  function handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      if (trigger === 'click' || trigger === 'both') {
        if (!isAnimating) {
          repeatCount = 0;
          hasCompletedAllRepeats = false;
          shouldShowReplayButton = false;
          startAnimation();
        }
      }
    } else if (event.key === 'Escape' && isAnimating) {
      // Allow stopping animation with Escape key
      abortController?.abort();
      isAnimating = false;
    }
  }

  // Auto-trigger animation on mount
  $effect(() => {
    if (trigger === 'auto' && !prefersReducedMotion && !hasAutoTriggered) {
      hasAutoTriggered = true;
      repeatCount = 0;
      hasCompletedAllRepeats = false;
      shouldShowReplayButton = false;
      startAnimation();
    }
  });

  // Clear announcement after delay
  $effect(() => {
    if (ariaAnnouncement) {
      const timer = setTimeout(() => {
        ariaAnnouncement = '';
      }, 3000);
      return () => clearTimeout(timer);
    }
  });

  // Cleanup on unmount
  $effect(() => {
    return () => {
      abortController?.abort();
    };
  });
</script>

{#snippet showReplay()}
  <button
    type="button"
    onclick={resetAnimation}
    class="bg-opacity-50 absolute top-0 left-0 flex h-full w-full items-center justify-center rounded bg-black text-white transition-opacity"
    style="opacity: {!isVisible ? 1 : 0}; pointer-events: {!isVisible ? 'auto' : 'none'}"
    aria-label="Replay animation"
  >
    Show Again
  </button>
{/snippet}

{#if prefersReducedMotion}
  {@render children()}
{:else if trigger && trigger !== 'auto'}
  <div class="relative">
    <button
      type="button"
      aria-label={animationLabel || 'Animated element'}
      aria-live="polite"
      class="{animationClass} {className}"
      style="opacity: {isVisible
        ? 1
        : 0}; animation-duration: {currentConfig.duration}ms; background: none; border: none; padding: 0; cursor: pointer;"
      onclick={handleClick}
      onmouseenter={handleMouseEnter}
      onkeydown={handleKeyDown}
    >
      {@render children()}
    </button>
    {#if shouldShowReplayButton}
      {@render showReplay()}
    {/if}
  </div>
{:else}
  <div class="relative">
    <span
      aria-label={`Animate child element with ${animationsArray[currentAnimationIndex].action} effect`}
      aria-live="polite"
      class="{animationClass} {className}"
      style="opacity: {isVisible ? 1 : 0}; animation-duration: {currentConfig.duration}ms;"
    >
      {@render children()}
    </span>
    {#if shouldShowReplayButton}
      {@render showReplay()}
    {/if}
  </div>
{/if}

{#if ariaAnnouncement}
  <div
    role="status"
    aria-live="polite"
    aria-atomic="true"
    class={debug ? 'debug-visible' : 'sr-only'}
  >
    <p>{ariaAnnouncement}</p>
  </div>
{/if}

<!--
@component
[Go to docs](https://svelte-animate.codewithshin.com/)
## Props
@prop children
@prop animations = 'bounce'
@prop trigger = 'hover'
@prop duration = 1000
@prop hideEnd = false
@prop showReplayButton = false
@prop delay = 0
@prop repeat = '1'
@prop pauseDuration = 0
@prop class: className = ''
@prop debug = false
-->

<style>
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .debug-visible {
    position: fixed;
    bottom: 1rem;
    right: 1rem;
    padding: 1rem;
    background: #f0f0f0;
    border: 1px solid #ccc;
    border-radius: 0.25rem;
    z-index: 9999;
  }
</style>
