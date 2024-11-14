import type { Component } from 'svelte';
import { type ListType, CogOutline, BadgeCheckOutline } from 'runes-webkit';
import type { AnimationType } from "$lib"

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
export function copyToClipboard(text: string): Promise<void> {
  return navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log('Text copied to clipboard');
    })
    .catch((err) => {
      console.error('Failed to copy: ', err);
      throw err; // Re-throw the error so the caller can handle it if needed
    });
}

export function replaceLibImport(componentString: string): string {
  return componentString.replace(/from "\$lib"/g, "from 'svelte-5-ui-lib'");
}

export const isGeneratedCodeOverflow = (code: string): boolean => {
  const lines = code.split('\n');
  return lines.length > 7;
};

export const isSvelteOverflow = (sveltefile: string, exampleModules: Record<string, string>): boolean => {
  const filePath = `./examples/${sveltefile}`;
  const fileContent = exampleModules[filePath];

  if (typeof fileContent !== 'string') {
    console.warn(`File content for ${filePath} is not found or not a string`);
    return false;
  }

  const lines = fileContent.split('\n');
  return lines.length > 7;
};

export function getExampleFileName(selectedExample: string, exampleArr: { name: string }[]): string {
  const foundExample = exampleArr.find((example) => example.name === selectedExample);

  if (!foundExample) {
    // If the selectedExample is not in the array, default to the first example
    selectedExample = exampleArr[0].name || '';
  }

  // Convert the selected example to PascalCase
  const result = selectedExample
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join('');

  return `${result}.svelte`;
}


// Convert animation names to quoted format for code generator
export function convertAnimationNames(animationName: AnimationType | AnimationType[]): string {
  // If it's an array, map and join
  if (Array.isArray(animationName)) {
    return animationName
      .map(name => `"${name}"`)
      .join(',');
  }
  // If it's a single value
  return `"${animationName}"`;
}