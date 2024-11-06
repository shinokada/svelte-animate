<script lang="ts">
	import { HighlightCompo, Code, H2 } from 'runes-webkit';
	import { License, StaticBadge, NpmVersion, NpmDownload } from 'svelte-shields';
	import type {
		StaticBadgePropsType,
		NpmVersionPropsType,
		LicensePropsType,
		NpmDownloadPropsType
	} from 'svelte-shields';

	const sponsor: StaticBadgePropsType = {
		badgeContent: 'Sponsor-❤-blue',
		logo: 'GitHub',
		color: 'fe8e86',
		link: ['https://github.com/sponsors/shinokada', 'https://github.com/sponsors/shinokada']
	};

	const npmVersion: NpmVersionPropsType = {
		packageName: 'svelte-remix',
		logo: 'npm',
		link: [
			'https://www.npmjs.com/package/svelte-remix',
			'https://github.com/shinokada/svelte-remix'
		]
	};

	const license: LicensePropsType = {
		source: 'github',
		github_user: 'shinokada',
		github_repo: 'svelte-remix',
		link: [
			'https://github.com/shinokada/svelte-remix/blob/master/LICENSE',
			'https://github.com/shinokada/svelte-remix/blob/master/LICENSE'
		]
	};

	const downloads: NpmDownloadPropsType = {
		packageName: 'svelte-remix',
		logo: 'npm',
		link: ['https://www.npmjs.com/package/svelte-remix']
	};

	const modules = import.meta.glob('./md/*.md', {
		query: '?raw',
		import: 'default',
		eager: true
	});
</script>

<h1>Lightspeed</h1>
