<script lang="ts">
  import { Animate } from '$lib';
  import { AcademicCap } from 'svelte-heros-v2';
  // bounce, flash, pulse, rubberBand, shakeX, shakeY, headShake, swing, tada, wobble, jello, heartBeat
</script>

<div class="space-y-8 flex flex-col justify-center items-center">
  <h1>Svelte Animate for Svelte 5</h1>

  <Animate animation="bounce" delay="2s" speed="faster" trigger="hover" repeat={2}>
    <div>Animated content</div>
  </Animate>

  <Animate animation="bounce" trigger="hover" duration="0.5s">
    <AcademicCap size="50" color="#FF0000" />
  </Animate>

  <Animate animation="flash" trigger="click" duration="0.5s">
    <h1>Click me</h1>
  </Animate>

  <Animate animation="pulse" trigger="hover">
    <div class="w-40 h-40 bg-blue-200">Pulse</div>
  </Animate>

  <Animate animation="rubberBand" trigger="hover">
    <AcademicCap size="50" color="#FF0000" />
  </Animate>
  <!-- Example 1: Works with keyboard -->
  <Animate animation="bounce" trigger="click">
    <div>Press Tab to focus, then Enter/Space to animate</div>
  </Animate>

  <!-- Example 2: Works with keyboard -->
  <Animate animation="bounce" trigger="both">
    <div>Press Tab to focus, then Enter/Space to animate (also works with hover)</div>
  </Animate>

  <!-- Example 3: No keyboard trigger -->
  <Animate animation="bounce" trigger="hover">
    <div>Keyboard keys won't trigger animation, only hover will work</div>
  </Animate>
</div>
