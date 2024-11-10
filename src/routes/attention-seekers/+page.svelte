<script lang="ts">
	import { Animate } from '$lib';
	import { AcademicCap } from 'svelte-heros-v2';
	// bounce, flash, pulse, rubberBand, shakeX, shakeY, headShake, swing, tada, wobble, jello, heartBeat
</script>

<div class="space-y-8 flex flex-col justify-center items-center">
	<h1>Svelte Animate for Svelte 5</h1>

	<Animate animation="bounce" duration="0.5s">
		<AcademicCap size="50" color="#FF0000" />
	</Animate>

	<Animate animation="flash" trigger="click" duration="0.5s">
		<h1>Click me</h1>
	</Animate>

	<Animate animation="pulse" >
		<div class="w-40 h-40 bg-blue-200">Pulse</div>
	</Animate>

	
	<Animate animation="rubberBand">
		<AcademicCap size="50" color="#FF0000" />
	</Animate>
	
</div>

