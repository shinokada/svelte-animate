import type { Component } from 'svelte';
import {
	type ListType,
	sidebarList,
	CogOutline,
	ExpandOutline,
	GridPlusOutline
} from 'runes-webkit';

const extra: ListType[] = [
	{
		name: '3 Tabs',
		Icon: ExpandOutline as Component,
		href: '/three-tabs'
	},
	{
		name: '3 Tabs Tailwind ',
		Icon: CogOutline as Component,
		href: '/three-tabs-sizebytailwind'
	},
	{
		name: 'No Tabs',
		Icon: GridPlusOutline as Component,
		href: '/no-tabs'
	}
];
export const newSidebarList: ListType[] = [...sidebarList, ...extra];
