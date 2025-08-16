<script lang="ts">
  import { Animate } from 'svelte-animate';
  import { P } from 'flowbite-svelte';
</script>

<Animate>
<button>Hover to bounce!</button>
</Animate>

<Animate animations="rubberBand" trigger="click" delay={2000}>
  <P>Click for a slow, delayed effect!</P>
</Animate>

<Animate animations={['pulse', 'tada']} trigger="both" duration={500} repeat="3">
<P>I'll pulse and tada three times!</P>
</Animate>

<Animate animations={['fadeInUp', 'fadeOutDown']} trigger="click" hideEnd={true} duration={1500}>
  <P>I'll fade in, then out!</P>
</Animate>
