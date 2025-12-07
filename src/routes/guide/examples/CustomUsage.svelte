<script lang="ts">
  import { Animate } from 'svelte-animate';
  import { P } from 'flowbite-svelte';
</script>

<Animate
  animations={['fadeInLeft', 'fadeOutRight']}
  trigger="click"
  duration={1000}
  delay={1000}
  repeat="2"
>
  <P class="border border-gray-200 p-2"
    >Click me! I will fade in from left and fade out right and repeat twice</P
  >
</Animate>

<Animate animations={['zoomInDown', 'zoomOut']} duration={2000} repeat="1" hideEnd={true}>
  <P class="border border-gray-200 p-2">Hover me! I will zoom in down and zoom out.</P>
</Animate>
