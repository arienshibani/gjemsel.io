<script>
  import favicon from './assets/favicon.ico'
  import StartButton from './lib/StartButton.svelte'
  import CountDown from "./lib/CountDown.svelte"
  import AudioPlayer, {playMusic, stopMusic} from "../src/lib/AudioPlayer.svelte"
  import { fly } from "svelte/transition"

  // Art by Pablo Stanley: https://www.openpeeps.com/
  import RandomPeep from "./lib/RandomPeep.svelte"
  import RandomStandingPeep from "./lib/RandomStandingPeep.svelte"

  let inputFreezeTime = 100
  let inputRoundDuration = 60 * 10

  let freezeTime = 0
  let roundDuration = 0
  let gameState = "intro"

  import countDownMusicSrc from "./assets/huddle.mp3"
  import roundStartSoundSrc from "./assets/sus.mp3"

  const loadingScreenTips = [
    "Husk å lete under pulter og bord!",
    "Kanskje er det noen i systemhimlingen..",
    "Sjekk søppelspannet.",
    "Det er juks å låse seg inn på doen.",
    "Set telefonen på flymodus!",
    "Finner du ikke alle før tiden er ute så taper du",
    "Sjekk om noen har fått plass i kjøleskapet",
    "Man is not what he thinks he is, he is what he hides",
    "It is a joy to be hidden, and a disaster not to be found.",
  ]

  function startCounting() {
    playMusic()
    gameState = "countDownStage"
  }

  function gameFinished() {
    gameState = "Done"
  }

  function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
  }

  function startManhunt() {
    stopMusic()
    gameState = "manhunt"
    delay(1000 * roundDuration).then(() => gameFinished())
  }

  function setFreezeTime() {
    startCounting()
    setRoundDuration()
    freezeTime = inputFreezeTime;
 
    delay(1000 * freezeTime).then(() => {
      startManhunt()
    })
  }

  function setRoundDuration() {
    roundDuration = inputRoundDuration;
  }

  function resetGame() {
    stopMusic()
    gameState = "intro";
    freezeTime = 0;
    roundDuration = 0;
  }

</script>

<svelte:head>
  <title>Gjemsel.io</title>
  <link rel="icon" type="image/ico" href={favicon} />
</svelte:head>

<main>
  <h1>Gjemsel</h1>

  <div transition:fly="{{ y: 200, duration: 1000 }}">
    {#if gameState === "intro"}
    <hr>
    <p>
      Gjemsel er en lek som består i at alle gjemmer seg, <b>unntatt én deltager</b>, som skal finne alle andre. Den som står, lukker øynene og teller til {inputFreezeTime}, før øynene åpnes og letingen begynner. Finner ikke vedkommende alle som har gjemt seg før tiden renner ut, så taper den som leter.
    </p>

    <p></p>

 

    <div class="settings">
      <h2>Innstillinger ⚙️</h2>
      <hr>
      <br>
      <label>
        <b>Telleperiode 🙈 {inputFreezeTime} sekunder</b> <br>
        Antall sekunder man skal telle
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
      Tips:
    </b>
    {loadingScreenTips[Math.floor(Math.random()*loadingScreenTips.length)]}
  </p>

  <button on:click={resetGame}>Avbryt Nedtelling</button>
  <AudioPlayer src="{countDownMusicSrc}" showCheckBox={true}/>
  {/if}


  {#if gameState === "manhunt"}
  <p>Klar eller ei, her kommer jeg!</p>
  <br>
  <RandomStandingPeep />
  <AudioPlayer src="{roundStartSoundSrc}" showCheckBox={false}/>
  
  <CountDown countdown="{roundDuration}" prefixText="Finn alle før tiden renner ut! "
    timerFinishedText="Runden er over! Fant du alle sammen?" />

  <button on:click={resetGame}>Tilbake</button>
  {/if}

  <div class="card" transition:fly="{{ y: 200, duration: 1000 }}">
    {#if gameState === "counting"}
    <button> Gjem dere! </button>
    {:else if gameState === "Done"}
    <button on:click="{window.location.reload()}">Ny runde?</button>
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
