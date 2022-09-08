<script>
	import { onMount, afterUpdate, onDestroy } from "svelte";


	export let countdown = 10; // default prop value
    export let prefixText = "Teller ned fra "
    export let timerFinishedText = ""

	let timer = null;

	// when countdown updates, it updates displayValue
	$: displayValue = `${prefixText + countdown.toString()}`;

	onMount(() => {
	  timer = setInterval(() => {
	    countdown -= 1;
	  }, 1000);
	});

	afterUpdate(() => {
	  if (countdown === 0) {
	    if (timer) {
	      clearInterval(timer);
	      timer = null;
	    }
	  }
	});

	onDestroy(() => {
	  if (timer) {
	    clearInterval(timer);
	  }
	});
</script>


    {#if countdown === 0 }
    <p>{timerFinishedText}</p>
    {:else}
    <p>{displayValue}...</p>
    {/if}
