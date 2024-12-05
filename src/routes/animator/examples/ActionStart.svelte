<script lang="ts">
  import { Animator, Controler, controlHelpers } from '$lib';
  import { Button } from "flowbite-svelte";
  // let actionStatus = $state(false);
  // const changeAction = () => {
  //   actionStatus = !actionStatus;
  // }

  const controller = controlHelpers();
  let actionStatus = $state(false)
  const toggleControl = controller.toggle;
  const endControl = controller.end;
  $effect(() => {
    actionStatus = controller.isStarted;
  })
</script>

<div class="max-w-6xl mx-auto">
  <div class="max-w-4xl mx-auto px-4 py-8">
    <Button onclick={toggleControl}>{actionStatus ? 'Stop' : 'Start'}</Button>
    <div class="relative flex items-center justify-center h-96">
      <Controler action={actionStatus}>
        <Animator class="absolute h-full w-full bg-[url('/images/tech.avif')] text-center" animations={[{ action: 'jackInTheBox' }]} duration={2000} hideEnd={true}>
          <h1 class="text-5xl font-bold text-white">I won’t be impressed with technology</h1>
        </Animator>
        <Animator class="absolute h-96 w-96 text-center" animations={[{ action: 'fadeInUp' }]} duration={2000} hideFor={2500} hideEnd={true}>
          <img src="/images/until.png" alt="until" />
        </Animator>
        <Animator class="absolute h-full w-full bg-[url('/images/food.jpg')] text-center" animations={[{ action: 'bounce' }]} hideFor={5000} duration={2000}>
          <h2 class="text-6xl text-white mt-24">I can download food</h2>
        </Animator>
      </Controler>
    </div>
  </div>
</div>
