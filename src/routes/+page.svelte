<script lang="ts">
  import { Animate } from '$lib';
  import { TextGenerator } from './textGenerator.ts';
  import type { Component } from 'svelte';
  import { HighlightCompo, CodeWrapper, Code, H1, H2, H3, DocPage } from 'runes-webkit';
  import type { AnimationType } from '$lib';
  import { Sidebar, SidebarItem, SidebarGroup, Radio } from 'svelte-5-ui-lib';

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
    <H1>Svelte Animate</H1>
    <H2>Animation: {animationName}, Trigger: Click</H2>
    <div class="overflow-hidden grid grid-cols-1 w-full">
      <H3>Text</H3>
      <div class="overflow-hidden flex flex-col justify-center border dark:border-gray-600 rounded-lg h-72 min-w-64">
        <Animate trigger="click" animation={animationName as AnimationType} duration="1s">
          <p class="text-4xl font-bold">{randomText}</p>
        </Animate>
      </div>
      <H3>Image</H3>
      <div class="overflow-hidden flex flex-col items-center justify-center border dark:border-gray-600 rounded-lg h-72 min-w-64">
        <Animate trigger="click" animation={animationName as AnimationType} duration="1s">
          <img src="https://picsum.photos/200/200" alt="Demo" width="150" height="150" />
        </Animate>
      </div>
      <H3>SVG</H3>
      <div class="overflow-hidden flex flex-col items-center justify-center border dark:border-gray-600 rounded-lg h-72 min-w-64">
        <Animate trigger="click" animation={animationName as AnimationType} duration="1s">
          <RandomIcon size="100" color="blue" />
        </Animate>
      </div>
    </div>
  </div>
</DocPage>
