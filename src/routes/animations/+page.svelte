<script lang="ts">
  import 'animate.css';
  import { Sidebar, SidebarItem, SidebarGroup, Radio, Label, Button } from 'svelte-5-ui-lib';
  import { DocPage } from 'runes-webkit';
  import Animations from '$lib/Animations.svelte';
  import type { AnimationType, AutoTriggerType, DurationType, RepeatType } from '$lib/types.ts';
  type AnimationCombination = {
    [key: string]: AnimationType[];
  };

  const animations: AnimationCombination = {
    'Fade In/Out': ['fadeIn', 'fadeOut'],
    Bounce: ['bounce', 'pulse'],
    Zoom: ['zoomIn', 'zoomOut'],
    Slide: ['slideInLeft', 'slideOutRight'],
    Rotate: ['rotateInDownLeft', 'rotateOutUpRight'],
    LightSpeed: ['lightSpeedInRight', 'lightSpeedOutLeft'],
    Flip: ['flipInX', 'flipOutX'],
    Hinge: ['hinge', 'rollOut'],
    'Jack in the Box': ['jackInTheBox', 'rollIn'],
    Back: ['backInDown', 'backOutUp'],
    'Fade, Bounce, Fade': ['fadeIn', 'bounce', 'fadeOut'],
    'Zoom, Swing, Zoom': ['zoomIn', 'swing', 'zoomOut'],
    'Slide, Tada, Slide': ['slideInLeft', 'tada', 'slideOutRight'],
    'Rotate, Rubber, Rotate': ['rotateInDownLeft', 'rubberBand', 'rotateOutUpRight'],
    'Jack, Head Shake, Roll': ['jackInTheBox', 'headShake', 'rollOut'],
    'Back, Jello, Back': ['backInDown', 'jello', 'backOutUp'],
    'LightSpeed, Shake, LightSpeed': ['lightSpeedInRight', 'shakeX', 'lightSpeedOutLeft'],
    'Flip, Wobble, Flip': ['flipInX', 'wobble', 'flipOutX'],
    'Bounce, Heart Beat, Bounce': ['bounceIn', 'heartBeat', 'bounceOut'],
    'Fade Down, Tada, Fade Up': ['fadeInDown', 'tada', 'fadeOutUp']
  };

  let animationList: AnimationType[] = $state(['slideInLeft', 'tada', 'slideOutRight']);
  const triggers = ['hover', 'click', 'both'];
  let trigger: AutoTriggerType = $state('click');
  const durations = ['1s', '2s', '3s', '800ms', '500ms'];
  let duration: DurationType = $state('1s');
  const delays = [0, 500, 1000, 1500, 2000, 3000];
  let delay: number = $state(0);
  const repeats = ['1', '2', '3', 'infinite'];
  let animationRepeat: RepeatType = $state('1');
  const pauseDurations = [0, 500, 800, 1000, 2000];
  let pauseDuration = $state(0);
  let hideAfter = $state(false);

  const handleAnimationListChange = (category: string) => {
    animationList = animations[category];
  };

  const handleHideAfterChange = () => {
    hideAfter = !hideAfter;
  };
</script>

<DocPage mainClass="mx-auto lg:pl-64" div2Class="w-full">
  <h1 class="text-3xl font-bold">Multiple Animations</h1>
  <Sidebar
    backdrop={false}
    breakpoint="lg"
    activeClass="flex items-center p-1 text-base font-normal text-white dark:hover:text-white hover:text-gray-900 bg-primary-700 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer"
    nonActiveClass="p-1 hover:bg-gray-200 hover:cursor-pointer"
    divClass="dark_bg_theme bg-gray-50"
    class="dark_bg_theme h-screen border-r border-gray-50 lg:top-[58px] dark:border-gray-700 mb-8"
  >
    <SidebarGroup>
      {#each Object.entries(animations) as [category]}
        <SidebarItem onclick={() => handleAnimationListChange(category)} label={category} />
      {/each}
    </SidebarGroup>
  </Sidebar>

  <div class="overflow-hidden grid grid-cols-1 w-full gap-4 h-48">
    <Animations animations={animationList} {trigger} {duration} {delay} {pauseDuration} hideBetween={true}>
      <p class="text-3xl font-bold">{animationList}</p>
    </Animations>
  </div>

  <div class="mb-4 flex flex-wrap space-x-4">
    <Label class="mb-4 w-full font-bold">Event</Label>
    {#each triggers as t}
      <Radio labelClass="w-24 my-1" name="event" bind:group={trigger} value={t}>{t}</Radio>
    {/each}
  </div>

  <div class="mb-4 flex flex-wrap space-x-4">
    <Label class="mb-4 w-full font-bold">Duration: {duration}</Label>
    {#each durations as d}
      <Radio labelClass="w-24 my-1" name="duration" bind:group={duration} value={d}>{d}</Radio>
    {/each}
  </div>

  <div class="mb-4 flex flex-wrap space-x-4">
    <Label class="mb-4 w-full font-bold">Delay: {delay}</Label>
    {#each delays as d}
      <Radio labelClass="w-24 my-1" name="delay" bind:group={delay} value={d}>{d}</Radio>
    {/each}
  </div>

  <div class="mb-4 flex flex-wrap space-x-4">
    <Label class="mb-4 w-full font-bold">Pause Duration: {pauseDuration}</Label>
    {#each pauseDurations as p}
      <Radio labelClass="w-24 my-1" name="pauseDuration" bind:group={pauseDuration} value={p}>{p}</Radio>
    {/each}
  </div>

  <div class="flex flex-wrap justify-center gap-2 md:justify-start mb-4">
    <Button class="w-40" color="blue" onclick={handleHideAfterChange}>{hideAfter ? 'Remove hideAfter' : 'Add hideAfter'}</Button>
  </div>

  <div class="overflow-hidden grid grid-cols-1 w-full gap-4">
    <h2>Repeat 2</h2>
    <Animations animations={['slideInLeft', 'tada', 'slideOutRight']} repeat="2" trigger="click" hideBetween={true}>
      <p class="text-3xl font-bold">Animations</p>
    </Animations>
  </div>

  <div class="overflow-hidden grid grid-cols-1 w-full gap-4">
    <h2>Repeat & hideEnd</h2>
    <Animations animations={['slideInLeft', 'tada', 'slideOutRight']} repeat="2" trigger="click" hideBetween={true} hideEnd={true}>
      <p class="text-3xl font-bold">Animations</p>
    </Animations>
  </div>
</DocPage>
