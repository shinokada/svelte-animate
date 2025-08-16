<script lang="ts">
  import { tick } from 'svelte';
  import type { Attachment } from 'svelte/attachments';
  import { HighlightSvelte, Highlight } from 'svelte-rune-highlight';
  import markdown from 'highlight.js/lib/languages/markdown';
  import { Clipboard } from 'flowbite-svelte';
  import { replaceLibImport } from './helpers';
  import { highlightcompo } from './theme';

  interface Props {
    code: string;
    contentClass?: string;
    codeLang?: string;
    class?: string;
    expanded?: boolean;
    replaceLib?: string;
  }

  let {
    code,
    codeLang,
    contentClass = 'overflow-hidden',
    replaceLib = '',
    class: className = ''
  }: Props = $props();

  // Create a derived value for the processed code to avoid mutating props
  let processedCode = $derived(replaceLib ? replaceLibImport(code, replaceLib) : code);
  let value = $state('');

  let showExpandButton: boolean = $state(false);
  let expand: boolean = $state(false);

  const checkOverflow: Attachment<HTMLElement> = (el) => {
    const ro = new ResizeObserver(() => {
      const isOverflowingY = el.clientHeight < el.scrollHeight;
      showExpandButton = isOverflowingY;
    });

    (async () => {
      await tick();
      ro.observe(el);
    })();

    return () => ro.disconnect();
  };

  const base = $derived(highlightcompo());

  const handleExpandClick = () => {
    expand = !expand;
  };

  const mdLang = {
    name: 'markdown',
    register: markdown
  };

  // Update clipboard value when processed code changes
  $effect(() => {
    value = processedCode;
  });
</script>

<div class="{base} {className}">
  <div
    class="relative {contentClass}"
    class:max-h-72={!expand}
    tabindex="-1"
    {@attach checkOverflow}
  >
    <Clipboard
      size="xs"
      color="alternative"
      bind:value
      class="absolute top-2 right-4 w-20 bg-gray-50 focus:ring-0 dark:bg-gray-800"
    >
      {#snippet children(success)}
        {#if success}
          Copied
        {:else}
          Copy
        {/if}
      {/snippet}
    </Clipboard>
    {#if codeLang === 'md'}
      <Highlight language={mdLang} code={processedCode} />
    {:else if processedCode}
      <HighlightSvelte code={processedCode} />
    {:else}
      <div class="p-4 text-gray-500 dark:text-gray-400">No code is provided</div>
    {/if}
  </div>

  {#if showExpandButton}
    <button
      onclick={handleExpandClick}
      type="button"
      class="hover:text-primary-700 absolute start-0 bottom-0 w-full border-t border-gray-200 bg-gray-100 px-5 py-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
      >{expand ? 'Collapse code' : 'Expand code'}</button
    >
  {/if}
</div>
