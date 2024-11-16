<script lang="ts">
  import { Animations } from '$lib';
</script>

<div class="overflow-hidden h-72 flex items-center justify-center mb-4">
  <Animations trigger="click" animations={[{ action: 'fadeInLeft' }, { action: 'rollIn' }, { action: 'tada' }]} hideBetween={true}><h1>Animation Preview</h1></Animations>
</div>
