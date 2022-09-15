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
    import { onMount } from 'svelte'
    export let showCheckBox
    export let src
    
    let player
  
    onMount(() => {
      // Like players.push(player)
      players.add(player)
    })
  </script>
  
  <main>
    <div>
      <audio 
          autoplay
          bind:this={player}
          {src}
          controls>
          <track kind="captions" />
      </audio>
  </div>

  {#if showCheckBox !== false}
  <br>
    <input checked on:click={toggleVolume} type="checkbox" id="vehicle1" name="vehicle1" value="Bike">
    {#if vol}
      <label> Skru Av Lyd 🎵</label>  
    {:else if gameState === "Done"}
      <label> Lyd På Lyd 🎵</label>  
    {/if}
  <br>
  {/if}
  </main>


  <style>
    audio{
      display: none
    }
  </style>
