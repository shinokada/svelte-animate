<script lang="ts">
    import type { Snippet } from "svelte";
    import { setContext } from "svelte";

  interface Props {
    children: Snippet;
    action?: boolean;
  }

  let { children, action = $bindable(false) }: Props = $props();

  setContext("actionContext", action);
</script>

{@render children()}