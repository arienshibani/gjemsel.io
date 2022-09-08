<script>
  import svelteLogo from './assets/svelte.svg'
  import StartButton from './lib/StartButton.svelte'
  import RandomPeep from "./lib/RandomPeep.svelte"
  import RandomStandingPeep from "./lib/RandomStandingPeep.svelte"
  import CountDown from "./lib/CountDown.svelte"
  import { fly } from "svelte/transition"

  let inputFreezeTime = 50
  let inputRoundDuration = 60 * 10

  let freezeTime = 0
  let roundDuration = 0
  let gameState = "intro"

  const loadingScreenTips = [
    "husk å lete under pulter og bord!",
    "kanskje er det noen i systemhimlingen..",
    "kan noen ha gjemt seg i søppelspannet?",
    "gjem deg på samme rom som lete-personen nettop har vært innom",
    "finner du ikke all før tiden er ute så taper du 😬"
  ]

  function startCounting() {
    gameState = "countDownStage"
  }

  function gameFinished() {
    gameState = "Done"
  }

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  function startManhunt() {
    gameState = "manhunt"
    delay(1000 * roundDuration).then(() => gameFinished())
  }

  function setFreezeTime() {
    startCounting()
    setRoundDuration()
    freezeTime += inputFreezeTime;

    delay(1000 * freezeTime).then(() => {
      startManhunt()
    })
  }

  function setRoundDuration() {
    roundDuration += inputRoundDuration;
  }

</script>

<main>
  <h1>Gjemsel.io</h1>


  <div transition:fly="{{ y: 200, duration: 1000 }}">
    {#if gameState === "intro"}
    <hr>
    <p>
      Gjemsel er en lek som består i at alle gjemmer seg, unntatt én deltager, som skal finne de andre. Vanligvis skal
      én person blir valgt til å stå, mens de andre løper og gjemmer seg. Den som står, lukker øynene og teller til et
      avtalt tall, før øynene åpnes og letingen tar til.
    </p>

    <div class="settings">
      <h2>Innstillinger ⚙️</h2>
      <hr>
      <br>
      <label>
        <b>Telleperiode 🙈 {inputFreezeTime} sekunder</b> <br>
        Antall sekunder man skal telle før leting
        <input type=range bind:value={inputFreezeTime} step=5 min=30 max=100> <br>
      </label>

      <br>
      <label>
        <b>Tid Per Runde ⏲️ {inputRoundDuration} sekunder</b> <br>
        Hvor lang tid man har på å finne folk
        <input type=range bind:value={inputRoundDuration} step=10 min=30 max=1200> <br>
      </label>

      {#if gameState === "intro"}
      <button on:click={setFreezeTime}>Begynn Leken 🏃</button>
      {/if}

      <br>
      <br>
      <RandomPeep />
    </div>
    {/if}
  </div>

  {#if gameState === "countDownStage"}
  <CountDown countdown="{freezeTime}" prefixText="Teller ned fra " timerFinishedText="" />

  <RandomPeep />
  <p>
    <b>
      tips:
    </b>
    {loadingScreenTips[2]}
  </p>
  {/if}


  {#if gameState === "manhunt"}
  <p>Klar eller ei, her kommer jeg!</p>
  <br>
  <RandomStandingPeep />
  <CountDown countdown="{roundDuration}" prefixText="Finn alle før tiden renner ut! "
    timerFinishedText="Runden er over! Fant du alle sammen?" />
  {/if}

  <div class="card" transition:fly="{{ y: 200, duration: 1000 }}">

    {#if gameState === "counting"}
    <button> Gjem dere! </button>
    {:else if gameState === "Done"}
    <button >Ny runde?</button>
    {/if}
  </div>
</main>

<style>
  .settings {
    max-width: 70%;
    margin: auto;
    padding-top: 20px;
  }

  p {
    margin: auto;
    font-size: 1.2rem;
    max-width: 408px;
    text-align: justify;
  }

  hr {
    max-width: 400px;
  }

  input {
    margin: 10px;
    margin-bottom: 20px;
    border: 0;
    outline: 0;
    background-color: transparent;
  }

  button {
    margin-top: 20px;
    margin-bottom: 10px;
  }

</style>
