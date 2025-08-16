<script lang="ts">
	import { Animator } from '$lib';
</script>

<div class="mx-auto max-w-6xl">
	<div class="mx-auto max-w-4xl px-4 py-8">
		<div class="relative flex h-96 items-center justify-center">
			<Animator class="absolute" animations={[{ action: 'rotateInUpRight' }]} hideEnd={true}>
				<h1 class="text-4xl font-bold text-blue-600">Svelte Animate</h1>
			</Animator>
			<Animator
				class="absolute"
				animations={[{ action: 'fadeInUp' }]}
				hideFor={1500}
				hideEnd={true}
			>
				<h2 class="text-4xl text-green-500">Powerful Animations</h2>
			</Animator>
			<Animator class="absolute" animations={[{ action: 'bounce' }]} hideFor={3000} hideEnd={true}>
				<p class="text-4xl text-purple-600">Smooth Transitions</p>
			</Animator>
			<Animator
				class="absolute"
				animations={[{ action: 'lightSpeedInLeft' }]}
				hideFor={4000}
				hideEnd={true}
			>
				<h3 class="text-3xl text-red-500">Customizable Effects</h3>
			</Animator>
			<Animator
				class="absolute"
				animations={[{ action: 'zoomInDown' }]}
				hideFor={5500}
				hideEnd={true}
			>
				<p class="text-3xl text-orange-500">Easy to Use</p>
			</Animator>
			<Animator
				class="absolute"
				animations={[{ action: 'slideInRight' }]}
				hideFor={7000}
				hideEnd={true}
			>
				<h4 class="text-4xl text-teal-600">Responsive Design</h4>
			</Animator>
			<Animator class="absolute" animations={[{ action: 'rotateInUpRight' }]} hideFor={8000}>
				<h1 class="text-4xl font-bold text-blue-600">Svelte Animate</h1>
			</Animator>
		</div>
	</div>
</div>
