<script context="module">
  const players = new Set()
  let vol = true;

  const volumeOn = () => {
    players.forEach(p => p.volume = 1)
  }

  const volumeOff = () => {
    players.forEach(p => p.volume = 0)
  }

  const toggleVolume = () => {
    vol = !vol
    if(vol){
      volumeOn()
    } else {
      volumeOff()
    }
  }

  export function stopMusic() {
    players.forEach(p => p.pause())
  }

  export function playMusic() {
    players.forEach(p => p.play())
  }
</script>

<script>
  import { onMount, onDestroy } from 'svelte'
  export let showCheckBox
  export let src
  
  let player

  onMount(() => {
    players.add(player)
  })

  onDestroy(() => {
    players.clear()
  })
</script>
  
<main>
  <div>
    <audio 
        crossorigin="use-credentials"
        autoplay
        bind:this={player}
        {src}
        controls>
        <track kind="captions" />
    </audio>
</div>

{#if showCheckBox === true}
<br>
<div>
  <input checked on:click={toggleVolume} type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
  <label> 🎵 Lyd</label>    
</div>

<br>
{/if}
</main>


<style>
  audio{
    display: none
  }

  div{
    position: fixed;
    bottom: 40px;
    left: 40px
  }
</style>
