<script lang="ts">
  import { type AnimationType, type AutoTriggerType, type RepeatType, Animate } from '$lib';
  import { Input, Select, Label, Checkbox } from 'svelte-5-ui-lib';
  import DynamicCodeBlockHighlight from './utils/DynamicCodeBlockHighlight.svelte';
  import { isGeneratedCodeOverflow } from './utils/helper.ts';

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
  let selectedAnimations = $state<
    Array<{
      action: AnimationType;
      duration?: number;
      delay?: number;
      pause?: number;
    }>
  >([
    {
      action: 'bounce',
      duration: 1000,
      delay: 0,
      pause: 0
    }
  ]);
  let previewText = $state<string>('Animation Preview');
  let trigger = $state<AutoTriggerType>('hover');
  let duration = $state<number>(1000);

  let hideEnd = $state<boolean>(false);
  let showReplayButton = $state<boolean>(false);
  let delay = $state<number>(0);
  let repeat = $state<RepeatType>('1');
  let pauseDuration = $state<number>(0);

  // Animation management functions
  function addAnimation(): void {
    if (selectedAnimations.length < MAX_ANIMATIONS) {
      selectedAnimations = [
        ...selectedAnimations,
        {
          action: 'bounce',
          duration: duration,
          delay: 0,
          pause: 0
        }
      ];
    }
  }

  function removeAnimation(index: number): void {
    selectedAnimations = selectedAnimations.filter((_, i) => i !== index);
    if (selectedAnimations.length === 0) {
      selectedAnimations = [
        {
          action: 'bounce',
          duration: duration,
          delay: 0,
          pause: 0
        }
      ];
    }
  }

  let remainingAnimations = $derived(MAX_ANIMATIONS - selectedAnimations.length);

  // code generator
  let generatedCode = $derived(
    (() => {
      let props = [];
      if (trigger !== 'hover') props.push(` trigger="${trigger}"`);
      // Convert animations array to string with numeric duration
      const animStr = selectedAnimations
        .map((a) => {
          let animProps = [`action: "${a.action}"`];
          if (a.duration !== 1000) animProps.push(`duration: ${a.duration}`);
          if (a.delay !== 0) animProps.push(`delay: ${a.delay}`);
          if (a.pause !== 0) animProps.push(`pause: ${a.pause}`);
          return `{ ${animProps.join(', ')} }`;
        })
        .join(',   \n');
      props.push(` animations={[${animStr}]}`);

      // Remove duration from global props since it's now per-animation
      if (delay !== 0) props.push(` delay={${delay}}`);
      if (pauseDuration !== 0) props.push(` pauseDuration={${pauseDuration}}`);
      if (repeat !== '1') props.push(` repeat="${repeat}"`);
      if (hideEnd) props.push(` hideEnd={true}`);
      if (hideEnd && showReplayButton) props.push(` showReplayButton={true}`);

      const propsString = props.length > 0 ? props.map((prop) => `\n ${prop}`).join('') + '\n' : '';
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

  const handleHideEnd = () => {
    if (hideEnd === false && showReplayButton === true) {
      showReplayButton = false;
    }
  };
  const handleShowReplayButton = () => {
    if (hideEnd === false && showReplayButton === true) {
      hideEnd = true;
    }
  };
</script>

<div class="max-w-4xl mx-auto p-4">
  <h1>Animation Sequence Builder</h1>

  <!-- Preview Section -->
  <div class="mb-8 bg-gray-50 dark:bg-gray-800 p-6 rounded-lg">
    <div class="overflow-hidden h-72 flex items-center justify-center mb-4">
      <Animate animations={selectedAnimations} {trigger} {duration} {hideEnd} {showReplayButton} {delay} {repeat} {pauseDuration}>
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
      <div class="border border-gray-300 dark:border-gray-700 rounded-lg p-4 space-y-4">
        <div class="flex items-center justify-between">
          <span class="font-medium dark:text-white">Animation {index + 1}</span>
          <button onclick={() => removeAnimation(index)} class="px-3 py-1 bg-red-500 text-white rounded" disabled={selectedAnimations.length === 1}> Remove </button>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <!-- Animation Type -->
          <div>
            <Label class="block text-sm font-medium mb-1">Animation Type</Label>
            <Select bind:value={selectedAnimations[index].action} class="w-full px-3 py-2 border rounded">
              {#each animations as anim}
                <option value={anim}>{anim}</option>
              {/each}
            </Select>
          </div>

          <!-- Duration -->
          <div>
            <Label class="block text-sm font-medium mb-1">Duration (ms)</Label>
            <Input type="number" bind:value={selectedAnimations[index].duration} class="w-full px-3 py-2 border rounded" min="0" placeholder="e.g. 1000" />
          </div>

          <!-- Delay -->
          <div>
            <Label class="block text-sm font-medium mb-1">Delay (ms)</Label>
            <Input type="number" bind:value={selectedAnimations[index].delay} class="w-full px-3 py-2 border rounded" min="0" />
          </div>

          <!-- Pause -->
          <div>
            <Label class="block text-sm font-medium mb-1">Pause After (ms)</Label>
            <Input type="number" bind:value={selectedAnimations[index].pause} class="w-full px-3 py-2 border rounded" min="0" />
          </div>
        </div>
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
          <Checkbox bind:checked={hideEnd} onchange={handleHideEnd} class="form-checkbox" />
          <span class="ml-2">Hide End</span>
        </Label>
      </div>
    </div>
    <!-- Show Replay Options -->
    <div class="space-y-2">
      <Label class="block font-medium" for="visibility">Show Replay Options:</Label>
      <div class="space-x-4">
        <Label class="inline-flex items-center">
          <Checkbox bind:checked={showReplayButton} onchange={handleShowReplayButton} class="form-checkbox" />
          <span class="ml-2">Show Replay Button</span>
        </Label>
      </div>
    </div>
  </div>

  <h2>Codes</h2>
  <div class="mb-32">
    <DynamicCodeBlockHighlight handleExpandClick={handleBuilderExpandClick} expand={builderExpand} showExpandButton={showBuilderExpandButton} code={generatedCode} />
  </div>
</div>
