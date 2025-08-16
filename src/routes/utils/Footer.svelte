<script>
  import { Footer, FooterBrand, FooterLink, FooterLinkGroup } from 'flowbite-svelte';
</script>

<Footer
  class="rounded-none border-t border-gray-200 shadow-none dark:border-gray-600 dark:bg-gray-900"
  footerType="logo"
>
  <div class="mx-auto max-w-7xl sm:flex sm:items-center sm:justify-between">
    <FooterBrand href="https://www.codewithshin.com/" name="codewithshin.com" />
    <FooterLinkGroup
      class="mt-3 flex flex-wrap items-center text-sm text-gray-500 sm:mt-0 dark:text-gray-400"
    >
      <FooterLink href="/Guide">Guide</FooterLink>
      <FooterLink href="/animator">animator</FooterLink>
      <FooterLink href="/animations">animations</FooterLink>
      <FooterLink href='https://svelte-animated-icons.codewithshin.com/' target="_blank">Animated icons</FooterLink>
    </FooterLinkGroup>
  </div>
</Footer>
