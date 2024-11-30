<script lang="ts">
  import { Animator } from '$lib';
</script>

<div class="relative flex items-center justify-center h-96">
  <Animator
    class="absolute"
    animations={[{ action: "rotateInUpRight" }]}
    trigger="auto"
    hideEnd={true}
  >
    <h1 class="text-4xl font-bold text-blue-600">Svelte Animate</h1>
  </Animator>
  <Animator
    class="absolute"
    animations={[{ action: "fadeInUp" }]}
    hideFor={1500}
    trigger="auto"
    hideEnd={true}
  >
    <h2 class="text-4xl text-green-500">Powerful Animations</h2>
  </Animator>
  <Animator
    class="absolute"
    animations={[{ action: "bounce" }]}
    hideFor={3000}
    trigger="auto"
    hideEnd={true}
  >
    <p class="text-4xl text-purple-600">Smooth Transitions</p>
  </Animator>
  <Animator
    class="absolute"
    animations={[{ action: "lightSpeedInLeft" }]}
    hideFor={4000}
    trigger="auto"
    hideEnd={true}
  >
    <h3 class="text-3xl text-red-500">Customizable Effects</h3>
  </Animator>
  <Animator
    class="absolute"
    animations={[{ action: "zoomInDown" }]}
    hideFor={5500}
    trigger="auto"
    hideEnd={true}
  >
    <p class="text-3xl text-orange-500">Easy to Use</p>
  </Animator>
  <Animator
    class="absolute"
    animations={[{ action: "slideInRight" }]}
    hideFor={7000}
    trigger="auto"
    hideEnd={true}
  >
    <h4 class="text-4xl text-teal-600">Responsive Design</h4>
  </Animator>
  <Animator
    class="absolute"
    animations={[{ action: "rotateInUpRight" }]}
    trigger="auto"
    hideFor={8000}
  >
    <h1 class="text-4xl font-bold text-blue-600">Svelte Animate</h1>
  </Animator>
</div>