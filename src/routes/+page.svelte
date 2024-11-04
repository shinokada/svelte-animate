<script lang="ts">
  import { ArrowLeft, AtSign, BadgeCheck, Bell } from "$lib";
  // import AtSign from "$lib/AtSign.svelte";
  // import BadgeCheck from "$lib/BadgeCheck.svelte";
</script>

<h1>Svelte Motion Icons for Svelte 5</h1>
<div class="container">
<AtSign size={50}/>
<BadgeCheck size={50}/>
<Bell size={50} swingCount={2}/>
</div>

<style>
  .container {
  margin: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
  }
</style>