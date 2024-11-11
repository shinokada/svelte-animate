<script lang="ts">
  import { Animate, type TriggerType, type DurationType, type DelayType, type RepeatType } from '$lib';
  import { TextGenerator } from './textGenerator.ts';
  import type { Component } from 'svelte';
  import { CodeWrapper, H1, DocPage } from 'runes-webkit';
  import type { AnimationType } from '$lib';
  import { Sidebar, SidebarItem, SidebarGroup, Radio, Label, uiHelpers, Button } from 'svelte-5-ui-lib';
  import DynamicCodeBlockHighlight from './utils/DynamicCodeBlockHighlight.svelte';
  import { isGeneratedCodeOverflow } from './utils/helper.ts';

  // random icon
  import * as icons from 'svelte-heros-v2';
  type IconType = typeof icons;
  type IconKey = keyof IconType;
  const iconList = Object.keys(icons) as IconKey[];
  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * iconList.length);
    const randomIconName = iconList[randomIndex];
    return icons[randomIconName] as Component;
  };
  let RandomIcon = $state(getRandomIcon());

  // text generator
  const myGenerator = new TextGenerator();
  let randomText: string = myGenerator.getGreetingWithQuestion();

  const animations = {
    'Attention Seekers': ['bounce', 'flash', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat'],
    Bouncing: ['bounceIn', 'bounceInDown', 'bounceInLeft', 'bounceInRight', 'bounceInUp'],
    Fading: ['fadeIn', 'fadeInDown', 'fadeInLeft', 'fadeInRight', 'fadeInUp'],
    Rotating: ['rotateIn', 'rotateInDownLeft', 'rotateInDownRight', 'rotateInUpLeft', 'rotateInUpRight'],
    Sliding: ['slideInDown', 'slideInLeft', 'slideInRight', 'slideInUp'],
    Zooming: ['zoomIn', 'zoomInDown', 'zoomInLeft', 'zoomInRight', 'zoomInUp']
  };
  let animationName = $state('bounce');
  const handleClick = (animation: AnimationType) => {
    animationName = animation;
  };

  const durations: DurationType[] = ['1s', '2s', '3s', '500ms', '800ms'];
  let animateDuration: DurationType = $state('1s');
  const delays: DelayType[] = ['0s', '1s', '2s', '3s', '4s', '5s'];
  let animateDelay: DelayType = $state('0s');
  const repeats: RepeatType[] = ['1', '2', '3', 'infinite'];
  let animateRepeat: RepeatType = $state('1');

  const triggers = ['click', 'hover', 'both'];
  let animateTrigger = $state('click');
  let hideAfter = $state(false);
  const handleHideAfter = () => {
    hideAfter = !hideAfter;
  };

  // code generator
  let generatedCode = $derived(
    (() => {
      let props = [];
      if (animateTrigger !== 'hover') props.push(` trigger="${animateTrigger}"`);
      if (animationName !== 'bounce') props.push(` animation="${animationName}"`);
      if (animateDelay !== '0s') props.push(` delay="${animateDelay}"`);
      if (animateDuration !== '1s') props.push(` duration="${animateDuration}"`);
      if (animateRepeat !== '1') props.push(` repeat="${animateRepeat}"`);
      if (hideAfter) props.push(` hideAfter={true}`);
      const propsString = props.length > 0 ? props.map((prop) => `\n  ${prop}`).join('') + '\n' : '';
      return `<Animate${propsString}>
  My animation item
</Animate>`;
    })()
  );
  // end of code generator

  // for interactive builder
  let builder = uiHelpers();
  let builderExpand = $state(false);
  let showBuilderExpandButton = $derived(isGeneratedCodeOverflow(generatedCode));
  const handleBuilderExpandClick = () => {
    builderExpand = !builderExpand;
  };
</script>

<DocPage mainClass="mx-auto lg:pl-64" div2Class="w-full">
  <Sidebar
    backdrop={false}
    breakpoint="lg"
    activeClass="flex items-center p-1 text-base font-normal text-white dark:hover:text-white hover:text-gray-900 bg-primary-700 dark:bg-primary-700 rounded-lg dark:text-white hover:bg-gray-200 dark:hover:bg-gray-700 hover:cursor-pointer"
    nonActiveClass="p-1 hover:bg-gray-200 hover:cursor-pointer"
    divClass="dark_bg_theme bg-gray-50"
    class="dark_bg_theme h-screen border-r border-gray-50 lg:top-[58px] dark:border-gray-700 mb-8"
  >
    <SidebarGroup>
      {#each Object.entries(animations) as [category, animationList]}
        <h3 class="category-title my-1">{category}</h3>
        {#each animationList as animation}
          <SidebarItem onclick={() => handleClick(animation as AnimationType)} label={animation} />
        {/each}
      {/each}
    </SidebarGroup>
  </Sidebar>

  <div class="w-full max-w-4xl mx-auto p-4 space-y-6">
    <H1>Svelte Animate: {animationName}</H1>
    <CodeWrapper>
      <div class="mb-4 flex flex-wrap space-x-4">
        <Label class="mb-4 w-full font-bold">Event</Label>
        {#each triggers as trigger}
          <Radio labelClass="w-12 my-1" name="event" bind:group={animateTrigger} value={trigger}>{trigger}</Radio>
        {/each}
      </div>
      <div class="mb-4 flex flex-wrap space-x-4">
        <Label class="mb-4 w-full font-bold">Duration: {animateDuration}</Label>
        {#each durations as duration}
          <Radio labelClass="w-32 my-1" name="duration" bind:group={animateDuration} value={duration}>{duration}</Radio>
        {/each}
      </div>
      <div class="mb-4 flex flex-wrap space-x-4">
        <Label class="mb-4 w-full font-bold">Delay: {animateDelay}</Label>
        {#each delays as delay}
          <Radio labelClass="w-32 my-1" name="delay" bind:group={animateDelay} value={delay}>{delay}</Radio>
        {/each}
      </div>
      <div class="mb-4 flex flex-wrap space-x-4">
        <Label class="mb-4 w-full font-bold">Repeat: {animateRepeat}</Label>
        {#each repeats as repeat}
          <Radio labelClass="w-32 my-1" name="repeat" bind:group={animateRepeat} value={repeat}>{repeat}</Radio>
        {/each}
      </div>

      <div class="flex flex-wrap justify-center gap-2 md:justify-start mb-4">
        <Button class="w-48" color="blue" onclick={handleHideAfter}>{hideAfter ? 'Remove hideAfter' : 'Add hideAfter'}</Button>
      </div>
      <div class="overflow-hidden grid grid-cols-1 w-full gap-4">
        <div class="overflow-hidden flex flex-col justify-center border dark:border-gray-600 rounded-lg h-60 min-w-64">
          <Animate trigger={animateTrigger as TriggerType} animation={animationName as AnimationType} duration={animateDuration as DurationType} delay={animateDelay as DelayType} repeat={animateRepeat} {hideAfter}>
            <p class="text-3xl font-bold">{randomText}</p>
          </Animate>
        </div>
        <div class="overflow-hidden flex flex-col items-center justify-center border dark:border-gray-600 rounded-lg h-60 min-w-64">
          <Animate trigger={animateTrigger as TriggerType} animation={animationName as AnimationType} duration={animateDuration as DurationType} delay={animateDelay as DelayType} repeat={animateRepeat} {hideAfter}>
            <img src="https://picsum.photos/200/200" alt="Demo" width="150" height="150" />
          </Animate>
        </div>
        <div class="overflow-hidden flex flex-col items-center justify-center border dark:border-gray-600 rounded-lg h-60 min-w-64">
          <Animate trigger={animateTrigger as TriggerType} animation={animationName as AnimationType} duration={animateDuration as DurationType} delay={animateDelay as DelayType} repeat={animateRepeat} {hideAfter}>
            <RandomIcon size="50" color="blue" />
          </Animate>
        </div>
      </div>
      {#snippet codeblock()}
        <DynamicCodeBlockHighlight handleExpandClick={handleBuilderExpandClick} expand={builderExpand} showExpandButton={showBuilderExpandButton} code={generatedCode} />
      {/snippet}
    </CodeWrapper>
  </div>
</DocPage>
