<script lang="ts">
  import { type AnimationType, type AutoTriggerType, type RepeatType, Animate } from '$lib';
  import { Input, Select, Label, Checkbox } from 'svelte-5-ui-lib';
  import DynamicCodeBlockHighlight from './utils/DynamicCodeBlockHighlight.svelte';
  import { isGeneratedCodeOverflow } from './utils/helper.ts';
  import { convertAnimationNames } from './utils/helper.ts';

  const MAX_ANIMATIONS = 10;
  const animations: AnimationType[] = [
    'bounce',
    'flash',
    'pulse',
    'rubberBand',
    'shakeX',
    'shakeY',
    'headShake',
    'swing',
    'tada',
    'wobble',
    'jello',
    'heartBeat',
    'backInDown',
    'backInLeft',
    'backInRight',
    'backInUp',
    'backOutDown',
    'backOutLeft',
    'backOutRight',
    'backOutUp',
    'bounceIn',
    'bounceInDown',
    'bounceInLeft',
    'bounceInRight',
    'bounceInUp',
    'bounceOut',
    'bounceOutDown',
    'bounceOutLeft',
    'bounceOutRight',
    'bounceOutUp',
    'fadeIn',
    'fadeInDown',
    'fadeInDownBig',
    'fadeInLeft',
    'fadeInLeftBig',
    'fadeInRight',
    'fadeInRightBig',
    'fadeInUp',
    'fadeInUpBig',
    'fadeOut',
    'fadeOutDown',
    'fadeOutDownBig',
    'fadeOutLeft',
    'fadeOutLeftBig',
    'fadeOutRight',
    'fadeOutRightBig',
    'fadeOutUp',
    'fadeOutUpBig',
    'flip',
    'flipInX',
    'flipInY',
    'flipOutX',
    'flipOutY',
    'lightSpeedInRight',
    'lightSpeedInLeft',
    'lightSpeedOutRight',
    'lightSpeedOutLeft',
    'rotateIn',
    'rotateInDownLeft',
    'rotateInDownRight',
    'rotateInUpLeft',
    'rotateInUpRight',
    'rotateOut',
    'rotateOutDownLeft',
    'rotateOutDownRight',
    'rotateOutUpLeft',
    'rotateOutUpRight',
    'hinge',
    'jackInTheBox',
    'rollIn',
    'rollOut',
    'zoomIn',
    'zoomInDown',
    'zoomInLeft',
    'zoomInRight',
    'zoomInUp',
    'zoomOut',
    'zoomOutDown',
    'zoomOutLeft',
    'zoomOutRight',
    'zoomOutUp',
    'slideInDown',
    'slideInLeft',
    'slideInRight',
    'slideInUp',
    'slideOutDown',
    'slideOutLeft',
    'slideOutRight',
    'slideOutUp'
  ].sort() as AnimationType[];

  // State variables
  let selectedAnimations = $state<AnimationType[]>(['bounce']);
  let previewText = $state<string>('Animation Preview');
  let trigger = $state<AutoTriggerType>('hover');
  let duration = $state<string>('1s');

  let hideEnd = $state<boolean>(false);
  let delay = $state<number>(0);
  let repeat = $state<RepeatType>('1');
  let pauseDuration = $state<number>(0);

  // Animation management functions
  function addAnimation(): void {
    if (selectedAnimations.length < MAX_ANIMATIONS) {
      selectedAnimations = [...selectedAnimations, 'bounce'];
    }
  }

  function removeAnimation(index: number): void {
    selectedAnimations = selectedAnimations.filter((_, i) => i !== index);
    if (selectedAnimations.length === 0) {
      selectedAnimations = ['bounce'];
    }
  }

  let remainingAnimations = $derived(MAX_ANIMATIONS - selectedAnimations.length);

  // code generator
  let generatedCode = $derived(
    (() => {
      let props = [];
      if (trigger !== 'hover') props.push(` trigger="${trigger}"`);
      if (selectedAnimations[0] !== 'bounce') props.push(` animations={[${convertAnimationNames(selectedAnimations)}]}`);
      if (selectedAnimations.length > 1) props.push(` hideBetween={true}`);
      if (delay !== 0) props.push(` delay={${delay}}`);
      if (pauseDuration !== 0) props.push(` pauseDuration={${pauseDuration}}`);
      if (duration !== '1s') props.push(` duration="${duration}"`);
      if (repeat !== '1') props.push(` repeat="${repeat}"`);
      if (hideEnd) props.push(` hideEnd={true}`);
      const propsString = props.length > 0 ? props.map((prop) => `\n  ${prop}`).join('') + '\n' : '';
      return `<Animate${propsString}>
  ${previewText}
</Animate>`;
    })()
  );
  // end of code generator
  // for interactive builder
  let builderExpand = $state(false);
  let showBuilderExpandButton = $derived(isGeneratedCodeOverflow(generatedCode));
  const handleBuilderExpandClick = () => {
    builderExpand = !builderExpand;
  };
