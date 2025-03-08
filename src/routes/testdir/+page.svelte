<script lang="ts">
  import { Animate } from '$lib';
</script>

<div class="flex flex-col max-w-5xl mx-auto justify-center items-center overflow-hidden h-96">
  <Animate 
  animations="fadeIn" 
  trigger="click" 
  duration={2000} 
  delay={1000} 
  repeat="2"
>
  <div>Click me for a customized animation experience!</div>
</Animate>

<Animate 
  animations={[
    { action: 'fadeIn', duration: 1000, delay: 500 },
    { action: 'zoomOut', duration: 2000, pause: 1000 }
  ]} 
  trigger="click" 
  hideEnd={true}
  showReplayButton={true}
>
  <div>Click me for a customized animation sequence!</div>
</Animate>
</div>
