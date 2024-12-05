<script lang="ts">
  import type { Snippet } from "svelte";
  import { setContext } from "svelte";

  interface Props {
    children: Snippet;
    action?: boolean;
  }

  let { children, action = false }: Props = $props();

  setContext("actionContext", action);
</script>


{@render children()}