<script lang="ts">
  import { type AnimationType, Animate } from '$lib';

  const animations: AnimationType[] = [
    'bounce', 'flash', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake',
    'swing', 'tada', 'wobble', 'jello', 'heartBeat', 'backInDown', 'backInLeft',
    'backInRight', 'backInUp', 'backOutDown', 'backOutLeft', 'backOutRight',
    'backOutUp', 'bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight',
    'bounceInUp', 'bounceOut', 'bounceOutDown', 'bounceOutLeft', 'bounceOutRight',
    'bounceOutUp', 'fadeIn', 'fadeInDown', 'fadeInDownBig', 'fadeInLeft',
    'fadeInLeftBig', 'fadeInRight', 'fadeInRightBig', 'fadeInUp', 'fadeInUpBig',
    'fadeOut', 'fadeOutDown', 'fadeOutDownBig', 'fadeOutLeft', 'fadeOutLeftBig',
    'fadeOutRight', 'fadeOutRightBig', 'fadeOutUp', 'fadeOutUpBig', 'flip',
    'flipInX', 'flipInY', 'flipOutX', 'flipOutY', 'lightSpeedInRight',
    'lightSpeedInLeft', 'lightSpeedOutRight', 'lightSpeedOutLeft', 'rotateIn',
    'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight',
    'rotateOut', 'rotateOutDownLeft', 'rotateOutDownRight', 'rotateOutUpLeft',
    'rotateOutUpRight', 'hinge', 'jackInTheBox', 'rollIn', 'rollOut', 'zoomIn',
    'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp', 'zoomOut',
    'zoomOutDown', 'zoomOutLeft', 'zoomOutRight', 'zoomOutUp', 'slideInDown',
    'slideInLeft', 'slideInRight', 'slideInUp', 'slideOutDown', 'slideOutLeft',
    'slideOutRight', 'slideOutUp'
  ].sort() as AnimationType[];

  let selectedAnimations = $state<AnimationType[]>(['bounce']);
  let previewText = $state<string>("Animation Preview");

  function addAnimation(): void {
    selectedAnimations = [...selectedAnimations, 'bounce'];
  }

  function removeAnimation(index: number): void {
    selectedAnimations = selectedAnimations.filter((_, i) => i !== index);
    if (selectedAnimations.length === 0) {
      selectedAnimations = ['bounce'];
    }
  }
</script>

<div class="container mx-auto p-4">
  <h1 class="text-2xl font-bold mb-4">Animation Sequence Builder</h1>
  
  <div class="mb-8">
    <div class="flex items-center justify-center mb-4">
      <Animate
        animations={selectedAnimations}
        trigger="click"
        hideBetween={true}
        duration="1s"
        pauseDuration={500}
      >
        <div class="text-xl font-bold">{previewText}</div>
      </Animate>
    </div>
    <div class="flex justify-center mb-4">
      <input 
        type="text" 
        bind:value={previewText}
        class="px-3 py-2 border rounded mr-2" 
        placeholder="Enter preview text"
      />
    </div>
  </div>

  <div class="space-y-4">
    {#each selectedAnimations as animation, index}
      <div class="flex items-center space-x-2">
        <span class="font-medium">Animation {index + 1}:</span>
        <select 
          bind:value={selectedAnimations[index]}
          class="flex-grow px-3 py-2 border rounded"
        >
          <option value="">Select an animation</option>
          {#each animations as anim}
            <option value={anim}>{anim}</option>
          {/each}
        </select>
        <button 
          onclick={() => removeAnimation(index)}
          class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Remove
        </button>
      </div>
    {/each}

    <button 
      onclick={addAnimation}
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
    >
      Add Animation
    </button>
  </div>
</div>
<!-- svelte-ignore css_unused_selector -->
