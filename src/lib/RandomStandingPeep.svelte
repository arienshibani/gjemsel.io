

<script>
  import {fly} from "svelte/transition"

// https://www.openpeeps.com/
  const randomInt = Math.floor(Math.random() * (12 - 1 + 1) + 1)
  const peeps = [
    "https://assets.website-files.com/5e51c674258ffe10d286d30a/5e5363188becbffe8c57172c_peep-standing-24.svg",
    "https://assets.website-files.com/5e51c674258ffe10d286d30a/5e53613f9b55b0a5a457c452_peep-standing-10.svg",
    "https://assets.website-files.com/5e51c674258ffe10d286d30a/5e5362fa8becbf1d50570b23_peep-standing-23.svg",
    "https://assets.website-files.com/5e51c674258ffe10d286d30a/5e536601c67e7916da9d1aa5_peep-standing-27.svg",
    "https://assets.website-files.com/5e51c674258ffe10d286d30a/5e53612767293a6c4f619687_peep-standing-8.svg"
] 

  Array.prototype.random = function () {
    return this[Math.floor((Math.random()*this.length))];
  }
</script>

<img style="max-width: 50%;" src={peeps.random()}>

<style>
    img{
        margin-bottom: 2rem;

        max-height: 200px;
    }
</style>
