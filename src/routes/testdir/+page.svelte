<script lang="ts">
	import { Animate } from '$lib';
</script>

<div class="mx-auto flex h-96 max-w-5xl flex-col items-center justify-center overflow-hidden">
	<Animate animations="fadeIn" trigger="click" duration={2000} delay={1000} repeat="2">
		<div>Click me for a customized animation experience!</div>
	</Animate>

	<Animate
		animations={[
			{ action: 'fadeIn', duration: 1000, delay: 500 },
			{ action: 'zoomOut', duration: 2000, pause: 1000 }
		]}
		trigger="click"
		hideEnd={true}
		showReplayButton={true}
	>
		<div>Click me for a customized animation sequence!</div>
	</Animate>
</div>
