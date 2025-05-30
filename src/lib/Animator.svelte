<script lang="ts">
  import 'animate.css';
  import type { AnimatorProps as Props, AnimationType, AnimationConfig } from './types.ts';

  let prefersReducedMotion = $state(false);
  let isAnimating = $state(false);
  let currentAnimationIndex = $state(0);
  let hasInitialized = $state(false);
  let debugInfo = $state<string[]>([]);

  let { children, animations = 'zoomInRight', duration = 1000, hideFor = 0, hideEnd = false, delay = 0, pauseDuration = 0, class: className = '', debug = false, action = true }: Props = $props();

  let animationClass = $state('');
  let isVisible = $state(false);
  let ariaAnnouncement = $state('');

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
    return [{ action: 'zoomInRight' }];
  });

  function logDebug(message: string) {
    if (debug) {
      const timestamp = new Date().toISOString();
      debugInfo = [...debugInfo, `[${timestamp}] ${message}`];
      console.log(message);
    }
  }

  $effect(() => {
    prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    logDebug(`Prefers reduced motion: ${prefersReducedMotion}`);
  });

  function getAnimationClasses(animation: AnimationConfig | AnimationType): string {
    const animAction = typeof animation === 'string' ? animation : animation.action;
    return `animate__animated animate__${animAction}`;
  }

  function getCurrentConfig(index: number): {
    duration: number;
    delay: number;
    pause: number;
  } {
    const config = animationsArray[index];
    return {
      duration: (config as AnimationConfig).duration || duration,
      delay: index === 0 ? delay : 0,
      pause: pauseDuration
    };
  }

  async function startAnimation() {
    if (prefersReducedMotion || isAnimating) {
      logDebug(`Animation start blocked. Reduced motion: ${prefersReducedMotion}, Already animating: ${isAnimating}`);
      return;
    }

    logDebug(`Starting animation sequence: hideFor=${hideFor}, hideEnd=${hideEnd}`);

    // Initial hide if hideFor is set
    if (hideFor > 0) {
      isVisible = false;
      logDebug(`Hiding for ${hideFor}ms`);
      await new Promise((resolve) => setTimeout(resolve, hideFor));
    }

    isAnimating = true;
    isVisible = true;
    ariaAnnouncement = 'Animation started';

    for (let i = 0; i < animationsArray.length; i++) {
      const currentAnimation = animationsArray[i];
      const config = getCurrentConfig(i);

      // Apply initial delay if it's the first animation
      if (config.delay > 0) {
        logDebug(`Applying initial delay of ${config.delay}ms`);
        await new Promise((resolve) => setTimeout(resolve, config.delay));
      }

      // Hide between animations if enabled
      if (i > 0) {
        logDebug('Hiding between animations');
        isVisible = false;
        await new Promise((resolve) => setTimeout(resolve, 300)); //
      }

      // Ensure visibility
      isVisible = true;

      // Reset animation
      animationClass = '';
      await new Promise((resolve) => requestAnimationFrame(resolve));

      // Apply animation
      animationClass = getAnimationClasses(currentAnimation);
      logDebug(`Applying animation: ${animationClass}`);

      // Wait for animation duration
      await new Promise((resolve) => setTimeout(resolve, config.duration));

      // Pause between animations if specified
      if (i < animationsArray.length - 1 && config.pause > 0) {
        logDebug(`Pausing for ${config.pause}ms between animations`);
        await new Promise((resolve) => setTimeout(resolve, config.pause));
      }
    }

    // Short pause between repetitions
    await new Promise((resolve) => setTimeout(resolve, 500));

    // Final state
    isAnimating = false;
    animationClass = '';
    ariaAnnouncement = 'Animation completed';

    // Handle hideEnd
    if (hideEnd) {
      logDebug('Hiding at end of animation');
      isVisible = false;
    }
  }

  $effect(() => {
    if (!hasInitialized && action === true) {
      hasInitialized = true;
      startAnimation();
    }
  });
</script>

{#if prefersReducedMotion}
  {@render children()}
{:else}
  <span
    class="{animationClass} {className}"
    style="
      animation-duration: {getCurrentConfig(currentAnimationIndex).duration}ms; 
      opacity: {isVisible ? 1 : 0};
      display: inline-block;
    "
    aria-live="polite"
    aria-label={ariaAnnouncement}
  >
    {@render children()}
  </span>

  {#if debug}
    <div class="absolute bottom-0 left-0 right-0 bg-gray-100 text-xs p-2 max-h-32 overflow-y-auto">
      <h4>Debug Info:</h4>
      {#each debugInfo as info}
        <p>{info}</p>
      {/each}
    </div>
  {/if}
{/if}

<!--
@component
[Go to docs](https://svelte-animate.codewithshin.com/)
## Props
@prop children
@prop animations = 'zoomInRight'
@prop duration = 1000
@prop repeat = '1'
@prop hideFor = 0
@prop hideEnd = false
@prop showReplayButton = false
@prop delay = 0
@prop pauseDuration = 0
@prop class: className = ''
@prop debug = false
-->
