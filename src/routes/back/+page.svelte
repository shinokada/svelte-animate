<script lang="ts">
  import { HighlightCompo, Code, H1, H2, H3 } from 'runes-webkit';
  import { Animate } from '$lib';
  import { AcademicCap } from 'svelte-heros-v2';
  const modules = import.meta.glob('./md/*.md', {
    query: '?raw',
    import: 'default',
    eager: true
  });
  import 'animate.css';
  // backInDown, backInLeft, backInRight, backInUp, backOutDown, backOutLeft, backOutRight, backOutUp,
</script>

<H1>Back</H1>
<H2>Back entrances</H2>
<h1 class="animate__animated animate__bounce">An animated element</h1>
<H3>backInDown</H3>
<Animate animation="backInDown" trigger="click" duration="0.5s">
  <p class="text-7xl font-bold">Svelte Animate</p>
</Animate>

<H3>backInLeft</H3>
<Animate animation="backInLeft" trigger="click" duration="0.5s">
  <h4>Svelte Animate</h4>
</Animate>

<H3>backInRight</H3>
<Animate animation="backInRight" trigger="click" duration="0.5s">
  <h4>Svelte Animate</h4>
</Animate>

<H3>backInUp</H3>

<H2>Back exits</H2>

<Animate animation="backInLeft" trigger="click" duration="0.5s">
  <AcademicCap size="50" color="#FF0000" ariaLabel="Upward arrow" />
</Animate>
