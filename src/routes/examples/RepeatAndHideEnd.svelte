<script lang="ts">
  import Animations from '$lib/Animations.svelte';
</script>

<div class="overflow-hidden grid grid-cols-1 w-full gap-4">
  <h2>Repeat & hideEnd</h2>
  <Animations animations={['slideInLeft', 'tada', 'slideOutRight']} repeat="2" trigger="click" hideBetween={true} hideEnd={true}>
    <p class="text-3xl font-bold">Animations</p>
  </Animations>
</div>
