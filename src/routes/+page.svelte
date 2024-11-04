<script lang="ts">
  import { ArrowLeft, AtSign, BadgeCheck, Bell } from "$lib";
  // import AtSign from "$lib/AtSign.svelte";
  // import BadgeCheck from "$lib/BadgeCheck.svelte";
</script>


<div class="container">
  <h1>Svelte Motion Icons for Svelte 5</h1>
  <h2>Click to see Svelte Motion Icons</h2>
  <AtSign size={50} color="purple"/>
  <BadgeCheck size={50} color="green"/>
  <Bell size={50} swingCount={2} color="red"/>
</div>

<style>
  .container {
  margin: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    /* justify-content: center; */
    min-height: 100vh;
  }
</style>