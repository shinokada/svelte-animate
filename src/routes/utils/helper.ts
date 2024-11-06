import type { Component } from 'svelte';
import {
	type ListType,
	sidebarList,
	CogOutline,
	ExpandOutline, BellActiveAltOutline,BadgeCheckOutline,
	GridPlusOutline
} from 'runes-webkit';

export const newSidebarList: ListType[] = [
  {
    name: 'Attention seekers',
    Icon: CogOutline as Component,
    href: '/attention-seekers'
  },
  {
    name: 'Back',
    Icon: BadgeCheckOutline as Component,
    href: '/back'
  },
  {
    name: 'Bouncing',
    Icon: BadgeCheckOutline as Component,
    href: '/bouncing'
  },
  {
    name: 'Fading',
    Icon: BadgeCheckOutline as Component,
    href: '/fading'
  },
  {
    name: 'Flippers',
    Icon: BadgeCheckOutline as Component,
    href: '/flippers'
  },
  {
    name: 'Lightspeed',
    Icon: BadgeCheckOutline as Component,
    href: '/lightspeed'
  },
  {
    name: 'Rotating',
    Icon: BadgeCheckOutline as Component,
    href: '/rotating'
  },
  {
    name: 'Sliding',
    Icon: BadgeCheckOutline as Component,
    href: '/sliding'
  },
  {
    name: 'Specials',
    Icon: BadgeCheckOutline as Component,
    href: '/specials'
  },
  {
    name: 'Zooming',
    Icon: BadgeCheckOutline as Component,
    href: '/zooming'
  }
	
];
// export const newSidebarList: ListType[] = [...sidebarList, ...extra];
