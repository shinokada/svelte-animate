<script lang="ts">
	import {
		removeHyphensAndCapitalize,
		HomeCards,
		TechInfo,
		BellActiveAltOutline,
		InfoCircleOutline,
		cards,
		info,
		type CardType
	} from 'runes-webkit';
	const brand = {
		title: `${removeHyphensAndCapitalize(__NAME__)}`,
		description: `${__DESCRIPTION__}`,
		Icon: BellActiveAltOutline,
		icon_class: 'text-blue-500'
	};

	const filteredCards = [brand, ...cards];

	// const originalSource = {
	//   title: 'Original source',
	//   description: 'original',
	//   Icon: InfoCircleOutline,
	//   href: 'original url',
	//   icon_class: 'text-orange-500'
	// };
	const license = {
		title: 'License',
		description: 'Released under the MIT License.',
		Icon: InfoCircleOutline,
		href: `https://github.com/shinokada/${__NAME__}/blob/main/LICENSE`,
		icon_class: 'text-lime-500'
	};

	const newInfo = [license, ...info];
	/*eslint no-undef: "off"*/
	const pkg = {
		pkgName: __NAME__,
		pkgVersion: __VERSION__,
		repoUrl: __GITHUBURL__,
		runaticsVersion: __RUNATICS_VERSION__,
		runesMetaTagsVersion: __RUNES_METATAGS_VERSION__,
		svelteVersion: __SVELTE_VERSION__,
		svelteKitVersion: __SVELTEKIT_VERSION__,
		svelte5uilib: __SVELTE_5_UI_LIB_VERSION__,
		svelteRuneHighlight: __SVELTE_RUNE_HIGHLIGHT_VERSION__,
		viteVersion: __VITE_VERSION__
	};
</script>

<div class="relative mx-auto mt-8 h-full max-w-7xl overflow-y-auto px-8 pb-20">
	<h1 class="my-8 flex justify-center">Svelte Animate</h1>
	<HomeCards cards={filteredCards as CardType[]} />
	<h2 class="my-8 flex justify-center">Info</h2>
	<HomeCards cards={newInfo as CardType[]} />
	<TechInfo {...pkg} />
</div>
