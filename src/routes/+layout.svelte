<script lang="ts">
	import '../app.css';
	import type { Component } from 'svelte';
	import { page } from '$app/state';
	import { DotsHorizontalOutline, GithubSolid, XSolid, Bluesky } from 'runes-webkit';
	import Footer from './utils/Footer.svelte';
	import {
		Navbar,
		NavLi,
		NavBrand,
		NavUl,
		uiHelpers,
		DarkMode,
		Dropdown,
		DropdownItem,
		NavHamburger
	} from 'flowbite-svelte';
	import { RunesMetaTags, deepMerge } from 'runes-meta-tags';
	import { Runatics } from 'runatics';
	import DynamicCodeBlockStyle from './utils/DynamicCodeBlockStyle.svelte';

	type LiType = {
		name: string;
		href: string;
		Icon?: Component;
	};
	let { children, data } = $props();
	const analyticsId = data.ANALYTICS_ID_APP_TWO;
	// metaTags
	let metaTags = $state(
		page.data.pageMetaTags
			? deepMerge(page.data.layoutMetaTags, page.data.pageMetaTags)
			: data.layoutMetaTags
	);

	const lis: LiType[] = [
		{ name: 'Guide', href: '/guide' },
		{ name: 'Animator', href: '/animator' },
		{ name: 'Animations', href: '/animations' },
		{ name: 'Animated icons', href: 'https://svelte-animated-icons.codewithshin.com/' }
	];
	const githubUrl = `https://github.com/shinokada/${__NAME__}`;
	const twitterUrl = 'https://twitter.com/shinokada';
	const blueskyUrl = 'https://bsky.app/profile/codewithshin.com';

	let activeUrl = $state(page.url.pathname);
	$effect(() => {
		activeUrl = page.url.pathname;
	});

	let nav = uiHelpers();
	let navStatus = $state(false);

	$effect(() => {
		navStatus = nav.isOpen;
	});

	let activeClass = 'p-2 text-base hover:text-gray-600';
	let nonActiveClass = 'p-2 text-base hover:text-gray-600';
</script>

<Runatics {analyticsId} />
<RunesMetaTags {...metaTags} />

<Navbar
	breakpoint="lg"
	fluid
	class="fixed top-0 left-0 z-50 border-b border-gray-100 bg-white py-4  sm:px-12 dark:border-gray-700 dark:bg-stone-950"
	navContainerClass="lg:justify-between"
>
	<NavBrand href="/">
		<span class="self-center text-2xl font-semibold whitespace-nowrap lg:text-3xl dark:text-white"
			>Svelte Animate</span
		>
	</NavBrand>
	<div class="flex justify-end lg:order-2">
		<NavHamburger class="order-3" />
		<DynamicCodeBlockStyle class="hidden lg:block" />
		<DotsHorizontalOutline class="mt-1.5 mr-4 ml-6 dark:text-white" size="lg" />
		<Dropdown simple class="p-1">
			{#if blueskyUrl}
				<DropdownItem href={blueskyUrl} target="_blank" class="m-0 p-0.5">
					<Bluesky size="30" />
				</DropdownItem>
			{/if}
			{#if twitterUrl}
				<DropdownItem href={twitterUrl} target="_blank" class="m-0 p-2"><XSolid /></DropdownItem>
			{/if}
			{#if githubUrl}
				<DropdownItem href={githubUrl} target="_blank" class="m-0 p-2">
					<GithubSolid />
				</DropdownItem>
			{/if}
		</Dropdown>
		<DarkMode class="m-0 p-2" />
	</div>
	<NavUl
		breakpoint="lg"
		{activeUrl}
		class="order-2 lg:order-1"
		classes={{ active: activeClass, nonActive: nonActiveClass, ul: 'p-0' }}
	>
		<NavLi href="/guide">Guide</NavLi>
		<NavLi href="/animator">Animator</NavLi>
		<NavLi href="/animations">Animations</NavLi>
		<NavLi href="https://svelte-animated-icons.codewithshin.com/" target="_blank"
			>Animated icons</NavLi
		>
	</NavUl>
</Navbar>

<div class="mt-16 mb-8">
	{@render children()}
</div>
<Footer />
