<script lang="ts">
  import { Wrapper, ArchiveBox, ArrowUp } from "$lib"
</script>

<h1>Draw</h1>

<Wrapper 
  event="onmouseenter" 
  params={{ duration: 500 }}
>
  <ArchiveBox size={50} color="green" />
</Wrapper>

<Wrapper 
  event="onmouseenter" 
  params={{ duration: 500 }}
>
<ArrowUp size={50} color="red" />
</Wrapper>

<Wrapper 
event="onclick"
params={{ duration: 500 }}
pauseDuration={100}
>
  <ArchiveBox size={50} color="skyblue" />
</Wrapper>
