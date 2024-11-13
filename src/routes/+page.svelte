<script lang="ts">
  import { Animate, type AutoTriggerType, type RepeatType, type AnimationType } from '$lib';
  import type { Component } from 'svelte';
  import { CodeWrapper, H1 } from 'runes-webkit';
  import { Sidebar, SidebarItem, SidebarGroup, Radio, Label, SidebarButton, uiHelpers, Button } from 'svelte-5-ui-lib';
  import DynamicCodeBlockHighlight from './utils/DynamicCodeBlockHighlight.svelte';
  import { isGeneratedCodeOverflow } from './utils/helper.ts';
  import { TextGenerator } from './utils/textGenerator.ts';
  import { animations } from './utils/sidebarMenu.ts';
  import * as icons from 'flowbite-svelte-icons';

  type IconType = typeof icons;
  type IconKey = keyof IconType;
  type ContentType = 'text' | 'image' | 'icon';

  const iconList = Object.keys(icons) as IconKey[];
  // random icons
  const getRandomIcon = () => {
    const randomIndex = Math.floor(Math.random() * iconList.length);
    const randomIconName = iconList[randomIndex];
    return icons[randomIconName] as Component;
  };
  let RandomIcon = $state(getRandomIcon());

  // text generator
  const myGenerator = new TextGenerator();
  let randomText = $state(myGenerator.getGreetingWithQuestion());

  // random image
  let imgUrl = $state('');
  imgUrl = `https://picsum.photos/200/200?${Date.now()}`;

  const elements: ContentType[] = ['text', 'image', 'icon'];
  let selectedType = $state<ContentType>('text');

  let animationName: AnimationType | AnimationType[] = $state(['bounce']);
  const handleClick = (animation: AnimationType | AnimationType[]) => {
    animationName = animation;
  };

  const durations: string[] = ['1s', '2s', '3s', '500ms', '800ms'];
  let animateDuration: string = $state('1s');
  const delays: number[] = [0, 500, 1000, 1500, 2000, 2500];
  let animateDelay: number = $state(0);
  const repeats: RepeatType[] = ['1', '2', '3', 'infinite'];
  let animateRepeat: RepeatType = $state('1');

  const triggers = ['hover', 'click', 'both'];
  let animateTrigger = $state('click');
  let hideAfter = $state(false);
  const handleHideAfter = () => {
    hideAfter = !hideAfter;
  };

  // code generator
  let generatedCode = $derived(
    (() => {
      let props = [];
      let element = 'Hello World!';
      if (animateTrigger !== 'hover') props.push(` trigger="${animateTrigger}"`);
      if (animationName[0] !== 'bounce') props.push(` animation=["${animationName}"]`);
      if (animateDelay !== 0) props.push(` delay="${animateDelay}"`);
      if (animateDuration !== '1s') props.push(` duration="${animateDuration}"`);
      if (animateRepeat !== '1') props.push(` repeat="${animateRepeat}"`);
      if (hideAfter) props.push(` hideAfter={true}`);
      if (selectedType === 'text') {
        element = `${randomText}`;
      } else if (selectedType === 'image') {
        element = '<img src="/images/myimg.png" alt="Demo" width="150" height="150" />';
      } else if (selectedType === 'icon') {
        element = '<MyIcon color="blue" class="h-28 w-28 mx-auto" />';
      }
      const propsString = props.length > 0 ? props.map((prop) => `\n  ${prop}`).join('') + '\n' : '';
      return `<Animate${propsString}>
  ${element}
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
  // sidebar
  const sidebarUi = uiHelpers();
  let isSidebarOpen = $state(false);
  const closeSidebar = sidebarUi.close;
  $effect(() => {
    isSidebarOpen = sidebarUi.isOpen;
  });
</script>

<SidebarButton onclick={sidebarUi.toggle} breakpoint="lg" class="mb-2" />
<div class="mx-auto lg:pl-64">
  <Sidebar
    backdrop={false}
    isOpen={isSidebarOpen}
    {closeSidebar}
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
          <SidebarItem onclick={() => handleClick(animation as AnimationType | AnimationType[])} label={animation as string} />
        {/each}
      {/each}
    </SidebarGroup>
  </Sidebar>

  <div class="w-full max-w-4xl mx-auto p-4 space-y-6">
    <H1>Animatation(s): <span class="text-2xl">{animationName}</span></H1>
    <CodeWrapper>
      <div class="overflow-hidden grid grid-cols-1 w-full gap-4 mb-4">
        <div class="overflow-hidden flex flex-col justify-center border dark:border-gray-600 rounded-lg h-60 min-w-64">
          <Animate trigger={animateTrigger as AutoTriggerType} animations={animationName} duration={animateDuration} delay={animateDelay} repeat={animateRepeat} hideBetween={true}>
            {#if selectedType === 'text'}
              <p class="text-3xl">{randomText}</p>
            {:else if selectedType === 'image'}
              <img src={imgUrl} alt="Demo" width="150" height="150" class="mx-auto" />
            {:else if selectedType === 'icon'}
              <RandomIcon color="blue" class="h-28 w-28 mx-auto" />
            {/if}
          </Animate>
        </div>
      </div>

      <div class="mb-4 flex flex-wrap space-x-4">
        <Label class="mb-4 w-full font-bold">Event</Label>
        {#each elements as element}
          <Radio labelClass="w-24 my-1" name="type" bind:group={selectedType} value={element}>{element}</Radio>
        {/each}
      </div>
      <div class="mb-4 flex flex-wrap space-x-4">
        <Label class="mb-4 w-full font-bold">Event</Label>
        {#each triggers as trigger}
          <Radio labelClass="w-24 my-1" name="event" bind:group={animateTrigger} value={trigger}>{trigger}</Radio>
        {/each}
      </div>
      <div class="mb-4 flex flex-wrap space-x-4">
        <Label class="mb-4 w-full font-bold">Duration: {animateDuration}</Label>
        {#each durations as duration}
          <Radio labelClass="w-24 my-1" name="duration" bind:group={animateDuration} value={duration}>{duration}</Radio>
        {/each}
      </div>
      <div class="mb-4 flex flex-wrap space-x-4">
        <Label class="mb-4 w-full font-bold">Delay: {animateDelay}</Label>
        {#each delays as delay}
          <Radio labelClass="w-24 my-1" name="delay" bind:group={animateDelay} value={delay}>{delay}</Radio>
        {/each}
      </div>
      <div class="mb-4 flex flex-wrap space-x-4">
        <Label class="mb-4 w-full font-bold">Repeat: {animateRepeat}</Label>
        {#each repeats as repeat}
          <Radio labelClass="w-24 my-1" name="repeat" bind:group={animateRepeat} value={repeat}>{repeat}</Radio>
        {/each}
      </div>

      <div class="flex flex-wrap justify-center gap-2 md:justify-start mb-4">
        <Button class="w-48" color="blue" onclick={handleHideAfter}>{hideAfter ? 'Remove hideAfter' : 'Add hideAfter'}</Button>
      </div>

      {#snippet codeblock()}
        <DynamicCodeBlockHighlight handleExpandClick={handleBuilderExpandClick} expand={builderExpand} showExpandButton={showBuilderExpandButton} code={generatedCode} />
      {/snippet}
    </CodeWrapper>
  </div>
</div>
