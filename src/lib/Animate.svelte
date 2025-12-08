<script lang="ts">
  import 'animate.css';
  import type { AnimationProps as Props, AnimationType, AnimationConfig } from './types.ts';

  // State for reduced motion preference (SSR-safe)
  let prefersReducedMotion = $state(false);

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
  let totalRepeats = $derived(
    repeat === 'infinite' ? Infinity : Math.max(1, Number.parseInt(String(repeat), 10) || 1)
  );

  // Convert animations to normalized array of AnimationConfig
  let animationsArray = $derived.by((): AnimationConfig[] => {
    if (typeof animations === 'string') {
      return [{ action: animations as AnimationType }];
    }

    if (Array.isArray(animations)) {
      const normalized = animations
        .filter(Boolean)
        .map((anim) =>
          typeof anim === 'string' ? { action: anim as AnimationType } : (anim as AnimationConfig)
        );

      return normalized.length ? normalized : [{ action: 'bounce' }];
    }

    // Support a single config object as well
    if (animations && typeof animations === 'object') {
      return [animations as AnimationConfig];
    }

    return [{ action: 'bounce' }];
  });

  // Derived current animation config with bounds checking
  let currentConfig = $derived.by(() => {
    const safeIndex = Math.min(currentAnimationIndex, animationsArray.length - 1);
    const config = animationsArray[safeIndex];
    return {
      duration: config.duration ?? duration,
      delay: safeIndex === 0 ? (config.delay ?? delay) : (config.delay ?? 0),
      pause: config.pause ?? pauseDuration
    };
  });

  // Derived current action for aria-label with bounds checking
  let currentAction = $derived(
    animationsArray[Math.min(currentAnimationIndex, animationsArray.length - 1)]?.action ?? 'bounce'
  );

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

    // Clamp startFromIndex to valid range
    const safeStartIndex = Math.max(0, Math.min(startFromIndex, animationsArray.length - 1));

    // Abort any existing animation sequence
    abortController?.abort();
    abortController = new AbortController();
    const signal = abortController.signal;

    isAnimating = true;
    isVisible = true;
    currentAnimationIndex = safeStartIndex;

    animationLabel = `${animationsArray[safeStartIndex].action} animation in progress`;

    try {
      for (let i = safeStartIndex; i < animationsArray.length; i++) {
        if (!isAnimating || signal.aborted) break;

        currentAnimationIndex = i;

        // Capture config for this iteration to ensure consistent timing
        const stepConfig = {
          duration: currentConfig.duration,
          delay: currentConfig.delay,
          pause: currentConfig.pause
        };

        // Handle delay using captured config
        if (stepConfig.delay > 0) {
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(resolve, stepConfig.delay);
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
          const timeout = setTimeout(resolve, stepConfig.duration);
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
        if (i < animationsArray.length - 1 && stepConfig.pause > 0) {
          await new Promise((resolve, reject) => {
            const timeout = setTimeout(resolve, stepConfig.pause);
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
    const signal = abortController?.signal;

    repeatCount++;
    animationClass = 'animate__animated';
    isAnimating = false;
    currentAnimationIndex = 0;

    if (repeat === 'infinite') {
      // Keep the element visible for infinite loops
      hasCompletedAllRepeats = false;
      isVisible = true;
      shouldShowReplayButton = false;
    } else if (repeatCount >= totalRepeats) {
      hasCompletedAllRepeats = true;
      isVisible = !hideEnd;
      shouldShowReplayButton = hideEnd && showReplayButton;
    } else {
      // Mid-sequence repeat for finite counts: brief hide is OK if desired
      isVisible = false;
    }

    animationLabel = '';

    try {
      await new Promise((resolve, reject) => {
        const timeout = setTimeout(resolve, 100);
        signal?.addEventListener(
          'abort',
          () => {
            clearTimeout(timeout);
            reject(new DOMException('Animation aborted', 'AbortError'));
          },
          { once: true }
        );
      });

      if (signal?.aborted) return;

      ariaAnnouncement = hasCompletedAllRepeats
        ? 'All animations complete'
        : 'Animation sequence complete';

      // Start next repetition if needed
      if (canStartNewAnimation()) {
        await new Promise((resolve, reject) => {
          const timeout = setTimeout(resolve, 10);
          signal?.addEventListener(
            'abort',
            () => {
              clearTimeout(timeout);
              reject(new DOMException('Animation aborted', 'AbortError'));
            },
            { once: true }
          );
        });

        if (signal?.aborted) return;

        startAnimation(0);
      }
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        // Sequence was aborted, silently exit
        return;
      }
      throw error;
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

  // Initialize and monitor reduced motion preference on client
  $effect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      prefersReducedMotion = mediaQuery.matches;

      const handleChange = (event: MediaQueryListEvent) => {
        prefersReducedMotion = event.matches;
        // Stop any running animation if user enables reduced motion
        if (event.matches && isAnimating) {
          abortController?.abort();
          isAnimating = false;
        }
      };

      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
  });

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
      aria-label={`Animate child element with ${currentAction} effect`}
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
