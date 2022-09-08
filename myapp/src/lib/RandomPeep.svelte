

<script>
  import {fly} from "svelte/transition"

// https://www.openpeeps.com/
  const randomInt = Math.floor(Math.random() * (12 - 1 + 1) + 1)
  const peeps = [
    "https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535e2ce35d38156a694f11_peep-sitting-2.svg",
    "https://assets.website-files.com/5e51c674258ffe10d286d30a/5e536006c67e7976719986dc_peep-sitting-18.svg",
    "https://assets.website-files.com/5e51c674258ffe10d286d30a/5e535f0d9b55b01d2056cf00_peep-sitting-10.svg"
] 

  Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }
</script>

<img transition:fly="{{ y: 200, duration: 2000 }}" style="max-width: 50%;" src={peeps.random()}>

<style>
    img{
        margin-bottom: 2rem;
    }
</style>