</script>

<div class="max-w-4xl mx-auto p-4">
  <h1>Animation Sequence Builder</h1>

  <!-- Preview Section -->
  <div class="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
    <div class="overflow-hidden h-72 flex items-center justify-center mb-4">
      <Animate animations={selectedAnimations} {trigger} {duration} hideBetween={true} {hideEnd} {delay} {repeat} {pauseDuration}>
        <h2>{previewText}</h2>
      </Animate>
    </div>
    <div class="flex justify-center mb-4">
      <Input type="text" bind:value={previewText} class="px-3 py-2 border rounded mr-2 w-64" placeholder="Enter preview text" />
    </div>
  </div>

  <!-- Animation Sequence Builder -->
  <div class="space-y-4 mb-8">
    <h2>Animation Sequence</h2>
    <span class="text-sm text-gray-600 dark:text-white">
      {remainingAnimations} of {MAX_ANIMATIONS} animations remaining
    </span>
    <!-- eslint-disable @typescript-eslint/no-unused-vars -->
    {#each selectedAnimations as animation, index}
      <div class="flex items-center space-x-2">
        <span class="dark:text-white w-32 font-medium">Animation {index + 1}:</span>
        <Select bind:value={selectedAnimations[index]} class="flex-grow px-3 py-2 border rounded">
          <option value="">Select an animation</option>
          {#each animations as anim}
            <option value={anim}>{anim}</option>
          {/each}
        </Select>
        <button onclick={() => removeAnimation(index)} class="px-3 py-2 bg-red-500 text-white rounded hover:bg-red-600" disabled={selectedAnimations.length === 1}> Remove </button>
      </div>
    {/each}

    <button
      onclick={addAnimation}
      disabled={selectedAnimations.length >= MAX_ANIMATIONS}
      class="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Add Animation
    </button>
  </div>

  <!-- Controls Section -->
  <h2>Controls</h2>
  <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
    <!-- Trigger Selection -->
    <div class="space-y-2">
      <Label class="block font-medium" for="trigger">Trigger Type:</Label>
      <Select bind:value={trigger} class="w-full px-3 py-2 border rounded">
        <option value="hover">Hover</option>
        <option value="click">Click</option>
        <option value="both">Both</option>
        <option value="auto">Auto</option>
      </Select>
    </div>

    <!-- Duration Input -->
    <div class="space-y-2">
      <Label class="block font-medium" for="duration">Duration:</Label>
      <Input type="text" bind:value={duration} class="w-full px-3 py-2 border rounded" placeholder="e.g., 1s or 1000ms" />
    </div>

    <!-- Delay Input -->
    <div class="space-y-2">
      <Label class="block font-medium" for="delay">Delay (ms):</Label>
      <Input type="number" bind:value={delay} min="0" class="w-full px-3 py-2 border rounded" />
    </div>

    <!-- Pause Duration Input -->
    <div class="space-y-2">
      <Label class="block font-medium" for="pauseDuration">Pause Duration (ms):</Label>
      <Input type="number" bind:value={pauseDuration} min="0" class="w-full px-3 py-2 border rounded" />
    </div>

    <!-- Repeat Selection -->
    <div class="space-y-2">
      <Label class="block font-medium" for="repeat">Repeat:</Label>
      <Select bind:value={repeat} class="w-full px-3 py-2 border rounded">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="infinite">Infinite</option>
      </Select>
    </div>

    <!-- Visibility Options -->
    <div class="space-y-2">
      <Label class="block font-medium" for="visibility">Visibility Options:</Label>
      <div class="space-x-4">
        <Label class="inline-flex items-center">
          <Checkbox bind:checked={hideEnd} class="form-checkbox" />
          <span class="ml-2">Hide End</span>
        </Label>
      </div>
    </div>
  </div>

  <h2>Codes</h2>
  <div class="mb-32">
    <DynamicCodeBlockHighlight handleExpandClick={handleBuilderExpandClick} expand={builderExpand} showExpandButton={showBuilderExpandButton} code={generatedCode} />
  </div>
</div>
