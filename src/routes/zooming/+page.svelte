<script lang="ts">
  import { HighlightCompo, Code, H2 } from 'runes-webkit';
  import { License, StaticBadge, NpmVersion, NpmDownload } from 'svelte-shields';
  import { Animate } from '$lib';

  const modules = import.meta.glob('./examples/*.svelte', {
    query: '?raw',
    import: 'default',
    eager: true
  });
</script>

<h1>Zooming</h1>

<Animate animation="zoomIn" trigger="click" duration="0.5s">
  <h1>Hello World!</h1>
</Animate>

<Animate animation="zoomOutRight" trigger="click" duration="0.5s" hideAfter={true}>
  <div style="height: 200px; width: 200px; background: #0055f0"></div>
</Animate>
