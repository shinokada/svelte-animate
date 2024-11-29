<script lang="ts">
  import { Animate } from '$lib';
</script>

<div class="flex items-center justify-center h-64">

  <Animate
  animations={[{ action: "bounce" }]}
  hideFor={2000}
  trigger="auto"
  >
  Animation Preview
</Animate>
</div>
