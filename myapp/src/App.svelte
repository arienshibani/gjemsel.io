<script>
  import svelteLogo from './assets/svelte.svg'
  import StartButton from './lib/StartButton.svelte'
  import RandomPeep from "./lib/RandomPeep.svelte"
  import {fly} from "svelte/transition"

  


</script>

<main >
   <h1 >Gjemsel.io</h1>
  
  <intro transition:fly="{{ y: 200, duration: 2000 }}">
    <p>Gjemsel er en lek som består i at alle gjemmer seg, unntatt én deltager, som skal finne de andre. Vanligvis skal én person blir valgt til å stå, mens de andre løper og gjemmer seg. Den som står, lukker øynene og teller til et avtalt tall, før øynene åpnes og letingen tar til.</p>
  </intro>


  <RandomPeep />

  <div class="card">
    <StartButton/>
  </div>
</main>

<style>
  .logo {
    height: 6em;
    padding: 1.5em;
    will-change: filter;
  }
  .logo:hover {
    filter: drop-shadow(0 0 2em #646cffaa);
  }
  .logo.svelte:hover {
    filter: drop-shadow(0 0 2em #ff3e00aa);
  }
  .read-the-docs {
    color: #888;
  }

  p{
    max-width: 400px;
    font-size: 1.2rem;
    margin-bottom: 5rem;
  }
</style>
