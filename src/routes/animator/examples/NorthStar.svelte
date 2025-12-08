<script lang="ts">
  import { Animator } from '$lib';
</script>

<div class="mx-auto max-w-6xl">
  <div class="mx-auto max-w-4xl bg-[url('/images/northstar.webp')] bg-left-bottom px-4 py-8">
    <div class="relative flex h-96 items-center justify-center overflow-hidden">
      <Animator
        class="absolute"
        animations={[{ action: 'zoomInDown' }]}
        duration={1500}
        hideEnd={true}
      >
        <h1 class="text-5xl font-bold text-blue-300">Svelte Aspire</h1>
      </Animator>

      <Animator
        class="absolute"
        animations={[{ action: 'fadeInLeft' }]}
        hideEnd={true}
        duration={1500}
        hideFor={2000}
      >
        <h2 class="text-5xl text-emerald-600">Resilient</h2>
      </Animator>

      <Animator
        class="absolute"
        animations={[{ action: 'bounceInRight' }]}
        hideEnd={true}
        duration={2000}
        hideFor={3500}
      >
        <p class="text-5xl text-rose-500">Accessible</p>
      </Animator>

      <Animator
        class="absolute"
        animations={[{ action: 'rollIn' }]}
        hideEnd={true}
        duration={1500}
        hideFor={5500}
      >
        <h3 class="text-5xl text-amber-600">Delightful</h3>
      </Animator>

      <Animator
        class="absolute"
        animations={[{ action: 'jackInTheBox' }]}
        hideEnd={true}
        duration={2000}
        hideFor={7000}
      >
        <p class="text-5xl text-cyan-300">to be Svelte's North Star</p>
      </Animator>

      <Animator class="absolute" animations={[{ action: 'fadeInUp' }]} hideFor={9500}>
        <p class="text-center text-4xl text-white">
          "Svelte exists to help us make better software." - Rich Harris
        </p>
      </Animator>
    </div>
  </div>
</div>
