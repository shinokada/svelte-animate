<script lang="ts">
	import { Animate } from '$lib';
	import { AcademicCap } from 'svelte-heros-v2';
	// bounce, flash, pulse, rubberBand, shakeX, shakeY, headShake, swing, tada, wobble, jello, heartBeat
</script>

<div class="container">
	<h1>Svelte Animate for Svelte 5</h1>

	<Animate animation="backInLeft" trigger="click" duration="0.5s">
		<AcademicCap size="50" color="#FF0000" />
	</Animate>

	<Animate animation="zoomIn" trigger="click" duration="0.5s">
		<h1>Hello World!</h1>
	</Animate>

	<Animate animation="zoomOutRight" duration="0.5s">
		<div style="height: 200px; width: 200px; background: #0055f0"></div>
	</Animate>

	<div class="animation-container">
		<Animate animation="backInUp" trigger="click" duration="0.5s">
			<AcademicCap size="50" color="#FF0000" />
		</Animate>
	</div>
</div>

<style>
	.container {
		margin: 40px;
		display: flex;
		flex-direction: column;
		align-items: center;
		/* justify-content: center; */
		min-height: 100vh;
	}
	.animation-container {
		position: relative;
		width: 300px;
		height: 200px;
		overflow: hidden;
		background: #f0f0f0;
	}
</style>
