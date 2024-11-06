<script lang="ts">
	import { IconPage, filterStringKeys } from 'runes-webkit';
	import * as icons from '$lib';
	// const keyIcons = filterIconsByKeyword(icons, keywordsToInclude);
	// console.log('icons: ', icons);
	const keyIcons = filterStringKeys(icons);
</script>

<IconPage icons={keyIcons} title="Three Tabs" defaultSize="16" minSize="12" maxSize="40" />
