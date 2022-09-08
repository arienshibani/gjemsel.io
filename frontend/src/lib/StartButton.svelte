<script>
    import {fly} from "svelte/transition"

</script>

<button transition:fly="{{ y: 200, duration: 1000 }}">
  Trykk her for å leke Gjemsel!
</button>
